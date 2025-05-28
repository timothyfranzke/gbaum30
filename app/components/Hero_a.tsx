import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ServiceCards from './ServiceCards';

const HeroA = () => {
  return (
    <>
      <section 
        className="min-h-screen flex items-center relative pt-20 bg-cover bg-center md:bg-fixed overflow-hidden"
        style={{
          backgroundImage: `url('/bg_3.jpeg')`
        }}
      >
        <div className="absolute inset-0 bg-[#1B365D] bg-opacity-60"></div>
        
        <div className="container mx-auto px-4 w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side content */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <div className="newspaper-clip-box p-6 md:p-8 bg-[#1B365D] bg-opacity-80 relative border-4 border-[#0033A0] shadow-xl">
                {/* Rough edges for newspaper clipping effect */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-[-8px] left-[15%] w-[20%] h-[8px] bg-[#1B365D]"></div>
                  <div className="absolute bottom-[-8px] right-[25%] w-[15%] h-[8px] bg-[#1B365D]"></div>
                  <div className="absolute left-[-8px] top-[30%] h-[15%] w-[8px] bg-[#1B365D]"></div>
                  <div className="absolute right-[-8px] bottom-[20%] h-[20%] w-[8px] bg-[#1B365D]"></div>
                </div>
                
                <div className="relative z-10">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 break-words text-white">
                    THE ULTIMATE <span className="bg-gradient-to-r from-[#0033A0] to-[#1E8AFF] bg-clip-text text-transparent">FOOTBALL</span><br />
                    EXPERIENCE
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-200">
                    Join AG30 Goalkeeper Academy for world-class training and development opportunities.
                  </p>
                  
                  {/* Diagonal squared-off buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/train"
                      className="inline-block bg-[#0033A0] text-white font-bold py-4 px-8 text-center hover:bg-[#1B365D] transition-colors"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
                      }}
                    >
                      JOIN NOW
                    </Link>
                    <Link
                      href="/watch"
                      className="inline-block bg-[#1E8AFF] text-white font-bold py-4 px-8 text-center hover:bg-[#0033A0] transition-colors ml-0 sm:ml-[-10px]"
                      style={{
                        clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
                      }}
                    >
                      WATCH TRAILER
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-[500px]">
                <Image
                  src="/goalkeeper.jpeg" 
                  alt="Elite Goalkeeper"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Service Cards Section */}
          <ServiceCards />
        </div>
      </section>
    </>
  );
};

export default HeroA;