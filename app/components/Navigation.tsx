import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Navigation Component
const Navigation = () => {
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/train', label: 'TRAINING' },
    { href: '/train/schedule', label: 'SCHEDULE' },
    { href: '/events', label: 'EVENTS' },
    { href: '/classroom', label: 'CLASSROOM' },
    { href: '/news', label: 'NEWS' },
    { href: '/blog', label: 'BLOG' },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">AG</span>
            </div>
            <span className="ml-3 text-2xl font-bold">AG30</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-orange-500 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;