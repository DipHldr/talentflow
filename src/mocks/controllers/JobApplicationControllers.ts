import { db } from "../../db";
import type {JobApplication} from '../types/jobs1.ts';

/**
 * Fetches all job applications for a given candidate.
 * @param candidateId - The ID of the candidate.
 * @returns A promise that resolves to an array of JobApplication objects.
 */
export const getApplicationsByCandidate = async (candidateId: number) => {
  try {
    // Use the 'where' clause on the indexed 'candidateId' field for efficient querying.
    const applications = await db.jobApplications
      .where('candidateId')
      .equals(candidateId)
      .toArray();

    if (!applications) {
      return []; // Return an empty array if no applications are found
    }
    return applications;
  } catch (error) {
    console.error(`Failed to fetch applications for candidate ${candidateId}:`, error);
    throw new Error('Could not retrieve job applications.');
  }
};

/**
 * Creates a new job application for a candidate.
 * @param candidateId - The ID of the applying candidate.
 * @param jobId - The ID of the job being applied for.
 * @returns A promise that resolves to the ID of the newly created application.
 */
export const applyForJob = async (candidateId: number, jobId: string) => {
  try {
    // Dexie's compound index '[candidateId+jobId]' will throw a 'ConstraintError'
    // if you try to add a duplicate, but it's good practice to check first.
    const existingApplication = await db.jobApplications
      .where('[candidateId+jobId]')
      .equals([candidateId, jobId])
      .first();

    if (existingApplication) {
      throw new Error('You have already applied for this job.');
    }

    const newApplication: Omit<JobApplication, 'id'> = {
      candidateId,
      jobId,
      appliedDate: new Date(),
      status: 'Applied', // Initial status
    };

    // The 'add' method returns the ID of the newly created record.
    const newApplicationId = await db.jobApplications.add(newApplication as JobApplication);
    return newApplicationId;
  } catch (error) {
    console.error(`Failed to create application for job ${jobId}:`, error);
    // Rethrow the original error to be handled by the caller
    throw error;
  }
};


/**
 * Updates the status of a specific job application.
 * @param applicationId - The primary key ID of the application to update.
 * @param newStatus - The new status to set.
 * @returns A promise that resolves to the number of updated records (should be 1).
 */
export const updateApplicationStatus = async (
  applicationId: number,
  newStatus: JobApplication['status']
) => {
  try {
    // The 'update' method takes the primary key and an object with the fields to change.
    const updatedCount = await db.jobApplications.update(applicationId, {
      status: newStatus,
    });

    if (updatedCount === 0) {
      throw new Error(`Application with ID ${applicationId} not found.`);
    }

    return updatedCount;
  } catch (error) {
    console.error(`Failed to update status for application ${applicationId}:`, error);
    throw new Error('Could not update application status.');
  }
};