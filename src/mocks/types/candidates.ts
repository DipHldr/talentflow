// export interface Candidate {
//   id: number;             // unique identifier
//   name: string;           // candidate's full name
//   email: string;          // candidate's email
//   appliedJobId: number;   // reference to the job they applied to
//   stage: "applied" | "interview" | "hired" | "rejected"; // current stage in hiring
// }

// interface Education {
//   school: string;
//   degree: string;
//   year: number;
// }

// interface Portfolio {
//   headline: string;
//   summary: string;
//   skills: string[];
//   projects: any[];      // refine later if you have a project structure
//   experience: any[];    // same here for experience details
//   education: Education[];
//   github: string;
//   linkedin: string;
//   website: string;
//   avatar: string;
// }

// export interface Candidate {
//   id: number;
//   name: string;
//   email: string;
//   appliedJobId: number;
//   stage: "applied" | "interview" | "hired" | "rejected"; // union type for stages
//   portfolio: Portfolio;
// }

export interface Candidate {
  id: number;
  name: string;
  email: string;
  appliedJobId: number;
  stage: string;

  // Portfolio fields
  portfolio_headline: string;
  portfolio_summary: string;
  portfolio_skills: string[];
  portfolio_experience: number; // you can use number of years or count of experience items
  portfolio_school: string;
  portfolio_degree: string;
  portfolio_year: number;
  portfolio_github: string;
  portfolio_linkedin: string;
  portfolio_website: string;
  portfolio_avatar: string;
}

export interface PaginatedCandidatesResponse {
  total: number;           // total number of candidates matching the filters
  page: number;            // current page number
  pageSize: number;        // number of items per page
  data: Candidate[];       // array of candidates for this page
}

export interface CandidateIdentifier {
  candidateId?: number;
  email?: string;
}