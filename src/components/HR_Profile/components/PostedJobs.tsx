import React, { useState, useEffect,useCallback } from 'react';
import { Plus, Edit3, Trash2, MapPin, Briefcase, Calendar, DollarSign,Search, Filter } from 'lucide-react';
import type { Job, PaginatedJobsResponse, JobFilters, CreateJobData } from '../../../mocks/types/jobs1'; // Adjust path if needed

// Helper to create a new job via API
export const createJobAPI = async (jobData: Job): Promise<Job> => {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    // If the server responds with an error, throw an error
    throw new Error('Failed to create the job. Please try again.');
  }

  // Return the created job object from the server
  return response.json();
};


// Helper to fetch jobs from the API
const fetchJobs = async (page: number, searchTerm: string = '', filters: Partial<JobFilters> = {}): Promise<PaginatedJobsResponse> => {
  const params = new URLSearchParams({
    search: searchTerm,
    page: String(page),
    pageSize: '6',
  });

  // Properly append filter parameters
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, String(value));
  });

  const response = await fetch(`/api/jobs?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


export const PostedJobs: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [filters, setFilters] = useState<Partial<JobFilters>>({});
  const [showFilters, setShowFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // State for the new job form
  const [newJob, setNewJob] = useState<CreateJobData>({
    title: '',
    company: 'Innovate Inc.',
    location: 'N/A',
    type: 'full-time',
    experience: 'entry',
    salaryMin: 50000,
    salaryMax: 70000,
    currency: 'USD',
    description: '',
    requirements: '',
    benefits: '',
    deadline: '',
    department: 'Engineering',
  });

// ✅ ADD THESE TWO useEffect BLOCKS ✅

// This is the main effect for fetching data from the API
useEffect(() => {
  const loadJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Call the API with the current page and debounced search term
      const response = await fetchJobs(currentPage, debouncedSearchTerm, filters);
      
      // Update state with the API response
      setJobs(response.data); 
      setTotalPages(response.totalPages);

    } catch (err) {
      setError('Failed to fetch jobs.');
      setJobs([]); // Clear jobs on error
    } finally {
      setIsLoading(false);
    }
  };
  
  loadJobs();
}, [currentPage, debouncedSearchTerm, filters]); // Re-run when these change

// This effect creates the search delay (debounce)
useEffect(() => {
  const timerId = setTimeout(() => {
    setDebouncedSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to page 1 on a new search
  }, 300); // 300ms delay

  return () => clearTimeout(timerId); // Cleanup timer
}, [searchTerm]);

  const handleFilterChange = (filterKey: keyof JobFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value === '' ? undefined : value
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'salaryMin' || name === 'salaryMax') {
      setNewJob({ ...newJob, [name]: parseInt(value, 10) });
    } else {
      setNewJob({ ...newJob, [name]: value });
    }
  };

  const loadJobs = useCallback(async () => {
  try {
    setIsLoading(true);
    setError(null);
    
    // Fetch data using the current state for pagination, search, and filters
    const response = await fetchJobs(currentPage, debouncedSearchTerm, filters);
    
    // Update state with the data from the API response
    setJobs(response.data);
    setTotalPages(response.totalPages);

  } catch (err) {
    console.error(err);
    setError('Failed to fetch jobs. Please try again later.');
    setJobs([]); // Clear any existing jobs on error
  } finally {
    setIsLoading(false);
  }
}, [currentPage, debouncedSearchTerm, filters]);
  const handleCreateJob = async () => {
  // 1. Prepare the data for the API
  // Convert requirements and benefits from comma-separated strings to clean arrays

  try {

  const newJobForState: Job = {
    ...newJob,
    id: String(Date.now()),
    postedDate: new Date().toISOString().split('T')[0],
    salary: {
      min: newJob.salaryMin,
      max: newJob.salaryMax,
      currency: newJob.currency,
    },
    
    // Provide default values for ALL required fields that are optional in the form
    type: newJob.type || 'full-time',
    location: newJob.location || 'Not Specified',
    description: newJob.description || 'No description provided.',
    deadline: newJob.deadline || 'N/A',
    department: newJob.department || 'General',
    
    requirements: newJob.requirements?.split(',').map(s => s.trim()).filter(Boolean) || [],
    benefits: newJob.benefits?.split(',').map(s => s.trim()).filter(Boolean) || [],
  };
    
    // Now, 'newJobForState' has the correct shape and can be used as a 'Job'
    // This would be the object you send to your createJobAPI
    console.log('Creating job with transformed data:', newJobForState);
    
    // This will now work without errors
    setJobs(prevJobs => [newJobForState, ...prevJobs]);

    setShowCreateModal(false);

    // 2. Call the API to create the job
    await createJobAPI(newJobForState);

    // 3. Handle success: close modal, reset form, and refresh the job list
    setShowCreateModal(false);
    setNewJob({
      title: '',
      company: 'Innovate Inc.',
      location: '',
      type: 'full-time',
      experience: 'entry',
      salaryMin: 50000,
      salaryMax: 70000,
      currency: 'USD',
      description: '',
      requirements: '', // Resetting to string
      benefits: '',     // Resetting to string
      deadline: '',
      department: 'Engineering',
    });
    
    // This is the key step to update the UI
    loadJobs(); // Assuming you have a loadJobs function to refetch the data

  } catch (err) {
    // 4. Handle errors
    console.error("Failed to create job:", err);
    alert('Error creating job. Please check the console and try again.');
  }
};
const getColorForDeadline = (deadline: string): string => {
  if (!deadline) {
    return 'bg-gray-100 text-gray-800';
  }

  const deadlineDate = new Date(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the start of today

  // Handle invalid date strings
  if (isNaN(deadlineDate.getTime())) {
    return 'bg-gray-100 text-gray-800';
  }

  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (deadlineDate < today) {
    // Deadline has passed
    return 'bg-red-100 text-red-800';
  } else if (diffDays <= 7) {
    // Deadline is within a week
    return 'bg-yellow-100 text-yellow-800';
  } else {
    // Deadline is more than a week away
    return 'bg-green-100 text-green-800';
  }
};

  const renderContent = () => {
    if (isLoading) return <div className="text-center py-8">Loading jobs...</div>;
    if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
    if (jobs.length === 0) return <div className="text-center py-8 text-gray-500">No jobs found.</div>;


    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColorForDeadline(job.deadline)}`}>
                {job.postedDate}
              </span>
            </div>
            
            <div className="space-y-3 mb-4 text-sm text-gray-600 flex-grow">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span className="capitalize">{job.experience} Level • {job.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Deadline: {job.deadline}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>{job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-auto">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1">
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Posted Jobs</h2>
        <button 
          onClick={() => setShowCreateModal(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Post Job</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Filter Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            {(Object.keys(filters).length > 0 || searchTerm) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Job Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select
                  value={filters.type || ''}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="remote">Remote</option>
                </select>
              </div>

              {/* Experience Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <select
                  value={filters.experience || ''}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={filters.department || ''}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Analytics">Analytics</option>
                  <option value="HR">Human Resources</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={filters.location || ''}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {renderContent()}
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button 
            onClick={() => setCurrentPage(p => p - 1)} 
            disabled={currentPage <= 1} 
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>
          <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(p => p + 1)} 
            disabled={currentPage >= totalPages} 
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create New Job</h3>
            <div className="space-y-4">
              <input 
                name="title" 
                value={newJob.title} 
                onChange={handleInputChange} 
                placeholder="Job Title" 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
              <input 
                name="location" 
                value={newJob.location} 
                onChange={handleInputChange} 
                placeholder="Location" 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  name="salaryMin" 
                  type="number" 
                  value={newJob.salaryMin} 
                  onChange={handleInputChange} 
                  placeholder="Min Salary" 
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
                <input 
                  name="salaryMax" 
                  type="number" 
                  value={newJob.salaryMax} 
                  onChange={handleInputChange} 
                  placeholder="Max Salary" 
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <input 
                name="currency" 
                value={newJob.currency} 
                onChange={handleInputChange} 
                placeholder="Currency (e.g., USD, EUR)" 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
              <select 
                name="type" 
                value={newJob.type} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
              </select>
              <select 
                name="experience" 
                value={newJob.experience} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
              <input 
                name="department" 
                value={newJob.department} 
                onChange={handleInputChange} 
                placeholder="Department" 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
              <textarea 
                name="description" 
                value={newJob.description} 
                onChange={handleInputChange} 
                placeholder="Job Description" 
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />

              {/* here */}
              <textarea 
                name="requirements" 
                value={newJob.requirements} 
                onChange={handleInputChange} 
                placeholder="Requirements (comma-separated)" 
                rows={2}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
              <textarea 
                name="benefits" 
                value={newJob.benefits} 
                onChange={handleInputChange} 
                placeholder="Benefits (comma-separated)" 
                rows={2}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
              <input 
                name="deadline" 
                type="date" 
                value={newJob.deadline} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)} 
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateJob} 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Create Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};