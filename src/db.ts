import Dexie, { type Table } from "dexie";
import type { Job } from "./mocks/types/jobs1.ts";
import type { Candidate } from "./mocks/types/candidates.ts";
import type { TestQuestion } from "./mocks/types/assesment.ts";
import type { AssessmentResult, CreatedAssesment,AssignedAssessment } from "./mocks/types/assesment.ts";

// Import your mock seed data
import { jobsData } from "./mocks/data/jobsData.ts"; // Assuming you renamed the exported data
import { candidates } from "./mocks/data/candidates.ts";
import { questionPool } from "./mocks/data/assesments.ts";
import { demoAssessments } from "./mocks/data/demoAssesmentData.ts";
import {moreMockAssessmentResults} from "./mocks/data/results.ts";
//Defining Database Class
export class AppDB extends Dexie {
  // MODIFIED: The second generic argument is the type of the primary key.
  jobs!: Table<Job, string>;
  candidates!: Table<Candidate, number>;
  questions!: Table<TestQuestion, string>;
  createdAssessments!: Table<CreatedAssesment, number>;
  assessmentResults!: Table<AssessmentResult, number>;
  assignedAssessments!: Table<AssignedAssessment, [number, number]>;

  constructor() {
    super("TalentflowDB");

    // Defining schema (tables + indexes)
    this.version(1).stores({
      // MODIFIED: 'id' is now the string primary key. Added indexes for searching and sorting.
      jobs: "id, title, company, postedDate",

      // Using a non-unique index on email for mock data flexibility
      candidates: `++id, name, email, appliedJobId, stage`,

      // Index on category for filtering questions
      questions: "id, category",

      createdAssessments: "++id, title", // 'id' is the unique primary key

      // Compound index for efficient lookups
      assessmentResults: "++id, [candidateId+assessmentId]",
      assignedAssessments: "[candidateId+assessmentId]",
    });

    //Seeding DB here
    this.seedData();
  }

  // Seeding Data if DB empty
  async seedData() {
    // Using Promise.all for more efficient parallel checks
    const [jobsCount, candidatesCount, questionsCount,createdAssessmentsCount, 
      resultsCount] = await Promise.all([
      this.jobs.count(),
      this.candidates.count(),
      this.questions.count(),
      this.createdAssessments.count(),
      this.assessmentResults.count()
    ]);

    if (jobsCount === 0) {
      console.log('Seeding jobs pool...');
      // Using the larger jobsData export
      await this.jobs.bulkAdd(jobsData);
    }

    if (candidatesCount === 0) {
      console.log('Seeding candidates pool...');
      await this.candidates.bulkAdd(candidates);
    }

    if (questionsCount === 0) {
      console.log('Seeding assessment question pool...');
      await this.questions.bulkAdd(questionPool);
    }


    if (createdAssessmentsCount === 0) {
      console.log('Seeding created assessments...');
      await this.createdAssessments.bulkPut(demoAssessments);
    }

    if (resultsCount === 0) {
      console.log('Seeding assessment results...');
      await this.assessmentResults.bulkPut(moreMockAssessmentResults);
    }
  }
}

//Exporting a single instance for app-wide use
export const db = new AppDB();