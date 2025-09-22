import React from 'react';
import { MapPin, Mail, Phone, Calendar, Star, School, GraduationCap, Github, GitBranch } from 'lucide-react';
// import type { Candidate } from '../../../mocks/types/candidates.ts';
// import type { Candidate } from '../CandidatesProfile/mockType.ts';
import type {Candidate} from '../../../mocks/types/candidates';
interface ProfileHeaderProps {
  candidates: Candidate;
}


// id: number;
//   name: string;
//   email: string;
//   appliedJobId: number;
//   stage: string;

//   // Portfolio fields
//   portfolio_headline: string;
//   portfolio_summary: string;
//   portfolio_skills: string[];
//   portfolio_experience: number; // you can use number of years or count of experience items
//   portfolio_school: string;
//   portfolio_degree: string;
//   portfolio_year: number;
//   portfolio_github: string;
//   portfolio_linkedin: string;
//   portfolio_website: string;
//   portfolio_avatar: string;

    //  const candidate = {
    //       id:  '101',
    //       name: 'Sarah Johnson',
    //       email: 'sarah.johnson@email.com',
    //       phone: '+1 (555) 123-4567',
    //       position: 'Senior Frontend Developer',
    //       location: 'San Francisco, CA',
    //       experience: '5+ years',
    //       skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'CSS', 'HTML', 'Git', 'Agile'],
    //       status: 'interviewing',
    //       joinedDate: '2024-01-01'
    //     };


// const candidates={
//     id: 1,
//     name: "Elena Rodriguez",
//     email: "elena.rodriguez@example.com",
//     appliedJobId: 101,
//     stage: "Interview",
//     portfolio_headline: "Senior Frontend Developer | React & TypeScript Expert",
//     portfolio_summary: "A creative and detail-oriented frontend developer with over 8 years of experience building scalable, accessible, and user-friendly web applications.",
//     portfolio_skills: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS", "Figma"],
//     portfolio_experience: 8,
//     portfolio_school: "State University of Technology",
//     portfolio_degree: "Bachelor of Science in Computer Science",
//     portfolio_year: 2017,
//     portfolio_github: "https://github.com/elenarodriguez",
//     portfolio_linkedin: "https://linkedin.com/in/elenarodriguez",
//     portfolio_website: "https://elena.dev",
//     portfolio_avatar: "https://i.pravatar.cc/150?u=1",
//   }
const ProfileHeader: React.FC<ProfileHeaderProps> = ({candidates}) => {
  // candidate=mockCandidate
  
    const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      interviewing: 'bg-blue-100 text-blue-800',
      hired: 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-8 mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {candidates.name&&(
              candidates.name.split(' ').map((n:string) => n[0]).join('')
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{candidates.name}</h1>
              <p className="text-xl text-blue-600 font-medium mb-3">{candidates.portfolio_headline}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(candidates.stage)}`}>
              {candidates.stage}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-2" />
              <span className="text-sm">{candidates.email}</span>
            </div>
            {candidates.portfolio_school && (
              <div className="flex items-center text-gray-600">
                <School className="w-5 h-5 mr-2" />
                <span className="text-sm">{candidates.portfolio_school}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <GraduationCap className="w-5 h-5 mr-2" />
              <span className="text-sm">{candidates.portfolio_degree}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <GitBranch className="w-5 h-5 mr-2" />
              <span className="text-sm">Github {candidates.portfolio_github}</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Experience: <span className="font-medium text-gray-900">{candidates.portfolio_experience}</span></p>
          </div>

          <div className="flex flex-wrap gap-2">
            {candidates.portfolio_skills.map((skill:string, index:number) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;