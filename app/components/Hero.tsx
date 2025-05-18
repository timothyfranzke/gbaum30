// Hero Section Component
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
    return (
      <section 
        className="min-h-screen flex items-center relative pt-20 bg-cover bg-center md:bg-fixed overflow-hidden"
        style={{
          backgroundImage: `url('/bg_3.png')`
        }}
      >
        <div className="container mx-auto px-4 w-full">
          <div className="flex justify-end items-center h-full">
            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="newspaper-clip-box p-6 md:p-8 bg-black bg-opacity-70 relative transform rotate-[-1deg] border-4 border-orange-500 shadow-xl">
                {/* Rough edges for newspaper clipping effect */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-[-8px] left-[15%] w-[20%] h-[8px] bg-black"></div>
                  <div className="absolute bottom-[-8px] right-[25%] w-[15%] h-[8px] bg-black"></div>
                  <div className="absolute left-[-8px] top-[30%] h-[15%] w-[8px] bg-black"></div>
                  <div className="absolute right-[-8px] bottom-[20%] h-[20%] w-[8px] bg-black"></div>
                </div>
                
                <div className="relative z-10">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 break-words text-white">
                    JOIN THE <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">AG30</span><br />
                    GOALKEEPER<br />
                    UNION
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-200">
                    Comprehensive training for technical, tactical, psychological, and social skills.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/train"
                      className="bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-orange-600 transition text-center"
                    >
                      Join Now
                    </Link>
                    <Link
                      href="/about#contact"
                      className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white hover:text-gray-900 transition text-center"
                    >
                      Request Info
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default HeroSection;