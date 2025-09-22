export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  position: string;
  location: string;
  experience: string;
  skills: string[];
  status: 'active' | 'inactive' | 'interviewing' | 'hired';
  joinedDate: string;
}

export interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'interview' | 'offered';
  salary?: string;
  location: string;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'technical' | 'behavioral' | 'cognitive' | 'personality';
  assignedDate: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  score?: number;
  maxScore?: number;
  duration: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'application' | 'assessment' | 'interview' | 'status_change' | 'note';
  status?: string;
}