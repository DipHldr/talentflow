// import type { Job,PaginatedJobsResponse } from "../types/jobs.ts";
import { db } from "../../db.ts";
import type { Job, CreateJobData,PaginatedJobsResponse,JobFilters } from '../types/jobs1';




export const createJob = async (jobData: Job): Promise<Job> => {
  // Transform the form data into the full Job object format
  const newJob: Job = {
    // Spread the properties that are already correct
    ...jobData,
    
    id: String(Date.now()), // Generate a unique ID
    postedDate: new Date().toISOString().split('T')[0], // Set the posted date to now
    
    // Create the nested salary object
    salary: {
      min: jobData.salary.min,
      max: jobData.salary.max,
      currency: jobData.salary.currency,
    },
    
    // ✅ FIX: Provide default values for required fields
    location: jobData.location || 'Not Specified',
    description: jobData.description || 'No description provided.',
    deadline: jobData.deadline || 'N/A',
    department: jobData.department || 'General',

    // ✅ FIX: Correctly convert strings to arrays
    requirements: jobData.requirements || [],
    benefits: jobData.benefits || [],
  };

  // Add the new job to the database
  await db.jobs.add(newJob);

  return newJob;
};



export async function getJobs({
  search = "",
  page = 1,
  pageSize = 6,
  sort = "desc", // Default to descending to show newest jobs first
  filters = {},
}: {
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: "asc" | "desc";
  filters?: Partial<JobFilters>;
}): Promise<PaginatedJobsResponse> {

  // 1. Start with a collection of all jobs
  let collection = db.jobs.toCollection();

  // 2. Apply database-level filters where possible (if they are indexed)
  // This is much more efficient than filtering in JavaScript.
  if (filters.type && filters.type.length > 0) {
    collection = collection.filter(job => filters.type!.includes(job.type));
  }
  if (filters.experience && filters.experience.length > 0) {
    collection = collection.filter(job => filters.experience!.includes(job.experience));
  }
  if (filters.department && filters.department.length > 0) {
    collection = collection.filter(job => filters.department!.includes(job.department));
  }
  if (filters.location) {
    const lowerLocation = filters.location.toLowerCase();
    collection = collection.filter(job => job.location.toLowerCase().includes(lowerLocation));
  }
  if (filters.salaryMin) {
    collection = collection.filter(job => job.salary.min >= filters.salaryMin!);
  }
  if (filters.salaryMax) {
    collection = collection.filter(job => job.salary.max <= filters.salaryMax!);
  }
  
  // 3. Apply the free-text search filter
  const lowerSearch = search.toLowerCase();
  if (lowerSearch) {
    collection = collection.filter(job => 
      job.title.toLowerCase().includes(lowerSearch) ||
      job.company.toLowerCase().includes(lowerSearch) ||
      job.description.toLowerCase().includes(lowerSearch)
    );
  }
  
  // 4. Get the total count of filtered items *before* pagination
  const total = await collection.count();
  const totalPages = Math.ceil(total / pageSize);

  // 5. Apply sorting and pagination
  // collection=collection.sortBy('postedDate');
  if (sort === 'desc') {
    collection = collection.reverse();
  }

  const paginatedData = await collection
    .offset((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();


  // 6. Return the paginated response
  return {
    data: paginatedData,
    total,
    page,
    pageSize,
    totalPages,
  };
}



/**
 * Fetches a single job by its unique ID.
 * @param jobId - The ID of the job to retrieve.
 * @returns A promise that resolves to the Job object.
 * @throws Will throw an error if the job with the specified ID is not found.
 */
export const getJobById = async (jobId: string): Promise<Job> => {
  // Dexie's .get() method is highly optimized for fetching by primary key.
  const job = await db.jobs.get(jobId);

  if (!job) {
    // If the job is not found, throw an error that can be caught by the handler.
    throw new Error(`Job with ID '${jobId}' not found.`);
  }

  return job;
};


/**
 * Updates an existing job in the database.
 * @param {string} jobId - The ID of the job to update.
 * @param {Partial<Job>} updatedData - An object with the fields to update.
 * @returns {Promise<Job>} The full, updated job object.
 */
export const editJob = async (jobId: string, updatedData: Partial<Job>): Promise<Job> => {
  // Use Dexie's update method with the job's ID and the new data
  const updatedCount = await db.jobs.update(jobId, updatedData);

  if (updatedCount === 0) {
    throw new Error(`Job with ID ${jobId} not found.`);
  }

  // Fetch and return the full updated job object
  const updatedJob = await db.jobs.get(jobId);
  if (!updatedJob) {
    // This case is unlikely but good for type safety
    throw new Error(`Failed to retrieve updated job with ID ${jobId}.`);
  }

  console.log(`Updated job with ID: ${jobId}`);
  return updatedJob;
};


/**
 * Deletes a job from the database by its ID.
 * @param {string} jobId - The ID of the job to delete.
 * @returns {Promise<{ success: boolean; id: string }>} Confirmation object.
 */
export const deleteJob = async (jobId: string): Promise<{ success: boolean; id: string }> => {
  // First, check if the job actually exists to provide a clear error
  const jobToDelete = await db.jobs.get(jobId);
  if (!jobToDelete) {
    throw new Error(`Job with ID ${jobId} not found.`);
  }

  // Use Dexie's delete method with the primary key
  await db.jobs.delete(jobId);

  console.log(`Deleted job with ID: ${jobId}`);
  return { success: true, id: jobId };
};
