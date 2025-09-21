import Dexie, { type Table } from "dexie";
import type { Job } from "./mocks/types/jobs.ts";
import type { Candidate } from "./mocks/types/candidates.ts";

// Import your mock seed data
import { jobs } from "./mocks/data/jobs.ts";
import { candidates } from "./mocks/data/candidates.ts";
console.log('Candidates length: ',candidates.length)

//Defining Database Class
export class AppDB extends Dexie {
  jobs!: Table<Job, number>;
  candidates!: Table<Candidate, number>;

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
    });

    //Seeding DB here
    this.seedData();
  }

  // Seeding Data if DB empty
  async seedData() {
    const jobsCount = await this.jobs.count();
    const candidatesCount = await this.candidates.count();

    if (jobsCount === 0) {
      await this.jobs.bulkAdd(jobs);
    }

    if (candidatesCount === 0) {
      
      await this.candidates.bulkAdd(candidates);
    }
  }
}

//Exporting a single instance for app-wide use
export const db = new AppDB();
