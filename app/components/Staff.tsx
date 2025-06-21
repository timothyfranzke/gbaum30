import React, { useState } from 'react';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  initials: string;
  avatar?: string;
  experience: string;
  specialties: string[];
}

const StaffShowcase = () => {
  const staffMembers: StaffMember[] = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Head Goalkeeper Coach",
      bio: "With over 15 years of professional goalkeeping experience and 8 years of coaching, Alex brings elite-level expertise to AG30. Former MLS goalkeeper with a passion for developing the next generation of shot-stoppers.",
      initials: "AT",
      experience: "15+ Years Playing, 8+ Years Coaching",
      specialties: ["Shot Stopping", "Distribution", "Mental Training", "Professional Development"]
    },
    {
      id: 2,
      name: "Sarah Rodriguez",
      role: "Youth Development Coach",
      bio: "Sarah specializes in youth goalkeeper development, focusing on building fundamental skills and confidence in young players. Her patient approach and technical expertise have helped hundreds of young keepers reach their potential.",
      initials: "SR",
      experience: "10+ Years Coaching Youth",
      specialties: ["Youth Development", "Technical Skills", "Confidence Building", "Game Understanding"]
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Fitness & Conditioning",
      bio: "Former college goalkeeper turned sports performance specialist. Marcus designs goalkeeper-specific fitness programs that enhance agility, reflexes, and injury prevention for players at all levels.",
      initials: "MJ",
      experience: "12+ Years Performance Training",
      specialties: ["Agility Training", "Injury Prevention", "Strength Conditioning", "Recovery Protocols"]
    },
    {
      id: 4,
      name: "Emily Chen",
      role: "Tactical Analysis Coach",
      bio: "Emily brings a modern analytical approach to goalkeeper training. With a background in sports science and video analysis, she helps goalkeepers understand positioning, decision-making, and game situations.",
      initials: "EC",
      experience: "6+ Years Sports Analysis",
      specialties: ["Video Analysis", "Tactical Training", "Decision Making", "Modern Techniques"]
    },
    {
      id: 5,
      name: "David Miller",
      role: "Mental Performance Coach",
      bio: "Certified sports psychologist specializing in goalkeeper mental training. David works with players on confidence, focus, and handling pressure situations that are unique to the goalkeeper position.",
      initials: "DM",
      experience: "8+ Years Sports Psychology",
      specialties: ["Mental Training", "Confidence Building", "Pressure Management", "Focus Development"]
    }
  ];

  const [selectedStaff, setSelectedStaff] = useState(0);

  // Create circular arrangement for avatars
  const getVisibleStaff = () => {
    const visible = [];
    const total = staffMembers.length;
    
    // Show 5 avatars: 2 left, center (selected), 2 right
    for (let i = -2; i <= 2; i++) {
      const index = (selectedStaff + i + total) % total;
      visible.push({
        ...staffMembers[index],
        originalIndex: index,
        position: i,
        isCenter: i === 0
      });
    }
    
    return visible;
  };

  const handleStaffSelect = (targetIndex: number) => {
    setSelectedStaff(targetIndex);
  };

  const visibleStaff = getVisibleStaff();
  const currentStaff = staffMembers[selectedStaff];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our <span className="text-[#0033A0]">Expert Staff</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team brings over 100 years of combined experience in goalkeeping, coaching, and player development
          </p>
        </div>

        {/* Avatar Carousel */}
        <div className="relative mb-12">
          <div className="flex justify-center items-end space-x-6 md:space-x-12">
            {visibleStaff.map((staff) => {
              const isCenter = staff.position === 0;
              const isLeft = staff.position < 0;
              const isRight = staff.position > 0;
              const distance = Math.abs(staff.position);
              
              // Calculate positioning and sizing
              const baseSize = isCenter ? 'w-28 h-28 md:w-36 md:h-36' : 
                              distance === 1 ? 'w-20 h-20 md:w-24 md:h-24' : 
                              'w-16 h-16 md:w-18 md:h-18';
              
              const opacity = isCenter ? 'opacity-100' : 
                            distance === 1 ? 'opacity-90' : 
                            'opacity-60';
              
              const zIndex = isCenter ? 'z-30' : 
                           distance === 1 ? 'z-20' : 
                           'z-10';
              
              return (
                <div
                  key={`${staff.originalIndex}-${staff.position}`}
                  className={`
                    cursor-pointer transition-all duration-500 ease-out transform
                    ${baseSize} ${opacity} ${zIndex}
                    ${!isCenter ? 'hover:scale-110 hover:opacity-100' : ''}
                    flex-shrink-0 relative
                  `}
                  onClick={() => handleStaffSelect(staff.originalIndex)}
                >
                  <div className={`
                    w-full h-full rounded-full border-4 transition-all duration-500 ease-out
                    ${isCenter ? 'border-[#0033A0] shadow-2xl' : 'border-gray-300 hover:border-[#1E8AFF]'}
                  `}>
                    <div className={`
                      w-full h-full rounded-full flex items-center justify-center text-white font-bold transition-all duration-500
                      ${isCenter ? 'bg-[#0033A0]' : 'bg-[#1B365D]'}
                      ${isCenter ? 'text-2xl md:text-3xl' : distance === 1 ? 'text-lg md:text-xl' : 'text-base md:text-lg'}
                    `}>
                      {staff.initials}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Name label for center avatar - positioned absolutely to avoid layout shift */}
          <div className="text-center mt-6 h-16 flex items-center justify-center">
            <div className="transition-all duration-500 ease-out">
              <h3 className="font-bold text-xl text-[#0033A0] mb-1">{currentStaff.name}</h3>
              <p className="text-gray-600">{currentStaff.role}</p>
            </div>
          </div>
        </div>

        {/* Staff Bio Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 transition-all duration-500 ease-out">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-[#0033A0] mb-2 transition-all duration-500">{currentStaff.name}</h3>
              <p className="text-xl text-[#1B365D] font-semibold mb-4 transition-all duration-500">{currentStaff.role}</p>
              <p className="text-gray-600 italic transition-all duration-500">{currentStaff.experience}</p>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-700 text-lg leading-relaxed transition-all duration-500">{currentStaff.bio}</p>
            </div>
            
            {/* Specialties */}
            <div>
              <h4 className="text-xl font-bold text-[#0033A0] mb-4">Specialties</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {currentStaff.specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className="bg-[#1E8AFF] bg-opacity-10 text-[#0033A0] px-4 py-2 rounded-full text-center text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.5s ease-out forwards'
                    }}
                  >
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {staffMembers.map((_, index) => (
            <button
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${selectedStaff === index ? 'bg-[#0033A0] scale-125' : 'bg-gray-300 hover:bg-[#1E8AFF]'}
              `}
              onClick={() => handleStaffSelect(index)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="/about#contact"
            className="bg-[#0033A0] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1B365D] transition inline-block"
          >
            Meet Our Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default StaffShowcase;