import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Users, Clock, Calendar, FileText } from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  topics: string[];
  questions: number;
  duration: number;
  candidates: number;
  createdDate: string;
  status: 'active' | 'draft' | 'completed';
}

export const AssessmentsTab: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssessment, setNewAssessment] = useState({
    title: '',
    topics: '',
    duration: 60,
  });

  const [assessments] = useState<Assessment[]>([
    {
      id: '1',
      title: 'Frontend Developer Assessment',
      topics: ['React', 'JavaScript', 'CSS'],
      questions: 25,
      duration: 90,
      candidates: 12,
      createdDate: '2024-01-15',
      status: 'active',
    },
    {
      id: '2',
      title: 'Backend Developer Assessment',
      topics: ['Node.js', 'Database', 'API Design'],
      questions: 30,
      duration: 120,
      candidates: 8,
      createdDate: '2024-01-12',
      status: 'active',
    },
    {
      id: '3',
      title: 'Data Analyst Assessment',
      topics: ['SQL', 'Python', 'Statistics'],
      questions: 20,
      duration: 75,
      candidates: 5,
      createdDate: '2024-01-10',
      status: 'draft',
    },
  ]);

  const handleCreateAssessment = () => {
    // In a real app, this would call an API to create questions based on topics
    console.log('Creating assessment with topics:', newAssessment.topics);
    setShowCreateModal(false);
    setNewAssessment({ title: '', topics: '', duration: 60 });
  };

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
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                {assessment.status}
              </span>
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
                  <span>{assessment.questions} questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{assessment.duration} min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{assessment.candidates} candidates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{assessment.createdDate}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
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
    </div>
  );
};