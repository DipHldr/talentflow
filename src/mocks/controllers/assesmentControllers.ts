// src/mocks/controllers/assessmentControllers.ts
import { db } from '../../db';
import type {
    CreatedAssesment,
    AssessmentResult,
    AssessmentRequest,
    AssessmentSubmission,
    TestQuestion,
    PaginatedAssessmentsResponse,
    OverallAssessmentStats } from '../types/assesment.ts';

import type {CandidateIdentifier,Candidate} from '../types/candidates.ts';


export const getCandidateById = async (id: number) => {
  const candidate = await db.candidates.get(id);
  if (!candidate) {
    throw new Error("Candidate not found");
  }
  return candidate;
};

// In src/mocks/controllers/assessmentControllers.ts

/**
 * Gets a paginated list of all created assessment templates.
 * @param {object} options - Options for pagination and searching.
 * @returns {Promise<PaginatedAssessmentsResponse>} A paginated list of assessments.
 */
export const getAllAssessments = async ({
  page = 1,
  pageSize = 10,
  search = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
}): Promise<PaginatedAssessmentsResponse> => {
  let collection = db.createdAssessments.toCollection();

  // Apply search filter if a search term is provided
  const lowerSearch = search.toLowerCase();
  if (lowerSearch) {
    collection = collection.filter(assessment =>
      assessment.title.toLowerCase().includes(lowerSearch)
    );
  }

  // Get the total count of filtered items for pagination
  const total = await collection.count();
  const totalPages = Math.ceil(total / pageSize);

  // Apply pagination
  const data = await collection
    .offset((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return {
    data,
    total,
    page,
    pageSize,
    totalPages,
  };
};



// For HR to create/save an assessment for a job
export const createAssessment = async (request: AssessmentRequest): Promise<CreatedAssesment> => {
  const {title, topics, numberOfQuestions,duration } = request;

  // 1. Fetch all questions that match the provided topics.
  // The .anyOf() method is highly efficient for this type of query.
  const questionPool = await db.questions
    .where('category')
    .anyOf(topics)
    .toArray();

    console.log(questionPool);

  // Handle case where not enough questions are available
  if (questionPool.length < numberOfQuestions) {
    throw new Error(
      `Not enough questions found for topics [${topics.join(', ')}]. ` +
      `Found ${questionPool.length}, but needed ${numberOfQuestions}.`
    );
  }

  // 2. Shuffle the pool of questions to ensure random selection.
  // This is a simple and effective shuffling algorithm (Fisher-Yates variant).
  const shuffledQuestions = questionPool.sort(() => 0.5 - Math.random());

  // 3. Select the requested number of questions from the top of the shuffled list.
  const selectedQuestions = shuffledQuestions.slice(0, numberOfQuestions);

  // 4. Extract just the IDs from the selected question objects.
  const selectedQuestionIds = selectedQuestions.map(q => q.id);

  // 5. Construct the final assessment object.
  const newAssessment:Omit<CreatedAssesment,'id'> = {
    title,
    topics,
    numberOfQuestions,
    questionIds: selectedQuestionIds,
    duration
  };


  // 6. Save ('put') the complete assessment object to the database.
  const newId =await db.createdAssessments.add(newAssessment);

  // 7. Return the created assessment.
  return {
    ...newAssessment,
    id:newId
  };
};

/**
 * Assigns an assessment template to a candidate by creating a record
 * in the assignedAssessments join table.
 * @param {object} assignment - An object containing candidateId and assessmentId.
 * @returns {Promise<object>} The assignment that was created.
 */
export const assignAssessment = async ({ candidateId, assessmentId }: { candidateId: number; assessmentId: number; }) => {
  // 1.Validate that both the candidate and the assessment exist
  const candidateExists = await db.candidates.get(candidateId);
  if (!candidateExists) {
    throw new Error(`Candidate with ID ${candidateId} not found.`);
  }

  const assessmentExists = await db.createdAssessments.get(assessmentId);
  if (!assessmentExists) {
    throw new Error(`Assessment with ID ${assessmentId} not found.`);
  }

  // 2. Create the assignment link
  const newAssignment = { candidateId, assessmentId };

  // 3. Save the link to the database
  // The schema '[candidateId+assessmentId]' will automatically prevent
  // you from assigning the same assessment to the same candidate twice.
  try {
    await db.assignedAssessments.add(newAssignment);
  } catch (error: any) {
    if (error.name === 'ConstraintError') {
      throw new Error('This assessment is already assigned to the candidate.');
    }
    throw error; // Re-throw other unexpected errors
  }

  console.log(`Assessment ${assessmentId} assigned to candidate ${candidateId}.`);
  return newAssignment;
};

export const getAssignedAssessments = async (identifier: CandidateIdentifier) => {
  let candidate;
  if (identifier.candidateId) {
    candidate = await db.candidates.get(identifier.candidateId);
  } else if (identifier.email) {
    candidate = await db.candidates.where('email').equals(identifier.email).first();
  }

  if (!candidate) throw new Error("Candidate not found");

  const assignments = await db.assignedAssessments.where({ candidateId: candidate.id }).toArray();
  if (assignments.length === 0) return [];

  const results = await db.assessmentResults.where({ candidateId: candidate.id }).toArray();
  const completedIds = new Set(results.map(r => r.assessmentId));

  const pendingIds = assignments.filter(a => !completedIds.has(a.assessmentId)).map(a => a.assessmentId);

  if (pendingIds.length === 0) return [];
  return db.createdAssessments.bulkGet(pendingIds);
};

// For a candidate to submit their results
/**
 * Securely scores and saves a candidate's assessment submission.
 * @param {AssessmentSubmission} submission - The raw answers submitted by the candidate.
 * @returns {Promise<Omit<AssessmentResult, 'id'>>} The final, scored assessment result.
 */

export const submitAssessment = async (submission: AssessmentSubmission) => {
  const { id, candidateId, answers } = submission;

  // 1. Get all question IDs from the submission to fetch them from the DB.
  const questionIds = answers.map(a => a.questionId);

  // 2. Securely fetch the full question objects, including correct answers.
  // This is the crucial step that prevents cheating.
  const questionsFromDb = await db.questions.bulkGet(questionIds) as TestQuestion[];

  // 3. Create a Map for quick lookups of correct answers.
  const correctAnswersMap = new Map(questionsFromDb.map(q => [q.id, q.correctAnswer]));

  // 4. Calculate the score by comparing the user's answers to the real answers.
  let score = 0;
  for (const userAnswer of answers) {
    const correctAnswer = correctAnswersMap.get(userAnswer.questionId);
    if (correctAnswer === userAnswer.selectedAnswer) {
      score++;
    }
  }

  // 5. Construct the final, authoritative result object.
  const finalResult: Omit<AssessmentResult, 'id'> = {
    assessmentId:id!,
    candidateId,
    score,
    totalQuestions: questionsFromDb.length,
    submittedAt: new Date(),
    answers, // Store the raw answers for review/auditing
  };

  // 6. Save the verified result to the 'assessmentResults' table.
  await db.assessmentResults.add(finalResult);

  // 7. Return the final result to be sent back to the frontend.
  return finalResult;
};


/**
 * Finds all pending assessments for a candidate, looking them up by ID or email.
 * @param {CandidateIdentifier} identifier - An object with the candidate's id or email.
 * @returns {Promise<CreatedAssessment[]>} An array of assessments assigned to the candidate that they have not yet completed.
 */
// export const getAssignedAssessments = async (identifier: CandidateIdentifier) => {
//   const { candidateId, email } = identifier;

//   // 1. Find the candidate by either ID or email.
//   let candidate;
//   if (candidateId) {
//     candidate = await db.candidates.get(candidateId);
//   } else if (email) {
//     // .where() is used for indexed fields, making this lookup fast.
//     candidate = await db.candidates.where('email').equals(email).first();
//   }

//   // If no candidate is found or they haven't applied to a job, return empty.
//   if (!candidate || !candidate.appliedJobId) {
//     return [];
//   }

//   // 2. Check if an assessment exists for the job the candidate applied for.
//   const assessment = await db.createdAssessments.get(candidate.appliedJobId);
//   if (!assessment) {
//     return [];
//   }

//   // 3. CRUCIAL: Check if the candidate has already submitted a result for this assessment.
//   const existingResult = await db.assessmentResults
//     .where({
//       jobId: candidate.appliedJobId,
//       candidateId: candidate.id,
//     })
//     .first(); // We only need to know if at least one result exists.

//   // If a result already exists, they've completed it. Return empty.
//   if (existingResult) {
//     return [];
//   }

//   // 4. If an assessment exists and is not completed, return it inside an array.
//   return [assessment];
// };




// For HR to see a summary of attempts for an assessment
/**
 * Generates an analytics summary for all attempts of a specific assessment.
 * @param {number} jobId - The ID of the job's assessment.
 * @param {number} [passingThreshold=0.7] - The score required to pass (e.g., 0.7 for 70%).
 * @returns {Promise<AssessmentSummary>} An object with detailed analytics.
 */
// export const getAssessmentSummary = async (assessmentId: number, passingThreshold = 0.7) => {
//   // Fetch results based on assessmentId, not jobId
//   const results = await db.assessmentResults.where({ assessmentId }).toArray();
//   const assessmentDetails = await db.createdAssessments.get(assessmentId);

//   const attemptsCount = results.length;
//   if (attemptsCount === 0) {
//     return { assessmentId, title: assessmentDetails?.title, attemptsCount: 0, /* ... other zeroed fields */ };
//   }

//   // ... (rest of the calculation logic is the same) ...
//   const scoresAsPercentage = results.map(r => (r.score / r.totalQuestions) * 100);
//   const totalScore = scoresAsPercentage.reduce((sum, score) => sum + score, 0);

//   return {
//     assessmentId,
//     title: assessmentDetails?.title,
//     attemptsCount,
//     averageScore: parseFloat((totalScore / attemptsCount).toFixed(2)),
//     // ... rest of summary object
//   };
// };


// In src/mocks/controllers/assessmentControllers.ts


// In your assessmentControllers.ts file

/**
 * Generates an enhanced analytics summary for a specific assessment,
 * including candidate details for each result.
 */
export const getAssessmentSummary = async (assessmentId: number, passingThreshold = 0.7) => {
  // Fetch initial data in parallel
  const [results, assessmentDetails] = await Promise.all([
    db.assessmentResults.where({ assessmentId }).toArray(),
    db.createdAssessments.get(assessmentId)
  ]);

  const attemptsCount = results.length;

  // Handle case where no one has taken the assessment yet
  if (attemptsCount === 0) {
    return {
      assessmentId,
      title: assessmentDetails?.title,
      attemptsCount: 0,
      averageScore: 0,
      passedCount: 0,
      failedCount: 0,
      highestScore: 0,
      lowestScore: 0,
      results: [],
    };
  }

  // --- Calculate Enhanced Analytics ---

  const scoresAsPercentage = results.map(r => (r.score / r.totalQuestions) * 100);
  const totalScore = scoresAsPercentage.reduce((sum, score) => sum + score, 0);
  
  const passedCount = results.filter(
    (r) => r.score / r.totalQuestions >= passingThreshold
  ).length;

  // --- Enrich Results with Candidate Info ---

  // Get all candidate IDs from the results
  const candidateIds = results.map(r => r.candidateId);
  // Fetch all candidate details in a single efficient query
  const candidates = await db.candidates.bulkGet(candidateIds);
  // Create a Map for easy lookup
  const candidateMap = new Map( candidates.filter((c): c is Candidate => c !== undefined).map(c => [c.id, c]));

  // Add candidate name and email to each result object
  const enrichedResults = results.map(result => ({
    ...result,
    candidate: {
      name: candidateMap.get(result.candidateId)?.name || 'Unknown Candidate',
      email: candidateMap.get(result.candidateId)?.email || 'N/A',
    }
  }));

  // --- Assemble the Final Summary ---
  
  return {
    assessmentId,
    title: assessmentDetails?.title,
    attemptsCount,
    averageScore: parseFloat((totalScore / attemptsCount).toFixed(2)),
    passedCount,
    failedCount: attemptsCount - passedCount,
    highestScore: Math.max(...scoresAsPercentage),
    lowestScore: Math.min(...scoresAsPercentage),
    results: enrichedResults, // Return the enriched results
  };
};

// In src/mocks/controllers/assessmentControllers.ts

/**
 * Gets all assessment results for a single candidate, enriched with assessment titles.
 * @param {number} candidateId - The ID of the candidate.
 * @returns {Promise<EnrichedAssessmentResult[]>} An array of the candidate's results.
 */

export interface EnrichedAssessmentResult extends AssessmentResult {
  assessmentTitle: string;
}

export const getCandidateResults = async (candidateId: number): Promise<EnrichedAssessmentResult[]> => {
  // 1. Find all results for the given candidate ID using the index.
  const results = await db.assessmentResults.where({ candidateId }).toArray();

  if (results.length === 0) {
    return []; // Return early if the candidate has no results.
  }

  // 2. Efficiently fetch details for all related assessments.
  // Get the unique assessment IDs from the results.
  const assessmentIds = [...new Set(results.map(r => r.assessmentId))];
  
  // Fetch all assessment details in a single database query.
  const assessments = await db.createdAssessments.bulkGet(assessmentIds);
  
  // Create a Map for quick lookups (assessmentId -> title).
  const assessmentTitleMap = new Map(
    assessments.map(a => a ? [a.id, a.title] : [0, ''])
  );

  // 3. Enrich each result with the corresponding assessment title.
  const enrichedResults = results.map(result => ({
    ...result,
    assessmentTitle: assessmentTitleMap.get(result.assessmentId) || 'Unknown Assessment',
  }));

  return enrichedResults;
};



/**
 * Calculates and returns combined statistics for all assessments.
 * @returns {Promise<OverallAssessmentStats>} An object with overall stats.
 */
export const getOverallAssessmentStats = async (): Promise<OverallAssessmentStats> => {
  // 1. Run all database queries in parallel for efficiency
  const [totalTemplates, totalAssignments, allResults] = await Promise.all([
    db.createdAssessments.count(),
    db.assignedAssessments.count(),
    db.assessmentResults.toArray(),
  ]);

  const totalCompletions = allResults.length;

  // 2. Calculate the completion rate, handling division by zero
  const completionRate = totalAssignments > 0
    ? parseFloat(((totalCompletions / totalAssignments) * 100).toFixed(2))
    : 0;

  // 3. Calculate the overall average score
  let overallAverageScore = 0;
  if (totalCompletions > 0) {
    const totalPercentageScore = allResults.reduce((sum, result) => {
      const percentage = (result.score / result.totalQuestions) * 100;
      return sum + percentage;
    }, 0);
    overallAverageScore = parseFloat((totalPercentageScore / totalCompletions).toFixed(2));
  }

  // 4. Assemble and return the final stats object
  return {
    totalTemplates,
    totalAssignments,
    totalCompletions,
    completionRate,
    overallAverageScore,
  };
};

// In src/mocks/controllers/assessmentControllers.ts

/**
 * Updates an existing assessment template.
 * @param {number} assessmentId - The ID of the assessment to update.
 * @param {Partial<CreatedAssessment>} updatedData - The fields to update.
 * @returns {Promise<CreatedAssessment>} The full, updated assessment object.
 */
export const editAssessment = async (assessmentId: number, updatedData: Partial<CreatedAssesment>): Promise<CreatedAssesment> => {
    
    const updatedCount = await db.createdAssessments.update(assessmentId, updatedData);
  
    if (updatedCount === 0) {
      throw new Error(`Assessment with ID ${assessmentId} not found.`);
    }
  
    const updatedAssessment = await db.createdAssessments.get(assessmentId);
    if (!updatedAssessment) {
      throw new Error(`Failed to retrieve updated assessment for ID ${assessmentId}.`);
    }
    
    return updatedAssessment;
};

/**
 * Deletes an assessment template by its ID.
 * @param {number} assessmentId - The ID of the assessment to delete.
 * @returns {Promise<{ success: boolean; id: number }>} A confirmation object.
 */
export const deleteAssessment = async (assessmentId: number): Promise<{ success: boolean; id: number }> => {
  const assessmentToDelete = await db.createdAssessments.get(assessmentId);
  if (!assessmentToDelete) {
    throw new Error(`Assessment with ID ${assessmentId} not found.`);
  }

  await db.createdAssessments.delete(assessmentId);
  
  // You might also want to delete related assignments and results here
  // await db.assignedAssessments.where({ assessmentId }).delete();
  // await db.assessmentResults.where({ assessmentId }).delete();

  return { success: true, id: assessmentId };
};