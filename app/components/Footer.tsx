import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const Footer = () => {
    const socialLinks = [
      { href: "#", icon: "facebook" },
      { href: "#", icon: "instagram" },
      { href: "#", icon: "twitter" },
      { href: "#", icon: "youtube" }
    ];
  
    return (
      <footer className="relative bg-gray-900 text-white py-16 overflow-hidden">
        {/* Background image with gradients to black on all sides */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: 'url("/soccer_field.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%'
            }}
          ></div>
          <div className="absolute inset-0" style={{ 
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.9) 100%), linear-gradient(to top, black 0%, transparent 50%, black 100%), linear-gradient(to right, black 0%, transparent 50%, black 100%)'
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AG</span>
                </div>
                <span className="ml-3 text-2xl font-bold">AG30</span>
              </div>
              <p className="text-gray-400">Elite goalkeeper training for all levels</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/train" className="text-gray-400 hover:text-white">Training</Link></li>
                <li><Link href="/train/schedule" className="text-gray-400 hover:text-white">Schedule</Link></li>
                <li><Link href="/events" className="text-gray-400 hover:text-white">Events</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/classroom" className="text-gray-400 hover:text-white">Classroom</Link></li>
                <li><Link href="/news" className="text-gray-400 hover:text-white">News</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/about#contact" className="text-gray-400 hover:text-white">Get in Touch</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social, index) => (
                  <Link key={index} href={social.href} className="text-gray-400 hover:text-white text-2xl">
                    <span className="sr-only">{social.icon}</span>
                    {/* In a real app, you'd use actual icons here */}
                    <div className="w-6 h-6 bg-gray-600 rounded"></div>
                  </Link>
                ))}
              </div>
              <p className="text-gray-400">
                Email: <a href="mailto:info@ag30.com" className="hover:text-white">info@ag30.com</a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AG30. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;