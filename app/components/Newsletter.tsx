import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NewsletterSection = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically submit to your API
    alert('Thank you for subscribing!');
    (e.currentTarget as HTMLFormElement).reset();
  };
  
  return (
    <section className="py-20 bg-orange-500">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Stay in the Game</h2>
          <p className="text-xl text-white mb-8">
            Get updates on training, events, and tips from AG30.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full flex-1 max-w-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;