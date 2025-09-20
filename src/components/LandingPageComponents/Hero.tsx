import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, Users, TrendingUp } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* --- CHANGE 1: This is the main layout change --- */}
        {/* We changed from a 2-column grid to a single, centered flex column */}
        <div className="flex flex-col items-center text-center gap-8">
          
          {/* Main Content Area */}
          <div className="space-y-6 max-w-3xl"> {/* --- CHANGE 2: Added max-width for readability --- */}
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              <TrendingUp className="h-3 w-3 mr-1" />
              #1 Job Platform 2024
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
              Find Your Dream
              <span className="block text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Career Today
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed">
              Connect with top companies, discover amazing opportunities, and take the next step in your professional journey with our AI-powered job matching platform.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-blue-white rounded-2xl shadow-xl border p-2 w-full max-w-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-1 flex items-center space-x-3 pl-4">
                <Search className="h-5 w-5 text-slate-400" />
                <Input 
                  type="text" 
                  placeholder="Job title, keywords, or company"
                  className="flex-1 border-0 outline-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-700 placeholder-slate-400"
                />
              </div>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 rounded-xl">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Link to="/jobs">
                <Search className="h-5 w-5 mr-2" />
                Browse Jobs
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 rounded-xl">
              <Users className="h-5 w-5 mr-2" />
              For Employers
            </Button>
          </div>

          {/* Stats */}
           {/* --- CHANGE 3: Added justify-center to center the items --- */}
          <div className="flex flex-wrap gap-8 pt-4 justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">2M+</div>
              <div className="text-slate-600 text-sm">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">500K+</div>
              <div className="text-slate-600 text-sm">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">10M+</div>
              <div className="text-slate-600 text-sm">Job Seekers</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

