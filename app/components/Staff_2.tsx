import React, { useState } from 'react';
import { X } from 'lucide-react';

// Define Coach interface
interface Coach {
    id: number;
    name: string;
    role: string;
    image: string;
    experience: string;
    bio: string;
    certifications: string[];
    achievements: string[];
    email: string;
    phone: string;
}

const CoachAvatars = () => {
    const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

    // JSON data for coaches
    const coaches = [
        {
            id: 1,
            name: "ANDY GRUNNEBAUM",
            role: "HEAD COACH",
            image: "https://images.unsplash.com/photo-1494790108755-2616b332c2ef?w=400&h=400&fit=crop&crop=face",
            experience: "15 years",
            bio: "Sarah brings over 15 years of coaching experience to our goalkeeper training program. She has worked with professional teams across Europe and specializes in developing young talent. Her tactical expertise and motivational approach have helped countless goalkeepers reach their potential.",
            certifications: ["UEFA Pro License", "Goalkeeper Coaching Specialist", "Sports Psychology Certification"],
            achievements: ["Led 3 teams to championship titles", "Developed 12 professional goalkeepers", "Coach of the Year 2023"],
            email: "sarah.martinez@gktraining.com",
            phone: "+1 (555) 123-4567"
        },
        {
            id: 2,
            name: "JAMES WILSON",
            role: "GOALKEEPER COACH",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            experience: "12 years",
            bio: "Former professional goalkeeper with 12 years of coaching experience. James specializes in technique refinement and mental preparation. His hands-on approach and deep understanding of the position make him invaluable to our program.",
            certifications: ["FIFA Goalkeeper Coaching License", "Mental Performance Certification"],
            achievements: ["Former Premier League goalkeeper", "Trained 8 international goalkeepers", "Technical Innovation Award 2022"],
            email: "james.wilson@gktraining.com",
            phone: "+1 (555) 234-5678"
        },
        {
            id: 3,
            name: "MARIA RODRIGUEZ",
            role: "ASSISTANT COACH",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
            experience: "8 years",
            bio: "Maria focuses on youth development and fundamental skill building. Her patient teaching style and attention to detail help young goalkeepers build strong foundations. She's passionate about creating inclusive training environments.",
            certifications: ["Youth Coaching Certification", "First Aid & CPR", "Child Protection Training"],
            achievements: ["Youth Development Award 2021", "Developed 20+ youth players", "Community Outreach Leader"],
            email: "maria.rodriguez@gktraining.com",
            phone: "+1 (555) 345-6789"
        },
        {
            id: 4,
            name: "DAVID THOMPSON",
            role: "TECHNICAL COACH",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            experience: "10 years",
            bio: "David specializes in technical analysis and performance optimization. Using video analysis and data-driven approaches, he helps goalkeepers understand and improve their decision-making and positioning.",
            certifications: ["Performance Analysis Certification", "Video Analysis Specialist", "Data Analytics in Sports"],
            achievements: ["Technical Innovation Leader", "Published 5 research papers", "Performance Improvement Specialist"],
            email: "david.thompson@gktraining.com",
            phone: "+1 (555) 456-7890"
        },
        {
            id: 5,
            name: "ANNA JOHNSON",
            role: "YOUTH COACH",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
            experience: "6 years",
            bio: "Anna is dedicated to nurturing young talent and building confidence in aspiring goalkeepers. Her energetic coaching style and creative training methods keep young players engaged and motivated to improve.",
            certifications: ["Youth Soccer Coaching License", "Child Development Specialist", "Positive Coaching Certification"],
            achievements: ["Top Youth Coach 2023", "Developed 15+ scholarship players", "Community Youth Program Leader"],
            email: "anna.johnson@gktraining.com",
            phone: "+1 (555) 567-8901"
        },
        {
            id: 6,
            name: "MIKE ANDERSON",
            role: "FITNESS COACH",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
            experience: "9 years",
            bio: "Mike focuses on goalkeeper-specific fitness training and injury prevention. His comprehensive approach to physical conditioning helps goalkeepers maintain peak performance throughout the season.",
            certifications: ["Certified Strength & Conditioning Specialist", "Sports Injury Prevention", "Goalkeeper Fitness Specialist"],
            achievements: ["Fitness Innovation Award 2022", "Reduced injury rates by 40%", "Elite Performance Consultant"],
            email: "mike.anderson@gktraining.com",
            phone: "+1 (555) 678-9012"
        }
    ];

    const openModal = (coach: Coach) => {
        setSelectedCoach(coach);
    };

    const closeModal = () => {
        setSelectedCoach(null);
    };

    return (
        <div className="w-full py-8 bg-gray-50">
            <div className="max-w-full px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Meet Our <span className="text-[#0033A0]">Expert Staff</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Our team brings over 100 years of combined experience in goalkeeping, coaching, and player development
                    </p>
                </div>

                {/* Horizontal scrolling container */}
                <div className="flex justify-center overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                    {coaches.map((coach) => (
                        <div
                            key={coach.id}
                            className="flex-shrink-0 relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                            onClick={() => openModal(coach)}
                        >
                            {/* Main avatar square */}
                            <div className="w-48 h-48 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 group-hover:border-blue-400 transition-colors duration-300 relative">
                                <div className="relative h-full">
                                    <img
                                        src={coach.image}
                                        alt={coach.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Experience badge */}
                                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {coach.experience}
                                    </div>

                                    {/* Name block overlay - vertical block on left side, wider at top, thinner at bottom */}
                                    <div className="absolute left-0 top-0 bottom-0 w-22">
                                        <div
                                            className="bg-gradient-to-b from-midnight to-[#0033A0] text-white text-top h-full flex flex-col justify-start shadow-md"
                                            style={{
                                                clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)'
                                            }}
                                        >
                                            <div className="px-1">
                                                <div className="font-bold text-xs leading-tight mb-1">
                                                    {coach.name}
                                                </div>
                                                <div className="text-xs opacity-90 font-medium">
                                                    {coach.role}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedCoach && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={closeModal}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-lg shadow-xl w-full h-full md:w-4/5 md:h-auto md:max-w-4xl md:max-h-[90vh] overflow-hidden">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            <X size={24} className="text-gray-600" />
                        </button>

                        {/* Modal Content */}
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Left side - Image */}
                            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                                <img
                                    src={selectedCoach.image}
                                    alt={selectedCoach.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                    {selectedCoach.experience}
                                </div>
                            </div>

                            {/* Right side - Details */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                                <div className="mb-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                        {selectedCoach.name}
                                    </h2>
                                    <p className="text-lg text-blue-600 font-semibold mb-4">
                                        {selectedCoach.role}
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        {selectedCoach.bio}
                                    </p>
                                </div>

                                {/* Certifications */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                        Certifications
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCoach.certifications.map((cert, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                            >
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Achievements */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                        Key Achievements
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedCoach.achievements.map((achievement, index) => (
                                            <li key={index} className="text-gray-600 flex items-start">
                                                <span className="text-green-500 mr-2">•</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Contact Info */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">
                                            <span className="font-medium">Email:</span>{' '}
                                            <a href={`mailto:${selectedCoach.email}`} className="text-blue-600 hover:underline">
                                                {selectedCoach.email}
                                            </a>
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Phone:</span>{' '}
                                            <a href={`tel:${selectedCoach.phone}`} className="text-blue-600 hover:underline">
                                                {selectedCoach.phone}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom scrollbar styles */}
            <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
};

export default CoachAvatars;