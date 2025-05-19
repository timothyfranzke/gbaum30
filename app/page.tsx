'use client';

import Image from "next/image";
import Navigation from "./components/Navigation";
import HeroSection from "./components/Hero";
import WhyAG30Section from "./components/WhyAG30";
import TestimonialsSection from "./components/Testimonial";
import TrainingSection from "./components/Pricing";
import KCFusionSection from "./components/KCFusion";
import TacticalEdgeSection from "./components/TacticalEdge";
import NewsletterSection from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
        <Navigation />
        <HeroSection />
        <TestimonialsSection />
        <WhyAG30Section />
        <TrainingSection />
        <KCFusionSection />
        <TacticalEdgeSection />
        <NewsletterSection />
      <Footer />
    </>
  );
}
