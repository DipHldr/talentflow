import React from 'react';
import { Building2, MapPin, Calendar, DollarSign } from 'lucide-react';
import type { JobApplication } from '../mockType';

interface JobApplicationsTabProps {
  applications: JobApplication[];
}

const JobApplicationsTab: React.FC<JobApplicationsTabProps> = ({ applications }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewing: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      interview: 'bg-purple-100 text-purple-800',
      offered: 'bg-emerald-100 text-emerald-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Job Applications</h3>
        <span className="text-sm text-gray-500">{applications.length} applications</span>
      </div>

      <div className="grid gap-4">
        {applications.map((application) => (
          <div 
            key={application.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {application.jobTitle}
                    </h4>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="text-sm">{application.company}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(application.status)}`}>
                    {application.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{application.location}</span>
                  </div>
                  {application.salary && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>{application.salary}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
          <p className="text-gray-500">This candidate hasn't applied to any jobs yet.</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationsTab;