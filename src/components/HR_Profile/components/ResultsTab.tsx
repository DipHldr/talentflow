import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, User, Calendar, Clock, Award, CheckCircle, XCircle, Loader2, AlertCircle, FileText } from 'lucide-react';
// import type { Candidate } from '@/mocks/types/candidates';
// import type { AssessmentResult } from '@/mocks/types/assesment';
interface Candidate {
  id: number;
  name: string;
  email: string;
  portfolio_skills: string[];
  portfolio_school: string;
  portfolio_degree: string;
  portfolio_summary: string;
  stage: string;
}

interface AssessmentResult {
  id: number;
  candidateId: number;
  assessmentId: number;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
  assessmentTitle: string;
  answers?: any[];
}

interface CandidateWithResults extends Candidate {
  results: AssessmentResult[];
  hasAssessments: boolean;
  latestScore?: number;
  latestAssessment?: string;
  completedDate?: string;
}

export const ResultsTab: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateWithResults[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateWithResults[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateWithResults | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  // Fetch candidates and their results
  const fetchCandidatesWithResults = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch candidates
      const candidatesResponse = await fetch(
        `/api/candidates?search=${encodeURIComponent(searchTerm)}&page=${page}&pageSize=${pageSize}`
      );
      
      if (!candidatesResponse.ok) {
        throw new Error('Failed to fetch candidates');
      }
      
      const candidatesData = await candidatesResponse.json();
      setTotal(candidatesData.total);
      
      // Fetch results for each candidate
      const candidatesWithResults = await Promise.all(
        candidatesData.data.map(async (candidate: Candidate) => {
          try {
            const resultsResponse = await fetch(`/api/candidates/${candidate.id}/results`);
            
            if (resultsResponse.ok) {
              const results: AssessmentResult[] = await resultsResponse.json();
              const hasAssessments = results.length > 0;
              
              let latestResult = null;
              if (hasAssessments) {
                latestResult = results.sort((a, b) => 
                  new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
                )[0];
              }
              
              return {
                ...candidate,
                results,
                hasAssessments,
                latestScore: latestResult ? Math.round((latestResult.score / latestResult.totalQuestions) * 100) : undefined,
                latestAssessment: latestResult?.assessmentTitle,
                completedDate: latestResult ? new Date(latestResult.completedAt).toLocaleDateString() : undefined,
              };
            }
            
            return {
              ...candidate,
              results: [],
              hasAssessments: false,
            };
          } catch (error) {
            console.warn(`Failed to fetch results for candidate ${candidate.id}:`, error);
            return {
              ...candidate,
              results: [],
              hasAssessments: false,
            };
          }
        })
      );
      
      // Filter to show only candidates with assessments
      const candidatesWithAssessments = candidatesWithResults.filter(c => c.hasAssessments);
      setCandidates(candidatesWithAssessments);
      
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = candidates;
    
    if (scoreFilter !== 'all' && scoreFilter !== '') {
      filtered = candidates.filter(candidate => {
        const score = candidate.latestScore || 0;
        switch (scoreFilter) {
          case 'passed':
            return score >= 70;
          case 'failed':
            return score < 70;
          case 'high':
            return score >= 80;
          case 'medium':
            return score >= 60 && score < 80;
          case 'low':
            return score < 60;
          default:
            return true;
        }
      });
    }
    
    setFilteredCandidates(filtered);
  }, [candidates, scoreFilter]);

  // Fetch data on component mount and when search/page changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchCandidatesWithResults();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, page]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getStatusIcon = (score: number) => {
    if (score >= 70) {
      return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    }
    return <XCircle className="w-4 h-4 text-red-600" />;
  };

  const handleExportResults = () => {
    // Export functionality
    const csvContent = filteredCandidates.map(candidate => 
      `${candidate.name},${candidate.email},${candidate.latestAssessment || 'N/A'},${candidate.latestScore || 'N/A'}%,${candidate.completedDate || 'N/A'}`
    ).join('\n');
    
    const blob = new Blob([`Name,Email,Assessment,Score,Date\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assessment_results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading assessment results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-semibold">Error loading results</p>
          <p className="text-gray-600 mt-2">{error}</p>
          <button 
            onClick={fetchCandidatesWithResults}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Assessment Results</h2>
          <p className="text-gray-600 mt-1">View and manage candidate assessment outcomes</p>
        </div>
        <button 
          onClick={handleExportResults}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <Download className="w-4 h-4" />
          <span>Export Results</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search candidates by name, email, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-48 transition-all duration-200"
            >
              <option value="all">All Scores</option>
              <option value="passed">Passed (≥70%)</option>
              <option value="failed">Failed (&lt;70%)</option>
              <option value="high">Excellent (≥80%)</option>
              <option value="medium">Good (60-79%)</option>
              <option value="low">Needs Improvement (&lt;60%)</option>
            </select>
          </div>
        </div>

        {filteredCandidates.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredCandidates.length} of {candidates.length} candidates with assessment results
          </div>
        )}
      </div>

      {/* Results Grid */}
      {filteredCandidates.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
          <p className="text-gray-600">No candidates have completed assessments yet or match your search criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Candidate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Latest Assessment</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Score</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Completed</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Total Tests</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-500">{candidate.email}</div>
                          {candidate.portfolio_skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {candidate.portfolio_skills.slice(0, 2).map((skill, index) => (
                                <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  {skill}
                                </span>
                              ))}
                              {candidate.portfolio_skills.length > 2 && (
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  +{candidate.portfolio_skills.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{candidate.latestAssessment}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getScoreColor(candidate.latestScore || 0)}`}>
                        {candidate.latestScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {getStatusIcon(candidate.latestScore || 0)}
                        <span className={`text-sm font-medium ${(candidate.latestScore || 0) >= 70 ? 'text-emerald-700' : 'text-red-700'}`}>
                          {(candidate.latestScore || 0) >= 70 ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{candidate.completedDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <Award className="w-4 h-4 mr-1" />
                        {candidate.results.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedCandidate(candidate)}
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-900 font-medium transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Results</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Results Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h3>
                  <p className="text-gray-600">{selectedCandidate.email}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedCandidate.portfolio_skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors duration-200"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Assessment Results */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 text-blue-600 mr-2" />
                    Assessment Results ({selectedCandidate.results.length})
                  </h4>
                  
                  <div className="space-y-4">
                    {selectedCandidate.results.map((result) => {
                      const scorePercentage = Math.round((result.score / result.totalQuestions) * 100);
                      const timeSpentMinutes = Math.round(result.timeSpent / 60);
                      
                      return (
                        <div key={result.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h5 className="font-semibold text-gray-900 text-lg">{result.assessmentTitle}</h5>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(result.completedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{timeSpentMinutes} minutes</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-2xl font-bold ${scorePercentage >= 80 ? 'text-emerald-600' : scorePercentage >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                {scorePercentage}%
                              </div>
                              <div className="text-sm text-gray-500">
                                {result.score}/{result.totalQuestions} correct
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg p-4 text-center">
                              <div className="text-2xl font-bold text-blue-600">{result.score}</div>
                              <div className="text-sm text-gray-500">Correct Answers</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                              <div className="text-2xl font-bold text-gray-600">{result.totalQuestions}</div>
                              <div className="text-sm text-gray-500">Total Questions</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                              <div className={`text-2xl font-bold ${scorePercentage >= 70 ? 'text-emerald-600' : 'text-red-600'}`}>
                                {scorePercentage >= 70 ? 'PASSED' : 'FAILED'}
                              </div>
                              <div className="text-sm text-gray-500">Result</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Candidate Info */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 text-blue-600 mr-2" />
                    Candidate Information
                  </h4>
                  
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Education</label>
                        <p className="text-gray-900 mt-1">{selectedCandidate.portfolio_degree || 'Not specified'}</p>
                        <p className="text-gray-600 text-sm">{selectedCandidate.portfolio_school || 'School not specified'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Current Stage</label>
                        <p className="text-gray-900 mt-1 capitalize">{selectedCandidate.stage}</p>
                      </div>
                    </div>
                    
                    {selectedCandidate.portfolio_summary && (
                      <div className="mt-6">
                        <label className="text-sm font-semibold text-gray-700">Summary</label>
                        <p className="text-gray-900 mt-2 leading-relaxed">{selectedCandidate.portfolio_summary}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex space-x-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
              <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};