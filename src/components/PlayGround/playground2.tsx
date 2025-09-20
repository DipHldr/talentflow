import React,{useEffect} from 'react'

const playground2 = () => {
   useEffect(() => {
    // Add keyboard shortcut for search focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23334155%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22m36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="relative z-10">
        {/* Portfolio Section */}
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-8">
              {/* Photo Section */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-500 group">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="relative group/photo">
                    <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-slate-600/50 overflow-hidden relative group-hover/photo:scale-105 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 group-hover/photo:from-blue-400/20 group-hover/photo:to-purple-400/20 transition-all duration-500" />
                      <img 
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                        alt="Professional headshot"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 ring-4 ring-slate-700/20 rounded-full group-hover/photo:ring-slate-600/40 transition-all duration-500" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-slate-800 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Alex Johnson
                      </span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                      Senior Full-Stack Developer & UI/UX Designer
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                      {['Available for hire', 'Remote friendly', '5+ years experience'].map((tag, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-full text-sm border border-slate-600/30 hover:bg-slate-700/70 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">About Me</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-slate-300 leading-relaxed text-lg">
                      Passionate developer with a keen eye for design and a love for creating exceptional digital experiences. I specialize in building scalable web applications that combine beautiful interfaces with robust functionality.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers in the community.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { label: 'Location', value: 'San Francisco, CA', icon: '📍' },
                      { label: 'Experience', value: '5+ Years', icon: '💼' },
                      { label: 'Projects', value: '50+ Completed', icon: '🚀' },
                      { label: 'Focus', value: 'Full-Stack Development', icon: '⚡' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 group/item">
                        <span className="text-2xl group-hover/item:scale-110 transition-transform duration-300">
                          {item.icon}
                        </span>
                        <div>
                          <p className="text-slate-400 text-sm">{item.label}</p>
                          <p className="text-white font-semibold">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Skills & Expertise</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      category: 'Frontend', 
                      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
                      color: 'from-blue-500 to-cyan-500',
                      icon: '🎨'
                    },
                    { 
                      category: 'Backend', 
                      skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
                      color: 'from-green-500 to-emerald-500',
                      icon: '⚙️'
                    },
                    { 
                      category: 'Tools & Cloud', 
                      skills: ['Docker', 'AWS', 'Git', 'Figma'],
                      color: 'from-purple-500 to-pink-500',
                      icon: '🛠️'
                    }
                  ].map((skillGroup, groupIndex) => (
                    <div 
                      key={groupIndex}
                      className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/20 hover:bg-slate-700/40 transition-all duration-300 group/skill"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl group-hover/skill:scale-110 transition-transform duration-300">
                          {skillGroup.icon}
                        </span>
                        <h4 className="text-lg font-semibold text-white">{skillGroup.category}</h4>
                      </div>
                      
                      <div className="space-y-3">
                        {skillGroup.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="group/item">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-slate-300 text-sm font-medium">{skill}</span>
                              <span className="text-slate-400 text-xs">
                                {85 + Math.floor(Math.random() * 15)}%
                              </span>
                            </div>
                            <div className="h-2 bg-slate-600/50 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${skillGroup.color} rounded-full transition-all duration-1000 ease-out group-hover/item:animate-pulse`}
                                style={{ 
                                  width: `${85 + Math.floor(Math.random() * 15)}%`,
                                  animationDelay: `${skillIndex * 100}ms`
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Additional Skills Tags */}
                <div className="mt-8 pt-6 border-t border-slate-600/30">
                  <p className="text-slate-400 text-sm mb-4">Also experienced with:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'GraphQL', 'Redis', 'Kubernetes', 'Jest', 'Cypress', 'Webpack', 
                      'Sass', 'Vue.js', 'Express.js', 'Firebase', 'Stripe API', 'WebSockets'
                    ].map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-slate-600/30 text-slate-300 rounded-full text-xs border border-slate-500/20 hover:bg-slate-600/50 hover:border-slate-400/30 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default playground2
