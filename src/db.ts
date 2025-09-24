import Dexie, { type Table } from "dexie";
import type { Job } from "./mocks/types/jobs1.ts";
import type { Candidate } from "./mocks/types/candidates.ts";
import type { TestQuestion } from "./mocks/types/assesment.ts";
import type { AssessmentResult, CreatedAssesment } from "./mocks/types/assesment.ts";

// Import your mock seed data
import { jobsData } from "./mocks/data/jobsData.ts"; // Assuming you renamed the exported data
import { candidates } from "./mocks/data/candidates.ts";
import { questionPool } from "./mocks/data/assesments.ts";

//Defining Database Class
export class AppDB extends Dexie {
  // MODIFIED: The second generic argument is the type of the primary key.
  jobs!: Table<Job, string>;
  candidates!: Table<Candidate, number>;
  questions!: Table<TestQuestion, string>;
  createdAssessments!: Table<CreatedAssesment, number>;
  assessmentResults!: Table<AssessmentResult, number>;

  constructor() {
    super("TalentflowDB");

    // Defining schema (tables + indexes)
    this.version(1).stores({
      // MODIFIED: 'id' is now the string primary key. Added indexes for searching and sorting.
      jobs: "id, title, company, postedDate",

      // Using a non-unique index on email for mock data flexibility
      candidates: `++id, name, email, appliedJobId, stage`,

      // Index on category for filtering questions
      questions: "id, &category",

      createdAssessments: "jobId", // 'jobId' is the unique primary key

      // Compound index for efficient lookups
      assessmentResults: "++id, [jobId+candidateId]",
    });

    //Seeding DB here
    this.seedData();
  }

  // Seeding Data if DB empty
  async seedData() {
    // Using Promise.all for more efficient parallel checks
    const [jobsCount, candidatesCount, questionsCount] = await Promise.all([
      this.jobs.count(),
      this.candidates.count(),
      this.questions.count()
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
  }
}

//Exporting a single instance for app-wide use
export const db = new AppDB();