import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Software Engineer',
      company: 'Google',
      image: 'SC',
      content: 'TalentHub completely transformed my job search. The AI matching was incredibly accurate, and I landed my dream job at Google within 3 weeks!',
      rating: 5,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Product Manager',
      company: 'Microsoft',
      image: 'MR',
      content: 'As a hiring manager, TalentHub has been a game-changer. The quality of candidates and the streamlined process saved us months of recruiting time.',
      rating: 5,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Emily Watson',
      role: 'UX Designer',
      company: 'Airbnb',
      image: 'EW',
      content: 'The platform is incredibly intuitive and the job recommendations were spot-on. I found multiple opportunities that perfectly matched my skills and interests.',
      rating: 5,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'David Kim',
      role: 'Data Scientist',
      company: 'Netflix',
      image: 'DK',
      content: 'The salary insights and company culture information helped me make informed decisions. I negotiated a 40% salary increase thanks to their market data!',
      rating: 5,
      color: 'from-amber-500 to-orange-500'
    },
    {
      name: 'Lisa Thompson',
      role: 'HR Director',
      company: 'Spotify',
      image: 'LT',
      content: 'We\'ve hired 15+ exceptional candidates through TalentHub. The platform\'s screening tools and candidate insights are incredibly valuable.',
      rating: 5,
      color: 'from-rose-500 to-pink-500'
    },
    {
      name: 'Alex Johnson',
      role: 'Full Stack Developer',
      company: 'Tesla',
      image: 'AJ',
      content: 'The one-click apply feature and personalized cover letters saved me hours. I applied to 50+ jobs in a day and got multiple interviews!',
      rating: 5,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className="py-24 gradient-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="bg-white/80 text-slate-700">
            Success Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            What Our Users Say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real stories from professionals who found their dream jobs and companies who hired exceptional talent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm relative overflow-hidden">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-12 w-12 text-slate-400" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className={`h-12 w-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-sm">{testimonial.image}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                    <div className="text-sm text-slate-500">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex justify-center items-center space-x-8 text-slate-600">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="h-4 w-px bg-slate-300"></div>
            <div>
              <span className="font-semibold">50,000+ Reviews</span>
            </div>
            <div className="h-4 w-px bg-slate-300"></div>
            <div>
              <span className="font-semibold">98% Satisfaction</span>
            </div>
          </div>
          <p className="text-slate-500">
            Join thousands of satisfied users who transformed their careers with TalentHub
          </p>
        </div>
      </div>
    </section>
  );
}