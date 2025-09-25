import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

interface ProfileHeaderProps {
  hrData: {
    name: string;
    email: string;
    phone: string;
    department: string;
    location: string;
    avatar: string;
  };
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ hrData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{hrData.name}</h1>
          <p className="text-lg text-blue-600 font-medium mb-3">{hrData.department}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <span>{hrData.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-blue-500" />
              <span>{hrData.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{hrData.location}</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};