import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TacticalEdgeSection = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative w-full max-w-[600px] mx-auto order-2 md:order-1">
            <img
              src="/drone-analysis.jpg" // Replace with your actual drone image
              alt="Tactical Edge Analysis with Drone"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-500 p-4 rounded-lg shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="newspaper-clip-box p-6 md:p-8 bg-black bg-opacity-70 relative transform rotate-[1deg] border-4 border-blue-500 shadow-xl">
              {/* Rough edges for newspaper clipping effect */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-8px] right-[15%] w-[20%] h-[8px] bg-black"></div>
                <div className="absolute bottom-[-8px] left-[25%] w-[15%] h-[8px] bg-black"></div>
                <div className="absolute right-[-8px] top-[30%] h-[15%] w-[8px] bg-black"></div>
                <div className="absolute left-[-8px] bottom-[20%] h-[20%] w-[8px] bg-black"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6">Tactical Edge Analysis</h2>
                <p className="text-xl mb-8 text-gray-300">
                  Utilizing our Mavic Pro drone we will record, analyze, and provide feedback on your player during a match. 
                  The combination of the drone and our analysis will help them identify trends, and view tactical situations 
                  from a unique angle. In addition, we will provide copies of your footage for use in recruiting or self-guided study.
                </p>
                <p className="text-lg mb-8 text-gray-300">
                  We offer a few packages to meet your needs. Contact us about your session.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-blue-600 transition text-center"
                  >
                    Request Analysis
                  </Link>
                  <Link
                    href="/packages"
                    className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white hover:text-gray-900 transition text-center"
                  >
                    View Packages
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TacticalEdgeSection;
