export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  experience: 'entry' | 'mid' | 'senior' | 'lead';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
  department: string;
  companyLogo?: string;
}

export interface JobFilters {
  type: string[];
  experience: string[];
  location: string;
  salaryMin: number;
  salaryMax: number;
  department: string[];
}

export interface PaginatedJobsResponse {
  data: Job[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateJobData {
  title: string;
  company: string;
  location?: string;
  type?: 'full-time' | 'part-time' | 'contract' | 'remote';
  experience: 'entry' | 'mid' | 'senior' | 'lead';
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  deadline?: string;
  department?: string;
}