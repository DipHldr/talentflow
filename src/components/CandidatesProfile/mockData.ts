import type { JobApplication, Assessment, TimelineEvent } from './mockType';

export const mockJobApplications: JobApplication[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    appliedDate: '2024-01-15',
    status: 'interview',
    salary: '$95,000 - $120,000',
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    jobTitle: 'React Developer',
    company: 'StartupXYZ',
    appliedDate: '2024-01-10',
    status: 'shortlisted',
    salary: '$80,000 - $100,000',
    location: 'Remote'
  },
  {
    id: '3',
    jobTitle: 'Full Stack Developer',
    company: 'Digital Solutions LLC',
    appliedDate: '2024-01-08',
    status: 'reviewing',
    salary: '$75,000 - $95,000',
    location: 'New York, NY'
  },
  {
    id: '4',
    jobTitle: 'UI/UX Developer',
    company: 'Creative Agency',
    appliedDate: '2024-01-05',
    status: 'rejected',
    salary: '$70,000 - $90,000',
    location: 'Los Angeles, CA'
  }
];

export const mockAssessments: Assessment[] = [
  {
    id: '1',
    title: 'React.js Technical Assessment',
    type: 'technical',
    assignedDate: '2024-01-16',
    dueDate: '2024-01-20',
    status: 'completed',
    score: 85,
    maxScore: 100,
    duration: '2 hours'
  },
  {
    id: '2',
    title: 'Problem Solving Skills Test',
    type: 'cognitive',
    assignedDate: '2024-01-12',
    dueDate: '2024-01-18',
    status: 'completed',
    score: 92,
    maxScore: 100,
    duration: '1 hour'
  },
  {
    id: '3',
    title: 'Leadership Assessment',
    type: 'behavioral',
    assignedDate: '2024-01-14',
    dueDate: '2024-01-21',
    status: 'in_progress',
    duration: '45 minutes'
  },
  {
    id: '4',
    title: 'Personality Evaluation',
    type: 'personality',
    assignedDate: '2024-01-10',
    dueDate: '2024-01-17',
    status: 'overdue',
    duration: '30 minutes'
  }
];

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'Profile Created',
    description: 'Candidate profile was created and added to the system',
    date: '2024-01-01',
    type: 'status_change'
  },
  {
    id: '2',
    title: 'Applied to Senior Frontend Developer',
    description: 'Submitted application for Senior Frontend Developer position at TechCorp Inc.',
    date: '2024-01-15',
    type: 'application',
    status: 'Applied'
  },
  {
    id: '3',
    title: 'Technical Assessment Assigned',
    description: 'React.js Technical Assessment was assigned for TechCorp Inc. position',
    date: '2024-01-16',
    type: 'assessment'
  },
  {
    id: '4',
    title: 'Assessment Completed',
    description: 'Successfully completed React.js Technical Assessment with score of 85/100',
    date: '2024-01-18',
    type: 'assessment',
    status: 'Completed'
  },
  {
    id: '5',
    title: 'Interview Scheduled',
    description: 'First round technical interview scheduled for January 25th',
    date: '2024-01-19',
    type: 'interview',
    status: 'Scheduled'
  },
  {
    id: '6',
    title: 'Status Updated',
    description: 'Application status changed to "Interview Stage"',
    date: '2024-01-19',
    type: 'status_change',
    status: 'Interview Stage'
  }
];