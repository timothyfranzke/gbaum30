import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-black bg-opacity-70 border-2 border-orange-500 rounded-lg p-6 text-white transition-all duration-300 hover:transform hover:-translate-y-2 shadow-xl">
      <div className="mb-4 text-orange-500">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-200">{description}</p>
    </div>
  );
};

const PricingCard = ({ 
  icon, 
  title, 
  price, 
  period, 
  description,
  linkUrl
}: { 
  icon: React.ReactNode; 
  title: string; 
  price: string; 
  period?: string | null; 
  description: string; 
  linkUrl?: string;
}) => {
  return (
    <div className="text-center relative transition-all duration-300 hover:transform hover:-translate-y-2">
      <div className="newspaper-clip-box p-6 md:p-8 bg-black bg-opacity-70 relative transform rotate-[-1deg] border-4 border-orange-500 shadow-xl">
        {/* Rough edges for newspaper clipping effect */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-8px] left-[15%] w-[20%] h-[8px] bg-black"></div>
          <div className="absolute bottom-[-8px] right-[25%] w-[15%] h-[8px] bg-black"></div>
          <div className="absolute left-[-8px] top-[30%] h-[15%] w-[8px] bg-black"></div>
          <div className="absolute right-[-8px] bottom-[20%] h-[20%] w-[8px] bg-black"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="text-orange-500 w-16 h-16">
              {icon}
            </div>
          </div>
          <h4 className="text-2xl font-bold mb-2 text-white uppercase">{title}</h4>
          <p className="text-gray-200 text-sm mb-6 px-6">{description}</p>
          
          <div className="mb-6">
            {linkUrl ? (
              <Link href={linkUrl}>
                <div className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full px-6 py-3 cursor-pointer hover:shadow-lg transition-all">
                  <span className="text-xl font-bold text-white">{price}{period && <span className="text-sm"> per {period}</span>}</span>
                </div>
              </Link>
            ) : (
              <div className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full px-6 py-3">
                <span className="text-xl font-bold text-white">{price}{period && <span className="text-sm"> per {period}</span>}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TrainingSection = () => {
  const features = [
    {
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      title: "Expert Staff",
      description: "Over 100 years of combined experience"
    },
    {
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      title: "Modern Training",
      description: "Relevant to today's game demands"
    },
    {
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
      title: "Career Connections",
      description: "Pathways to higher levels"
    }
  ];
  
  const pricingPlans = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
          <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
          <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
        </svg>
      ),
      title: "Sessions",
      price: "$320",
      period: "8 Sessions",
      description: "Choose from any session at your player's level at any of our training locations. Train as often as you'd like and where it's convenient for you!"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      ),
      title: "Monthly",
      price: "$175",
      period: "Month",
      description: "Attend as many sessions as you'd like each month without the worry and hassle of tracking sessions. Train where and when it works for you!",
      linkUrl: "/Users/timothy/data/franzkecreative/development/gbaum30/app/components/Testimonial.tsx"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
        </svg>
      ),
      title: "Drop In",
      price: "$50",
      period: "Session",
      description: "In between plans, or just want to drop in on a session to experience the AG30 GK Academy? Start with a single session!"
    }
  ];

  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        // Slower parallax effect for smooth scrolling
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.15}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 w-full h-[150%] -top-[50%]" 
          style={{
            backgroundImage: 'url(/diving_bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.5)',
            willChange: 'transform',
          }}
        />
      </div>
      
      {/* Overlay gradient - lighter version */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Training & Services</h2>
        <p className="text-lg text-gray-200 text-center mb-12 max-w-3xl mx-auto">Comprehensive goalkeeper training programs designed to elevate your game</p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/train"
            className="bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-orange-600 transition text-center inline-block"
          >
            JOIN THE TEAM
          </Link>
          <Link
            href="/about#contact"
            className="ml-4 border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white hover:text-gray-900 transition text-center inline-block"
          >
            REQUEST INFO
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;