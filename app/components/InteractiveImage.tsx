import React, { useState, useRef, useEffect } from 'react';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  content: string;
  icon: string;
  categories: string[];
}

const hotspotsData: Hotspot[] = [
  { 
    id: 'head', 
    x: 50, 
    y: 20, 
    title: 'Head & Mind',
    content: 'Mental strength and focus are crucial. A goalkeeper needs quick decision-making skills and excellent spatial awareness to read the game.',
    icon: '🧠',
    categories: ['Focus', 'Vision', 'Decision']
  },
  { 
    id: 'hands', 
    x: 58, 
    y: 45, 
    title: 'Hands & Ball Control',
    content: 'Crucial for goalkeepers, mastering hand positioning, grip strength, and ball handling reduces rebounds and ensures secure possession.',
    icon: '🧤',
    categories: ['Grip', 'Catch', 'Throw']
  },
  { 
    id: 'stomach', 
    x: 48, 
    y: 43, 
    title: 'Core Strength',
    content: 'A strong core provides stability and power for diving saves. Core training is fundamental for goalkeeper agility and explosive movements.',
    icon: '💪',
    categories: ['Power', 'Balance', 'Agility']
  },
  { 
    id: 'feet', 
    x: 45, 
    y: 75, 
    title: 'Footwork',
    content: 'Quick feet and good positioning are vital. Modern goalkeepers need excellent ball control and distribution skills with both feet.',
    icon: '⚽',
    categories: ['Speed', 'Position', 'Control']
  }
];

