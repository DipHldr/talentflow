export interface Job {
  id: number;
  title: string;
  description: string;
  company: string;        
  location?: string;      
  salary?: string;        
  status: "open" | "closed";
  tags?: string[];        
  postedAt: string;
}

export interface PaginatedJobsResponse {
  data: Job[];
  total: number;
  page: number;
  pageSize: number;
}
