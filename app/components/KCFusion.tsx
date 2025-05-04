import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const KCFusionSection = () => {
    return (
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Exclusive KC Fusion Training</h2>
              <p className="text-xl mb-8 text-gray-300">
                Specialized training for KC Fusion club players. Join our exclusive program designed specifically for your club's goalkeepers.
              </p>
              <Link
                href="https://gbaum30.pushpress.com/open/subscribe/ti9u"
                className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition inline-block"
              >
                Register Now
              </Link>
            </div>
            <div className="relative w-full max-w-[600px] mx-auto">
              <img
                src="https://images.unsplash.com/photo-1614632537197-38a17061c2bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80"
                alt="KC Fusion Training"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default KCFusionSection;