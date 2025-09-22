import React from 'react';
import { TrendingUp, Users, Clock, Award, BarChart3 } from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const stats = [
    {
      title: 'Total Assessments',
      value: '24',
      change: '+3 this month',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Candidates',
      value: '156',
      change: '+12 this week',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Avg. Completion Time',
      value: '45min',
      change: '-5min improved',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Pass Rate',
      value: '78%',
      change: '+5% this month',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const assessmentData = [
    { name: 'Frontend Developer', completed: 45, passed: 35, avgScore: 82 },
    { name: 'Backend Developer', completed: 32, passed: 28, avgScore: 79 },
    { name: 'Data Analyst', completed: 28, passed: 22, avgScore: 85 },
    { name: 'Full Stack', completed: 38, passed: 30, avgScore: 76 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Assessment Analytics</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Assessment Performance Overview</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Assessment Type</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Completed</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Passed</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Pass Rate</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Avg Score</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {assessmentData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{item.name}</td>
                  <td className="py-4 px-4 text-center text-gray-700">{item.completed}</td>
                  <td className="py-4 px-4 text-center text-gray-700">{item.passed}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-600 font-medium">
                      {Math.round((item.passed / item.completed) * 100)}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-medium text-blue-600">{item.avgScore}%</td>
                  <td className="py-4 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.avgScore}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'John Smith completed Frontend Developer Assessment', score: '85%', time: '2 hours ago' },
            { action: 'Sarah Johnson started Backend Developer Assessment', score: 'In Progress', time: '4 hours ago' },
            { action: 'Mike Wilson was assigned Data Analyst Assessment', score: 'Pending', time: '6 hours ago' },
            { action: 'Emma Davis completed Full Stack Assessment', score: '92%', time: '1 day ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                activity.score.includes('%') 
                  ? 'bg-green-100 text-green-800' 
                  : activity.score === 'In Progress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {activity.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};