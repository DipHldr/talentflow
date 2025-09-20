import type { Job,PaginatedJobsResponse } from "../types/jobs.ts";
import { db } from "../../db.ts";



export async function getJobs({
  search = "",
  status = "",
  page = 1,
  pageSize = 10,
  sort = "asc",
}: {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
  sort?: "asc" | "desc";
}): Promise<PaginatedJobsResponse> {

  // Load jobs from IndexedDB
  let jobs: Job[] = await db.jobs.toArray();
  const lowerSearch = search.toLowerCase();

  // Filter jobs
  let filtered: Job[] = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(lowerSearch) ||
      job.description.toLowerCase().includes(lowerSearch) ||
      job.company.toLowerCase().includes(lowerSearch);
    const matchesStatus = status ? job.status === status : true;
    return matchesSearch && matchesStatus;
  });

  // Sort
 filtered.sort((a, b) => {
  if (sort === "asc") {
    return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime();
  } else {
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  }
});

  // Paginate
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return {
    data: paginated,
    total: filtered.length,
    page,
    pageSize,
  };
}

