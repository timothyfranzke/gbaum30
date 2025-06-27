import React, { useState } from 'react';

// Define interface for media items
// modify to include a description

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  alt: string;
  size: string;
  title: string;
}

const DynamicMediaGrid = () => {
  // Sample media items with different sizes
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Goalkeeper in action',
      size: '2x2', // Large featured image
      title: 'Elite Training Session'
    },
    {
      id: 2,
      type: 'video' as const,
      src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Training highlights',
      size: '2x1',
      title: 'Weekly Highlights'
    },
    {
      id: 3,
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Goalkeeper diving',
      size: '1x1',
      title: 'Perfect Save'
    },
    {
      id: 4,
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Team celebration',
      size: '1x1',
      title: 'Team Spirit'
    },
    {
      id: 5,
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Goalkeeper training',
      size: '1x2',
      title: 'Technical Training'
    },
    {
      id: 6,
      type: 'video' as const,
      src: 'https://images.unsplash.com/photo-1526232761682-d26e85d9d605?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Match footage',
      size: '2x1',
      title: 'Match Analysis'
    },
    {
      id: 7,
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Training equipment',
      size: '1x1',
      title: 'Professional Equipment'
    },
    {
      id: 8,
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Youth training',
      size: '1x1',
      title: 'Youth Development'
    }
  ];

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Function to get grid classes based on size
  const getGridClasses = (size: string) => {
    switch (size) {
      case '2x2':
        return 'md:col-span-2 md:row-span-2 col-span-2 row-span-1'; // 2x1 on mobile
      case '2x1':
        return 'md:col-span-2 md:row-span-1 col-span-2 row-span-1'; // 2x1 on mobile
      case '1x2':
        return 'md:col-span-1 md:row-span-2 col-span-2 row-span-1'; // 2x1 on mobile
      case '1x1':
      default:
        return 'md:col-span-1 md:row-span-1 col-span-2 row-span-1'; // 2x1 on mobile
    }
  };

  const openModal = (item: MediaItem) => {
    setSelectedMedia(item);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Media <span className="text-[#0033A0]">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore highlights from our training sessions, matches, and goalkeeper development programs
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 grid-rows-5 auto-rows-[200px] gap-4 max-w-7xl mx-auto">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className={`
                ${getGridClasses(item.size)}
                relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl
                transition-all duration-300 cursor-pointer group
                bg-gray-200
              `}
              onClick={() => openModal(item)}
            >
              {/* Image */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                  {item.type === 'video' && (
                    <div className="mb-2">
                      <svg className="w-12 h-12 mx-auto text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <h3 className="font-bold text-sm md:text-base">{item.title}</h3>
                  <p className="text-xs md:text-sm opacity-90 mt-1">Click to view</p>
                </div>
              </div>

              {/* Video indicator for small screens */}
              {item.type === 'video' && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-[#0033A0] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1B365D] transition">
            View All Media
          </button>
        </div>
      </div>

      {/* Modal for enlarged view */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedMedia.src}
              alt={selectedMedia.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-bold">{selectedMedia.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DynamicMediaGrid;