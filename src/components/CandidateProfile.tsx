import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Globe, 
  MapPin, 
  Calendar,
  GraduationCap,
  User,
  Star,
  ExternalLink,
  Briefcase
} from 'lucide-react';

interface CandidateData {
  id: number;
  name: string;
  email: string;
  appliedJobId: number;
  stage: string;
  portfolio: {
    headline: string;
    summary: string;
    skills: string[];
    projects: any[];
    experience: any[];
    education: Array<{
      school: string;
      degree: string;
      year: number;
    }>;
    github: string;
    linkedin: string;
    website: string;
    avatar: string;
  };
}

const candidateData: CandidateData = {
  id: 1,
  name: "Adam Bryan",
  email: "melissa34@example.net",
  appliedJobId: 17,
  stage: "applied",
  portfolio: {
    headline: "Press photographer",
    summary: "Buy item no company network great. Most save one coach.",
    skills: ["Figma", "Node.js", "AWS", "Postgres", "TypeScript", "Django", "Tailwind"],
    projects: [],
    experience: [],
    education: [
      {
        school: "Ball and Sons University",
        degree: "B.Sc. Computer Science",
        year: 2015,
      }
    ],
    github: "https://github.com/marc75",
    linkedin: "https://linkedin.com/in/poncetiffany",
    website: "https://www.bentley.org/",
    avatar: "https://i.pravatar.cc/150?img=21",
  }
};

// Categorize skills for better organization
const categorizeSkills = (skills: string[]) => {
  const categories = {
    "Frontend": ["Figma", "Tailwind", "React", "Vue", "Angular"],
    "Backend": ["Node.js", "Django", "Express", "FastAPI"],
    "Database": ["Postgres", "MongoDB", "MySQL", "Redis"],
    "Cloud": ["AWS", "Azure", "GCP", "Docker"],
    "Languages": ["TypeScript", "JavaScript", "Python", "Java", "Go"]
  };

  const categorized: { [key: string]: string[] } = {};
  const uncategorized: string[] = [];

  skills.forEach(skill => {
    let found = false;
    for (const [category, categorySkills] of Object.entries(categories)) {
      if (categorySkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
        if (!categorized[category]) categorized[category] = [];
        categorized[category].push(skill);
        found = true;
        break;
      }
    }
    if (!found) {
      uncategorized.push(skill);
    }
  });

  if (uncategorized.length > 0) {
    categorized["Other"] = uncategorized;
  }

  return categorized;
};

const CandidateProfile: React.FC = () => {
  const categorizedSkills = categorizeSkills(candidateData.portfolio.skills);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Photo Section */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/60 transition-all duration-300">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group">
              <div className="relative">
                <img
                  src={candidateData.portfolio.avatar}
                  alt={candidateData.name}
                  className="w-32 h-32 rounded-2xl object-cover ring-4 ring-slate-600/50 group-hover:ring-slate-500/70 transition-all duration-300 shadow-2xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-slate-900/20 to-transparent group-hover:from-slate-800/30 transition-all duration-300" />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {candidateData.name}
                </h1>
                <p className="text-xl text-slate-300 font-medium">
                  {candidateData.portfolio.headline}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="outline" className="border-slate-600 text-slate-300 bg-slate-800/50">
                    <User className="w-3 h-3 mr-1" />
                    ID: {candidateData.id}
                  </Badge>
                  <Badge variant="outline" className="border-emerald-600 text-emerald-300 bg-emerald-900/30">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {candidateData.stage}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/60 transition-all duration-300">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-slate-400" />
            About
          </h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed text-lg">
              {candidateData.portfolio.summary}
            </p>
            
            <Separator className="bg-slate-700/50" />
            
            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
                <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                  <a href={`mailto:${candidateData.email}`} className="hover:underline">
                    {candidateData.email}
                  </a>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3">Links</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500"
                    onClick={() => window.open(candidateData.portfolio.github, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500"
                    onClick={() => window.open(candidateData.portfolio.linkedin, '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500"
                    onClick={() => window.open(candidateData.portfolio.website, '_blank')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-700/50" />

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-slate-400" />
                Education
              </h3>
              {candidateData.portfolio.education.map((edu, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-slate-800/40 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                  <div className="bg-slate-700 p-2 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-slate-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{edu.degree}</h4>
                    <p className="text-slate-300">{edu.school}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-400">{edu.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/60 transition-all duration-300">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-slate-400" />
            Skills & Technologies
          </h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(categorizedSkills).map(([category, skills]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-medium text-white border-l-4 border-slate-500 pl-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-slate-800/60 text-slate-200 border border-slate-600/50 hover:bg-slate-700/80 hover:border-slate-500/70 transition-all duration-200 cursor-default px-3 py-1.5 text-sm font-medium"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t border-slate-700/50">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">
                Total Skills: {candidateData.portfolio.skills.length}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-400">Actively expanding skillset</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateProfile;