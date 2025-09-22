import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Star } from 'lucide-react';

interface CandidateResult {
  id: string;
  name: string;
  email: string;
  assessment: string;
  score: number;
  completedDate: string;
  duration: string;
  status: 'passed' | 'failed';
  details: {
    correct: number;
    total: number;
    topics: { name: string; score: number }[];
  };
}

export const ResultsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [selectedResult, setSelectedResult] = useState<CandidateResult | null>(null);

  const [results] = useState<CandidateResult[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      assessment: 'Frontend Developer Assessment',
      score: 85,
      completedDate: '2024-01-15',
      duration: '87 min',
      status: 'passed',
      details: {
        correct: 21,
        total: 25,
        topics: [
          { name: 'React', score: 90 },
          { name: 'JavaScript', score: 85 },
          { name: 'CSS', score: 80 },
        ],
      },
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      assessment: 'Backend Developer Assessment',
      score: 92,
      completedDate: '2024-01-14',
      duration: '95 min',
      status: 'passed',
      details: {
        correct: 28,
        total: 30,
        topics: [
          { name: 'Node.js', score: 95 },
          { name: 'Database', score: 88 },
          { name: 'API Design', score: 93 },
        ],
      },
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      assessment: 'Data Analyst Assessment',
      score: 72,
      completedDate: '2024-01-13',
      duration: '78 min',
      status: 'passed',
      details: {
        correct: 14,
        total: 20,
        topics: [
          { name: 'SQL', score: 75 },
          { name: 'Python', score: 70 },
          { name: 'Statistics', score: 71 },
        ],
      },
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      assessment: 'Frontend Developer Assessment',
      score: 58,
      completedDate: '2024-01-12',
      duration: '92 min',
      status: 'failed',
      details: {
        correct: 14,
        total: 25,
        topics: [
          { name: 'React', score: 65 },
          { name: 'JavaScript', score: 55 },
          { name: 'CSS', score: 54 },
        ],
      },
    },
  ]);

  const filteredResults = results.filter(result => {
    const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.assessment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesScore = scoreFilter === 'all' ||
                        (scoreFilter === 'passed' && result.status === 'passed') ||
                        (scoreFilter === 'failed' && result.status === 'failed') ||
                        (scoreFilter === 'high' && result.score >= 80) ||
                        (scoreFilter === 'medium' && result.score >= 60 && result.score < 80) ||
                        (scoreFilter === 'low' && result.score < 60);
    
    return matchesSearch && matchesScore;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    return status === 'passed' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Assessment Results</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Results</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, or assessment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Results</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="high">High Score (80%+)</option>
              <option value="medium">Medium Score (60-79%)</option>
              <option value="low">Low Score (&lt;60%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{result.name}</div>
                      <div className="text-sm text-gray-500">{result.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result.assessment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(result.score)}`}>
                      {result.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {result.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {result.completedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => setSelectedResult(result)}
                      className="text-blue-600 hover:text-blue-900 flex items-center space-x-1 mx-auto"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedResult.name}</h3>
                <p className="text-gray-600">{selectedResult.assessment}</p>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${selectedResult.score >= 80 ? 'text-green-600' : selectedResult.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {selectedResult.score}%
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Overall Score</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {selectedResult.details.correct}/{selectedResult.details.total}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Questions Correct</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Topic Breakdown</h4>
              <div className="space-y-4">
                {selectedResult.details.topics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{topic.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${topic.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {topic.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
              <div>
                <span className="font-medium">Completion Date:</span>
                <div>{selectedResult.completedDate}</div>
              </div>
              <div>
                <span className="font-medium">Duration:</span>
                <div>{selectedResult.duration}</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200">
                Download Report
              </button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors duration-200">
                Send to Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};