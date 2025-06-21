import React, { useState, useEffect } from 'react';

const WhyAG30Section = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const reasons = [
    {
      title: "Connections",
      content: "Our staff has coached at the collegiate, elite club, and US Soccer DA level. We have the network to help your player progress to the next phase of their career when the time is right."
    },
    {
      title: "Experience",
      content: "Our staff has played at every level of the game in the United States for a combined 100 years. Whether your player is just starting their journey or is a seasoned #1, we have the knowledge and tools to help them develop."
    },
    {
      title: "Relevance",
      content: "We pride ourselves on staying abreast of the modern game, technology, and the latest training techniques. We create environments for your players that are challenging, but fun!"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(timer);
  }, [isAnimating, activeIndex]);

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prevIndex) => 
          prevIndex === reasons.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 500);
    }
  };

  const goToPrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prevIndex) => 
          prevIndex === 0 ? reasons.length - 1 : prevIndex - 1
        );
        setIsAnimating(false);
      }, 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== activeIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with soccer net image and color overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("soccer_net_bg.jpg")' }}></div>
        <div className="absolute inset-0 bg-[#1B365D] opacity-80"></div> {/* Using the darker navy blue as overlay */}
      </div>
      
      {/* Top gradient transition to primary color 
      <div className="absolute top-0 left-0 right-0 h-32 z-0" style={{ 
        background: 'linear-gradient(to bottom, #0033A0 0%, rgba(0, 51, 160, 0) 100%)'
      }}></div>
      */}
      {/* Bottom gradient transition to D6D2C4 
      <div className="absolute bottom-0 left-0 right-0 h-32 z-0" style={{ 
        background: 'linear-gradient(to top, #D6D2C4 0%, rgba(214, 210, 196, 0) 100%)'
      }}></div>
      */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why AG30?</h2>
            <p className="text-xl text-gray-300 italic">
              "If there is one certainty in soccer, it is this: the quickest road to becoming a winning soccer team is to have a great goalkeeper."
            </p>
            <p className="text-lg text-blue-400 mt-2">- Julie Foudy</p>
          </div>
          
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 md:-translate-x-16 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Previous reason"
            >
              <svg 
                className="w-10 h-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 md:translate-x-16 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Next reason"
            >
              <svg 
                className="w-10 h-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
            
            {/* Carousel Content */}
            <div className="newspaper-clip-box p-8 md:p-12 bg-black bg-opacity-70 relative transform rotate-[-1deg] border-4 border-blue-500 shadow-xl">
              {/* Rough edges for newspaper clipping effect */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-8px] left-[15%] w-[20%] h-[8px] bg-black"></div>
                <div className="absolute bottom-[-8px] right-[25%] w-[15%] h-[8px] bg-black"></div>
                <div className="absolute left-[-8px] top-[30%] h-[15%] w-[8px] bg-black"></div>
                <div className="absolute right-[-8px] bottom-[20%] h-[20%] w-[8px] bg-black"></div>
              </div>
              
              <div className="relative z-10">
                <div
                  className={`transition-all duration-700 ease-in-out ${
                    isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">
                      {reasons[activeIndex].title}
                    </h3>
                    <p className="text-lg md:text-xl text-white leading-relaxed">
                      {reasons[activeIndex].content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {reasons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-blue-500 w-6' : 'bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAG30Section;
