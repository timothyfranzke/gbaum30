import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-orange-500 rounded-lg p-6 text-white transition-all duration-300 hover:transform hover:-translate-y-2">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const PricingCard = ({ title, price, period, description, isPopular }: { title: string; price: string; period?: string | null; description: string; isPopular?: boolean }) => {
  return (
    <div className={`border rounded-lg p-6 text-center relative hover:transform hover:-translate-y-2 transition-all duration-300 ${isPopular ? 'border-2 border-orange-500' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
          Most Popular
        </div>
      )}
      <h4 className="text-xl font-bold mb-4">{title}</h4>
      <p className="text-4xl font-bold mb-4">
        {price}{period && <span className="text-sm text-gray-600">/{period}</span>}
      </p>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link
        href="/train"
        className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
      >
        Get Started
      </Link>
    </div>
  );
};

const TrainingSection = () => {
  const features = [
    {
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      title: "Expert Staff",
      description: "Over 100 years of combined experience"
    },
    {
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      title: "Modern Training",
      description: "Relevant to today's game demands"
    },
    {
      icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
      title: "Career Connections",
      description: "Pathways to higher levels"
    }
  ];
  
    const pricingPlans = [
    {
      title: "Drop-In",
      price: "$50",
      period: "session",
      description: "Perfect for trying out our training",
      isPopular: false
    },
    {
      title: "Monthly Unlimited",
      price: "$175",
      period: "month",
      description: "Unlimited access to all sessions",
      isPopular: true
    },
    {
      title: "8-Session Pack",
      price: "$320",
      period: null,
      description: "Best value for regular training",
      isPopular: false
    }
  ];

  return (
    <section className="py-20 bg-[radial-gradient(circle_at_100%_50%,transparent_20%,rgba(255,165,0,0.1)_21%,rgba(255,165,0,0.1)_34%,transparent_35%,transparent),linear-gradient(0deg,transparent_24%,rgba(255,165,0,0.05)_25%,rgba(255,165,0,0.05)_26%,transparent_27%,transparent_74%,rgba(255,165,0,0.05)_75%,rgba(255,165,0,0.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose AG30?</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Training Plans</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Including specialized services like Tactical Edge Analysis with drone footage</p>
            <Link
              href="/train"
              className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition"
            >
              View Training Plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;