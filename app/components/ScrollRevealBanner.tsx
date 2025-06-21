import { useState, useEffect, useRef } from 'react';

const ScrollRevealBanner = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;

      const rect = bannerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when banner enters viewport until it's fully visible
      const startReveal = windowHeight; // Start when banner enters viewport
      const endReveal = windowHeight * 0.3; // End when banner is 70% up the screen
      
      // Calculate progress (0 = start position, 1 = end position)
      let progress = 0;
      if (rect.top <= startReveal && rect.top >= endReveal) {
        progress = (startReveal - rect.top) / (startReveal - endReveal);
      } else if (rect.top < endReveal) {
        progress = 1;
      }
      
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = ['ELITE', 'GOALKEEPER', 'TRAINING'];
  
  return (
    <div ref={bannerRef} className="relative h-24 md:h-32 overflow-hidden z-30 -my-12">
      <div 
        className="absolute inset-0 bg-[#0033A0] shadow-2xl"
        style={{
          clipPath: 'polygon(0 30%, 100% 0%, 100% 70%, 0% 100%)'
        }}
      >
        {/* Diagonal text container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-2 md:space-x-4 transform -rotate-12">
            {words.map((word, index) => {
              // Calculate delay for each word (staggered animation)
              const wordProgress = Math.max(0, Math.min(1, (scrollProgress * 3) - (index * 0.5)));
              
              // Animate from left side
              const translateX = -100 + (wordProgress * 100);
              const opacity = wordProgress;
              
              return (
                <span
                  key={index}
                  className="text-white text-xl md:text-3xl font-bold tracking-wider transition-all duration-500 ease-out"
                  style={{ 
                    fontFamily: 'Bebas Neue, sans-serif',
                    transform: `translateX(${translateX}%)`,
                    opacity: opacity,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollRevealBanner;