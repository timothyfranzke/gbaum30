// Info Banner Variant 3 - Styled to match Hero_variant3
import React from 'react';
import Link from 'next/link';

const InfoBannerVariant3 = () => {
  return (
    <section className="relative overflow-hidden bg-black py-20">
      {/* Background continuation from Hero */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B365D]/80 via-[#0033A0]/60 to-black"></div>
        
        {/* Subtle lens flares */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-gradient-radial from-[#1E8AFF]/20 to-transparent animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-gradient-radial from-white/15 to-transparent animate-ping opacity-30"></div>
      </div>

      {/* Decorative torn edges effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-8px] left-[15%] w-[20%] h-[8px]" style={{backgroundColor: 'rgba(27, 54, 93, 0.85)'}}></div>
        <div className="absolute bottom-[-8px] right-[25%] w-[15%] h-[8px]" style={{backgroundColor: 'rgba(27, 54, 93, 0.85)'}}></div>
        <div className="absolute left-[-8px] top-[30%] h-[15%] w-[8px]" style={{backgroundColor: 'rgba(27, 54, 93, 0.85)'}}></div>
        <div className="absolute right-[-8px] bottom-[20%] h-[20%] w-[8px]" style={{backgroundColor: 'rgba(27, 54, 93, 0.85)'}}></div>
      </div>

      <div className="relative z-10 w-full px-4 lg:px-8">
        {/* Full width content */}
        <div className="w-full">
          {/* Lens flare accents */}
          <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-gradient-radial from-white/20 to-transparent opacity-50"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 rounded-full bg-gradient-radial from-[#1E8AFF]/30 to-transparent opacity-40"></div>
          
          <div className="text-center py-8">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center space-x-3 bg-[#1E8AFF]/30 rounded-full px-6 py-2 border border-[#1E8AFF]/40">
                <div className="w-3 h-3 bg-[#1E8AFF] rounded-full animate-ping"></div>
                <span className="text-white font-bold text-sm tracking-wider">ELITE ADVANTAGE</span>
              </div>
            </div>

            {/* Main message */}
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">
              YOUR PATH TO
              <span className="text-[#1E8AFF]"> ELITE </span>
              TRAINING
            </h2>

            <p className="text-lg lg:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the <span className="text-[#1E8AFF] font-bold">Union 30 family</span> in four simple steps. 
              From your first contact to <span className="text-white font-bold">elite-level performance</span>.
            </p>

            {/* Process Steps */}
            <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-6 lg:gap-8 mb-8">
              <div className="flex-1 min-w-[200px] max-w-[300px] relative group">
                <div className="relative mb-4 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1E8AFF] rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#1E8AFF] transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-white">CONNECT</h3>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed">Tell us about your player, their environment, and background. We'll also gather some information about you and setup your free, no obligation account.</p>
                </div>
              </div>

              <div className="flex-1 min-w-[200px] max-w-[300px] relative group">
                <div className="relative mb-4 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1E8AFF] rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#1E8AFF] transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-white">COLLABORATE</h3>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed">We'll follow up to discuss your players goals, availability, and scheduling them to be evaluated in one of our sessions.</p>
                </div>
              </div>

              <div className="flex-1 min-w-[200px] max-w-[300px] relative group">
                <div className="relative mb-4 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1E8AFF] rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#1E8AFF] transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-white">ASSESS</h3>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed">Your player will join one of our sessions for an evaluation. We will follow up after with information on the group that is the best fit.</p>
                </div>
              </div>

              <div className="flex-1 min-w-[200px] max-w-[300px] relative group">
                <div className="relative mb-4 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1E8AFF] rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#1E8AFF] transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-white">COMMIT</h3>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed">You're part of the Union now! Subscribe to one of our packages and start training elite.</p>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-bold border border-white/20 hover:bg-white hover:text-[#0033A0] transition-all duration-300"
              >
                LEARN MORE
              </Link>
              <Link
                href="/contact"
                className="border-2 border-[#1E8AFF] text-[#1E8AFF] px-8 py-3 rounded-lg font-bold hover:bg-[#1E8AFF] hover:text-white transition-all duration-300"
              >
                GET STARTED
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for gradient effects */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

export default InfoBannerVariant3;