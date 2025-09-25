import type { JobApplication } from "../types/jobs1";

export const jobApplicationsData: JobApplication[] = [
  // Candidate 1 (3 applications)
  { candidateId: 1, jobId: '1', appliedDate: new Date('2025-09-16T10:00:00Z'), status: 'Interview' },
  { candidateId: 1, jobId: '10', appliedDate: new Date('2025-09-18T11:30:00Z'), status: 'Screening' },
  { candidateId: 1, jobId: '19', appliedDate: new Date('2025-09-20T09:00:00Z'), status: 'Applied' },

  // Candidate 2 (1 application)
  { candidateId: 2, jobId: '2', appliedDate: new Date('2025-09-13T14:00:00Z'), status: 'Screening' },

  // Candidate 3 (1 application)
  { candidateId: 3, jobId: '3', appliedDate: new Date('2025-09-11T09:15:00Z'), status: 'Rejected' },

  // Candidate 4 (2 applications)
  { candidateId: 4, jobId: '4', appliedDate: new Date('2025-09-10T16:45:00Z'), status: 'Offer' },
  { candidateId: 4, jobId: '9', appliedDate: new Date('2025-09-15T12:00:00Z'), status: 'Applied' },

  // Candidate 5 (1 application)
  { candidateId: 5, jobId: '5', appliedDate: new Date('2025-09-06T18:20:00Z'), status: 'Hired' },

  // Candidate 6 (2 applications)
  { candidateId: 6, jobId: '6', appliedDate: new Date('2025-09-21T08:00:00Z'), status: 'Applied' },
  { candidateId: 6, jobId: '24', appliedDate: new Date('2025-09-22T10:10:00Z'), status: 'Screening' },
  
  // Candidate 7 (1 application)
  { candidateId: 7, jobId: '7', appliedDate: new Date('2025-09-19T13:00:00Z'), status: 'Interview' },
  
  // Candidate 8 (1 application)
  { candidateId: 8, jobId: '8', appliedDate: new Date('2025-09-23T11:00:00Z'), status: 'Applied' },

  // Candidate 9 (2 applications)
  { candidateId: 9, jobId: '9', appliedDate: new Date('2025-09-15T17:00:00Z'), status: 'Screening' },
  { candidateId: 9, jobId: '1', appliedDate: new Date('2025-09-17T15:00:00Z'), status: 'Applied' },
  
  // Candidate 10 (1 application)
  { candidateId: 10, jobId: '10', appliedDate: new Date('2025-09-12T09:30:00Z'), status: 'Rejected' },
  
  // --- More candidates with single/multiple applications ---

  { candidateId: 11, jobId: '11', appliedDate: new Date('2025-09-19T10:00:00Z'), status: 'Applied' },
  { candidateId: 12, jobId: '12', appliedDate: new Date('2025-09-17T16:00:00Z'), status: 'Interview' },
  { candidateId: 13, jobId: '13', appliedDate: new Date('2025-09-14T11:00:00Z'), status: 'Screening' },
  { candidateId: 14, jobId: '14', appliedDate: new Date('2025-09-22T08:30:00Z'), status: 'Applied' },
  { candidateId: 15, jobId: '15', appliedDate: new Date('2025-09-23T14:50:00Z'), status: 'Applied' },
  
  // Candidate 16 (2 applications)
  { candidateId: 16, jobId: '16', appliedDate: new Date('2025-09-10T10:20:00Z'), status: 'Rejected' },
  { candidateId: 16, jobId: '22', appliedDate: new Date('2025-09-11T13:00:00Z'), status: 'Rejected' },
  
  { candidateId: 17, jobId: '17', appliedDate: new Date('2025-09-18T12:00:00Z'), status: 'Offer' },
  { candidateId: 18, jobId: '18', appliedDate: new Date('2025-09-20T17:00:00Z'), status: 'Screening' },
  
  // Candidate 19 (2 applications)
  { candidateId: 19, jobId: '19', appliedDate: new Date('2025-09-08T10:00:00Z'), status: 'Applied' },
  { candidateId: 19, jobId: '1', appliedDate: new Date('2025-09-16T14:00:00Z'), status: 'Screening' },

  { candidateId: 20, jobId: '20', appliedDate: new Date('2025-09-05T15:00:00Z'), status: 'Interview' },
  
  // Candidate 21 (3 applications)
  { candidateId: 21, jobId: '21', appliedDate: new Date('2025-09-24T09:00:00Z'), status: 'Applied' },
  { candidateId: 21, jobId: '3', appliedDate: new Date('2025-09-12T11:00:00Z'), status: 'Screening' },
  { candidateId: 21, jobId: '7', appliedDate: new Date('2025-09-20T16:00:00Z'), status: 'Interview' },

  { candidateId: 22, jobId: '22', appliedDate: new Date('2025-09-03T10:00:00Z'), status: 'Hired' },
  { candidateId: 23, jobId: '23', appliedDate: new Date('2025-09-02T13:20:00Z'), status: 'Applied' },
  { candidateId: 24, jobId: '24', appliedDate: new Date('2025-08-31T11:00:00Z'), status: 'Rejected' },
  { candidateId: 25, jobId: '25', appliedDate: new Date('2025-08-29T14:00:00Z'), status: 'Screening' },

  // Candidate 26 (2 applications)
  { candidateId: 26, jobId: '1', appliedDate: new Date('2025-09-16T09:00:00Z'), status: 'Screening' },
  { candidateId: 26, jobId: '6', appliedDate: new Date('2025-09-22T12:30:00Z'), status: 'Applied' },

  { candidateId: 27, jobId: '2', appliedDate: new Date('2025-09-14T10:00:00Z'), status: 'Applied' },

  // Candidate 28 (2 applications)
  { candidateId: 28, jobId: '8', appliedDate: new Date('2025-09-24T10:00:00Z'), status: 'Applied' },
  { candidateId: 28, jobId: '17', appliedDate: new Date('2025-09-19T11:00:00Z'), status: 'Rejected' },
  
  { candidateId: 29, jobId: '14', appliedDate: new Date('2025-09-22T15:00:00Z'), status: 'Screening' },
  { candidateId: 30, jobId: '15', appliedDate: new Date('2025-09-24T11:25:00Z'), status: 'Applied' },
  { candidateId: 31, jobId: '4', appliedDate: new Date('2025-09-09T16:00:00Z'), status: 'Interview' },
  { candidateId: 32, jobId: '5', appliedDate: new Date('2025-09-07T10:45:00Z'), status: 'Screening' },
  { candidateId: 33, jobId: '18', appliedDate: new Date('2025-09-21T14:15:00Z'), status: 'Applied' },

  // Candidate 34 (2 applications)
  { candidateId: 34, jobId: '1', appliedDate: new Date('2025-09-18T10:00:00Z'), status: 'Applied' },
  { candidateId: 34, jobId: '20', appliedDate: new Date('2025-09-06T13:00:00Z'), status: 'Rejected' },
  
  { candidateId: 35, jobId: '12', appliedDate: new Date('2025-09-17T14:00:00Z'), status: 'Applied' },
  
  // Extra applications for earlier candidates to add more data points
  { candidateId: 2, jobId: '7', appliedDate: new Date('2025-09-21T18:00:00Z'), status: 'Applied' },
  { candidateId: 5, jobId: '12', appliedDate: new Date('2025-09-18T09:00:00Z'), status: 'Screening' },
  { candidateId: 10, jobId: '15', appliedDate: new Date('2025-09-25T10:00:00Z'), status: 'Applied' },
  { candidateId: 15, jobId: '10', appliedDate: new Date('2025-09-14T08:45:00Z'), status: 'Interview' },
];