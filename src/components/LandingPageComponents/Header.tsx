import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900">TalentHub</span>
              <Badge variant="secondary" className="ml-2 text-xs">Pro</Badge>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#jobs" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group">
              Find Jobs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
            </a>
            <a href="#companies" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group">
              Companies
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
            </a>
            <a href="#resources" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group">
              Resources
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
              Sign In
            </Button>
            <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-slate-600" />
            ) : (
              <Menu className="h-5 w-5 text-slate-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <a href="#jobs" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Find Jobs
              </a>
              <a href="#companies" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Companies
              </a>
              <a href="#resources" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Resources
              </a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Pricing
              </a>
              <div className="flex flex-col space-y-3 pt-4 border-t">
                <Button variant="ghost" size="sm" className="justify-start">
                  Sign In
                </Button>
                <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}