'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  initials: string;
  avatar?: string;
  experience: string;
  specialties: string[];
  email?: string;
  achievements?: string[];
}

export default function StaffPage() {
  const staffMembers: StaffMember[] = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Head Goalkeeper Coach",
      bio: "With over 15 years of professional goalkeeping experience and 8 years of coaching, Alex brings elite-level expertise to AG30. Former MLS goalkeeper with a passion for developing the next generation of shot-stoppers. Alex has trained with top-tier clubs and understands the mental and physical demands of modern goalkeeping.",
      initials: "AT",
      avatar: "/avatars/alex.jpg",
      experience: "15+ Years Playing, 8+ Years Coaching",
      specialties: ["Shot Stopping", "Distribution", "Mental Training", "Professional Development"],
      email: "alex@ag30.com",
      achievements: ["Former MLS Goalkeeper", "NCAA Division I All-American", "Youth National Team Experience"]
    },
    {
      id: 2,
      name: "Sarah Rodriguez",
      role: "Youth Development Coach",
      bio: "Sarah specializes in youth goalkeeper development, focusing on building fundamental skills and confidence in young players. Her patient approach and technical expertise have helped hundreds of young keepers reach their potential. Sarah understands that each young goalkeeper learns differently and adapts her coaching style accordingly.",
      initials: "SR",
      avatar: "/avatars/sarah.jpg",
      experience: "10+ Years Coaching Youth",
      specialties: ["Youth Development", "Technical Skills", "Confidence Building", "Game Understanding"],
      email: "sarah@ag30.com",
      achievements: ["Licensed Youth Coach", "Former College Goalkeeper", "500+ Players Trained"]
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Fitness & Conditioning Coach",
      bio: "Former college goalkeeper turned sports performance specialist. Marcus designs goalkeeper-specific fitness programs that enhance agility, reflexes, and injury prevention for players at all levels. His scientific approach to training combines modern sports science with practical goalkeeper needs.",
      initials: "MJ",
      avatar: "/avatars/marcus.jpg",
      experience: "12+ Years Performance Training",
      specialties: ["Agility Training", "Injury Prevention", "Strength Conditioning", "Recovery Protocols"],
      email: "marcus@ag30.com",
      achievements: ["Certified Strength Coach", "Sports Science Degree", "Injury Prevention Specialist"]
    },
    {
      id: 4,
      name: "Emily Chen",
      role: "Tactical Analysis Coach",
      bio: "Emily brings a modern analytical approach to goalkeeper training. With a background in sports science and video analysis, she helps goalkeepers understand positioning, decision-making, and game situations. Her data-driven approach helps players identify and improve specific aspects of their game.",
      initials: "EC",
      avatar: "/avatars/emily.jpg",
      experience: "6+ Years Sports Analysis",
      specialties: ["Video Analysis", "Tactical Training", "Decision Making", "Modern Techniques"],
      email: "emily@ag30.com",
      achievements: ["Sports Science Master's", "Professional Club Analyst", "UEFA Licensed Coach"]
    },
    {
      id: 5,
      name: "David Miller",
      role: "Mental Performance Coach",
      bio: "Certified sports psychologist specializing in goalkeeper mental training. David works with players on confidence, focus, and handling pressure situations that are unique to the goalkeeper position. He understands the psychological demands of being the last line of defense.",
      initials: "DM",
      avatar: "/avatars/david.jpg",
      experience: "8+ Years Sports Psychology",
      specialties: ["Mental Training", "Confidence Building", "Pressure Management", "Focus Development"],
      email: "david@ag30.com",
      achievements: ["Licensed Sports Psychologist", "PhD in Sports Psychology", "Professional Team Experience"]
    }
  ];

  const [selectedStaff, setSelectedStaff] = useState<StaffMember>(staffMembers[0]);

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0033A0] to-[#1B365D] py-20 pt-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Meet Our Expert Staff
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our team brings over 100 years of combined experience in goalkeeping, coaching, and player development. 
            Each member is dedicated to helping goalkeepers reach their full potential.
          </p>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-16">
            {staffMembers.map((staff) => (
              <div
                key={staff.id}
                className={`
                  cursor-pointer transition-all duration-300 transform hover:scale-105
                  ${selectedStaff.id === staff.id ? 'scale-105' : ''}
                `}
                onClick={() => setSelectedStaff(staff)}
              >
                <div className={`
                  bg-white rounded-lg shadow-lg overflow-hidden border-4 transition-all duration-300
                  ${selectedStaff.id === staff.id ? 'border-[#0033A0] shadow-2xl' : 'border-transparent'}
                `}>
                  <div className="aspect-square relative bg-gradient-to-br from-[#0033A0] to-[#1B365D]">
                    {staff.avatar ? (
                      <Image
                        src={staff.avatar}
                        alt={staff.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center text-white font-bold text-3xl">
                                ${staff.initials}
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-3xl">
                        {staff.initials}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-[#0033A0] mb-1">{staff.name}</h3>
                    <p className="text-gray-600 text-sm">{staff.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Staff Details */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="md:flex">
                {/* Staff Image */}
                <div className="md:w-1/3">
                  <div className="aspect-square relative bg-gradient-to-br from-[#0033A0] to-[#1B365D]">
                    {selectedStaff.avatar ? (
                      <Image
                        src={selectedStaff.avatar}
                        alt={selectedStaff.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center text-white font-bold text-6xl">
                                ${selectedStaff.initials}
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-6xl">
                        {selectedStaff.initials}
                      </div>
                    )}
                  </div>
                </div>

                {/* Staff Info */}
                <div className="md:w-2/3 p-8 md:p-12">
                  <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0033A0] mb-2">
                      {selectedStaff.name}
                    </h2>
                    <p className="text-xl text-[#1B365D] font-semibold mb-2">
                      {selectedStaff.role}
                    </p>
                    <p className="text-gray-600 italic">
                      {selectedStaff.experience}
                    </p>
                  </div>

                  <div className="mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {selectedStaff.bio}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-[#0033A0] mb-4">Specialties</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedStaff.specialties.map((specialty, index) => (
                        <div
                          key={index}
                          className="bg-[#1E8AFF] bg-opacity-10 text-[#0033A0] px-4 py-2 rounded-full text-center text-sm font-semibold"
                        >
                          {specialty}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  {selectedStaff.achievements && (
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-[#0033A0] mb-4">Achievements</h4>
                      <ul className="space-y-2">
                        {selectedStaff.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-[#0033A0] rounded-full mr-3"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Contact */}
                  {selectedStaff.email && (
                    <div>
                      <h4 className="text-xl font-bold text-[#0033A0] mb-4">Contact</h4>
                      <a
                        href={`mailto:${selectedStaff.email}`}
                        className="inline-flex items-center text-[#1E8AFF] hover:text-[#0033A0] transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {selectedStaff.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#0033A0]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Train with Our Expert Team?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our programs and how our experienced staff can help you reach your goalkeeping goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="bg-white text-[#0033A0] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition inline-block"
            >
              Contact Us
            </a>
            <a
              href="/#programs"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#0033A0] transition inline-block"
            >
              View Programs
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}