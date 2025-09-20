import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, Zap, Users, TrendingUp, Clock, Brain, Target, Globe, Award } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Matching',
      description: 'Our advanced AI analyzes your skills, experience, and preferences to find the perfect job matches.',
      badge: 'Smart',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Verified Companies',
      description: 'All companies are thoroughly vetted and verified to ensure legitimate opportunities and safe applications.',
      badge: 'Trusted',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'One-Click Apply',
      description: 'Apply to multiple jobs instantly with your saved profile and AI-generated personalized cover letters.',
      badge: 'Fast',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'Advanced filters help you find exactly what you\'re looking for - location, salary, company size, and more.',
      badge: 'Accurate',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Get real-time salary data, industry trends, and career growth insights to make informed decisions.',
      badge: 'Data-Driven',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Globe,
      title: 'Global Opportunities',
      description: 'Access job opportunities from companies worldwide, including remote and hybrid positions.',
      badge: 'Worldwide',
      color: 'from-teal-500 to-blue-500'
    },
    {
      icon: Users,
      title: 'Talent Network',
      description: 'Connect with recruiters, industry professionals, and build meaningful career relationships.',
      badge: 'Connected',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Career Growth',
      description: 'Access exclusive career development resources, courses, and mentorship opportunities.',
      badge: 'Growth',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant notifications about application status, new matches, and interview invitations.',
      badge: 'Live',
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="bg-slate-100 text-slate-700">
            Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Powerful tools and intelligent features designed to accelerate your job search 
            and connect you with the right opportunities faster than ever before.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover-lift border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-slate-900 group-hover:text-slate-700 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-slate-600 mb-4">
            <span className="h-px w-8 bg-slate-300"></span>
            <span className="text-sm font-medium">And much more</span>
            <span className="h-px w-8 bg-slate-300"></span>
          </div>
          <p className="text-slate-500">
            Join over 10 million professionals who trust TalentHub for their career growth
          </p>
        </div>
      </div>
    </section>
  );
}