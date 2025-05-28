// Hero Section Component with Vertical Service Columns
import Link from "next/link";
import { useState } from "react";

const ServiceColumn = ({ title, description, imageSrc, link }) => {
  const [isHover, setIsHover] = useState(false);
  
  return (
    <div 
      className={`relative h-80 overflow-hidden transition-all duration-500 rounded-lg shadow-lg ${isHover ? 'w-64' : 'w-24'}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{ 
          backgroundImage: `url(${imageSrc})`,
          transform: isHover ? 'scale(1.1)' : 'scale(1)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D] to-[#0033A0]/60" />
      
      {/* Vertical Title (for collapsed state) */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHover ? 'opacity-0' : 'opacity-100'}`}>
        <span className="text-white font-bold text-2xl tracking-wider transform -rotate-90">{title}</span>
      </div>
      
      {/* Expanded Content */}
      <div className={`absolute inset-0 p-6 flex flex-col justify-end transition-opacity duration-300 ${isHover ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-white text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-200 text-sm mb-4">
          {description}
        </p>
        <Link 
          href={link} 
          className="bg-[#1E8AFF] text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-white hover:text-[#0033A0] transition text-center w-full"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const services = [
    {
      title: "Training",
      description: "Technical & tactical training designed to elevate your goalkeeping skills to elite levels.",
      imageSrc: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
      link: "/train"
    },
    {
      title: "Analysis",
      description: "In-depth performance analysis using cutting-edge technology and expert feedback.",
      imageSrc: "https://images.unsplash.com/photo-1565326531907-3cbdb62a27cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "/analysis"
    },
    {
      title: "Mentoring",
      description: "Personalized mentorship to develop your mental game and advance your career.",
      imageSrc: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      link: "/mentoring"
    }
  ];

  return (
    <section 
      className="min-h-screen relative py-20 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 51, 160, 0.9), rgba(27, 54, 93, 0.95)), url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="text-white lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AG30 <span className="bg-gradient-to-r from-[#1E8AFF] to-white bg-clip-text text-transparent">GOALKEEPER</span> UNION
            </h1>
            <p className="text-xl mb-3 text-[#1E8AFF]">
              Elite Training. Elite Analysis. Real Relationships.
            </p>
            <p className="text-3xl font-bold mb-8">
              BE ELITE
            </p>
            <Link
              href="/train"
              className="bg-[#1E8AFF] text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#0033A0] transition inline-block"
            >
              GET STARTED
            </Link>
          </div>
          
          {/* Right Column Service Cards */}
          <div className="lg:w-auto flex space-x-2">
            {services.map((service, index) => (
              <ServiceColumn 
                key={index}
                title={service.title}
                description={service.description}
                imageSrc={service.imageSrc}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;