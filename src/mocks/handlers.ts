import { http, HttpResponse } from "msw";
import {getJobs} from './controllers/jobControllers.ts';
import type {Job,PaginatedJobsResponse} from './types/jobs.ts';
import { getCandidates } from "./controllers/candidateControllers.ts";

export const handlers = [
  http.get("/api/jobs", async({request}) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const sort = (url.searchParams.get("sort") as "asc" | "desc") || "asc";

    const response:PaginatedJobsResponse=await getJobs({search,status,page,pageSize,sort});

    return HttpResponse.json<PaginatedJobsResponse>(response)

  }),
    http.get("/api/candidates", async ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search") || "";
    const stage = url.searchParams.get("stage") || "";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    const response = await getCandidates({ search, stage, page, pageSize });

    return HttpResponse.json(response);
  }),

  
];
