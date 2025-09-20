import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Building, Clock } from 'lucide-react';

export function Stats() {
  const stats = [
    {
      icon: TrendingUp,
      value: '98.5%',
      label: 'Success Rate',
      description: 'Candidates find jobs within 60 days',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      value: '< 24h',
      label: 'Response Time',
      description: 'Average time to hear from employers',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Building,
      value: '2,500+',
      label: 'New Jobs Daily',
      description: 'Fresh opportunities every day',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      value: '4.9/5',
      label: 'User Rating',
      description: 'Based on 50,000+ reviews',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const companies = [
    { name: 'Google', logo: 'G' },
    { name: 'Microsoft', logo: 'M' },
    { name: 'Apple', logo: 'A' },
    { name: 'Amazon', logo: 'A' },
    { name: 'Meta', logo: 'M' },
    { name: 'Netflix', logo: 'N' },
    { name: 'Tesla', logo: 'T' },
    { name: 'Spotify', logo: 'S' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="bg-slate-100 text-slate-700">
            Trusted Worldwide
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Numbers That Speak for Themselves
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join millions of professionals who have transformed their careers through our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover-lift border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardContent className="p-8">
                <div className={`mx-auto mb-4 h-16 w-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-slate-700 mb-2">{stat.label}</div>
                <div className="text-slate-600 text-sm">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Companies Section */}
        <div className="text-center space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Trusted by Leading Companies
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              From startups to Fortune 500 companies, top employers choose TalentHub to find exceptional talent.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center space-x-3 hover:opacity-100 transition-opacity">
                <div className="h-12 w-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center">
                  <span className="text-slate-700 font-bold text-lg">{company.logo}</span>
                </div>
                <span className="text-slate-700 font-medium">{company.name}</span>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <Badge variant="secondary" className="bg-slate-100 text-slate-600">
              And 500,000+ more companies worldwide
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}