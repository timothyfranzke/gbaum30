// Services Variant 1 - Dark Continuation with Lens Flare Effects
import React from 'react';
import Link from "next/link";

const ServicesVariant1 = () => {
  const services = [
    {
      icon: "⚡",
      title: "ELITE TRAINING",
      subtitle: "Technical Mastery",
      description: "Master every aspect of goalkeeping from shot stopping to distribution with elite-level coaching that transforms your technique.",
      features: ["Set Position", "Footwork", "Handling", "Distribution", "Communication", "Save Selection"],
      color: "from-[#1E8AFF] to-[#0033A0]",
      glowColor: "#1E8AFF"
    },
    {
      icon: "📊",
      title: "VIDEO ANALYSIS", 
      subtitle: "Data-Driven Growth",
      description: "Detailed breakdown of your performance using cutting-edge video analysis technology and professional insights.",
      features: ["Match Footage Review", "Performance Metrics", "Technical Assessment", "Development Plans"],
      color: "from-[#0033A0] to-[#1B365D]",
      glowColor: "#0033A0"
    },
    {
      icon: "🎯",
      title: "ELITE MENTORING",
      subtitle: "Personal Development", 
      description: "One-on-one mentorship that builds not just better goalkeepers, but stronger, more confident athletes.",
      features: ["Goal Setting", "Mental Training", "Performance Psychology", "Career Guidance"],
      color: "from-[#1B365D] to-black",
      glowColor: "#1B365D"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-black min-h-screen">
      {/* Seamless Background Continuation */}
      <div className="absolute inset-0">
        {/* Continue the gradient from Hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0033A0]/90 via-[#1B365D]/80 to-black"></div>
        
        {/* Lens Flare Continuity */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-radial from-white/20 via-[#1E8AFF]/20 to-transparent animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-gradient-radial from-[#1E8AFF]/30 via-white/10 to-transparent animate-ping opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-gradient-radial from-white/40 to-transparent opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full bg-gradient-radial from-[#1E8AFF]/25 to-transparent opacity-30 animate-ping delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center space-x-3 bg-[#1E8AFF]/20 rounded-full px-8 py-4 border border-[#1E8AFF]/40">
              <div className="w-4 h-4 bg-[#1E8AFF] rounded-full animate-ping"></div>
              <span className="text-white font-bold text-lg tracking-wider">ELITE SERVICES</span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
            TRANSFORM YOUR
            <br />
            <span className="bg-gradient-to-r from-[#1E8AFF] to-white bg-clip-text text-transparent">
              GAME
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Three pillars of <span className="text-[#1E8AFF] font-bold">elite development</span> 
            that create <span className="text-white font-bold">championship goalkeepers</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {services.map((service, index) => (
            <div key={index} className="group relative">
              {/* Glow Effect */}
              <div 
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: `${service.glowColor}40` }}
              ></div>
              
              {/* Card */}
              <div className={`relative bg-gradient-to-br ${service.color} rounded-2xl overflow-hidden h-full transform hover:-translate-y-2 transition-all duration-500 border border-white/10`}>
                {/* Lens Flare Accent */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-radial from-white/30 to-transparent opacity-60"></div>
                
                <div className="p-8 h-full flex flex-col">
                  {/* Icon & Title */}
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4 filter drop-shadow-lg">{service.icon}</div>
                    <h3 className="text-2xl lg:text-3xl font-black text-white mb-2 tracking-wider">
                      {service.title}
                    </h3>
                    <div className="text-[#1E8AFF] font-bold text-lg uppercase tracking-widest">
                      {service.subtitle}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-200 text-lg leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-3 h-3 bg-[#1E8AFF] rounded-full mr-4 animate-pulse"></div>
                        <span className="text-white font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="mt-8">
                    <Link
                      href="/train"
                      className="block w-full text-center bg-white/10 backdrop-blur-sm text-white py-3 rounded-lg font-bold hover:bg-white hover:text-black transition-all duration-300 border border-white/20"
                    >
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-6">
            <Link
              href="/train"
              className="bg-[#1E8AFF] text-white px-12 py-5 rounded-xl font-bold text-xl hover:bg-white hover:text-[#0033A0] transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              START YOUR JOURNEY
            </Link>
            <Link
              href="/contact"
              className="border-2 border-[#1E8AFF] text-[#1E8AFF] px-12 py-5 rounded-xl font-bold text-xl hover:bg-[#1E8AFF] hover:text-white transition-all duration-300"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for gradient effects */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

export default ServicesVariant1;