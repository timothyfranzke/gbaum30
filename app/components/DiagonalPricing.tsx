import React, { useState } from 'react';
import Link from 'next/link';

interface PricingOption {
  title: string;
  price: string;
  period?: string | null;
  description: string;
  features: string[];
  linkUrl?: string;
}

const DiagonalPricing = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const pricingOptions: PricingOption[] = [
    {
      title: "Sessions",
      price: "$320",
      period: "8 Sessions",
      description: "Choose from any session at your player's level at any of our training locations.",
      features: [
        "Train as often as you'd like",
        "Train where it's convenient for you",
        "Flexible scheduling",
        "Perfect for busy schedules",
        "Access to all training facilities"
      ]
    },
    {
      title: "Monthly",
      price: "$175",
      period: "Month",
      description: "Attend as many sessions as you'd like each month without the worry of tracking sessions.",
      features: [
        "Unlimited monthly sessions",
        "Best value for regular training",
        "No session tracking needed",
        "Train at any location",
        "Priority booking"
      ],
      linkUrl: "/train"
    },
    {
      title: "Drop In",
      price: "$50",
      period: "Session",
      description: "In between plans, or just want to drop in on a session to experience the AG30 GK Academy?",
      features: [
        "No commitment required",
        "Try before you subscribe",
        "Experience AG30 training",
        "One-time payment",
        "Access to expert coaching"
      ]
    }
  ];

  // Function to handle tab click
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div 
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
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0033A0]/50 via-[#1B365D]/30 to-[#0033A0]/40 z-0"></div>
      
      {/* White opacity background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Training & <span className="text-[#1E8AFF]">Services</span></h2>
        <p className="text-lg text-gray-200 text-center mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Comprehensive goalkeeper training programs designed to elevate your game
        </p>
        
        {/* Diagonal Pricing Tabs */}
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex justify-center mb-2 relative">
            {pricingOptions.map((option, index) => (
              <div 
                key={index} 
                className={`
                  relative z-10 cursor-pointer transform 
                  ${index === 0 ? '-rotate-6 -mr-4' : index === 1 ? 'rotate-0 z-20' : 'rotate-6 -ml-4'}
                  ${activeTab === index ? 'z-30' : ''}
                `}
                onClick={() => handleTabClick(index)}
              >
                <div 
                  className={`
                    newspaper-clip-box py-3 px-6 md:px-10
                    ${activeTab === index 
                      ? 'bg-[#0033A0] text-white' 
                      : 'bg-black bg-opacity-70 text-white hover:bg-opacity-90'}
                    border-2 border-[#0033A0] transition-all duration-300 shadow-lg
                  `}
                >
                  <div className="font-bold text-lg md:text-xl">{option.title}</div>
                  <div className="text-sm md:text-base">{option.price}</div>
                </div>
                
                {/* Rough edges for newspaper clipping effect */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-[-4px] left-[15%] w-[20%] h-[4px] bg-black"></div>
                  <div className="absolute bottom-[-4px] right-[25%] w-[15%] h-[4px] bg-black"></div>
                  <div className="absolute left-[-4px] top-[30%] h-[15%] w-[4px] bg-black"></div>
                  <div className="absolute right-[-4px] bottom-[20%] h-[20%] w-[4px] bg-black"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Content Panel */}
          <div className="newspaper-clip-box p-8 bg-black bg-opacity-70 border-4 border-[#0033A0] text-white relative shadow-2xl">
            {/* Rough edges for newspaper clipping effect */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-[-8px] left-[15%] w-[20%] h-[8px] bg-black"></div>
              <div className="absolute bottom-[-8px] right-[25%] w-[15%] h-[8px] bg-black"></div>
              <div className="absolute left-[-8px] top-[30%] h-[15%] w-[8px] bg-black"></div>
              <div className="absolute right-[-8px] bottom-[20%] h-[20%] w-[8px] bg-black"></div>
            </div>
            
            {/* Sliding content */}
            <div className="relative overflow-hidden">
              <div 
                className="transition-all duration-500 ease-in-out flex"
                style={{ transform: `translateX(-${activeTab * 100}%)` }}
              >
                {pricingOptions.map((option, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-[#1E8AFF] mb-2">{option.title}</h3>
                      <div className="text-2xl font-bold mb-1">
                        {option.price}
                        {option.period && <span className="text-sm ml-1">per {option.period}</span>}
                      </div>
                      <p className="text-gray-300">{option.description}</p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {option.features.map((feature, i) => (
                        <div key={i} className="flex items-center">
                          <svg className="w-5 h-5 text-[#1E8AFF] mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <Link
                        href={option.linkUrl || "/train"}
                        className="bg-gradient-to-r from-[#0033A0] to-[#1E8AFF] text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition inline-block"
                      >
                        SELECT PLAN
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action buttons */}
        <div className="text-center mt-12">
          <Link
            href="/train"
            className="bg-[#0033A0] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-[#1B365D] transition text-center inline-block"
          >
            JOIN THE TEAM
          </Link>
          <Link
            href="/about#contact"
            className="ml-4 border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white hover:text-[#0033A0] transition text-center inline-block"
          >
            REQUEST INFO
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiagonalPricing;
