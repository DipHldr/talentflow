import type { TimelineEvent } from "../types/timeline";

// A helper function to create varied dates, ensuring they are always in the past.
const createDate = (base: Date, daysAgo: number, hour: number) => {
  const newDate = new Date(base);
  newDate.setDate(newDate.getDate() - daysAgo);
  newDate.setHours(hour, Math.floor(Math.random() * 60));
  return newDate;
};

// A list of creators to make the data more realistic
const creators = ["Alice Johnson (HR)", "Bob Williams (HR)", "Charlie Brown (Hiring Manager)"];
const now = new Date(); // Use current date as the baseline for "days ago"

// Base list of events to be populated
const events: Omit<TimelineEvent, 'id'>[] = [];


// Candidate 1: Full flow to Offer
events.push(
  { candidateId: 1, type: 'Applied', title: 'Application Received', details: 'Applied for Pension Scheme Manager.', date: createDate(now, 30, 9), createdBy: 'System' },
  { candidateId: 1, type: 'Status Change', title: 'Moved to Screening', details: 'Resume meets key criteria.', date: createDate(now, 28, 11), createdBy: creators[0] },
  { candidateId: 1, type: 'Assessment', title: 'Technical Assessment Sent', date: createDate(now, 27, 14), createdBy: creators[0] },
  { candidateId: 1, type: 'Interview', title: 'Interview with Hiring Manager', details: 'Scheduled for next Tuesday.', date: createDate(now, 20, 10), createdBy: creators[2] },
  { candidateId: 1, type: 'Offer', title: 'Job Offer Extended', date: createDate(now, 15, 16), createdBy: creators[2] }
);

// Candidate 2: Rejected after assessment
events.push(
  { candidateId: 2, type: 'Applied', title: 'Application Received', details: 'Applied for Telecommunications Researcher.', date: createDate(now, 29, 15), createdBy: 'System' },
  { candidateId: 2, type: 'Assessment', title: 'Skills Assessment Sent', date: createDate(now, 25, 10), createdBy: creators[1] },
  { candidateId: 2, type: 'Status Change', title: 'Application Rejected', details: 'Assessment score did not meet the benchmark.', date: createDate(now, 22, 11), createdBy: 'System' }
);

// Candidate 3: In interview stage
events.push(
  { candidateId: 3, type: 'Applied', title: 'Application Received', date: createDate(now, 28, 10), createdBy: 'System' },
  { candidateId: 3, type: 'Note', title: 'Internal Referral', details: 'Referred by an employee in the arts department.', date: createDate(now, 27, 13), createdBy: creators[0] },
  { candidateId: 3, type: 'Interview', title: 'Initial Screening Call', date: createDate(now, 24, 16), createdBy: creators[0] }
);

// Candidate 4: Withdrawn application
events.push(
  { candidateId: 4, type: 'Applied', title: 'Application Received', date: createDate(now, 27, 11), createdBy: 'System' },
  { candidateId: 4, type: 'Status Change', title: 'Application Withdrawn', details: 'Candidate notified us they accepted another position.', date: createDate(now, 20, 9), createdBy: 'System' }
);

// Candidate 5: In final interview
events.push(
  { candidateId: 5, type: 'Applied', title: 'Application Received', date: createDate(now, 26, 12), createdBy: 'System' },
  { candidateId: 5, type: 'Interview', title: 'Technical Interview', date: createDate(now, 19, 14), createdBy: creators[2] },
  { candidateId: 5, type: 'Interview', title: 'Final Interview with Team', date: createDate(now, 12, 11), createdBy: creators[2] }
);

// Candidate 6: Strong portfolio review
events.push(
  { candidateId: 6, type: 'Applied', title: 'Application Received', date: createDate(now, 25, 13), createdBy: 'System' },
  { candidateId: 6, type: 'Assessment', title: 'Design Portfolio Review', date: createDate(now, 22, 10), createdBy: creators[0] },
  { candidateId: 6, type: 'Note', title: 'Strong Portfolio', details: 'Portfolio shows excellent use of color theory.', date: createDate(now, 20, 15), createdBy: creators[2] },
  { candidateId: 6, type: 'Status Change', title: 'Moved to Interview', date: createDate(now, 19, 17), createdBy: creators[2] }
);

// Candidates 7-15: Basic application entries
for (let i = 7; i <= 15; i++) {
  events.push({ candidateId: i, type: 'Applied', title: 'Application Received', date: createDate(now, 25 - i, 10), createdBy: 'System' });
}

// Candidates 16-25: Applied and Screened
for (let i = 16; i <= 25; i++) {
  events.push({ candidateId: i, type: 'Applied', title: 'Application Received', date: createDate(now, 20 - (i-15), 11), createdBy: 'System' });
  events.push({ candidateId: i, type: 'Status Change', title: 'Moved to Screening', date: createDate(now, 18 - (i-15), 14), createdBy: creators[i % 2] });
}

// Candidates 26-35: Applied, Screened, and Assessment
for (let i = 26; i <= 35; i++) {
  events.push({ candidateId: i, type: 'Applied', title: 'Application Received', date: createDate(now, 15 - (i-25), 12), createdBy: 'System' });
  events.push({ candidateId: i, type: 'Status Change', title: 'Moved to Screening', date: createDate(now, 13 - (i-25), 15), createdBy: creators[i % 2] });
  events.push({ candidateId: i, type: 'Assessment', title: 'Code Challenge Sent', date: createDate(now, 12 - (i-25), 16), createdBy: creators[i % 2] });
}

// Candidates 36-45: Applied, Screened, Assessment, and Interview
for (let i = 36; i <= 45; i++) {
  events.push({ candidateId: i, type: 'Applied', title: 'Application Received', date: createDate(now, 10 - (i-35), 13), createdBy: 'System' });
  events.push({ candidateId: i, type: 'Status Change', title: 'Moved to Screening', date: createDate(now, 8 - (i-35), 9), createdBy: creators[i % 2] });
  events.push({ candidateId: i, type: 'Assessment', title: 'Code Challenge Sent', date: createDate(now, 7 - (i-35), 11), createdBy: creators[i % 2] });
  events.push({ candidateId: i, type: 'Interview', title: 'Initial Screening Call', date: createDate(now, 3 - (i-35), 14), createdBy: creators[0] });
}

// Add a few more specific notes to make it feel real
events.push({ candidateId: 12, type: 'Note', title: 'Follow-up Email Received', details: 'Candidate inquired about application status.', date: createDate(now, 10, 14), createdBy: creators[0] });
events.push({ candidateId: 29, type: 'Status Change', title: 'On Hold', details: 'Position is on hold pending budget approval.', date: createDate(now, 5, 11), createdBy: creators[1] });
events.push({ candidateId: 40, type: 'Status Change', title: 'Application Withdrawn', details: 'Candidate accepted another offer.', date: createDate(now, 2, 9), createdBy: 'System' });

// Final export, sorting by date to be safe although constructed chronologically
export const mockTimelineEvents: Omit<TimelineEvent, 'id'>[] = events.sort((a, b) => b.date.getTime() - a.date.getTime());
