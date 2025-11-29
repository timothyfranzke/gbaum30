// Hero Variant 4 - Clean Design with AGDC_BG_2
import Link from "next/link";

const HeroVariant4 = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0033A0] via-[#1B365D] to-[#001122] pt-20 md:pt-24">
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl text-center space-y-8">
          {/* Hero Image */}
          <div className="flex justify-center mb-8">
            <img 
              src="/AGDC_BG_2.png" 
              alt="Union 30 Goalkeeper Training" 
              className="max-w-full h-auto max-h-[60vh] object-contain"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/train"
              className="group bg-white text-[#0033A0] px-8 py-4 rounded-xl font-bold text-xl hover:bg-[#1E8AFF] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center"
            >
              <span>START TRAINING</span>
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link
              href="/analysis"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-xl hover:bg-white hover:text-[#0033A0] transition-all duration-300 flex items-center justify-center"
            >
              <span>VIEW ANALYSIS</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVariant4;