// Hero Section Component
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
    return (
      <section 
        className="min-h-screen flex items-center relative pt-20 bg-cover bg-center md:bg-fixed overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="container mx-auto px-4 w-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 break-words">
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
            <div className="hidden md:block relative">
             
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default HeroSection;