import {useEffect,useState} from 'react'
import JobCard from './JobListing/JobCard'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import type { Job } from '@/mocks/types/jobs';
import { jobs } from '@/mocks/data/jobs';
import { useQuery } from '@tanstack/react-query';
import type { PaginatedJobsResponse } from '@/mocks/types/jobs';
import Pagination from './Pagination'
import CandidateProfile from './CandidateProfile'
import { Plus } from 'lucide-react'
import CreateJobModal from './CreateJob/CreateJobModal'
import JobFiltersComponent from './JobFilters/jobfilters'
import type { JobFilters } from '@/mocks/types/jobs1'
import CandidatesProfile from './CandidatesProfile/CandidatesProfile.tsx'
import JobList from './JobListing/JobList.tsx'

const fetchJobs = async (searchTerm: string,page:string,pageSize:string,filters: JobFilters): Promise<PaginatedJobsResponse> => {
  const params = new URLSearchParams({
    search: searchTerm,
    page: page,
    pageSize: pageSize, // we can make these dynamic later
  });

  const response = await fetch(`/api/jobs?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};



const JobsPage = () => {
    const [searchTerm,setSearchTerm]=useState('');
    const [pageNumber,setPageNumber]=useState(1);
    const [pageSize,setPageSize]=useState(10);
    const debouncedSearchTerm=useDebounce(searchTerm,500);
    const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
    const [filters, setFilters] = useState<JobFilters>({
    type: [],
    experience: [],
    location: '',
    salaryMin: 0,
    salaryMax: 200000,
    department: []
  });
  const { data, isLoading, isError, error } = useQuery<PaginatedJobsResponse, Error>({
    queryKey: ['jobs', debouncedSearchTerm,pageNumber,pageSize,filters], // This key re-fetches when debouncedSearchTerm changes
    queryFn: () => fetchJobs(debouncedSearchTerm,String(pageNumber),String(pageSize),filters),
  });

  // const[jobs,setJobs]=useState(data?.jobs||[]);

  const handleCreateJob=()=>{

  }

  const totalPages=(data)?Math.ceil(data.total/pageSize):0;


  console.log(data);
  // setJobs(data);


  return (
    <div className=' grid grid-cols-4 gap-3'>

      <div className=' flex flex-col gap-4'>
        <CandidatesProfile/>
      </div>


      <div className=' flex flex-col col-span-2 justify-content items-center gap-4'>

        <div className="bg-blue-white rounded-2xl shadow-xl border p-2 w-full mt-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 flex items-center space-x-3 pl-4">
                <Search className="h-5 w-5 text-slate-400" />
                <Input 
                  type="text" 
                  placeholder="Job title, keywords, or company"
                  className="flex-1 border-0 outline-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-700 placeholder-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 rounded-xl">
                Search
              </Button>
            </div>
          </div>

        <div className='flex flex-col gap-4 w-full'>
            {/* 5. Render the data, loading, or error state */}
          {isLoading && (
             <div className="text-center p-8">
                <p className="text-slate-500">Loading jobs...</p>
             </div>
          )}
          {isError && (
            <div className="text-center p-8 text-red-500">
                <p>Error fetching jobs: {error.message}</p>
            </div>
          )}
          {/* {data?.data.map((job:Job,index) => {
            return <JobCard key={index} {...job} />
          })}; */}

          {!isLoading && data?.data && data.data.length > 0 && (
            <JobList jobs={data.data}/>
          )}
          
           {!isLoading && data?.data.length === 0 && (
             <div className="text-center p-8">
                <p className="text-slate-500">No jobs found.</p>
             </div>
          )}
            
        </div>

        {/* PAGINATION */}
        {
            totalPages>1&&(
                <Pagination 
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={setPageNumber}
                />

            )
        }
        
      </div>
      <div className='flex flex-col gap-4 '>
        {/* Filters */}
            <JobFiltersComponent 
              filters={filters}
              onFiltersChange={setFilters}
            />
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Post a Job</h3>
              <p className="text-sm text-slate-600 mb-4">
                Looking for talent? Post your job opening and connect with qualified candidates.
              </p>
              <Button 
                onClick={() => setIsCreateJobOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Job Posting
              </Button>
            </div>
        
      </div>
      {/* Create Job Modal */}
      <CreateJobModal 
        isOpen={isCreateJobOpen}
        onClose={() => setIsCreateJobOpen(false)}
        onSubmit={handleCreateJob}
      />
    </div>
  )
}
export default JobsPage;
