// Hero Variant 2 - Dynamic Split Screen Design
import Link from "next/link";
import { useState, useEffect } from "react";

const HeroVariant2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1565326531907-3cbdb62a27cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Split Layout Container */}
      <div className="flex min-h-screen">
        {/* Left Side - Content */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#0033A0] via-[#1B365D] to-[#003366] relative z-10">
          {/* Geometric Overlay */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#1E8AFF]/10 transform rotate-12 translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-white/5 transform -rotate-12 -translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="relative z-20 h-full flex flex-col justify-center px-8 lg:px-16">
            {/* Union Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center bg-[#1E8AFF]/20 rounded-full px-6 py-3 border border-[#1E8AFF]/30">
                <div className="w-3 h-3 bg-[#1E8AFF] rounded-full mr-3 animate-pulse"></div>
                <span className="text-[#1E8AFF] font-semibold tracking-wider">UNION 30</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              ELITE <span className="bg-gradient-to-r from-[#1E8AFF] to-white bg-clip-text text-transparent">GOALKEEPER</span>
              <br />
              TRAINING
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Transform your goalkeeping skills with professional-grade training, 
              cutting-edge analysis, and personalized mentorship from elite coaches.
            </p>

            {/* Feature List */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-[#1E8AFF] rounded-full mr-4"></div>
                <span className="text-white font-medium">Professional Technical Training</span>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-[#1E8AFF] rounded-full mr-4"></div>
                <span className="text-white font-medium">Advanced Performance Analysis</span>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-[#1E8AFF] rounded-full mr-4"></div>
                <span className="text-white font-medium">Elite Mentorship Program</span>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="/train"
                className="inline-flex items-center bg-[#1E8AFF] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#0033A0] transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                BEGIN YOUR JOURNEY
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Dynamic Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          {/* Image Container */}
          <div className="absolute inset-0 overflow-hidden">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0033A0]/20 to-[#0033A0]/60"></div>


          {/* Image Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-[#1E8AFF] scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Image Section */}
      <div className="lg:hidden relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0033A0]/80 to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroVariant2;