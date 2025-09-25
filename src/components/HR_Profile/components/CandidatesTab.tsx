import React, { useState,useEffect } from 'react';
import { Search, Mail, UserPlus, Send, Filter } from 'lucide-react';
import type { Candidate,PaginatedCandidatesResponse } from '../../../mocks/types/candidates';
import type { PaginatedAssessmentsResponse, CreatedAssesment } from '../../../mocks/types/assesment';
import { Link } from 'react-router-dom';

// export interface Candidate {
//   id: number;
//   name: string;
//   email: string;
//   appliedJobId: number;
//   stage: string;

//   // Portfolio fields
//   portfolio_headline: string;
//   portfolio_summary: string;
//   portfolio_skills: string[];
//   portfolio_experience: number; // you can use number of years or count of experience items
//   portfolio_school: string;
//   portfolio_degree: string;
//   portfolio_year: number;
//   portfolio_github: string;
//   portfolio_linkedin: string;
//   portfolio_website: string;
//   portfolio_avatar: string;
// }


export const fetchCandidatesAPI = async (page: number, search: string): Promise<PaginatedCandidatesResponse> => {
  const params = new URLSearchParams({ page: String(page), search });
  const response = await fetch(`/api/candidates?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch candidates.');
  return response.json();
};

export const fetchAllAssessmentsAPI = async (): Promise<PaginatedAssessmentsResponse> => {
  // Fetch all assessments for the dropdown, assuming the API supports a large page size
  const response = await fetch(`/api/assessments?pageSize=100`);
  if (!response.ok) throw new Error('Failed to fetch assessments.');
  return response.json();
};

export const assignAssessmentAPI = async (candidateId: number, assessmentId: number) => {
  const response = await fetch('/api/assessments/assign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidateId, assessmentId }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to assign assessment.');
  }
  return response.json();
};



export const CandidatesTab: React.FC = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const [suggestions, setSuggestions] = useState<Candidate[]>([]);
  const [isSearching, setIsSearching] = useState(false);


   // Data and loading state
  const [assessments, setAssessments] = useState<CreatedAssesment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal and assignment state
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate|null>(null);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>('');

 useEffect(() => {
    const loadCandidates = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCandidatesAPI(currentPage, debouncedSearchTerm);
        setCandidates(response.data);
        setTotalPages(response.page);
      } catch (err) {
        setError('Could not load candidates.');
      } finally {
        setIsLoading(false);
      }
    };
    loadCandidates();
  }, [currentPage, debouncedSearchTerm]);

  // Fetch all assessment templates once for the dropdown
  useEffect(() => {
    const loadAssessments = async () => {
      try {
        const response = await fetchAllAssessmentsAPI();
        setAssessments(response.data);
      } catch (err) {
        console.error("Failed to load assessments for dropdown.");
      }
    };
    loadAssessments();
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
  // Don't search if the input is empty
  if (searchEmail.trim() === '') {
    setSuggestions([]);
    return;
  }

  const fetchSuggestions = async () => {
    setIsSearching(true);
    try {
      // Use your existing API helper to fetch candidates matching the search term
      const response = await fetchCandidatesAPI(1, searchEmail);
      setSuggestions(response.data);
    } catch (err) {
      console.error("Failed to fetch suggestions");
      setSuggestions([]); // Clear suggestions on error
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce the API call
  const timer = setTimeout(() => {
    fetchSuggestions();
  }, 300); // Wait 300ms after user stops typing

  return () => clearTimeout(timer); // Cleanup
}, [searchEmail]);

  const openAssignModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowAssignModal(true);
  };
  
  const handleAssignAssessment = async () => {
    console.log('handle Assign Assesment Called');
    console.log(`selected candidate: ${selectedCandidate},selected assesmentid: ${selectedAssessmentId}`)
    if (selectedCandidate && selectedAssessmentId) {
      try {
        await assignAssessmentAPI(selectedCandidate.id, parseInt(selectedAssessmentId));
        alert(`Successfully assigned assessment to ${selectedCandidate.name}`);
        setShowAssignModal(false);
        setSelectedCandidate(null);
        setSelectedAssessmentId('');
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const getStageColor = (stage: string) => {
    const colors: { [key: string]: string } = {
      'Applied': 'bg-blue-100 text-blue-800',
      'Screening': 'bg-yellow-100 text-yellow-800',
      'Interview': 'bg-indigo-100 text-indigo-800',
      'Offer': 'bg-purple-100 text-purple-800',
      'Hired': 'bg-green-100 text-green-800',
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };


  const filteredCandidates = candidates.filter(candidate =>
    candidate.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
    candidate.name.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Candidate Management</h2>
        <div className='flex space-x-4'>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Link to='/kanban'>Kanban View</Link>
        </button>
        <button
          onClick={() => setShowAssignModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Assign Assessment</span>
        </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search candidates by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Candidates List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center p-8">Loading candidates...</div>
          ) : error ? (
            <div className="text-center p-8 text-red-500">{error}</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Headline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900"><Link to={`/candidate/profile/${candidate.id}`}>{candidate.name}</Link></div>
                        <div className="text-sm text-gray-500">{candidate.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-xs">{candidate.portfolio_headline}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(candidate.stage)}`}>{candidate.stage}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                      <button onClick={() => openAssignModal(candidate)} className="text-blue-600 hover:text-blue-900">Assign</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && !isLoading && (
        <div className="flex justify-center items-center space-x-4">
          <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage <= 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages}>Next</button>
        </div>
      )}

      {/* Assign Assessment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Assign Assessment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Candidate Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="candidate@email.com"
                  />

                  {/* Show suggestions dropdown if there are any */}
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                    {isSearching ? (
                      <li className="px-4 py-2 text-gray-500">Searching...</li>
                    ) : (
                      suggestions.map(candidate => (
                        <li
                          key={candidate.id}
                          onClick={() => {
                            // When a suggestion is clicked:
                            setSearchEmail(candidate.email); // Fill the input with the selected email
                            setSelectedCandidate(candidate); // IMPORTANT: Set the whole candidate object
                            setSuggestions([]); // Hide the suggestions
                          }}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                        >
                          <div className="font-medium text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-500">{candidate.email}</div>
                        </li>
                      ))
                    )}
                  </ul>
                )}

                </div>
              </div>
              
              {/* Select From Assesment List */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Assessment</label>
                <select
                  value={selectedAssessmentId}
                  onChange={(e) => setSelectedAssessmentId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose an assessment...</option>
                  {assessments.map((assessment) => (
                    <option key={assessment.id} value={assessment.id}>
                      {assessment.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignAssessment}
                disabled={!selectedCandidate || !selectedAssessmentId}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Invite</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};