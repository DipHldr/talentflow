import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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


          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">

            <Link to='/hrprofile'>
            <Button size="sm" className="w-[100px] bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all">
              Get Started
            </Button>
            </Link>
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
      </div>
    </header>
  );
}