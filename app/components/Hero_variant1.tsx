// Hero Variant 1 - Modern Minimalist Design
import Link from "next/link";

const HeroVariant1 = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0033A0] via-[#1B365D] to-[#1E8AFF]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        {/* Overlay to maintain readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0033A0]/80 via-[#1B365D]/85 to-[#1E8AFF]/80"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-[#1E8AFF]/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/8 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-[7rem] md:text-[10rem] lg:text-[12rem] font-black text-white mb-6 tracking-widest leading-none">
              UNION <span className="text-[#1E8AFF]">30</span>
            </h1>
            <h2 className="text-[2.8rem] md:text-[4rem] lg:text-[4.8rem] font-bold text-white mb-2 tracking-wider leading-none">
              ELITE <span className="text-[#1E8AFF]">GOALKEEPER</span> TRAINING
            </h2>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Where Champions Are Forged Through Elite Training, Advanced Analysis, and Authentic Mentorship
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/train"
              className="bg-[#1E8AFF] text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-white hover:text-[#0033A0] transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              START TRAINING
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-white hover:text-[#0033A0] transition-all duration-300 transform hover:scale-105"
            >
              LEARN MORE
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1E8AFF] mb-2">500+</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">Keepers Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1E8AFF] mb-2">15+</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1E8AFF] mb-2">100%</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">Elite Focus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 tracking-wider">DISCOVER MORE</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVariant1;