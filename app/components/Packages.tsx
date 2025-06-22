import React, { useState } from 'react';
import { Check, Star, Trophy, Target, Zap } from 'lucide-react';

const PackagesPage = () => {
  const [activeTab, setActiveTab] = useState('monthly');

  const monthlyPackages = [
    {
      name: "Basic",
      price: 225,
      period: "Monthly",
      description: "Perfect for getting started with unlimited training",
      features: [
        "Unlimited Training",
        "Training Footage",
        "Access to all locations",
        "Expert coaching staff",
        "Flexible scheduling"
      ],
      icon: <Target className="w-8 h-8" />,
      popular: false,
      color: "from-primary to-midnight"
    },
    {
      name: "Premier",
      price: 275,
      period: "Monthly",
      description: "Enhanced training with detailed game analysis",
      features: [
        "Unlimited Training",
        "Training Footage",
        "Game Analysis-Video",
        "Performance tracking",
        "Priority scheduling"
      ],
      icon: <Star className="w-8 h-8" />,
      popular: true,
      color: "from-sunset to-goldenrod"
    },
    {
      name: "Elite",
      price: 375,
      period: "Monthly",
      description: "Ultimate package with personalized 1-on-1 sessions",
      features: [
        "Unlimited Training",
        "Training Footage",
        "Game Analysis-Video",
        "1 on 1 Analysis Session",
        "1 on 1 Training Session"
      ],
      icon: <Trophy className="w-8 h-8" />,
      popular: false,
      color: "from-secondary to-sky"
    }
  ];

  const sessionPackages = [
    {
      name: "Grassroots",
      price: 280,
      period: "8 Pack",
      description: "Essential training sessions for developing goalkeepers",
      features: [
        "8 Training Sessions",
        "Flexible scheduling",
        "Access to all locations",
        "Expert coaching staff",
        "6-month validity"
      ],
      icon: <Zap className="w-8 h-8" />,
      popular: false,
      color: "from-secondary to-sky"
    },
    {
      name: "Basic",
      price: 320,
      period: "8 Pack",
      description: "Training sessions with comprehensive footage review",
      features: [
        "8 Training Sessions",
        "Training Footage",
        "Performance analysis",
        "Technique breakdown",
        "6-month validity"
      ],
      icon: <Target className="w-8 h-8" />,
      popular: true,
      color: "from-primary to-midnight"
    }
  ];

  const PackageCard = ({ pkg, index }: { pkg: any; index: number }) => (
    <div className={`relative transform transition-all duration-300 hover:-translate-y-2 ${index === 1 ? 'md:scale-105' : ''}`}>
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-sunset text-white px-4 py-1 rounded-full text-sm font-bold">
            MOST POPULAR
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden h-full">
        {/* Header */}
        <div className={`bg-gradient-to-r ${pkg.color} p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-white opacity-90">
              {pkg.icon}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${pkg.price}</div>
              <div className="text-sm opacity-90">{pkg.period}</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
          <p className="text-sm opacity-90">{pkg.description}</p>
        </div>

        {/* Features */}
        <div className="p-6">
          <ul className="space-y-4 mb-8">
            {pkg.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start">
                <Check className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Subscribe Button */}
          <button className={`w-full bg-gradient-to-r ${pkg.color} text-white py-3 px-6 rounded-full font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-midnight text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 heading-font">
            Training <span className="text-secondary">Packages</span>
          </h1>
          <p className="text-xl md:text-2xl text-sky max-w-3xl mx-auto">
            Choose the perfect training package to elevate your goalkeeper skills to the next level
          </p>
        </div>
      </div>

      {/* Package Toggle */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full shadow-lg p-2 flex">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                activeTab === 'monthly'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Monthly Plans
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                activeTab === 'sessions'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Session Packs
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="pb-20">
          {activeTab === 'monthly' ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {monthlyPackages.map((pkg, index) => (
                <PackageCard key={pkg.name} pkg={pkg} index={index} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {sessionPackages.map((pkg, index) => (
                <PackageCard key={pkg.name} pkg={pkg} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground heading-font">
            What's Included in All Packages
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 heading-font">Expert Coaching</h3>
              <p className="text-foreground/70">Professional goalkeeper coaches with years of experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 heading-font">Modern Training</h3>
              <p className="text-foreground/70">Up-to-date techniques and methodologies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sunset rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 heading-font">Flexible Locations</h3>
              <p className="text-foreground/70">Multiple training locations for your convenience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-midnight rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 heading-font">Performance Focus</h3>
              <p className="text-foreground/70">Dedicated to improving your game performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative text-white py-20">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/soccer_net_bg.jpg" 
            alt="Soccer net background" 
            className="w-full h-full object-cover" 
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-midnight opacity-85"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 heading-font">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-sky">
            Join the AG30 Goalkeeper Union and take your skills to the next level
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-sunset text-white px-8 py-4 rounded-full font-bold hover:bg-sunset/80 transition">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground heading-font">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-2 heading-font">What should I expect after I sign up on the website?</h3>
              <p className="text-foreground/70">First, welcome! We're so glad you've decided to join us. One of our staff will contact you do discuss your player and their needs a little bit more as well as finding a good time for them to join a session for an initial assessment. After that, we'll let you know which group(s) would be best suited for them and you can choose a plan that fits your schedule and budget.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-2 heading-font">What is PushPress?</h3>
              <p className="text-foreground/70">PushPress is a third party system we use to manage your plans, subscriptions, billing, and check in at training. It's how you'll pay for our services and how we'll communicate with you when there are important updates or changes. When you sign up here on our website, we also create an account for you at PushPress (or link an existing one if your email matches). As part of the onboarding process, one of our staff will contact you after you register on our site with more information.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-2 heading-font">I'm not sure I want to commit to a monthly subscription; are there other options?</h3>
              <p className="text-foreground/70">Yes! You can purchase an 8 pack of training sessions as well. You'll find pricing and information above. 8 packs can be a good choice if you're only able to make a couple sessions per month or if you'd like to train with us before deciding on a monthly subscription.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-2 heading-font">Can I cancel my subscription or change it?</h3>
              <p className="text-foreground/70">We understand circumstances and schedules change. We would love to work with you to find a plan that works, but if you need to cancel you can do so via your PushPress account at any time. No refunds will be given for partial packs / months that are unused.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;