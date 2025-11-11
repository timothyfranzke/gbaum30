// Services Variant 2 - Dynamic Animated Cards with Floating Elements
import React, { useState } from 'react';
import Link from "next/link";

const ServicesVariant2 = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: "⚡",
      title: "ELITE TRAINING",
      tagline: "DOMINATE THE GOAL",
      description: "Revolutionary training methodology that transforms raw talent into elite performance through systematic skill development.",
      metrics: [
        { label: "Technique Mastery", value: "Advanced" },
        { label: "Shot Stopping", value: "Elite" },
        { label: "Distribution", value: "Pro-Level" }
      ],
      highlights: ["Individual Focus", "Pro Techniques", "Real-Game Scenarios"],
      primaryColor: "#1E8AFF",
      secondaryColor: "#0033A0"
    },
    {
      icon: "📊", 
      title: "VIDEO ANALYSIS",
      tagline: "DATA DRIVES SUCCESS",
      description: "Advanced performance analytics using professional-grade technology to identify strengths and optimization opportunities.",
      metrics: [
        { label: "Performance Tracking", value: "Real-time" },
        { label: "Technical Analysis", value: "Frame-by-frame" },
        { label: "Progress Reports", value: "Detailed" }
      ],
      highlights: ["Match Analysis", "Performance Metrics", "Development Plans"],
      primaryColor: "#0033A0",
      secondaryColor: "#1B365D"
    },
    {
      icon: "🎯",
      title: "ELITE MENTORING", 
      tagline: "MINDS WIN MATCHES",
      description: "Comprehensive mental and tactical development that builds champions both on the field and in life.",
      metrics: [
        { label: "Mental Training", value: "Professional" },
        { label: "Goal Setting", value: "S.M.A.R.T" },
        { label: "Career Guidance", value: "Personalized" }
      ],
      highlights: ["1-on-1 Sessions", "Mental Strength", "Leadership Skills"],
      primaryColor: "#1B365D",
      secondaryColor: "#003366"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-black min-h-screen">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0033A0]/90 via-[#1B365D]/70 to-black"></div>
        
        {/* Animated Mesh Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1E8AFF]/20 via-transparent to-[#0033A0]/20 animate-pulse"></div>
        </div>
        
        {/* Floating Lens Flares */}
        <div className="absolute top-10 right-1/4 w-72 h-72 rounded-full bg-gradient-radial from-white/25 via-[#1E8AFF]/15 to-transparent animate-float opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 rounded-full bg-gradient-radial from-[#1E8AFF]/40 via-white/10 to-transparent animate-float-delayed opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-gradient-radial from-white/60 to-transparent opacity-30 animate-ping"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          {/* Animated Badge */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1E8AFF] to-[#0033A0] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative inline-flex items-center space-x-3 bg-black rounded-full px-8 py-4 border border-[#1E8AFF]/40">
                <div className="w-4 h-4 bg-[#1E8AFF] rounded-full animate-ping"></div>
                <span className="text-white font-bold text-lg tracking-wider">CHAMPIONSHIP SERVICES</span>
              </div>
            </div>
          </div>

          {/* Dynamic Title */}
          <div className="relative">
            <h2 className="text-6xl lg:text-8xl font-black leading-none mb-6">
              <span className="text-white">ELEVATE</span>
              <br />
              <span className="bg-gradient-to-r from-[#1E8AFF] via-white to-[#1E8AFF] bg-clip-text text-transparent animate-gradient-x">
                EVERY ASPECT
              </span>
            </h2>
            
            {/* Floating Action Words */}
            <div className="text-2xl lg:text-3xl font-bold text-[#1E8AFF] mb-8 uppercase tracking-wider">
              TRAIN • ANALYZE • DOMINATE
            </div>
          </div>

          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Three pillars of <span className="text-[#1E8AFF] font-bold">championship development</span> 
            designed to create <span className="text-white font-bold">elite goalkeepers</span>
          </p>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated Glow */}
              <div 
                className={`absolute -inset-2 rounded-3xl transition-all duration-700 ${
                  hoveredCard === index 
                    ? 'bg-gradient-to-br opacity-60 blur-xl scale-105' 
                    : 'opacity-0'
                }`}
                style={{ 
                  background: hoveredCard === index 
                    ? `linear-gradient(135deg, ${service.primaryColor}40, ${service.secondaryColor}40)`
                    : 'transparent'
                }}
              ></div>
              
              {/* Main Card */}
              <div className={`relative rounded-2xl overflow-hidden h-full transform transition-all duration-500 ${
                hoveredCard === index ? '-translate-y-4 scale-105' : 'hover:-translate-y-2'
              } bg-gradient-to-br from-black via-gray-900 to-black border border-white/10`}>
                
                {/* Animated Top Bar */}
                <div 
                  className="h-2 w-full transition-all duration-700"
                  style={{
                    background: hoveredCard === index 
                      ? `linear-gradient(90deg, ${service.primaryColor}, ${service.secondaryColor})`
                      : `linear-gradient(90deg, ${service.primaryColor}60, ${service.secondaryColor}60)`
                  }}
                ></div>
                
                {/* Card Content */}
                <div className="p-8">
                  {/* Icon & Title Section */}
                  <div className="text-center mb-8">
                    <div className={`text-7xl mb-6 transform transition-all duration-500 ${
                      hoveredCard === index ? 'scale-110 rotate-12' : ''
                    }`}>
                      {service.icon}
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-black text-white mb-3 tracking-wider">
                      {service.title}
                    </h3>
                    
                    <div 
                      className="font-bold text-lg uppercase tracking-widest mb-4"
                      style={{ color: service.primaryColor }}
                    >
                      {service.tagline}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center">
                    {service.description}
                  </p>

                  {/* Metrics */}
                  <div className="space-y-4 mb-8">
                    {service.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                        <span className="text-white font-medium">{metric.label}</span>
                        <span 
                          className="font-bold text-sm px-3 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${service.primaryColor}20`,
                            color: service.primaryColor
                          }}
                        >
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3 mb-8">
                    {service.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-4 animate-pulse"
                          style={{ backgroundColor: service.primaryColor }}
                        ></div>
                        <span className="text-white font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link
                    href="/train"
                    className={`block w-full text-center py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                      hoveredCard === index ? 'scale-105' : ''
                    }`}
                    style={{
                      backgroundColor: service.primaryColor,
                      color: 'white'
                    }}
                  >
                    EXPLORE NOW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#1E8AFF] to-[#0033A0] rounded-2xl blur opacity-60 animate-pulse"></div>
            <div className="relative bg-black rounded-2xl p-8 border border-[#1E8AFF]/30">
              <h3 className="text-3xl font-black text-white mb-4">READY TO DOMINATE?</h3>
              <p className="text-gray-300 mb-8 text-lg">Join the elite. Start your transformation today.</p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/train"
                  className="bg-[#1E8AFF] text-white px-12 py-5 rounded-xl font-bold text-xl hover:bg-white hover:text-[#0033A0] transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  BEGIN TRAINING
                </Link>
                <Link
                  href="/analysis"
                  className="border-2 border-[#1E8AFF] text-[#1E8AFF] px-12 py-5 rounded-xl font-bold text-xl hover:bg-[#1E8AFF] hover:text-white transition-all duration-300"
                >
                  VIEW ANALYSIS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ServicesVariant2;