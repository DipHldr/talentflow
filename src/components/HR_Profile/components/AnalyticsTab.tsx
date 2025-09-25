import React, { useState, useEffect } from 'react';
import { BarChart3, Users, FileText, CheckCircle, TrendingUp, Clock, Target, Award } from 'lucide-react';

// Types based on your API
interface OverallAssessmentStats {
  totalTemplates: number;
  totalAssignments: number;
  totalCompletions: number;
  completionRate: number;
  overallAverageScore: number;
}

// interface AssessmentSummary {
//   assessmentId: number;
//   title: string;
//   attemptsCount: number;
//   averageScore: number;
//   passingRate?: number;
//   highestScore?: number;
//   lowestScore?: number;
// }

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, subtitle, trend, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-600">{title}</h3>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {trend && (
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
          trend.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}>
          <TrendingUp className={`w-3 h-3 ${trend.isPositive ? '' : 'rotate-180'}`} />
          <span>{Math.abs(trend.value)}%</span>
        </div>
      )}
    </div>
  </div>
);

const ProgressBar: React.FC<{ value: number; max: number; color: string; label?: string }> = ({ 
  value, max, color, label 
}) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  
  return (
    <div className="space-y-2">
      {label && <div className="flex justify-between text-sm text-slate-600">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>}
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="text-right text-xs text-slate-500">
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
};

const ScoreDistribution: React.FC<{ score: number }> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-100';
    if (score >= 60) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700">Average Score</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(score)}`}>
            {getScoreLabel(score)}
          </span>
        </div>
        <div className="relative">
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ease-out ${
                score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow-sm">{score.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AnalyticsTab: React.FC = () => {
  const [stats, setStats] = useState<OverallAssessmentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual API endpoint
      const response = await fetch('/api/assessments/stats');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Mock data for demonstration
      setStats({
        totalTemplates: 0,
        totalAssignments: 0,
        totalCompletions: 0,
        completionRate: 0.0,
        overallAverageScore: 0.0
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-8 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="text-red-500 mb-4">
            <BarChart3 className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Unable to Load Analytics</h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <button 
            onClick={fetchAnalytics}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <span>Assessment Analytics</span>
            </h1>
            <p className="text-slate-600 mt-2">Comprehensive insights into your assessment performance</p>
          </div>
          <button 
            onClick={fetchAnalytics}
            className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<FileText className="w-6 h-6 text-blue-600" />}
            title="Total Templates"
            value={stats?.totalTemplates || 0}
            subtitle="Assessment templates created"
            color="bg-blue-100"
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-indigo-600" />}
            title="Total Assignments"
            value={stats?.totalAssignments || 0}
            subtitle="Assessments assigned to candidates"
            color="bg-indigo-100"
          />
          <StatCard
            icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
            title="Completions"
            value={stats?.totalCompletions || 0}
            subtitle="Successfully submitted assessments"
            trend={{ value: 12.5, isPositive: true }}
            color="bg-emerald-100"
          />
          <StatCard
            icon={<Target className="w-6 h-6 text-amber-600" />}
            title="Completion Rate"
            value={`${stats?.completionRate || 0}%`}
            subtitle="Percentage of completed assessments"
            trend={{ value: 8.3, isPositive: true }}
            color="bg-amber-100"
          />
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Completion Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Assessment Progress</span>
              </h3>
            </div>
            <div className="space-y-6">
              <ProgressBar
                value={stats?.totalCompletions || 0}
                max={stats?.totalAssignments || 0}
                color="bg-blue-500"
                label="Completed Assessments"
              />
              <ProgressBar
                value={(stats?.totalAssignments || 0) - (stats?.totalCompletions || 0)}
                max={stats?.totalAssignments || 0}
                color="bg-amber-500"
                label="Pending Assessments"
              />
              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Active Templates</span>
                  <span className="font-semibold text-slate-900">{stats?.totalTemplates || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span>Performance Metrics</span>
              </h3>
            </div>
            <div className="space-y-6">
              <ScoreDistribution score={stats?.overallAverageScore || 0} />
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {stats?.overallAverageScore && stats.overallAverageScore >= 70 
                      ? Math.round((stats.overallAverageScore - 70) / 30 * (stats.totalCompletions || 1))
                      : 0}
                  </div>
                  <div className="text-xs text-slate-500">High Performers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-600">
                    {stats?.completionRate ? Math.round(stats.completionRate) : 0}%
                  </div>
                  <div className="text-xs text-slate-500">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">{stats?.totalTemplates || 0}</div>
              <div className="text-blue-100">Active Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{stats?.totalCompletions || 0}</div>
              <div className="text-blue-100">Total Submissions</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{stats?.overallAverageScore?.toFixed(1) || '0.0'}%</div>
              <div className="text-blue-100">Average Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

