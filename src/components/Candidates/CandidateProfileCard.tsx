import React from 'react'
import { Mail, GraduationCap, Briefcase, User ,Trash2} from 'lucide-react';
import { Link } from 'react-router-dom';
import type {Candidate} from '../../mocks/types/candidates.ts';

type CandidateProfileCardProps = Candidate & {

  onDelete: (id: number) => void;
};

const CandidateProfileCard = ({
  id,
  name,
  email,
  appliedJobId,
  stage,
  portfolio_headline,
portfolio_summary,
portfolio_skills,
portfolio_experience,
portfolio_school,
portfolio_degree,
portfolio_year,
portfolio_github,
portfolio_linkedin,
portfolio_website,
portfolio_avatar,
onDelete
}:CandidateProfileCardProps) => {

// const candidate={
//   id: 1,
//   name: "Jimmy Johnson",
//   email: "qsmith@example.org",
//   appliedJobId: 12,
//   stage: "applied",
//   portfolio_headline: "Pension scheme manager",
//   portfolio_summary: "Talk use establish job health.",
//   portfolio_skills: ["Figma", "React", "Django", "GraphQL", "Python", "Node.js"],
//   portfolio_experience: 5,
//   portfolio_school: "Green-Burton University",
//   portfolio_degree: "B.Sc. Computer Science",
//   portfolio_year: 2021,
//   portfolio_github: "https://github.com/michaelrubio",
//   portfolio_linkedin: "https://linkedin.com/in/schmidtjill",
//   portfolio_website: "http://www.ball.com/",
//   portfolio_avatar: "https://i.pravatar.cc/150?img=21",
// }

  return (
     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
      {/* Header with name */}
      <div className="flex items-center gap-3 mb-4 flex-between">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
            <Link to="/profile">{name}</Link>
            
          </h3>
        </div>
        <button
           onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="text-black-500 text-sm">
          <Trash2 size={16} />
        </button>
      </div>

      {/* Contact info */}
      <div className="flex items-center gap-2 mb-4 text-gray-600">
        <Mail className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm truncate">{email}</span>
      </div>

      {/* Experience and degree */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-2 text-gray-700">
          <Briefcase className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span className="text-sm">
            <span className="font-medium text-gray-900">Experience:</span> {portfolio_experience}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <GraduationCap className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className="text-sm">
            <span className="font-medium text-gray-900">Degree:</span> {portfolio_degree}
          </span>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-900">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {portfolio_skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 hover:border-blue-300 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CandidateProfileCard;
