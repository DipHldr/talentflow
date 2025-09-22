// src/mocks/controllers/assessmentControllers.ts
import { db } from '../../db';
import type {
    CreatedAssesment,
    AssessmentResult,
    AssessmentRequest,
    AssessmentSubmission,
    TestQuestion,
    AssessmentSummary } from '../types/assesment.ts';

import type {CandidateIdentifier} from '../types/candidates.ts';


export const getCandidateById = async (id: number) => {
  const candidate = await db.candidates.get(id);
  if (!candidate) {
    throw new Error("Candidate not found");
  }
  return candidate;
};

// For HR to create/save an assessment for a job
export const createAssessment = async (request: AssessmentRequest): Promise<CreatedAssesment> => {
  const { jobId,title, topics, numberOfQuestions } = request;

  // 1. Fetch all questions that match the provided topics.
  // The .anyOf() method is highly efficient for this type of query.
  const questionPool = await db.questions
    .where('category')
    .anyOf(topics)
    .toArray();

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
  const newAssessment: CreatedAssesment = {
    jobId,
    title,
    topics,
    numberOfQuestions,
    questionIds: selectedQuestionIds,
  };

  // 6. Save ('put') the complete assessment object to the database.
  await db.createdAssessments.put(newAssessment);

  // 7. Return the created assessment.
  return newAssessment;
};


// For a candidate to submit their results
/**
 * Securely scores and saves a candidate's assessment submission.
 * @param {AssessmentSubmission} submission - The raw answers submitted by the candidate.
 * @returns {Promise<Omit<AssessmentResult, 'id'>>} The final, scored assessment result.
 */

export const submitAssessment = async (submission: AssessmentSubmission) => {
  const { jobId, candidateId, answers } = submission;

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
    jobId,
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
export const getAssignedAssessments = async (identifier: CandidateIdentifier) => {
  const { candidateId, email } = identifier;

  // 1. Find the candidate by either ID or email.
  let candidate;
  if (candidateId) {
    candidate = await db.candidates.get(candidateId);
  } else if (email) {
    // .where() is used for indexed fields, making this lookup fast.
    candidate = await db.candidates.where('email').equals(email).first();
  }

  // If no candidate is found or they haven't applied to a job, return empty.
  if (!candidate || !candidate.appliedJobId) {
    return [];
  }

  // 2. Check if an assessment exists for the job the candidate applied for.
  const assessment = await db.createdAssessments.get(candidate.appliedJobId);
  if (!assessment) {
    return [];
  }

  // 3. CRUCIAL: Check if the candidate has already submitted a result for this assessment.
  const existingResult = await db.assessmentResults
    .where({
      jobId: candidate.appliedJobId,
      candidateId: candidate.id,
    })
    .first(); // We only need to know if at least one result exists.

  // If a result already exists, they've completed it. Return empty.
  if (existingResult) {
    return [];
  }

  // 4. If an assessment exists and is not completed, return it inside an array.
  return [assessment];
};

// For HR to see a summary of attempts for an assessment
/**
 * Generates an analytics summary for all attempts of a specific assessment.
 * @param {number} jobId - The ID of the job's assessment.
 * @param {number} [passingThreshold=0.7] - The score required to pass (e.g., 0.7 for 70%).
 * @returns {Promise<AssessmentSummary>} An object with detailed analytics.
 */
export const getAssessmentSummary = async (jobId: number, passingThreshold = 0.7) => {
  // 1. Fetch all result records for this job's assessment.
  const results = await db.assessmentResults.where({ jobId }).toArray();

  const attemptsCount = results.length;

  // If no one has taken the assessment yet, return a default summary.
  if (attemptsCount === 0) {
    return {
      jobId,
      attemptsCount: 0,
      averageScore: 0,
      passedCount: 0,
      failedCount: 0,
      highestScore: 0,
      lowestScore: 0,
      results: [],
    };
  }

  // 2. Calculate the percentage score for each attempt.
  const scoresAsPercentage = results.map(
    (r) => (r.score / r.totalQuestions) * 100
  );

  // 3. Calculate the analytics.
  const totalScore = scoresAsPercentage.reduce((sum, score) => sum + score, 0);
  const averageScore = parseFloat((totalScore / attemptsCount).toFixed(2));
  const highestScore = Math.max(...scoresAsPercentage);
  const lowestScore = Math.min(...scoresAsPercentage);
  
  const passedCount = results.filter(
    (r) => r.score / r.totalQuestions >= passingThreshold
  ).length;

  const failedCount = attemptsCount - passedCount;

  // 4. Assemble and return the complete summary object.
  const summary: AssessmentSummary = {
    jobId,
    attemptsCount,
    averageScore,
    passedCount,
    failedCount,
    highestScore,
    lowestScore,
    results, // Include the raw results for detailed viewing
  };

  return summary;
};