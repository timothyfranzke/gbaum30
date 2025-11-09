'use client';

import { useState, useEffect, useRef } from "react";
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
import Hero_c from "./components/Hero_c";
import Media from "./components/Media";
import Banner from "./components/Banner";
import StaffShowcase from "./components/Staff";
import ProcessSection from "./components/ProcessSteps";
import DynamicMediaGrid from "./components/MediaGallery";
import ServicesSection from "./components/Services";
import PackagesPage from "./components/Packages";
import CoachAvatars from "./components/Staff_2";
import Hero_b from "./components/Hero_b";
import HeroVariant1 from "./components/Hero_variant1";
import HeroVariant2 from "./components/Hero_variant2";
import HeroVariant3 from "./components/Hero_variant3";

export default function Home() {
  // State to control which pricing component to display
  const [showDiagonalPricing, setShowDiagonalPricing] = useState(true);
  // State to control which hero variant to display
  const [activeHero, setActiveHero] = useState(1);
  
  // No longer need scroll tracking

  return (
    <>
      <Navigation />
      
      {/* Hero Variant Switcher - For client preview */}
      <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-lg p-4 border">
        <div className="text-sm font-medium text-gray-700 mb-2">Hero Variants:</div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActiveHero(1)}
            className={`px-3 py-1 rounded text-sm ${activeHero === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Variant 1
          </button>
          <button
            onClick={() => setActiveHero(2)}
            className={`px-3 py-1 rounded text-sm ${activeHero === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Variant 2
          </button>
          <button
            onClick={() => setActiveHero(3)}
            className={`px-3 py-1 rounded text-sm ${activeHero === 3 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Variant 3
          </button>
        </div>
      </div>

      {/* Render selected hero variant */}
      {activeHero === 1 && <HeroVariant1 />}
      {activeHero === 2 && <HeroVariant2 />}
      {activeHero === 3 && <HeroVariant3 />}
      
      <ProcessSection />
      <ServicesSection />
     
      <PackagesPage />

      <TestimonialsSection />
      <CoachAvatars />


      <DynamicMediaGrid />
      <Footer />
    </>
  );
}
