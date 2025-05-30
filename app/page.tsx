'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navigation from "./components/Navigation";
import HeroSection from "./components/Hero";
import WhyAG30Section from "./components/WhyAG30";
import TestimonialsSection from "./components/Testimonial";
import TrainingSection from "./components/Pricing";
import DiagonalPricing from "./components/DiagonalPricing";
import KCFusionSection from "./components/KCFusion";
import TacticalEdgeSection from "./components/TacticalEdge";
import NewsletterSection from "./components/Newsletter";
import Footer from "./components/Footer";
import HeroA from "./components/Hero_a";
import Hero_b from "./components/Hero_b";
import Hero_c from "./components/Hero_c";
import Media from "./components/Media";

export default function Home() {
  // State to control which pricing component to display
  const [showDiagonalPricing, setShowDiagonalPricing] = useState(true);
  // No longer need scroll tracking

  return (
    <>
        <Navigation />
        <Hero_c />
        
        {/* First Diagonal Blue Banner */}
        <div className="relative h-24 md:h-32 overflow-visible z-10 -mt-12 -mb-12">
          <div className="absolute inset-0 bg-[#0033A0] transform -skew-y-3 shadow-xl newspaper-clip-box">
            <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 30 }}>
              <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>ELITE GOALKEEPER TRAINING</h3>
            </div>
            
            {/* AGMAD Image static */}
            <div 
              className="absolute right-8 md:right-16"
              style={{
                bottom: '-5px',
                zIndex: 10
              }}
            >
              <Image 
                src="/AGMAD.png" 
                alt="AG MAD" 
                width={400} 
                height={400} 
                className="object-contain"
              />
            </div>
          </div>
          {/* Rough edges for newspaper clipping effect */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-4px] left-[15%] w-[20%] h-[4px] bg-black"></div>
            <div className="absolute bottom-[-4px] right-[25%] w-[15%] h-[4px] bg-black"></div>
            <div className="absolute left-[-4px] top-[30%] h-[15%] w-[4px] bg-black"></div>
            <div className="absolute right-[-4px] bottom-[20%] h-[20%] w-[4px] bg-black"></div>
          </div>
        </div>
        
        {/* Second Diagonal Blue Banner */}
        <div className="relative h-24 md:h-32 overflow-visible z-10 -mt-8 -mb-12">
          <div className="absolute inset-0 bg-[#0033A0] transform -skew-y-3 shadow-xl newspaper-clip-box">
            <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 30 }}>
              <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>TRAINING PROGRAMS</h3>
            </div>
          </div>
          {/* Rough edges for newspaper clipping effect */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-4px] left-[25%] w-[20%] h-[4px] bg-black"></div>
            <div className="absolute bottom-[-4px] right-[15%] w-[15%] h-[4px] bg-black"></div>
            <div className="absolute left-[-4px] top-[20%] h-[15%] w-[4px] bg-black"></div>
            <div className="absolute right-[-4px] bottom-[30%] h-[20%] w-[4px] bg-black"></div>
          </div>
        </div>
        
        <DiagonalPricing />
       
        {/* Diagonal Banner for Testimonials */}
        <div className="relative h-24 md:h-32 overflow-visible z-10 -mt-12 -mb-12">
          <div className="absolute inset-0 bg-[#1B365D] transform skew-y-3  newspaper-clip-box">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Don't take our word for it. Take theirs</h2>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#1E8AFF]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          {/* Rough edges for newspaper clipping effect */}
          
        </div>
        
        <TestimonialsSection />
        <Media />
        <WhyAG30Section />
        
        {/* Pricing section with toggle */}
        <div className="bg-black py-4 text-center">
          <div className="container mx-auto flex justify-center items-center space-x-4">
            <button 
              onClick={() => setShowDiagonalPricing(false)}
              className={`px-4 py-2 rounded-l-full ${!showDiagonalPricing ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              Standard Pricing
            </button>
            <button 
              onClick={() => setShowDiagonalPricing(true)}
              className={`px-4 py-2 rounded-r-full ${showDiagonalPricing ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              Diagonal Pricing
            </button>
          </div>
        </div>
        
        {showDiagonalPricing ? <DiagonalPricing /> : <TrainingSection />}
        
        <KCFusionSection />
        <TacticalEdgeSection />
        
        {/* Diagonal Banner for Media Section */}
        <div className="relative h-24 md:h-32 overflow-visible z-10 -mt-12 -mb-12">
          <div className="absolute inset-0 bg-[#1B365D] transform -skew-y-3 newspaper-clip-box">
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>MEDIA GALLERY</h3>
            </div>
          </div>
          {/* Rough edges for newspaper clipping effect */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-4px] left-[35%] w-[20%] h-[4px] bg-black"></div>
            <div className="absolute bottom-[-4px] right-[15%] w-[15%] h-[4px] bg-black"></div>
            <div className="absolute left-[-4px] top-[40%] h-[15%] w-[4px] bg-black"></div>
            <div className="absolute right-[-4px] bottom-[30%] h-[20%] w-[4px] bg-black"></div>
          </div>
        </div>
      
        <NewsletterSection />
      <Footer />
    </>
  );
}
