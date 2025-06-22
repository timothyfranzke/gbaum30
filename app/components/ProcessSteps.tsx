import React from 'react';

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Connect",
      description: "Tell us about your player, their environment, and background. We'll also gather some information about you and setup your free, no obligation account.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      number: "02", 
      title: "Collaborate",
      description: "We'll follow up to discuss your players goals, availability, and scheduling them to be evaluated in one of our sessions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Assess", 
      description: "Your player will join one of our sessions for an evaluation. We will follow up after with information on the group that is the best fit.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Commit",
      description: "You're part of the Union now! Subscribe to one of our packages and start training elite.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-midnight">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Join the <span className="text-secondary">Union</span>
          </h2>
        </div>

        {/* Semi-transparent midnight colored card around processes */}
        <div className="p-8 md:p-12 rounded-lg shadow-xl newspaper-clip-box relative mb-16" style={{ backgroundColor: 'rgba(80, 114, 148, 0.85)' }}>
          {/* Rough edges for newspaper clipping effect */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[-8px] left-[15%] w-[20%] h-[8px]" style={{ backgroundColor: 'rgba(27, 54, 93, 0.85)' }}></div>
            <div className="absolute bottom-[-8px] right-[25%] w-[15%] h-[8px]" style={{ backgroundColor: 'rgba(27, 54, 93, 0.85)' }}></div>
            <div className="absolute left-[-8px] top-[30%] h-[15%] w-[8px]" style={{ backgroundColor: 'rgba(27, 54, 93, 0.85)' }}></div>
            <div className="absolute right-[-8px] bottom-[20%] h-[20%] w-[8px]" style={{ backgroundColor: 'rgba(27, 54, 93, 0.85)' }}></div>
          </div>
          
          <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-6 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 min-w-[200px] max-w-[300px] relative group">
                {/* Icon with number overlay */}
                <div className="relative mb-4 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary rounded-full flex items-center justify-center text-white group-hover:bg-sky transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-sm sm:text-base text-white leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <a
            href="/train"
            className="btn-outline"
          >Join the Union
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;