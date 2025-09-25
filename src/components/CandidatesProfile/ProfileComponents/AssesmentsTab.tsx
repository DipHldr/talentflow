import React from 'react';
import { FileText, Clock,Play,Target, BookOpen, Timer } from 'lucide-react';
import type { CreatedAssesment } from '../../../mocks/types/assesment.ts';

interface AssessmentsTabProps {
  assessments: CreatedAssesment[];
  loading?: boolean;
}

const AssessmentsTab: React.FC<AssessmentsTabProps> = ({ assessments, loading = false }) => {
  const getTopicColor = (index: number) => {
    const colors = [
      'bg-blue-50/80 text-blue-700 border-blue-200/50',
      'bg-purple-50/80 text-purple-700 border-purple-200/50',
      'bg-emerald-50/80 text-emerald-700 border-emerald-200/50',
      'bg-orange-50/80 text-orange-700 border-orange-200/50',
      'bg-pink-50/80 text-pink-700 border-pink-200/50',
      'bg-indigo-50/80 text-indigo-700 border-indigo-200/50'
    ];
    return colors[index % colors.length];
  };

  const getDifficultyLevel = (questionCount: number) => {
    if (questionCount <= 10) return { level: 'Easy', color: 'text-emerald-600', bg: 'bg-emerald-50/80' };
    if (questionCount <= 20) return { level: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50/80' };
    return { level: 'Hard', color: 'text-red-600', bg: 'bg-red-50/80' };
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Assessments</h3>
            <p className="text-gray-600 mt-1">Loading assessment data...</p>
          </div>
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 animate-pulse">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div>
                    <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-16 bg-gray-100 rounded-xl"></div>
                <div className="h-16 bg-gray-100 rounded-xl"></div>
                <div className="h-16 bg-gray-100 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (assessments.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-2xl p-12 border border-blue-100/50">
          <FileText className="w-20 h-20 text-blue-300 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">No Assessments Assigned</h3>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            No assessments have been assigned to this candidate yet. Assessments will appear here once they are created and assigned.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Assessments</h3>
          <p className="text-gray-600 mt-1">Available assessments for this candidate</p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-4 py-2 border border-blue-100/50">
          <span className="text-sm font-semibold text-blue-700">
            {assessments.length} assessment{assessments.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Assessments Grid */}
      <div className="grid gap-6">
        {assessments.map((assessment) => {
          const difficulty = getDifficultyLevel(assessment.numberOfQuestions);
          
          return (
            <div 
              key={assessment.id} 
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:border-blue-200/50 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl border shadow-sm bg-gradient-to-br from-blue-50/80 to-blue-100/50 border-blue-200/60">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {assessment.title}
                    </h4>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${difficulty.bg} ${difficulty.color}`}>
                        {difficulty.level}
                      </span>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Timer className="w-4 h-4" />
                        <span>{formatDuration(assessment.duration)}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        <span>{assessment.numberOfQuestions} questions</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-50/80 to-emerald-100/50 text-emerald-700 border border-emerald-200/60">
                  Available
                </div>
              </div>

              {/* Topics Section */}
              {assessment.topics && assessment.topics.length > 0 && (
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Topics Covered
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {assessment.topics.map((topic, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getTopicColor(index)}`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Assessment Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 rounded-xl p-4 border border-blue-200/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-600">Questions</span>
                  </div>
                  <span className="text-blue-900 font-semibold text-lg">
                    {assessment.numberOfQuestions}
                  </span>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50/50 to-purple-100/30 rounded-xl p-4 border border-purple-200/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-600">Duration</span>
                  </div>
                  <span className="text-purple-900 font-semibold text-lg">
                    {formatDuration(assessment.duration)}
                  </span>
                </div>

                <div className="bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 rounded-xl p-4 border border-emerald-200/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-600">Topics</span>
                  </div>
                  <span className="text-emerald-900 font-semibold text-lg">
                    {assessment.topics?.length || 0}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-gray-100/50">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3 px-4 font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Assessment</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentsTab;