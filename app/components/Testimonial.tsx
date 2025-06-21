
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  initials: string;
  avatar?: string; // Optional avatar image path
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const testimonials = [
    {
      name: "Paulo P.",
      role: "Elite Goalkeeper",
      quote: "As a goalkeeper, I always have the feeling that I can do better everyday and improve my techniques. The environment at [AG30] helped me to develop my skills. [It's my dream] to play in the MLS and I know AG30 can help get me there!",
      initials: "PP",
      avatar: "/avatars/paulo.jpg" // Add path to Paulo's avatar image
    },
    {
      name: "Emily J.",
      role: "Youth Goalkeeper",
      quote: "Training with [AG30] has been super beneficial for me... The training environment is second to none; it's a space where you can make mistakes and ask for advice. I've improved as a player and a person thanks to The Union!",
      initials: "EJ",
      avatar: "/avatars/emily.jpg" // Add path to Emily's avatar image
    },
    {
      name: "Erin B.",
      role: "Professional Keeper",
      quote: "Training with [AG30] took my abilities to the Elite level. Their knowledge of the modern style of soccer alongside the passion they have for coaching is unprecedented. AG30 is an investment that continues to pay off in my D1 career.",
      initials: "EB",
      avatar: "/avatars/erin.jpg" // Add path to Erin's avatar image
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
    <section className="py-12 md:py-20 bg-primary h-auto">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Hear From the Union</h2>
        {/* add 5 white stars */}
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            <span className="text-white text-2xl">
            <svg 
                  className="w-6 h-6 drop-shadow-lg" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </span>
            <span className="text-white text-2xl">
            <svg 
                  className="w-6 h-6 drop-shadow-lg" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </span>
            <span className="text-white text-2xl">
            <svg 
                  className="w-6 h-6 drop-shadow-lg" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </span>
            <span className="text-white text-2xl">
            <svg 
                  className="w-6 h-6 drop-shadow-lg" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </span>
            <span className="text-white text-2xl">
            <svg 
                  className="w-6 h-6 drop-shadow-lg" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 overflow-hidden">
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
                
                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <div className="mb-4 relative">
                    {testimonials[currentIndex].avatar ? (
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-orange-500">
                        <Image 
                          src={testimonials[currentIndex].avatar} 
                          alt={`${testimonials[currentIndex].name} avatar`}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold">
                        {testimonials[currentIndex].initials}
                      </div>
                    )}
                  </div>
                  
                  <div className="font-bold text-lg md:text-xl">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm md:text-base text-white/70">
                    {testimonials[currentIndex].role}
                  </div>
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
      {/*join the union */}
      <div className="container mx-auto my-12">
        <div className="text-center">
         
          <Link href="/join" className="btn-outline">
            Join The Union
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
