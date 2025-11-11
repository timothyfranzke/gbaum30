// Pricing Variant 3 - Dark Action-Focused Design matching Hero_variant3
import React, { useState } from 'react';
import Link from 'next/link';

const PricingVariant3 = () => {
  const [activeTab, setActiveTab] = useState('monthly');

  const monthlyPackages = [
    {
      icon: "🎯",
      title: "BASIC",
      subtitle: "GET STARTED",
      price: "$225",
      period: "Monthly",
      description: "Perfect for getting started with unlimited training",
      features: [
        "Unlimited Training",
        "Training Footage",
        "Access to all locations",
        "Expert coaching staff",
        "Flexible scheduling"
      ],
      popular: false,
      buttonText: "START TRAINING",
      color: "from-[#0033A0] to-[#1B365D]",
      glowColor: "#0033A0"
    },
    {
      icon: "⭐",
      title: "PREMIER",
      subtitle: "MOST POPULAR",
      price: "$275",
      period: "Monthly",
      description: "Enhanced training with detailed game analysis",
      features: [
        "Unlimited Training",
        "Training Footage", 
        "Game Analysis-Video",
        "Performance tracking",
        "Priority scheduling"
      ],
      popular: true,
      buttonText: "GO PREMIER",
      color: "from-[#1E8AFF] to-[#0033A0]",
      glowColor: "#1E8AFF"
    },
    {
      icon: "🏆",
      title: "ELITE",
      subtitle: "ULTIMATE PACKAGE",
      price: "$375",
      period: "Monthly",
      description: "Ultimate package with personalized 1-on-1 sessions",
      features: [
        "Unlimited Training",
        "Training Footage",
        "Game Analysis-Video", 
        "1 on 1 Analysis Session",
        "1 on 1 Training Session"
      ],
      popular: false,
      buttonText: "GO ELITE",
      color: "from-[#1B365D] to-black",
      glowColor: "#1B365D"
    }
  ];

  const sessionPackages = [
    {
      icon: "⚡",
      title: "GRASSROOTS",
      subtitle: "ESSENTIAL TRAINING",
      price: "$280",
      period: "8 Pack",
      description: "Essential training sessions for developing goalkeepers",
      features: [
        "8 Training Sessions",
        "Flexible scheduling",
        "Access to all locations",
        "Expert coaching staff",
        "6-month validity"
      ],
      popular: false,
      buttonText: "START BASICS",
      color: "from-[#1B365D] to-[#0033A0]",
      glowColor: "#1B365D"
    },
    {
      icon: "🎯",
      title: "BASIC",
      subtitle: "MOST POPULAR",
      price: "$320",
      period: "8 Pack",
      description: "Training sessions with comprehensive footage review",
      features: [
        "8 Training Sessions",
        "Training Footage",
        "Performance analysis",
        "Technique breakdown",
        "6-month validity"
      ],
      popular: true,
      buttonText: "CHOOSE BASIC",
      color: "from-[#1E8AFF] to-[#0033A0]",
      glowColor: "#1E8AFF"
    }
  ];

  const currentPackages = activeTab === 'monthly' ? monthlyPackages : sessionPackages;

  return (
    <section className="relative overflow-hidden bg-black min-h-screen shapedividers_com-8174 shapedividers_com-647">
      {/* Background with lens flares */}
      <div className="absolute inset-0">
        {/* Gradient base matching Hero_variant3 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0033A0]/90 via-[#1B365D]/80 to-black"></div>
        
        {/* Lens Flare Effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-radial from-white/30 via-[#1E8AFF]/20 to-transparent animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-radial from-[#1E8AFF]/40 via-white/15 to-transparent animate-ping opacity-40"></div>
        <div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-gradient-radial from-white/50 to-transparent opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-20 h-20 rounded-full bg-gradient-radial from-[#1E8AFF]/60 to-transparent opacity-40 animate-ping delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center space-x-3 bg-[#1E8AFF]/20 rounded-full px-8 py-4 border border-[#1E8AFF]/40">
              <div className="w-4 h-4 bg-[#1E8AFF] rounded-full animate-ping"></div>
              <span className="text-white font-bold text-lg tracking-wider">ELITE TRAINING PLANS</span>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-6xl lg:text-8xl font-black leading-none mb-6">
            <span className="text-white">CHOOSE</span>
            <br />
            <span className="bg-gradient-to-r from-[#1E8AFF] to-white bg-clip-text text-transparent">
              EXCELLENCE
            </span>
          </h2>
          
          {/* Action Subtitle */}
          <div className="text-2xl lg:text-3xl font-bold text-[#1E8AFF] mb-8 uppercase tracking-wider">
            TRAIN • IMPROVE • DOMINATE
          </div>

          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Select the <span className="text-[#1E8AFF] font-bold">training plan</span> that fits your 
            <span className="text-white font-bold"> championship journey</span>
          </p>
        </div>

        {/* Package Toggle */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#1E8AFF] to-[#0033A0] rounded-full blur opacity-60"></div>
            <div className="relative bg-black rounded-full p-2 flex border border-[#1E8AFF]/40">
              <button
                onClick={() => setActiveTab('monthly')}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                  activeTab === 'monthly'
                    ? 'bg-[#1E8AFF] text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                MONTHLY PLANS
              </button>
              <button
                onClick={() => setActiveTab('sessions')}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                  activeTab === 'sessions'
                    ? 'bg-[#1E8AFF] text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                SESSION PACKS
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className={`grid gap-8 max-w-7xl mx-auto mb-16 ${
          activeTab === 'monthly' ? 'lg:grid-cols-3' : 'lg:grid-cols-2 max-w-5xl'
        }`}>
          {currentPackages.map((plan, index) => (
            <div key={index} className="relative group">
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-[#1E8AFF] to-[#0033A0] text-white px-8 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Glow Effect */}
              <div 
                className={`absolute -inset-2 rounded-3xl transition-all duration-700 ${
                  plan.popular ? 'opacity-60 blur-xl scale-105' : 'opacity-0 group-hover:opacity-40'
                }`}
                style={{ backgroundColor: `${plan.glowColor}40` }}
              ></div>
              
              {/* Main Card */}
              <div className={`relative rounded-2xl overflow-hidden h-full transform transition-all duration-500 group-hover:-translate-y-2 bg-gradient-to-br ${plan.color} border ${
                plan.popular ? 'border-[#1E8AFF] scale-105' : 'border-white/10'
              }`}>
                {/* Lens Flare Accent */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-radial from-white/30 to-transparent opacity-60"></div>
                
                <div className="p-8 h-full flex flex-col">
                  {/* Title */}
                  <div className="text-center mb-8">
                    <h3 className="text-3xl lg:text-4xl font-black text-white mb-2 tracking-wider">
                      {plan.title}
                    </h3>
                    
                    <div className="text-[#1E8AFF] font-bold text-lg uppercase tracking-widest mb-4">
                      {plan.subtitle}
                    </div>
                    
                    {/* Price */}
                    <div className="mb-6">
                      <div className="text-5xl lg:text-6xl font-black text-white mb-2">
                        {plan.price}
                      </div>
                      <div className="text-gray-300 text-lg font-medium">
                        {plan.period}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-200 text-lg leading-relaxed mb-8 text-center flex-grow">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-3 h-3 bg-[#1E8AFF] rounded-full mr-4 animate-pulse"></div>
                        <span className="text-white font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link
                    href="/train"
                    className={`block w-full text-center py-4 rounded-xl font-bold text-lg transition-all duration-300 transform group-hover:scale-105 shadow-xl ${
                      plan.popular 
                        ? 'bg-white text-[#0033A0] hover:bg-[#1E8AFF] hover:text-white'
                        : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white hover:text-black'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-8 left-8 hidden lg:block">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-4 border border-[#1E8AFF]/30">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-[#1E8AFF] rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">FLEXIBLE PAYMENT OPTIONS</span>
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

export default PricingVariant3;