export const InteractiveDiagram = () => {
  const [activeDialog, setActiveDialog] = useState<Hotspot | null>(null);
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleResize = () => {
      // Image resize handling if needed in future
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHotspotClick = (hotspot: Hotspot, event: React.MouseEvent<HTMLDivElement>) => {
    console.log('Hotspot clicked:', hotspot.title);
    event.stopPropagation();
    
    // Get click position for animation origin
    setDialogPosition({
      x: event.clientX,
      y: event.clientY
    });
    setActiveDialog(hotspot);
  };

  const closeDialog = () => {
    setActiveDialog(null);
  };

  return (
    <section className="interactive-section">
      <style jsx>{`
        .interactive-section {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #1a2332 0%, #0d1117 100%);
          padding: 60px 40px;
          position: relative;
          overflow: visible;
        }
        
        .content-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          max-width: 1400px;
          width: 100%;
          align-items: center;
        }
        
        .left-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
        }
        
        .main-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px, 8vw, 120px);
          line-height: 0.9;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          background: linear-gradient(180deg, #ffffff 0%, rgba(100, 200, 255, 0.9) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .subheading {
          font-family: 'Roboto', sans-serif;
          font-size: clamp(16px, 1.5vw, 20px);
          color: rgba(255, 255, 255, 0.7);
          margin-top: 20px;
          line-height: 1.6;
          max-width: 500px;
        }
        
        .container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 1024px) {
          .content-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .left-content {
            text-align: center;
            align-items: center;
          }
          
          .main-heading {
            font-size: clamp(48px, 10vw, 80px);
          }
        }
        
        .image-wrapper {
          position: relative;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
          transform: scale(1.5);
        }
        
        @keyframes float {
          0%, 100% { transform: scale(1.5) translateY(0px); }
          50% { transform: scale(1.5) translateY(-10px); }
        }
        
        @media (max-width: 1024px) {
          .image-wrapper {
            transform: scale(1.3);
          }
          
          @keyframes float {
            0%, 100% { transform: scale(1.3) translateY(0px); }
            50% { transform: scale(1.3) translateY(-8px); }
          }
        }
        
        @media (max-width: 768px) {
          .image-wrapper {
            transform: scale(1.1);
          }
          
          @keyframes float {
            0%, 100% { transform: scale(1.1) translateY(0px); }
            50% { transform: scale(1.1) translateY(-6px); }
          }
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
          max-height: none;
          min-height: 600px;
          object-fit: contain;
          pointer-events: none;
        }
        
        @media (max-width: 1024px) {
          .player-image {
            min-height: 400px;
            max-width: 90vw;
          }
        }
        
        @media (max-width: 768px) {
          .player-image {
            min-height: 350px;
            max-width: 85vw;
          }
        }
        
        .hotspot {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 3px solid rgba(100, 200, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s ease;
          animation: hotspotPulse 2s ease-in-out infinite;
          box-shadow: 
            0 0 20px rgba(100, 200, 255, 0.6),
            0 0 40px rgba(100, 200, 255, 0.4),
            inset 0 0 20px rgba(100, 200, 255, 0.2);
          z-index: 10;
          pointer-events: auto;
          transform: translate(-50%, -50%) scale(0.667);
        }
        
        @keyframes hotspotPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(0.667);
            box-shadow: 
              0 0 20px rgba(100, 200, 255, 0.6),
              0 0 40px rgba(100, 200, 255, 0.4),
              inset 0 0 20px rgba(100, 200, 255, 0.2);
          }
          50% { 
            transform: translate(-50%, -50%) scale(0.767);
            box-shadow: 
              0 0 30px rgba(100, 200, 255, 0.8),
              0 0 60px rgba(100, 200, 255, 0.6),
              inset 0 0 30px rgba(100, 200, 255, 0.3);
          }
        }
        
        .hotspot:hover {
          transform: translate(-50%, -50%) scale(0.834) !important;
          border-color: rgba(150, 220, 255, 1);
          box-shadow: 
            0 0 30px rgba(100, 200, 255, 0.9),
            0 0 60px rgba(100, 200, 255, 0.7),
            inset 0 0 30px rgba(100, 200, 255, 0.4);
        }
        
        .hotspot::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: rgba(100, 200, 255, 0.9);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(100, 200, 255, 0.8);
        }
        
        .dialog-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .dialog {
          background: linear-gradient(135deg, rgba(35, 76, 138, 0.98) 0%, rgba(30, 60, 115, 0.98) 100%);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(100, 200, 255, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          min-width: 320px;
          max-width: 400px;
          width: 90%;
          position: relative;
          pointer-events: auto;
        }
        
        .dialog-close {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          cursor: pointer;
          font-size: 24px;
          font-weight: normal;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        
        .dialog-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
        
        .dialog-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }
        
        .dialog-icon {
          font-size: 32px;
          line-height: 1;
          flex-shrink: 0;
        }
        
        .dialog-title {
          flex: 1;
        }
        
        .dialog h3 {
          margin: 0 0 12px 0;
          color: #ffffff;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .dialog p {
          margin: 0 0 20px 0;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          font-size: 15px;
        }
        
        .dialog-categories {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(100, 200, 255, 0.2);
        }
        
        .category-pill {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          color: white;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s ease;
          cursor: default;
        }
        
        .category-pill:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .category-dots {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-top: 12px;
        }
        
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(100, 200, 255, 0.3);
          transition: all 0.2s ease;
        }
        
        .dot.active {
          background: rgba(100, 200, 255, 1);
          box-shadow: 0 0 8px rgba(100, 200, 255, 0.6);
        }
        
      `}</style>
      <div className="content-wrapper">
        <div className="left-content">
          <h1 className="main-heading">What We Train</h1>
          <p className="subheading">
            Explore the key areas of goalkeeper development. Click on any highlighted area to learn more about our specialized training techniques.
          </p>
        </div>
        
        <div className="container" ref={containerRef}>
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
        </div>
      </div>
        
      {activeDialog && (
        <div className="dialog-backdrop" onClick={closeDialog}>
          <style>{`
            @keyframes popupGrow {
              from {
                transform: translate(${dialogPosition.x - window.innerWidth / 2}px, ${dialogPosition.y - window.innerHeight / 2}px) scale(0);
                opacity: 0;
              }
              to {
                transform: translate(0, 0) scale(1);
                opacity: 1;
              }
            }
          `}</style>
          <div 
            className="dialog"
            style={{
              animation: 'popupGrow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="dialog-close" onClick={closeDialog}>×</button>
            <div className="dialog-header">
              <div className="dialog-icon">{activeDialog.icon}</div>
              <div className="dialog-title">
                <h3>{activeDialog.title}</h3>
              </div>
            </div>
            <p>{activeDialog.content}</p>
            <div className="category-dots">
              {activeDialog.categories.map((_, index) => (
                <div key={index} className={`dot ${index === 0 ? 'active' : ''}`} />
              ))}
            </div>
            <div className="dialog-categories">
              {activeDialog.categories.map((category, index) => (
                <div key={index} className="category-pill">
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveDiagram;