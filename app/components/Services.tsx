import React from 'react';

const ServicesSection = () => {
  return (
    <section className="py-20 relative">
      {/* Midnight background for top half */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-midnight"></div>
      {/* White background for bottom half */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-1"></div>
      
      {/* Background image positioned to extend from bottom of midnight section past the top */}
      <div className="absolute left-0 top-[-100px]  z-0">
        <div className="w-full h-full bg-no-repeat bg-left-bottom " style={{
          backgroundImage: 'url("bw_bg_2.png")',
          backgroundSize: 'contain',
          width: '900px',
          height: '900px',
          opacity: 0.35,
          transform: 'translateY(-30%)'
        }}></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our <span className='text-secondary'>Services</span>
          </h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Comprehensive goalkeeper development through training, analysis, and mentoring
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Training Card - Primary Color (Blue) - Image bottom, text above */}
          <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div style={{ backgroundColor: '#0033A0' }} className="text-white h-full flex flex-col">
              {/* Text Content */}
              <div className="p-8 pb-4">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Training</h3>
                </div>
                
                <p className="text-white/90 mb-6 leading-relaxed">
                  More than just shot stopping; developing the whole player from the ground up sets us apart.
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    <span>Set position</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    <span>Footwork</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    <span>Handling</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    <span>Distribution</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    <span>Communication</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    <span>Save selection</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm mt-3 italic">...and so much more!</p>
              </div>
              
              {/* Image at bottom */}
              <div className="mt-auto h-48 bg-gradient-to-t from-black/30 to-transparent">
                <img 
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Goalkeeper training" 
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
            </div>
          </div>

          {/* Analysis Card - Midnight Color - Image top, text below */}
          <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div style={{ backgroundColor: '#1B365D' }} className="text-white h-full flex flex-col">
              {/* Image at top */}
              <div className="h-48 bg-gradient-to-b from-black/30 to-transparent">
                <img 
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Video analysis" 
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
              
              {/* Text Content */}
              <div className="p-8 pt-4 flex-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Analysis</h3>
                </div>
                
                <p className="text-white/90 leading-relaxed">
                  Honest assessment and self-reflection are the cornerstone of development. Our analysis services are tailored to the individual by combining video footage from training and match play with one on one review and assessment.
                </p>
                
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center text-sm">
                    <div style={{ backgroundColor: '#1E8AFF' }} className="w-3 h-3 rounded-full mr-3"></div>
                    <span>Video review & breakdown</span>
                  </div>
                  <div className="flex items-center text-sm mt-2">
                    <div style={{ backgroundColor: '#1E8AFF' }} className="w-3 h-3 rounded-full mr-3"></div>
                    <span>Performance metrics tracking</span>
                  </div>
                  <div className="flex items-center text-sm mt-2">
                    <div style={{ backgroundColor: '#1E8AFF' }} className="w-3 h-3 rounded-full mr-3"></div>
                    <span>Individual development plans</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mentoring Card - Secondary Color (Bluegrass) - Text only */}
          <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div style={{ backgroundColor: '#1E8AFF' }} className="text-white h-full">
              <div className="p-8 h-full flex flex-col">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Mentoring</h3>
                </div>
                
                {/* Relationship Building */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 uppercase tracking-wide text-white/90">Relationship Building</h4>
                  <p className="text-white/90 leading-relaxed">
                    We take the time to get to know your player as a person. More than just a number, they are part of the Union!
                  </p>
                </div>
                
                {/* Goal Setting */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 uppercase tracking-wide text-white/90">Goal Setting</h4>
                  <p className="text-white/90 leading-relaxed">
                    We teach our players how to set S.M.A.R.T goals and help them understand that progress is rarely linear.
                  </p>
                </div>
                
                {/* Evaluation */}
                <div className="mt-auto">
                  <h4 className="text-lg font-bold mb-3 uppercase tracking-wide text-white/90">Evaluation</h4>
                  <p className="text-white/90 leading-relaxed">
                    With goals in hand, we regularly assess your player so you and they understand how they're progressing.
                  </p>
                </div>
                
                {/* Decorative element */}
                <div className="mt-6 flex justify-center">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <button 
            className="btn-primary"
          >
            GET STARTED TODAY
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;