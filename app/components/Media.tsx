'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Define the media item interface
interface MediaItem {
  id: string;
  header: string;
  text: string;
  type: 'image' | 'video';
  url: string;
  size?: 'large' | 'small'; // Optional size property
}

// Media data using actual files from public/media directory
const mediaData: MediaItem[] = [
  {
    id: '1',
    header: 'GOALKEEPER TRAINING HIGHLIGHTS',
    text: 'Watch our elite goalkeeper training sessions in action. Our specialized training methods focus on developing quick reflexes, proper positioning, and game awareness.',
    type: 'video',
    url: '/media/U30highlights.mov',
    size: 'large'
  },
  {
    id: '2',
    header: 'AGILITY AND TECHNIQUE',
    text: 'Our training emphasizes the perfect balance between agility and technical skills. See how our goalkeepers develop the fundamentals needed at the highest level.',
    type: 'image',
    url: '/media/AGTH.jpeg',
    size: 'small'
  },
  {
    id: '3',
    header: 'SPECTACULAR SAVES',
    text: 'Our goalkeepers demonstrate exceptional reaction time and diving technique in these highlight saves from recent training sessions.',
    type: 'video',
    url: '/media/SAVES-1.mov',
    size: 'small'
  },
  {
    id: '4',
    header: 'GOALKEEPER PUNCH TECHNIQUE',
    text: 'Proper punching technique is crucial for goalkeepers when dealing with crosses and high balls. Our training focuses on timing, technique, and decision-making.',
    type: 'image',
    url: '/media/GKPUNCH.jpeg',
    size: 'small'
  },
  {
    id: '5',
    header: 'FACILITY BUILDOUT',
    text: 'Take a look at our training facility development. We\'ve designed specialized areas for goalkeeper-specific drills and comprehensive training programs.',
    type: 'video',
    url: '/media/BUILDOUT-1.mov',
    size: 'large'
  }
];

const Media = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMediaClick = (media: MediaItem) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-white">
        <div 
          className={`absolute h-full bg-[#0033A0] transition-all duration-1000 ease-out ${
            isVisible ? 'w-full' : 'w-0'
          }`} 
          style={{ 
            transformOrigin: 'left',
            zIndex: 0
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          MEDIA GALLERY
        </h2>

        {/* Horizontal scrolling container */}
        <div className="overflow-x-auto pb-20">
          <div className="flex gap-6 w-max py-4">
            {/* Group items - large items standalone, small items in pairs */}
            {(() => {
              const groupedItems = [];
              let i = 0;
              
              while (i < mediaData.length) {
                const currentItem = mediaData[i];
                
                if (currentItem.size === 'large') {
                  // Large item takes full column
                  groupedItems.push(
                    <div 
                      key={currentItem.id} 
                      className="relative cursor-pointer transition-transform duration-300 hover:scale-[0.98] w-80"
                      onClick={() => handleMediaClick(currentItem)}
                    >
                      {/* Main image/video container */}
                      <div className="relative overflow-hidden rounded-lg shadow-lg h-96">
                        {currentItem.type === 'image' ? (
                          <Image 
                            src={currentItem.url} 
                            alt={currentItem.header}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="relative w-full h-full bg-black">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1B365D] to-black opacity-80"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-[#0033A0] flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Large items: floating overlay that extends beyond image */}
                      <div className={`absolute bottom-0 left-4 right-4 transform translate-y-6 ${
                        currentItem.id === '1' ? 'rotate-2' : 
                        currentItem.id === '5' ? '-rotate-3' : 
                        'rotate-1'
                      }`}>
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                          {/* Blue header section */}
                          <div className="bg-[#0033A0] p-4">
                            <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                              {currentItem.header}
                            </h3>
                          </div>
                          {/* White body section */}
                          <div className="bg-white p-4">
                            <p className="text-sm text-[#0033A0] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              {currentItem.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                  i++;
                } else {
                  // Small items - stack two vertically
                  const nextItem = i + 1 < mediaData.length ? mediaData[i + 1] : null;
                  
                  groupedItems.push(
                    <div key={`column-${i}`} className="flex flex-col gap-4 w-64">
                      {/* First small item */}
                      <div 
                        className="relative cursor-pointer transition-transform duration-300 hover:scale-[0.98]"
                        onClick={() => handleMediaClick(currentItem)}
                      >
                        <div className="relative overflow-hidden rounded-lg shadow-lg h-44">
                          {currentItem.type === 'image' ? (
                            <Image 
                              src={currentItem.url} 
                              alt={currentItem.header}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="relative w-full h-full bg-black">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#1B365D] to-black opacity-80"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                                  <div className="w-8 h-8 rounded-full bg-[#0033A0] flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Small items: text overlay on bottom portion */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-lg">
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                              {currentItem.header}
                            </h3>
                            <p className="text-xs text-gray-200 line-clamp-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              {currentItem.text}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Second small item (if exists) */}
                      {nextItem && nextItem.size === 'small' && (
                        <div 
                          className="relative cursor-pointer transition-transform duration-300 hover:scale-[0.98]"
                          onClick={() => handleMediaClick(nextItem)}
                        >
                          <div className="relative overflow-hidden rounded-lg shadow-lg h-44">
                            {nextItem.type === 'image' ? (
                              <Image 
                                src={nextItem.url} 
                                alt={nextItem.header}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="relative w-full h-full bg-black">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1B365D] to-black opacity-80"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-[#0033A0] flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Small items: text overlay on bottom portion */}
                          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-lg">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                                {nextItem.header}
                              </h3>
                              <p className="text-xs text-gray-200 line-clamp-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                {nextItem.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                  
                  // Skip the next item if we used it
                  i += nextItem && nextItem.size === 'small' ? 2 : 1;
                }
              }
              
              return groupedItems;
            })()}
          </div>
        </div>

        {/* Add margin bottom to account for floating overlays on large items */}
        <div className="h-4"></div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedMedia && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-auto rounded-lg">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0033A0] flex items-center justify-center text-white hover:bg-[#1B365D] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-6">
              <h2 className="text-3xl font-bold text-[#0033A0] mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {selectedMedia.header}
              </h2>
              
              <div className="mb-6">
                {selectedMedia.type === 'image' ? (
                  <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
                    <Image 
                      src={selectedMedia.url} 
                      alt={selectedMedia.header}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <video 
                  
                    src={selectedMedia.url} 
                    controls 
                    className="w-full rounded-lg"
                    autoPlay
                    playsInline
                    controlsList="nodownload"
                  >
                    <source src="assets/popcorntest.mp4"></source>
        <source src="assets/popcorntest.ogv"></source>
        <source src="assets/popcorntest.webm"></source>
                  </video>
                )}
              </div>
              
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {selectedMedia.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for line clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Media;