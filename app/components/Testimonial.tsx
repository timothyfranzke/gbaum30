
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const testimonials = [
    {
      name: "Paulo P.",
      role: "Elite Goalkeeper",
      quote: "AG30 transformed my game with personalized coaching. The coaches understand what it takes to perform at the highest level and push you to reach your potential.",
      initials: "PP"
    },
    {
      name: "Emily J.",
      role: "Youth Goalkeeper",
      quote: "The supportive environment boosted my confidence. I've grown not just as a keeper but as a leader on my team. The training here is unmatched.",
      initials: "EJ"
    },
    {
      name: "Erin B.",
      role: "Professional Keeper",
      quote: "Tactical training here is unmatched. AG30 helped me understand the mental side of goalkeeping and gave me tools to perform under pressure.",
      initials: "EB"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, [isAnimating, currentIndex]);

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 500);
    }
  };

  const goToPrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
        setIsAnimating(false);
      }, 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gray-900">
      <div className="container mx-auto px-4 overflow-hidden">
        {/* Stars */}
        <div className="flex justify-center mb-6 md:mb-8">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-6 h-6 md:w-8 md:h-8 text-orange-500 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10 md:mb-16 px-2">
          Don't take our word for it. Take theirs
        </h2>

        <div className="relative max-w-4xl mx-auto px-2 md:px-8">
          {/* Navigation Arrows - responsive positioning */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 md:-translate-x-16 text-white/80 hover:text-white transition-colors z-10 hidden md:block"
            aria-label="Previous testimonial"
          >
            <svg 
              className="w-12 h-12" 
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
            className="absolute right-0 top-1/2 -translate-y-1/2 md:translate-x-16 text-white/80 hover:text-white transition-colors z-10 hidden md:block"
            aria-label="Next testimonial"
          >
            <svg 
              className="w-12 h-12" 
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
          
          {/* Mobile Navigation Controls */}
          <div className="flex justify-between w-full mb-4 md:hidden">
            <button
              onClick={goToPrevious}
              className="p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <svg 
                className="w-8 h-8" 
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
              className="p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <svg 
                className="w-8 h-8" 
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
          </div>

          {/* Testimonial Container */}
          <div className="overflow-hidden">
            <div
              className={`transform transition-all duration-700 ease-in-out ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <div className="text-center text-white">
                <p className="text-lg md:text-2xl lg:text-3xl font-medium mb-6 md:mb-8 leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="font-bold text-lg md:text-xl">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-sm md:text-base text-white/70">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-100' 
                    : 'bg-white/30 hover:bg-white/50 scale-75'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
