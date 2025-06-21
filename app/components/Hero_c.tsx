import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover block" 
          style={{ filter: 'brightness(0.6)' }}
        >
          <source src="/bg.mp4" type="video/mp4" />
          <source src="/bg.webm" type="video/webm" /> {/* Add WebM source */}
          {/* Fallback gradient if video doesn't load */}
        </video>
        {/* Fallback background gradient (only visible when video fails) */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 hidden"></div>
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/20"></div>
      
      {/* Background Pattern - subtle geometric overlay */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0,51,160,0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(0,51,160,0.1) 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Main Hero Content */}
          <div className="text-left lg:text-left">
            {/* Primary Name */}
            <h1 className="leading-none mb-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <span className="block text-8xl md:text-9xl lg:text-[12rem] text-white drop-shadow-lg" style={{ letterSpacing: '0.15em' }}>
                UNION 30
              </span>
              {/* Secondary Name 
              <span className="block text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-md -mt-4 lg:-mt-8" style={{ letterSpacing: '0.05em' }}>
                GREUNEBAUM
              </span>*/}
            </h1>
            
            {/* Subtitle */}
            <div className="mt-6 mb-8">
              <p className="text-xl md:text-2xl lg:text-3xl text-white font-medium uppercase" style={{ fontFamily: 'Roboto, sans-serif', letterSpacing: '0.5em' }}>
                Official Website
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center btn-outline"
              >
                Join the Union
              </Link>
            </div>
          </div>
        </div>
      </div>
      
     
    </section>
  );
};

export default HeroSection;