'use client';

import { useState } from "react";
import Image from "next/image";
import Navigation from "./components/Navigation";
import HeroSection from "./components/Hero";
import WhyAG30Section from "./components/WhyAG30";
import TestimonialsSection from "./components/Testimonial";
import TrainingSection from "./components/Pricing";
import DiagonalPricing from "./components/DiagonalPricing";
import KCFusionSection from "./components/KCFusion";
import TacticalEdgeSection from "./components/TacticalEdge";
import NewsletterSection from "./components/Newsletter";
import Footer from "./components/Footer";
import HeroA from "./components/Hero_a";
import Hero_b from "./components/Hero_b";
import Hero_c from "./components/Hero_c";

export default function Home() {
  // State to control which pricing component to display
  const [showDiagonalPricing, setShowDiagonalPricing] = useState(true);

  return (
    <>
        <Navigation />
        <Hero_c />
        <TestimonialsSection />
        <WhyAG30Section />
        
        {/* Pricing section with toggle */}
        <div className="bg-black py-4 text-center">
          <div className="container mx-auto flex justify-center items-center space-x-4">
            <button 
              onClick={() => setShowDiagonalPricing(false)}
              className={`px-4 py-2 rounded-l-full ${!showDiagonalPricing ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              Standard Pricing
            </button>
            <button 
              onClick={() => setShowDiagonalPricing(true)}
              className={`px-4 py-2 rounded-r-full ${showDiagonalPricing ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              Diagonal Pricing
            </button>
          </div>
        </div>
        
        {showDiagonalPricing ? <DiagonalPricing /> : <TrainingSection />}
        
        <KCFusionSection />
        <TacticalEdgeSection />
        <NewsletterSection />
      <Footer />
    </>
  );
}
