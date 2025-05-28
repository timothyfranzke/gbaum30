import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkUrl: string;
  linkText: string;
}

const ServiceCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const services: ServiceCardProps[] = [
    {
      title: "Technical Training",
      description: "Master essential goalkeeper techniques with our specialized training program focused on handling, footwork, and positioning.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
          <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
          <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
        </svg>
      ),
      linkUrl: "/technical",
      linkText: "LEARN MORE"
    },
    {
      title: "Elite Performance",
      description: "Take your goalkeeping to the next level with our comprehensive elite program designed for serious keepers aiming for excellence.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
        </svg>
      ),
      linkUrl: "/elite",
      linkText: "JOIN ELITE"
    },
    {
      title: "Tactical Analysis",
      description: "Develop your game intelligence with our tactical analysis sessions focusing on decision-making and game situations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      ),
      linkUrl: "/tactical",
      linkText: "ANALYZE"
    },
    {
      title: "Private Sessions",
      description: "Get personalized attention with our one-on-one training sessions tailored to your specific needs and goals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
        </svg>
      ),
      linkUrl: "/private",
      linkText: "BOOK NOW"
    },
    {
      title: "Team Training",
      description: "Specialized group sessions for teams looking to improve their goalkeeping unit with coordinated training and team exercises.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
        </svg>
      ),
      linkUrl: "/team",
      linkText: "TEAM INFO"
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (cardsContainerRef.current?.offsetLeft || 0));
    setScrollLeft(cardsContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (cardsContainerRef.current) {
      const cardWidth = cardsContainerRef.current.scrollWidth / services.length;
      const scrollPosition = cardsContainerRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / cardWidth);
      scrollToCard(Math.max(0, Math.min(newIndex, services.length - 1)));
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (cardsContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches?.[0]?.pageX - (cardsContainerRef.current?.offsetLeft || 0));
    setScrollLeft(cardsContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches?.[0]?.pageX - (cardsContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (cardsContainerRef.current) {
      const cardWidth = cardsContainerRef.current.scrollWidth / services.length;
      const scrollPosition = cardsContainerRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / cardWidth);
      scrollToCard(Math.max(0, Math.min(newIndex, services.length - 1)));
    }
  };

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    if (cardsContainerRef.current) {
      const containerWidth = cardsContainerRef.current.offsetWidth;
      // Approximate card width based on the w-64/72/80 in CSS
      // For more accurate calculation, you might want to get actual rendered width
      const baseCardWidth = 320; // A reasonable estimate for lg:w-80 (20rem * 16px/rem = 320px)
      const scrollTarget = (index * (baseCardWidth + 32)) - (containerWidth / 2) + (baseCardWidth / 2); // +32 for mx-4 (16px on each side)

      cardsContainerRef.current.scrollTo({
        left: scrollTarget,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (cardsContainerRef.current && !isDragging) {
        const containerWidth = cardsContainerRef.current.offsetWidth;
        const scrollPosition = cardsContainerRef.current.scrollLeft;
        const baseCardWidth = 320; // Match the estimate in scrollToCard
        const totalCardAndMargin = baseCardWidth + 32; // Card width + left/right margin

        // Calculate which card's center is closest to the container's center
        const centerOfContainer = scrollPosition + (containerWidth / 2);
        const newIndex = Math.round(centerOfContainer / totalCardAndMargin) -1 ;

        setActiveIndex(Math.max(0, Math.min(newIndex, services.length - 1)));
      }
    };

    const container = cardsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [services.length, isDragging]);

  useEffect(() => {
    if (cardsContainerRef.current) {
      setTimeout(() => {
        scrollToCard(0);
      }, 100);
    }
  }, []);

  return (
    <div className="w-full mt-16 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-white text-center mb-10 uppercase">
          Our Training Programs
        </h2>

        <div className="relative">
          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2">
            <button
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Previous card"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2">
            <button
              onClick={() => scrollToCard(Math.min(services.length - 1, activeIndex + 1))}
              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Next card"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Cards container */}
          <div
            ref={cardsContainerRef}
            className="relative flex overflow-x-auto hide-scrollbar snap-x snap-mandatory py-12 md:py-16 lg:py-20"
            style={{ 
              scrollSnapType: 'x mandatory', 
              scrollBehavior: 'smooth', 
              paddingLeft: 'calc(50% - 160px)', // (w-64/2) + mx-4 (16px) = 128 + 16 = 144. Adjusting to roughly half card width + margin
              paddingRight: 'calc(50% - 160px)' 
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {services.map((service, index) => {
              const isActive = activeIndex === index;

              // Determine if the card is immediately to the left or right of the active card
              const isAdjacentLeft = activeIndex === index + 1; // e.g., activeIndex = 2, index = 1 (card to the left)
              const isAdjacentRight = activeIndex === index - 1; // e.g., activeIndex = 2, index = 3 (card to the right)

              const scale = isActive ? 'scale-110' : 'scale-90'; // Increased scale for active, slightly smaller for others
              const opacity = isActive ? 'opacity-100' : 'opacity-70'; // Full opacity for active, faded for others
              const zIndex = isActive ? 'z-30' : 'z-20'; // Active card on top, adjacent cards on next layer, others default z-index
              const shadow = isActive ? 'shadow-xl shadow-orange-500/50' : 'shadow-md shadow-gray-700/50';
              const textColor = isActive ? 'text-white' : 'text-gray-300';
              const bgColor = isActive ? 'bg-[#0033A0]' : 'bg-[#1B365D]';
              const iconColor = isActive ? 'text-white' : 'text-orange-400';
              const buttonBgColor = isActive ? 'bg-[#1E8AFF]' : 'bg-gray-700';
              const buttonTextColor = isActive ? 'text-white' : 'text-gray-300';
              const buttonHoverBgColor = isActive ? 'hover:bg-[#0033A0]' : 'hover:bg-gray-600';

              // Adjust translateX for overlapping effect
              // The active card itself doesn't need translateX for overlap
              // Adjacent cards move slightly inward to overlap
              let translateX = '';
              if (isAdjacentLeft) {
                // Move the card to the left of the active card slightly to the right
                translateX = 'translate-x-[24px] md:translate-x-[36px]'; // Adjust value for desired overlap
              } else if (isAdjacentRight) {
                // Move the card to the right of the active card slightly to the left
                translateX = '-translate-x-[24px] md:-translate-x-[36px]'; // Adjust value for desired overlap
              }


              return (
                <div
                  key={index}
                  className={`
                    relative w-64 md:w-72 lg:w-80 flex-shrink-0 snap-center mx-4
                    ${scale} ${opacity} ${zIndex} ${shadow} ${translateX}
                    transition-all duration-500 ease-in-out
                  `}
                >
                  <div className={`rounded-lg h-full flex flex-col justify-between ${bgColor} p-6 md:p-8`}>
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className={`w-16 h-16 ${iconColor}`}>
                          {service.icon}
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold mb-3 ${textColor}`}>
                        {service.title}
                      </h3>
                      <p className={`mb-6 ${textColor}`}>
                        {service.description}
                      </p>
                    </div>
                    <Link
                      href={service.linkUrl}
                      className={`
                        inline-block font-bold py-3 px-6 text-center mx-auto mt-auto rounded-md
                        ${buttonBgColor} ${buttonTextColor} ${buttonHoverBgColor}
                        transition-colors duration-300
                      `}
                    >
                      {service.linkText}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-[#1E8AFF] w-6' : 'bg-gray-500 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;