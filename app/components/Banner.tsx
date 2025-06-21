import React from 'react';

interface BannerProps {
  title?: string;
  subtitle?: string;
  showStars?: boolean;
  showShadow?: boolean;
  starCount?: number;
  backgroundColor?: string;
  backgroundColorHex?: string;
  starColor?: string;
  direction?: 'top-to-bottom' | 'bottom-to-top';
}

const Banner: React.FC<BannerProps> = ({
  title = "",
  subtitle,
  showShadow = false,
  showStars = true,
  starCount = 5,
  backgroundColor = "",
  backgroundColorHex = "#1B365D",
  starColor = "#1E8AFF",
  direction = 'top-to-bottom'
}) => {
  // Determine skew direction based on prop
  const skewClass = direction === 'top-to-bottom' ? 'skew-y-3' : '-skew-y-3';
  const counterSkewClass = direction === 'top-to-bottom' ? '-skew-y-3' : 'skew-y-3';
  return (
    <div className="relative h-24 md:h-32 overflow-visible z-30 -my-12">
      <div 
        className={`absolute inset-0 w-[120%] -left-[10%] transform ${skewClass} ${showShadow ? 'shadow-2xl' : ''} ${backgroundColor ? 'bg-' + backgroundColor : ''}`}
        style={{ backgroundColor: backgroundColorHex }}
      >
        <div className={`absolute inset-0 flex flex-col items-center justify-center transform ${counterSkewClass}`}>
          <h2 
            className="text-white text-3xl md:text-4xl font-bold mb-2 text-center px-4" 
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-white text-lg md:text-xl opacity-90 mb-2 text-center px-4">
              {subtitle}
            </p>
          )}
          
          {showStars && (
            <div className="flex space-x-1">
              {[...Array(starCount)].map((_, i) => (
                <svg 
                  key={i} 
                  className="w-6 h-6 drop-shadow-lg" 
                  style={{ color: starColor }}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;