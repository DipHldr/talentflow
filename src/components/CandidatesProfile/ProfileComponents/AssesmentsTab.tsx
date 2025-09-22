import React from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, XCircle, Play } from 'lucide-react';
import type { Assessment } from '../mockType';

interface AssessmentsTabProps {
  assessments: Assessment[];
}

const AssessmentsTab: React.FC<AssessmentsTabProps> = ({ assessments }) => {
  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="w-5 h-5" />,
      in_progress: <Play className="w-5 h-5" />,
      completed: <CheckCircle className="w-5 h-5" />,
      overdue: <XCircle className="w-5 h-5" />
    };
    return icons[status as keyof typeof icons] || icons.pending;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      technical: 'bg-purple-100 text-purple-800',
      behavioral: 'bg-blue-100 text-blue-800',
      cognitive: 'bg-green-100 text-green-800',
      personality: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || colors.technical;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Assessments</h3>
        <span className="text-sm text-gray-500">{assessments.length} assessments</span>
      </div>

      <div className="grid gap-4">
        {assessments.map((assessment) => (
          <div 
            key={assessment.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(assessment.status)}`}>
                  {getStatusIcon(assessment.status)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {assessment.title}
                  </h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(assessment.type)}`}>
                      {assessment.type}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{assessment.duration}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(assessment.status)}`}>
                {assessment.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-sm">
                <span className="text-gray-500">Assigned:</span>
                <span className="ml-1 text-gray-900">{new Date(assessment.assignedDate).toLocaleDateString()}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Due:</span>
                <span className="ml-1 text-gray-900">{new Date(assessment.dueDate).toLocaleDateString()}</span>
              </div>
              {assessment.status === 'completed' && assessment.score && (
                <div className="text-sm">
                  <span className="text-gray-500">Score:</span>
                  <span className="ml-1 text-gray-900 font-medium">
                    {assessment.score}/{assessment.maxScore}
                  </span>
                </div>
              )}
            </div>

            {assessment.status === 'completed' && assessment.score && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Score</span>
                  <span>{assessment.score}/{assessment.maxScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(assessment.score / (assessment.maxScore || 100)) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {assessments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Assessments Assigned</h3>
          <p className="text-gray-500">No assessments have been assigned to this candidate yet.</p>
        </div>
      )}
    </div>
  );
};

export default AssessmentsTab;