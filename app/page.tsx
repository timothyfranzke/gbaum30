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
import ServicesVariant1 from "./components/Services_variant1";
import ServicesVariant2 from "./components/Services_variant2";
import PricingVariant3 from "./components/Pricing_variant3";
import InfoBannerVariant3 from "./components/InfoBanner_variant3";
import Map from "./components/Map";
import InteractiveDiagram from "./components/InteractiveImage";

export default function Home() {
  // State to control which pricing component to display
  const [showDiagonalPricing, setShowDiagonalPricing] = useState(true);
  // State to control which hero variant to display
  const [activeHero, setActiveHero] = useState(1);
  
  // No longer need scroll tracking

  return (
    <>
      <Navigation />
      
      <HeroVariant3 />
      <InfoBannerVariant3 />
      <PricingVariant3 />
      <Map />
      <InteractiveDiagram />
      <TestimonialsSection />

      <Footer />
    </>
  );
}
