import { http, HttpResponse } from "msw";
import {getJobs,createJob,deleteJob,editJob} from './controllers/jobControllers.ts';
import type {Job,PaginatedJobsResponse} from './types/jobs1.ts';
import { getCandidates } from "./controllers/candidateControllers.ts";

import { 
  createAssessment,
  submitAssessment,
  getAssignedAssessments,
  getAssessmentSummary,
  getCandidateById } from "./controllers/assesmentControllers";
import type {
   AssessmentRequest,
   CreatedAssesment,
   AssessmentSubmission } from "./types/assesment";



export const handlers = [
  //Handler for fetching jobs
  http.get("/api/jobs", async({request}) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search") || "";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const sort = (url.searchParams.get("sort") as "asc" | "desc") || "asc";

    const response:PaginatedJobsResponse=await getJobs({search,page,pageSize,sort});

    return HttpResponse.json<PaginatedJobsResponse>(response);

  }),
  //Handler for fetching candidates
    http.get("/api/candidates", async ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search") || "";
    const stage = url.searchParams.get("stage") || "";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    const response = await getCandidates({ search, stage, page, pageSize });

    return HttpResponse.json(response);
  }),
  // Handler for creating an assessment
  http.post("/api/assessments/create", async ({ request }) => {
    try {
      // Getting the request body (title, topics, etc.)
      const assessmentRequest = await request.json() as AssessmentRequest;

      // Callaing the  actual database logic from the controller
      const newAssessment = await createAssessment(assessmentRequest);

      // Returning newly created assessment with a 201 status
      return HttpResponse.json<CreatedAssesment>(newAssessment, { status: 201 });

    } catch (error: any) {
      // If createAssessment throws an error (e.g., not enough questions), return a 400 error
      return HttpResponse.json({ message: error.message }, { status: 400 });
    }
  }),
   // Handler for a candidate to submit their answers
  http.post("/api/assessments/submit", async ({ request }) => {
    try {
      const submission = await request.json() as AssessmentSubmission;
      const result = await submitAssessment(submission);
      return HttpResponse.json(result, { status: 200 });
    } catch (error: any) {
      return HttpResponse.json({ message: "Failed to submit assessment." }, { status: 500 });
    }
  }),

  // Handler for a candidate to see their assigned assessments
  http.get("/api/assessments/assigned", async ({ request }) => {

    try {
      const url = new URL(request.url);
    const email = url.searchParams.get("email");
    const candidateIdParam = url.searchParams.get("candidateId");

    if (!email && !candidateIdParam) {
      return HttpResponse.json(
        { message: "Either candidateId or email must be provided." },
        { status: 400 }
      );
    }

    const identifier = {
      email: email ?? undefined,
      candidateId: candidateIdParam ? parseInt(candidateIdParam, 10) : undefined,
    };

    if(!identifier.email && !identifier.candidateId)throw Error('no identifier');

    const assessments = await getAssignedAssessments(identifier);
    return HttpResponse.json(assessments,{status:200});
      
    } catch (error) {
      if(error  instanceof Error){
        return HttpResponse.json({message:error.message},{status:401});
      }else{
        console.log(error);
      }
    }
    
  }),

  // Handler for HR to see an assessment's analytics summary
  http.get("/api/assessments/:jobId/summary", async ({ params }) => {
    const { jobId } = params;

    if (!jobId) {
      return HttpResponse.json({ message: "Job ID is required." }, { status: 400 });
    }

    const summary = await getAssessmentSummary(Number(jobId));
    return HttpResponse.json(summary);
  }),

  // ... inside the handlers array
http.get("/api/candidates/:candidateId", async ({ params }) => {
  const { candidateId } = params;
  try {
    const candidate = await getCandidateById(Number(candidateId));
    return HttpResponse.json(candidate);
  } catch (error: any) {
    return HttpResponse.json({ message: error.message }, { status: 404 });
  }
}),

  http.post("/api/jobs", async ({ request }) => {
    try {
      // 1. Get the form data from the request body
      const jobData = await request.json() as Job;

      // 2. Call the controller to handle the database logic
      const newJob = await createJob(jobData);

      // 3. Return the newly created job with a 201 status
      return HttpResponse.json(newJob, { status: 201 });

    } catch (error: any) {
      console.error("Failed to create job:", error);
      return HttpResponse.json({ message: "Failed to create job on the server." }, { status: 500 });
    }
  }),

  http.put("/api/jobs/:jobId", async ({ params, request }) => {
    const { jobId } = params;
    try {
      const updatedData = await request.json() as Partial<Job>;
      const updatedJob = await editJob(String(jobId), updatedData);
      return HttpResponse.json(updatedJob, { status: 200 });
    } catch (error: any) {
      return HttpResponse.json({ message: error.message }, { status: 404 }); // 404 if not found
    }
  }),

  // Handler for deleting a job
  http.delete("/api/jobs/:jobId", async ({ params }) => {
    const { jobId } = params;
    try {
      const result = await deleteJob(String(jobId));
      return HttpResponse.json(result, { status: 200 });
    } catch (error: any) {
      return HttpResponse.json({ message: error.message }, { status: 404 }); // 404 if not found
    }
  }),

];
