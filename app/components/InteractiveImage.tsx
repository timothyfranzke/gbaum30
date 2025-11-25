import React, { useState, useRef, useEffect } from 'react';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  content: string;
}

const hotspotsData: Hotspot[] = [
  { 
    id: 'head', 
    x: 50, 
    y: 10, 
    title: '🧠 Head & Mind',
    content: 'Mental strength and focus are crucial. A goalkeeper needs quick decision-making skills and excellent spatial awareness to read the game.'
  },
  { 
    id: 'hands', 
    x: 65, 
    y: 35, 
    title: '🧤 Gloves & Hands',
    content: 'Professional goalkeeper gloves provide grip and protection. Strong hands and proper catching technique are essential for making saves.'
  },
  { 
    id: 'stomach', 
    x: 50, 
    y: 40, 
    title: '💪 Core Strength',
    content: 'A strong core provides stability and power for diving saves. Core training is fundamental for goalkeeper agility and explosive movements.'
  },
  { 
    id: 'feet', 
    x: 45, 
    y: 85, 
    title: '⚽ Footwork',
    content: 'Quick feet and good positioning are vital. Modern goalkeepers need excellent ball control and distribution skills with both feet.'
  }
];

export const InteractiveDiagram = () => {
  const [activeDialog, setActiveDialog] = useState<Hotspot | null>(null);
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const handleResize = () => {
      // Image resize handling if needed in future
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHotspotClick = (hotspot: Hotspot, event: React.MouseEvent<HTMLDivElement>) => {
    console.log('Hotspot clicked:', hotspot.title); // Debug log
    const rect = event.currentTarget.getBoundingClientRect();
    const hotspotCenterX = rect.left + rect.width / 2 + window.scrollX;
    const hotspotCenterY = rect.top + rect.height / 2 + window.scrollY;
    
    console.log('Dialog position:', { x: hotspotCenterX, y: hotspotCenterY }); // Debug log
    
    setDialogPosition({
      x: hotspotCenterX,
      y: hotspotCenterY
    });
    setActiveDialog(hotspot);
  };

  const closeDialog = () => {
    setActiveDialog(null);
  };

  return (
    <>
      <style jsx>{`
        .container {
          position: relative;
          display: inline-block;
          max-width: 90vw;
          max-height: 90vh;
          background: radial-gradient(circle, #234c8a 0%, #181e46 100%);
          padding: 40px;
          border-radius: 20px;
        }
        
        .image-wrapper {
          position: relative;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(90deg);
          width: 45%;
          height: 45%;
          background: radial-gradient(
            ellipse at center,
            rgba(135, 206, 250, 0.4) 0%,
            rgba(100, 149, 237, 0.3) 30%,
            rgba(173, 216, 230, 0.2) 60%,
            transparent 80%
          );
          border-radius: 50%;
          filter: blur(15px);
          animation: gentlePulse 3s ease-in-out infinite;
          z-index: -1;
        }
        
        @keyframes gentlePulse {
          0%, 100% { 
            opacity: 0.3;
            transform: translate(-50%, -50%) rotate(90deg) scale(0.95);
          }
          50% { 
            opacity: 0.7;
            transform: translate(-50%, -50%) rotate(90deg) scale(1.05);
          }
        }
        
        .player-image {
          position: relative;
          z-index: 2;
          width: 100%;
          height: auto;
          max-height: 80vh;
          object-fit: contain;
          pointer-events: none;
        }
        
        .hotspot {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(100,200,255,0.7) 100%);
          border: 2px solid #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: hotspotPulse 1.5s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(100,200,255,0.8);
          z-index: 5;
        }
        
        @keyframes hotspotPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 20px rgba(100,200,255,0.8);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 0 30px rgba(100,200,255,1);
          }
        }
        
        .hotspot:hover {
          transform: translate(-50%, -50%) scale(1.3) !important;
          background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,100,100,0.9) 100%);
        }
        
        .hotspot::after {
          content: '+';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #333;
          font-size: 24px;
          font-weight: bold;
        }
        
        .dialog {
          position: fixed;
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,255,0.95) 100%);
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          z-index: 100;
          min-width: 200px;
          max-width: 300px;
          animation: expandFromHotspot 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid rgba(100,200,255,0.3);
          transform-origin: center center;
          pointer-events: auto;
        }
        
        @keyframes expandFromHotspot {
          0% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          60% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.8;
          }
          100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        
        .dialog-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
          color: white;
          border: none;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .dialog-close:hover {
          transform: scale(1.1) rotate(90deg);
          background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
        }
        
        .dialog h3 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .dialog p {
          margin: 0;
          color: #666;
          line-height: 1.5;
        }
        
        .info-icon {
          display: inline-block;
          margin-right: 8px;
          animation: bounce 1s ease-in-out infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
      <div className="container">
        <div className="image-wrapper">
          <div className="glow"></div>
          <img 
            ref={imageRef}
            src="/player.png"
            alt="Soccer Player"
            className="player-image"
          />
          {hotspotsData.map(hotspot => (
            <div
              key={hotspot.id}
              className="hotspot"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={(e) => handleHotspotClick(hotspot, e)}
            />
          ))}
        </div>
        
        {activeDialog && (
          <div 
            className="dialog"
            style={{
              left: `${dialogPosition.x}px`,
              top: `${dialogPosition.y}px`,
              position: 'fixed',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              border: '2px solid blue',
              zIndex: 1000
            }}
          >
            <button className="dialog-close" onClick={closeDialog}>×</button>
            <h3>
              <span className="info-icon">ℹ️</span>
              {activeDialog.title}
            </h3>
            <p>{activeDialog.content}</p>
          </div>
        )}
        
        {/* Debug info */}
        {activeDialog && (
          <div style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            background: 'red',
            color: 'white',
            padding: '10px',
            zIndex: 1001
          }}>
            Dialog active: {activeDialog.title}
          </div>
        )}
      </div>
    </>
  );
};

export default InteractiveDiagram;