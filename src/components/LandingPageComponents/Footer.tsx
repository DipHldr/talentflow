import { Briefcase, Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">TalentHub</span>
                <Badge variant="secondary" className="ml-2 text-xs">Pro</Badge>
              </div>
            </div>
            <p className="text-slate-600 max-w-md leading-relaxed">
              The world's leading job platform connecting exceptional talent with forward-thinking companies. 
              Transform your career or build your dream team with AI-powered matching.
            </p>
            <div className="flex space-x-4">
              <div className="h-10 w-10 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                <Twitter className="h-5 w-5 text-slate-600" />
              </div>
              <div className="h-10 w-10 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                <Linkedin className="h-5 w-5 text-slate-600" />
              </div>
              <div className="h-10 w-10 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                <Github className="h-5 w-5 text-slate-600" />
              </div>
              <div className="h-10 w-10 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                <Mail className="h-5 w-5 text-slate-600" />
              </div>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 text-lg">Job Seekers</h3>
            <ul className="space-y-3 text-slate-600">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Career Advice</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Resume Builder</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Interview Prep</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Salary Guide</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Skills Assessment</a></li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 text-lg">Employers</h3>
            <ul className="space-y-3 text-slate-600">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Post Jobs</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Browse Talent</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Pricing Plans</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Hiring Solutions</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Employer Branding</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 text-lg">Company</h3>
            <ul className="space-y-3 text-slate-600">
              <li><a href="#" className="hover:text-slate-900 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t pt-8 mt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Get in Touch</h4>
              <div className="space-y-2 text-slate-600">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4" />
                  <span>123 Innovation Drive, San Francisco, CA 94105</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4" />
                  <span>hello@talenthub.com</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Legal</h4>
              <div className="flex flex-wrap gap-6 text-slate-600 text-sm">
                <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-slate-900 transition-colors">GDPR</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 text-center">
          <p className="text-slate-500">
            &copy; 2024 TalentHub. All rights reserved. Built with ❤️ for connecting exceptional talent worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}