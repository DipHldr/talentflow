import React, { useState,useEffect} from 'react';
import { Plus, Edit3, Trash2, Users, Clock, Calendar, FileText,Search } from 'lucide-react';
import type {CreatedAssesment,AssessmentRequest,PaginatedAssessmentsResponse } from '../../../mocks/types/assesment';

/**
 * Sends the new assessment data to the API to create it.
 * @param {AssessmentRequest} data - The data from the creation form.
 * @returns {Promise<CreatedAssessment>} The newly created assessment from the server.
 */
export const createAssessmentAPI = async (data: AssessmentRequest): Promise<CreatedAssesment> => {
  console.log('from createAssessmentAPI function: ',data)
  console.log('from createAssessmentAPI function: ',data.topics)
  const response = await fetch('/api/assessments/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // If the API returns an error (like not enough questions), this will throw it
    const error = await response.json();
    throw new Error(error.message || 'Failed to create the assessment.');
  }

  return response.json();
};

export const editAssessmentAPI = async (assessmentId: number, updatedData: Partial<CreatedAssesment>): Promise<CreatedAssesment> => {
  const response = await fetch(`/api/assessments/${assessmentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update assessment.');
  }

  return response.json();
};

export const deleteAssessmentAPI = async (assessmentId: number): Promise<{ success: boolean; id: number }> => {
  const response = await fetch(`/api/assessments/${assessmentId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete assessment.');
  }

  return response.json();
};

export const fetchAssessmentsAPI = async (page: number, search: string): Promise<PaginatedAssessmentsResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    search,
  });
  const response = await fetch(`/api/assessments?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch assessments.');
  }
  return response.json();
};


export const AssessmentsTab: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssessment, setNewAssessment] = useState({
    title: '',
    topics: '',
    duration: 60,
    numberOfQuestions:20,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [assessments, setAssessments] = useState<CreatedAssesment[]>([]);
  const [editingAssessment, setEditingAssessment] = useState<CreatedAssesment | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const [assessments] = useState<Assesment[]>([
  //   {
  //     id: '1',
  //     title: 'Frontend Developer Assessment',
  //     topics: ['React', 'JavaScript', 'CSS'],
  //     questions: 25,
  //     duration: 90,
  //     candidates: 12,
  //     createdDate: '2024-01-15',
  //     status: 'active',
  //   },
  //   {
  //     id: '2',
  //     title: 'Backend Developer Assessment',
  //     topics: ['Node.js', 'Database', 'API Design'],
  //     questions: 30,
  //     duration: 120,
  //     candidates: 8,
  //     createdDate: '2024-01-12',
  //     status: 'active',
  //   },
  //   {
  //     id: '3',
  //     title: 'Data Analyst Assessment',
  //     topics: ['SQL', 'Python', 'Statistics'],
  //     questions: 20,
  //     duration: 75,
  //     candidates: 5,
  //     createdDate: '2024-01-10',
  //     status: 'draft',
  //   },
  // ]);

const handleCreateAssessment = async () => {
  // 1. Validate form data
  if (!newAssessment.title || !newAssessment.topics) {
    alert('Please provide a title and at least one topic.');
    return;
  }

  // 2. Prepare the data for the API: convert the topics string to a string array
  const assessmentDataForApi: AssessmentRequest = {
    ...newAssessment,
    // This takes "React, JS, CSS" and turns it into ["React", "JS", "CSS"]
    topics: newAssessment.topics.split(',').map(topic => topic.trim()),
  };

  try {
    // 3. Call the API
    const createdAssessment = await createAssessmentAPI(assessmentDataForApi);
    
    // 4. Update the UI on success
    setAssessments(prev => [createdAssessment, ...prev]); // Add the new assessment to the list
    setShowCreateModal(false); // Close the modal
    
    // 5. Reset the form for the next entry
    setNewAssessment({ title: '', topics: '', numberOfQuestions: 10, duration: 60 });
    
  } catch (error: any) {
    // 6. Handle any errors from the API (e.g., "Not enough questions found")
    alert(`Error: ${error.message}`);
  }
};

  const handleDeleteAssessment = async (assessmentToDelete: CreatedAssesment) => {
  // 1. Confirm with the user before deleting
  if (!window.confirm(`Are you sure you want to delete "${assessmentToDelete.title}"?`)) {
    return;
  }

  try {
    // 2. Call the API to delete the assessment from the database
    await deleteAssessmentAPI(assessmentToDelete.id!);
    
    // 3. Update the local state to remove the assessment from the UI
    setAssessments(prevAssessments => 
      prevAssessments.filter(assessment => assessment.id !== assessmentToDelete.id)
    );

    alert('Assessment deleted successfully!');

  } catch (error: any) {
    // 4. Handle any errors from the API
    alert(`Error: ${error.message}`);
  }
};


const handleEditAssessment = (assessmentToEdit: CreatedAssesment) => {
  // 1. Set the assessment object you want to edit into state
  setEditingAssessment(assessmentToEdit);
  
  // 2. Open the edit modal
  setShowEditModal(true);
};


const handleUpdateAssessment = async (assessmentId: number, dataToUpdate: Partial<CreatedAssesment>) => {
  try {
    // 1. Call the API to update the assessment
    const updatedAssessment = await editAssessmentAPI(assessmentId, dataToUpdate);

    // 2. Update the local state with the returned object
    setAssessments(prevAssessments => 
      prevAssessments.map(assessment => 
        assessment.id === updatedAssessment.id ? updatedAssessment : assessment
      )
    );

    // 3. Close the modal and clear the editing state
    setShowEditModal(false);
    setEditingAssessment(null);
    alert('Assessment updated successfully!');

  } catch (error: any) {
    alert(`Error: ${error.message}`);
  }
};



useEffect(() => {
  const loadAssessments = async () => {
    try {
      setIsLoading(true);
      const response = await fetchAssessmentsAPI(currentPage, debouncedSearchTerm);
      setAssessments(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('Could not load assessments.');
    } finally {
      setIsLoading(false);
    }
  };
  loadAssessments();
}, [currentPage, debouncedSearchTerm]); // Re-fetch when page or search term changes

// Debounce search input to prevent excessive API calls
useEffect(() => {
  const timerId = setTimeout(() => {
    setDebouncedSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to first page on a new search
  }, 500);
  return () => clearTimeout(timerId);
}, [searchTerm]);


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>




      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Assessment Library</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Assessment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">{assessment.title}</h3>
              {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                {assessment.status}
              </span> */}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex flex-wrap gap-2">
                {assessment.topics.map((topic, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {topic}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>{assessment.numberOfQuestions} questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{assessment.duration} min</span>
                </div>
                
              </div>
            </div>

            <div className="flex space-x-2">
              <button onClick={()=>handleEditAssessment(assessment)} className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button onClick={()=>handleDeleteAssessment(assessment)} className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Assessment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Title</label>
                <input
                  type="text"
                  value={newAssessment.title}
                  onChange={(e) => setNewAssessment({ ...newAssessment, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Frontend Developer Assessment"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topics (comma-separated)</label>
                <input
                  type="text"
                  value={newAssessment.topics}
                  onChange={(e) => setNewAssessment({ ...newAssessment, topics: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., React, JavaScript, CSS"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={newAssessment.duration}
                  onChange={(e) => setNewAssessment({ ...newAssessment, duration: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="15"
                  max="180"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number Of Questions</label>
                <input
                  type="number"
                  value={newAssessment.numberOfQuestions}
                  onChange={(e) => setNewAssessment({ ...newAssessment, numberOfQuestions: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="15"
                  max="180"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAssessment}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Generate Questions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Edit Modal */}
      {/* ✅ ADD THIS ENTIRE MODAL BLOCK ✅ */}
{/* Edit Assessment Modal */}
{showEditModal && editingAssessment && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Edit Assessment</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Title</label>
          <input
            type="text"
            value={editingAssessment.title}
            onChange={(e) => setEditingAssessment({ ...editingAssessment, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Topics (comma-separated)</label>
          <input
            type="text"
            // Convert array to string for the input value
            value={editingAssessment.topics.join(', ')}
            // Convert string back to array on change
            onChange={(e) => setEditingAssessment({ ...editingAssessment, topics: e.target.value.split(',').map(t => t.trim()) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
          <input
            type="number"
            value={editingAssessment.duration}
            onChange={(e) => setEditingAssessment({ ...editingAssessment, duration: parseInt(e.target.value) || 0 })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>
      
      <div className="flex space-x-3 mt-6">
        <button
          onClick={() => {
            setShowEditModal(false);
            setEditingAssessment(null);
          }}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => handleUpdateAssessment(editingAssessment.id!, editingAssessment)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};