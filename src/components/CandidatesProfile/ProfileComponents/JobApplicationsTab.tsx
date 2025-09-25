import React, { useState,useEffect } from 'react';
import { Building2, MapPin, Calendar, DollarSign } from 'lucide-react';
import type { JobApplication,Job } from '../../../mocks/types/jobs1.ts';


// type EnrichedApplication = JobApplication & Job;

export interface EnrichedApplication extends JobApplication {
  jobDetails: Job;
}


interface JobApplicationsTabProps {
  applications: JobApplication[];
}


// A helper function to fetch a single job by its ID.
// This encapsulates the API logic.
const fetchJobDetailsById = async (jobId: string): Promise<Job> => {
  const response = await fetch(`/api/jobs/${jobId}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to fetch job ${jobId}`);
  }
  return response.json();
};

const JobApplicationsTab: React.FC<JobApplicationsTabProps> = ({ applications }) => {
  // const [jobs,setjobs]=useState<Job[]>([]);
    const [enrichedApplications, setEnrichedApplications] = useState<EnrichedApplication[]>([]);
  // State to manage the loading UI
    const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to handle any potential errors
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
    // Define an async function inside the effect to fetch all job details
    const enrichApplicationData = async () => {
      // Don't do anything if there are no applications
      if (!applications || applications.length === 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Create an array of promises, one for each job detail fetch
        const jobDetailPromises = applications.map(app => fetchJobDetailsById(app.jobId));
        
        // Wait for all promises to resolve
        const jobDetails = await Promise.all(jobDetailPromises);

        // Map over the original applications and merge them with the fetched job details
        const combinedData = applications.map((app, index) => ({
          ...app, // Spread the original application data (id, status, appliedDate)
          jobDetails:jobDetails[index], // Spread the fetched job details (title, company, location, etc.)
        }));

        setEnrichedApplications(combinedData);
        // setjobs(jobDetails)
      } catch (err: any) {
        console.error("Failed to enrich job application data:", err);
        setError("Could not load job application details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    enrichApplicationData();
  }, [applications]); // This effect re-runs whenever the applications prop changes





  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewing: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      interview: 'bg-purple-100 text-purple-800',
      offered: 'bg-emerald-100 text-emerald-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Job Applications</h3>
        <span className="text-sm text-gray-500">{applications.length} applications</span>
      </div>

      <div className="grid gap-4">
        {enrichedApplications.map((job) => (
          <div 
            key={job.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {job.jobDetails.title}
                    </h4>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.jobDetails.company}</span>
                    </div>
                  </div>
                  {/* <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Applied {new Date(job.appliedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{job.jobDetails.location}</span>
                  </div>
                  {job.jobDetails.salary && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span> {job.jobDetails.salary.min} - <span>{job.jobDetails.salary.max}</span></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
          <p className="text-gray-500">This candidate hasn't applied to any jobs yet.</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationsTab;