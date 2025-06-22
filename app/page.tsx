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

export default function Home() {
  // State to control which pricing component to display
  const [showDiagonalPricing, setShowDiagonalPricing] = useState(true);
  // No longer need scroll tracking

  return (
    <>
      <Navigation />
      <Hero_c />
      <ProcessSection />
      <ServicesSection />
     
      <PackagesPage />

      <TestimonialsSection />
      <StaffShowcase />


      <DynamicMediaGrid />
      <Footer />
    </>
  );
}
