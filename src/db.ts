import Dexie, { type Table } from "dexie";
import type { Job,JobApplication } from "./mocks/types/jobs1.ts";
import type { Candidate } from "./mocks/types/candidates.ts";
import type { TestQuestion } from "./mocks/types/assesment.ts";
import type { AssessmentResult, CreatedAssesment,AssignedAssessment } from "./mocks/types/assesment.ts";
import type { TimelineEvent } from "./mocks/types/timeline.ts";

// Import your mock seed data
import { jobsData } from "./mocks/data/jobsData.ts"; // Assuming you renamed the exported data
import { candidates } from "./mocks/data/candidates.ts";
import { questionPool } from "./mocks/data/assesments.ts";
import { demoAssessments } from "./mocks/data/demoAssesmentData.ts";
import {moreMockAssessmentResults} from "./mocks/data/results.ts";
import { jobApplicationsData } from "./mocks/data/jobApplicationsData.ts";
import {mockTimelineEvents} from "./mocks/data/timelineData.ts";

//Defining Database Class
export class AppDB extends Dexie {
  // MODIFIED: The second generic argument is the type of the primary key.
  jobs!: Table<Job, string>;
  candidates!: Table<Candidate, number>;
  questions!: Table<TestQuestion, string>;
  createdAssessments!: Table<CreatedAssesment, number>;
  assessmentResults!: Table<AssessmentResult, number>;
  assignedAssessments!: Table<AssignedAssessment, [number, number]>;
  jobApplications!: Table<JobApplication, number>;
  timelineEvents!: Table<TimelineEvent, number>;

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

      jobApplications: "++id, candidateId, jobId, [candidateId+jobId]",
      timelineEvents: '++id, candidateId, date', 

    });

    //Seeding DB here
    this.seedData();
  }

  // Seeding Data if DB empty
  async seedData() {
    // Using Promise.all for more efficient parallel checks
    const [
      jobsCount,
      candidatesCount,
      questionsCount,
      createdAssessmentsCount, 
      resultsCount,
      jobApplicationsCount,
      timelineEventsCount ] = await Promise.all([
      this.jobs.count(),
      this.candidates.count(),
      this.questions.count(),
      this.createdAssessments.count(),
      this.assessmentResults.count(),
      this.jobApplications.count(),
      this.timelineEvents.count(),
    ]);

    if (jobsCount === 0) {
      // Using the larger jobsData export
      await this.jobs.bulkAdd(jobsData);
    }

    if (candidatesCount === 0) {
      await this.candidates.bulkAdd(candidates);
    }

    if (questionsCount === 0) {
      await this.questions.bulkAdd(questionPool);
    }


    if (createdAssessmentsCount === 0) {
      await this.createdAssessments.bulkPut(demoAssessments);
    }

    if (resultsCount === 0) {
      await this.assessmentResults.bulkPut(moreMockAssessmentResults);
    }

    if (jobApplicationsCount === 0) {
    await this.jobApplications.bulkAdd(jobApplicationsData);
    }

    if (timelineEventsCount === 0) {
      await this.timelineEvents.bulkAdd(mockTimelineEvents);
    }
  }
}

//Exporting a single instance for app-wide use
export const db = new AppDB();