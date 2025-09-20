import React from 'react';
import { User, MapPin, Briefcase, Star } from 'lucide-react';

const CandidatesProfile: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">John Doe</h3>
        <p className="text-slate-600 text-sm">Frontend Developer</p>
      </div>
      
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600">San Francisco, CA</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Briefcase className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600">5+ years experience</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Star className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600">Looking for new opportunities</span>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-slate-700 mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Node.js', 'Tailwind'].map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidatesProfile;