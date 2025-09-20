import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCheck, FileText, MessageSquare, Handshake, Building, Users, Eye, CheckCircle, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const jobSeekerSteps = [
    {
      icon: UserCheck,
      title: 'Create Your Profile',
      description: 'Build a comprehensive profile showcasing your skills, experience, and career aspirations.',
      details: 'Upload your resume, add portfolio links, and let our AI optimize your profile for maximum visibility.',
      time: '5 min'
    },
    {
      icon: FileText,
      title: 'Discover & Apply',
      description: 'Browse personalized job recommendations and apply with one click using smart application tools.',
      details: 'Get AI-powered job matches, salary insights, and company culture information to make informed decisions.',
      time: '2 min per job'
    },
    {
      icon: MessageSquare,
      title: 'Connect & Interview',
      description: 'Engage with recruiters, schedule interviews, and showcase your potential through our platform.',
      details: 'Use our interview preparation tools, video calling features, and real-time feedback system.',
      time: 'Varies'
    },
    {
      icon: Handshake,
      title: 'Land Your Dream Job',
      description: 'Negotiate offers, finalize terms, and start your new career journey with confidence.',
      details: 'Get salary negotiation tips, contract review assistance, and onboarding support.',
      time: '1-2 weeks'
    }
  ];

  const employerSteps = [
    {
      icon: Building,
      title: 'Post Your Jobs',
      description: 'Create compelling job postings with detailed requirements and company information.',
      details: 'Use our job posting templates, salary benchmarking tools, and employer branding features.',
      time: '10 min'
    },
    {
      icon: Users,
      title: 'Attract Top Talent',
      description: 'Reach qualified candidates through our AI-powered matching and promotion system.',
      details: 'Leverage our talent pool, social media promotion, and targeted advertising capabilities.',
      time: 'Automatic'
    },
    {
      icon: Eye,
      title: 'Review Applications',
      description: 'Efficiently screen candidates using our advanced filtering and assessment tools.',
      details: 'Access candidate insights, skill assessments, and collaborative hiring workflows.',
      time: '30 min per role'
    },
    {
      icon: CheckCircle,
      title: 'Hire Successfully',
      description: 'Make informed hiring decisions and onboard new team members seamlessly.',
      details: 'Use our offer management, background check integration, and onboarding automation.',
      time: '1 week'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 gradient-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="bg-white/80 text-slate-700">
            How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Your Path to Success
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Whether you're looking for your next opportunity or searching for top talent, 
            our streamlined process makes it simple and effective.
          </p>
        </div>

        <Tabs defaultValue="job-seekers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-12 bg-white shadow-lg rounded-2xl p-2">
            <TabsTrigger value="job-seekers" className="text-base font-medium rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-300 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg">
              For Job Seekers
            </TabsTrigger>
            <TabsTrigger value="employers" className="text-base font-medium rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-300 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg">
              For Employers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="job-seekers">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {jobSeekerSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="h-full hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-3 -left-3 h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <Badge variant="secondary" className="mb-2 bg-slate-100 text-slate-600 text-xs">
                        ~{step.time}
                      </Badge>
                      <CardTitle className="text-lg text-slate-900">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="mb-4 text-slate-600">
                        {step.description}
                      </CardDescription>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {step.details}
                      </p>
                    </CardContent>
                  </Card>
                  {index < jobSeekerSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-xl shadow-lg">
                Start Your Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="employers">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {employerSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="h-full hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-3 -left-3 h-8 w-8 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <Badge variant="secondary" className="mb-2 bg-slate-100 text-slate-600 text-xs">
                        ~{step.time}
                      </Badge>
                      <CardTitle className="text-lg text-slate-900">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="mb-4 text-slate-600">
                        {step.description}
                      </CardDescription>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {step.details}
                      </p>
                    </CardContent>
                  </Card>
                  {index < employerSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-xl shadow-lg">
                Post Your First Job
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}