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
      title: "Training",
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
      title: "Analysis",
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
      title: "Mentoring",
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
    <section className="py-20 bg-background h-auto mb-20 relative overflow-hidden">
      {/* Background image positioned at bottom right */}
      <div className="absolute right-0 bottom-[-100px] z-0">
        <div className="w-full h-full bg-no-repeat bg-right-bottom" style={{
          backgroundImage: 'url("/hands_up_2.png")',
          backgroundSize: 'contain',
          width: '900px',
          height: '900px',
          opacity: 0.35
        }}></div>
      </div>
      {/* 40% tint overlay */}
      <div className="h-auto bg-white opacity-20 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Packages</h2>
        <p className="text-lg text-primary text-center mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
                    py-3 px-6 md:px-10
                    ${activeTab === index 
                      ? 'bg-secondary text-white' 
                      : 'bg-midnight bg-opacity-70 text-white hover:bg-opacity-90'}
                    transition-all duration-300 shadow-lg
                  `}
                >
                  <div className="font-bold text-lg md:text-xl">{option.title}</div>
                  <div className="text-sm md:text-base">{option.price}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Content Panel */}
          <div className="p-8 bg-midnight bg-opacity-70 border-4 border-primary text-white relative shadow-2xl">
            {/* Sliding content */}
            <div className="relative overflow-hidden">
              <div 
                className="transition-all duration-500 ease-in-out flex"
                style={{ transform: `translateX(-${activeTab * 100}%)` }}
              >
                {pricingOptions.map((option, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-secondary mb-2">{option.title}</h3>
                      <div className="text-2xl font-bold mb-1">
                        {option.price}
                        {option.period && <span className="text-sm ml-1">per {option.period}</span>}
                      </div>
                      <p className="text-gray-300">{option.description}</p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {option.features.map((feature, i) => (
                        <div key={i} className="flex items-center">
                          <svg className="w-5 h-5 text-secondary mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <Link
                        href={option.linkUrl || "/train"}
                        className="btn-outline"
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
        
       
      </div>
    </section>
  );
};

export default DiagonalPricing;
