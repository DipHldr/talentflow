import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Users, Sparkles, CheckCircle } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
            <Sparkles className="h-3 w-3 mr-1" />
            Limited Time Offer
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Ready to Transform
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Career?
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Join over 10 million professionals who have found their dream jobs or hired exceptional talent through our AI-powered platform.
          </p>

          {/* Features List */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
              <span className="text-slate-300">AI-powered job matching</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
              <span className="text-slate-300">One-click applications</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
              <span className="text-slate-300">Real-time salary insights</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
              <span className="text-slate-300">Verified companies only</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
              <span className="text-slate-300">24/7 career support</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
              <span className="text-slate-300">Global opportunities</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all">
              <Search className="h-5 w-5 mr-2" />
              Find Your Dream Job
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 rounded-xl backdrop-blur-sm">
              <Users className="h-5 w-5 mr-2" />
              Hire Top Talent
            </Button>
          </div>

          <div className="pt-8 space-y-2">
            <p className="text-slate-400 text-sm">
              ✨ Free to get started • No credit card required • 5-minute setup
            </p>
            <p className="text-slate-500 text-xs">
              Join 500,000+ companies and 10M+ job seekers worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}