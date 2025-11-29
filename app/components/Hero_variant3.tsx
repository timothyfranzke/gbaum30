// Hero Variant 3 - Action-Focused Design
import Link from "next/link";
import { useState, useEffect } from "react";

const HeroVariant3 = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const trainingFeatures = [
    { icon: "🥅", title: "Shot Stopping", description: "Master every save" },
    { icon: "⚡", title: "Reflexes", description: "Lightning-fast responses" },
    { icon: "📊", title: "Analysis", description: "Data-driven improvement" },
    { icon: "🎯", title: "Positioning", description: "Perfect placement" }
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-black shapedividers_com-647 md:pb-50 pt-20 md:pt-24">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 md:top-24 bottom-0 left-0 right-0 bg-contain md:bg-contain bg-cover bg-center bg-no-repeat animate-slow-zoom"
          style={{
            backgroundImage: `url('/AGDC_bg.png')`,
          }}
        />
        {/* Dynamic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-[#0033A0]/30 to-[#1B365D]/25"></div>
        
        {/* Lens Flare Circles */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-radial from-white/40 via-[#1E8AFF]/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-radial from-[#1E8AFF]/60 via-white/20 to-transparent animate-ping"></div>
        <div className="absolute top-1/3 left-1/3 w-20 h-20 rounded-full bg-gradient-radial from-white/60 to-transparent opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 rounded-full bg-gradient-radial from-[#1E8AFF]/80 to-transparent opacity-50 animate-ping delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* Main Content - Centered */}
          <div className="text-white space-y-8 text-center">
            {/* Header Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center space-x-3 bg-[#1E8AFF]/20 rounded-full px-6 py-3 border border-[#1E8AFF]/40">
                <div className="w-4 h-4 bg-[#1E8AFF] rounded-full animate-ping"></div>
                <span className="text-white font-bold text-lg tracking-wider">UNION 30</span>
              </div>
            </div>

            {/* Main Title with Action Words */}
            <div>
              <h1 className="text-6xl lg:text-8xl font-black leading-none mb-4">
                <span className="text-white">ELITE</span> <span className="text-[#1E8AFF]">GOALKEEPER</span>
                <br />
                <span className="bg-gradient-to-r from-[#1E8AFF] to-white bg-clip-text text-transparent">
                  TRAINING
                </span>
              </h1>
              
              {/* Action Subtitle */}
              <div className="text-2xl lg:text-3xl font-bold text-[#1E8AFF] mb-4 uppercase tracking-wider">
                DOMINATE • DEFEND • DELIVER
              </div>
            </div>

            {/* Powerful Description */}
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Unleash your potential with <span className="text-[#1E8AFF] font-bold">elite-level training</span> 
              that transforms good goalkeepers into <span className="text-white font-bold">game-changers</span>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/train"
                className="group bg-[#1E8AFF] text-white px-8 py-4 rounded-xl font-bold text-xl hover:bg-white hover:text-[#0033A0] transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center"
              >
                <span>TRAIN NOW</span>
                <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                href="/analysis"
                className="border-2 border-[#1E8AFF] text-[#1E8AFF] px-8 py-4 rounded-xl font-bold text-xl hover:bg-[#1E8AFF] hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <span>VIEW ANALYSIS</span>
              </Link>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#1E8AFF]/30 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-[#1E8AFF] mb-1">200+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-[#1E8AFF] mb-1">15+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Professional Keepers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-[#1E8AFF] mb-1">24/7</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Training Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-8 left-8 hidden lg:block">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-4 border border-[#1E8AFF]/30">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-[#1E8AFF] rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">VIDEO ANALYSIS AVAILABLE</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white/70">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-xs mb-2 tracking-wider">EXPLORE</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

export default HeroVariant3;