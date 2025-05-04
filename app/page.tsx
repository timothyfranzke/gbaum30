'use client';

import Image from "next/image";
import Navigation from "./components/Navigation";
import HeroSection from "./components/Hero";
import TestimonialsSection from "./components/Testimonial";
import TrainingSection from "./components/Pricing";
import KCFusionSection from "./components/KCFusion";
import NewsletterSection from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
        <Navigation />
        <HeroSection />
        <TestimonialsSection />
        <TrainingSection />
        <KCFusionSection />
        <NewsletterSection />
      <Footer />
    </>
  );
}
