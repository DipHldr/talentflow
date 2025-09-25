import { http, HttpResponse } from "msw";
import {getJobs,createJob,deleteJob,editJob,getJobById} from './controllers/jobControllers.ts';
import type {Job,PaginatedJobsResponse} from './types/jobs1.ts';
import { getCandidates } from "./controllers/candidateControllers.ts";

import { 
  createAssessment,
  submitAssessment,
  getAssignedAssessments,
  getAssessmentSummary,
  getCandidateById,
  assignAssessment,
  getAllAssessments,
  getOverallAssessmentStats,
  deleteAssessment,
  editAssessment,
  getCandidateResults } from "./controllers/assesmentControllers";
import type {
   AssessmentRequest,
   CreatedAssesment,
   AssessmentSubmission } from "./types/assesment";

import {
  updateApplicationStatus,
  applyForJob,
  getApplicationsByCandidate} from './controllers/JobApplicationControllers.ts';
import type {JobApplication} from './types/jobs1.ts';

import {getTimelineForCandidate} from './controllers/timelineControllers.ts';
import type {TimelineEvent} from './types/timeline.ts'; 

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
  //Handler for fetching a single job by its ID.
  http.get("/api/jobs/:jobId", async ({ params }) => {
    const { jobId } = params;

    try {
      // Call the controller to fetch the job data.
      // Ensure jobId is a string, which it will be from params.
      const job = await getJobById(String(jobId));

      // If successful, return the job data with a 200 OK status.
      return HttpResponse.json(job);

    } catch (error: any) {
      // The controller throws an error if not found, which we catch here.
      // Return a 404 Not Found status with the error message.
      return HttpResponse.json({ message: error.message }, { status: 404 });
    }
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
    http.get("/api/assessments", async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const search = url.searchParams.get("search") || "";
    const response = await getAllAssessments({ page, search });
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

  http.post("/api/assessments/assign", async ({ request }) => {
    try {
      const { candidateId, assessmentId } = await request.json() as { candidateId: number, assessmentId: number };
      const assignment = await assignAssessment({ candidateId, assessmentId });
      return HttpResponse.json(assignment, { status: 201 });
    } catch (error: any) {
      if (error.name === 'ConstraintError' || error.message.includes('already assigned')) {
        return HttpResponse.json({ message: 'This assessment is already assigned.' }, { status: 409 });
      }
      return HttpResponse.json({ message: error.message }, { status: 404 });
    }
  }),

    // GET /api/assessments/:assessmentId/summary - Get analytics for an assessment
  http.get("/api/assessments/:assessmentId/summary", async ({ params }) => {
    const { assessmentId } = params;
    try {
      const summary = await getAssessmentSummary(Number(assessmentId));
      return HttpResponse.json(summary);
    } catch (error: any) {
      return HttpResponse.json({ message: error.message }, { status: 404 });
    }
  }),

  http.get("/api/candidates/:candidateId/results", async ({ params }) => {
    const { candidateId } = params;
    
    if (!candidateId) {
      return HttpResponse.json({ message: "Candidate ID is required." }, { status: 400 });
    }

    try {
      const results = await getCandidateResults(Number(candidateId));
      return HttpResponse.json(results);
    } catch (error: any) {
      // This will catch any unexpected errors from the controller
      return HttpResponse.json({ message: "Failed to fetch candidate results." }, { status: 500 });
    }
  }),

    // Handler for fetching overall assessment statistics
  http.get("/api/assessments/stats", async () => {
    try {
      const stats = await getOverallAssessmentStats();
      return HttpResponse.json(stats);
    } catch (error: any) {
      return HttpResponse.json({ message: "Failed to fetch assessment stats." }, { status: 500 });
    }
  }),

  http.put("/api/assessments/:assessmentId", async ({ params, request }) => {
    const { assessmentId } = params;
    try {
      const updatedData = await request.json() as Partial<CreatedAssesment>;
      const result = await editAssessment(Number(assessmentId), updatedData);
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json({ message: error.message }, { status: 404 });
    }
  }),

  // Handler for deleting an assessment
  http.delete("/api/assessments/:assessmentId", async ({ params }) => {
    const { assessmentId } = params;
    try {
      const result = await deleteAssessment(Number(assessmentId));
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json({ message: error.message }, { status: 404 });
    }
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


  /**
   * Handler for a candidate to apply for a job.
   * METHOD: POST
   * ENDPOINT: /api/applications
   * BODY: { "candidateId": number, "jobId": string }
   */
  http.post("/api/applications", async ({ request }) => {
    try {
      const { candidateId, jobId } = await request.json() as { candidateId: number; jobId: string };

      if (!candidateId || !jobId) {
        return HttpResponse.json({ message: "candidateId and jobId are required." }, { status: 400 });
      }

      const newApplicationId = await applyForJob(candidateId, jobId);

      // Return the ID of the new application with a 201 Created status
      return HttpResponse.json({ applicationId: newApplicationId, message: "Application successful." }, { status: 201 });

    } catch (error: any) {
      // The controller throws an error if the application already exists.
      // A 409 Conflict status is appropriate here.
      if (error.message.includes("already applied")) {
        return HttpResponse.json({ message: error.message }, { status: 409 });
      }
      // For any other unexpected errors
      return HttpResponse.json({ message: "Failed to submit application." }, { status: 500 });
    }
  }),

  /**
   * Handler to fetch all applications for a specific candidate.
   * METHOD: GET
   * ENDPOINT: /api/candidates/:candidateId/applications
   */
  http.get("/api/candidates/:candidateId/applications", async ({ params }) => {
    try {
      const { candidateId } = params;

      // Validate and parse the candidateId from the URL parameter
      const candidateIdNum = Number(candidateId);
      if (isNaN(candidateIdNum)) {
        return HttpResponse.json({ message: "Invalid candidate ID." }, { status: 400 });
      }

      const applications = await getApplicationsByCandidate(candidateIdNum);

      return HttpResponse.json<JobApplication[]>(applications);

    } catch (error: any) {
      return HttpResponse.json({ message: "Failed to fetch applications." }, { status: 500 });
    }
  }),

  /**
   * Handler for an HR user to update an application's status.
   * METHOD: PATCH
   * ENDPOINT: /api/applications/:applicationId
   * BODY: { "status": "Interview" | "Rejected" | ... }
   */
  http.patch("/api/applications/:applicationId", async ({ params, request }) => {
    try {
      const { applicationId } = params;
      const { status } = await request.json() as { status: JobApplication['status'] };

      // Validate and parse the applicationId from the URL parameter
      const applicationIdNum = Number(applicationId);
      if (isNaN(applicationIdNum)) {
        return HttpResponse.json({ message: "Invalid application ID." }, { status: 400 });
      }

      if (!status) {
         return HttpResponse.json({ message: "New status is required." }, { status: 400 });
      }

      await updateApplicationStatus(applicationIdNum, status);

      return HttpResponse.json({ message: `Application ${applicationIdNum} status updated to ${status}.` });

    } catch (error: any) {
      // The controller throws an error if the application ID doesn't exist.
      if (error.message.includes("not found")) {
        return HttpResponse.json({ message: error.message }, { status: 404 });
      }
      // For any other unexpected errors
      return HttpResponse.json({ message: "Failed to update application status." }, { status: 500 });
    }
  }),

    /**
   * Handler to fetch the timeline for a specific candidate.
   * METHOD: GET
   * ENDPOINT: /api/candidates/:candidateId/timeline
   */
  http.get("/api/candidates/:candidateId/timeline", async ({ params }) => {
    try {
      const { candidateId } = params;

      // Call the controller with the candidate's ID (converted to a number)
      const timelineEvents = await getTimelineForCandidate(Number(candidateId));

      // Return the array of events as a JSON response
      return HttpResponse.json<TimelineEvent[]>(timelineEvents);
      
    } catch (error: any) {
      // If the controller throws an error, return a 500 server error status
      return HttpResponse.json({ message: error.message }, { status: 500 });
    }
  }),

];
