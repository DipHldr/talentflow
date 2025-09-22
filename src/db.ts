import Dexie, { type Table } from "dexie";
import type { Job } from "./mocks/types/jobs.ts";
import type { Candidate } from "./mocks/types/candidates.ts";
import type { TestQuestion } from "./mocks/types/assesment.ts"; // Adjust path if needed
import type {AssessmentResult,CreatedAssesment} from "./mocks/types/assesment.ts";

// Import your mock seed data
import { jobs } from "./mocks/data/jobs.ts";
import { candidates } from "./mocks/data/candidates.ts";
import { questionPool } from "./mocks/data/assesments.ts"; // Adjust path if needed
console.log('Candidates length: ',candidates.length)

//Defining Database Class
export class AppDB extends Dexie {
  jobs!: Table<Job, number>;
  candidates!: Table<Candidate, number>;
  questions!: Table<TestQuestion, string>;
  createdAssessments!: Table<CreatedAssesment, number>;   
  assessmentResults!: Table<AssessmentResult, number>; 

  constructor() {
    super("TalentflowDB");

    // Defining schema (tables + indexes)
    this.version(1).stores({
      jobs: "++id, title, company, status, postedAt",
      candidates: `++id, name, email, appliedJobId, stage,
               portfolio_headline, portfolio_summary, portfolio_skills,
               portfolio_experience, portfolio_school, portfolio_degree,
               portfolio_year, portfolio_github, portfolio_linkedin,
               portfolio_website, portfolio_avatar`,
      questions: "id, category",
       // Define schema for the new tables
      createdAssessments: "jobId", // 'jobId' is the unique primary key
      assessmentResults: "++id, jobId, candidateId", // Auto-incrementing key, with indexes on jobId and candidateId

    });

    //Seeding DB here
    this.seedData();
  }

  // Seeding Data if DB empty
  async seedData() {
    const jobsCount = await this.jobs.count();
    const candidatesCount = await this.candidates.count();

    if (jobsCount === 0) {
      console.log('Seeding jobs pool...');
      await this.jobs.bulkAdd(jobs);
    }

    if (candidatesCount === 0) {
      console.log('Seeding candidates pool...');
      await this.candidates.bulkAdd(candidates);
    }

    const questionsCount = await this.questions.count();
    if (questionsCount === 0) {
        console.log('Seeding assessment question pool...');
        await this.questions.bulkAdd(questionPool);
    }
  }
}

//Exporting a single instance for app-wide use
export const db = new AppDB();
