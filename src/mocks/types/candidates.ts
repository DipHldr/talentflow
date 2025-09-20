export interface Candidate {
  id: number;             // unique identifier
  name: string;           // candidate's full name
  email: string;          // candidate's email
  appliedJobId: number;   // reference to the job they applied to
  stage: "applied" | "interview" | "hired" | "rejected"; // current stage in hiring
}