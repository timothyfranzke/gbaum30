import React, { useEffect, useState } from 'react';

interface MapProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
    onStateClick?: (stateId: string) => void;
}

interface Profile {
    name: string,
    position: string,
    image: string
}
interface Pin {
    name: string;
    x: number;
    y: number;
    profile?: Profile;
    image?: string;
}

const Map: React.FC<MapProps> = ({
    className = 'shapedividers_com-8500',
    width = 1400,
    height = 800,
    style,
    onStateClick
}) => {
    const [animateKey, setAnimateKey] = useState(1);
    const [states, setStates] = useState<Array<{d: string; id: string; title: string}>>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [clickPosition, setClickPosition] = useState<{x: number, y: number} | null>(null);

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await fetch('/api/map');
                const data = await response.json();
                setStates(data.states);
            } catch (error) {
                console.error('Failed to fetch map data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMapData();
    }, []);

    // Sample JSON array of destination pins (add more as needed; coords are SVG-specific)
    const destinations: Pin[] = [
        { name: 'California', x: 580, y: 600, profile: { name: 'Player One', position: 'Goalkeeper', image: '/player1.jpg' } },
        { name: 'New York', x: 900, y: 500, profile: { name: 'Player Two', position: 'Goalkeeper', image: '/player2.jpg' } }, // Placeholder; adjust to real map coords
        { name: 'Texas', x: 700, y: 650, profile: { name: 'Player Three', position: 'Goalkeeper', image: '/player3.jpg' } }     // Placeholder; adjust to real map coords
    ];

    const centralPin: Pin = { name: 'Kansas City', x: 785, y: 580, image: '/logo_u30.png' };

    const handleClick = (stateId: string) => {
        if (onStateClick) {
            onStateClick(stateId);
        }
    };

    const handlePinClick = (pin: Pin, event: React.MouseEvent) => {
        if (pin.profile) {
            setSelectedProfile(pin.profile);
            setClickPosition({ x: event.clientX, y: event.clientY });
        }
    };

    const closeProfilePopup = () => {
        setSelectedProfile(null);
        setClickPosition(null);
    };

    const triggerAnimation = () => {
        console.log('Animation triggered');
        setAnimateKey(prev => prev + 1);
    };

    
    const stroke = 'rgb(101, 147, 203)';
    const strokeWidth = '0.81508px';
    const cursor = 'pointer';

    // Function to generate curved path string and approx length
    const getPathData = (from: Pin, to: Pin): { d: string; approxLength: number } => {
        const midX = (from.x + to.x) / 2;
        const midY = Math.min(from.y, to.y) - 100; // Arc "upwards" by 100 units
        const d = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
        
        // Rough approx length for animation (tweak per path if needed; or use getTotalLength in ref for exact)
        const deltaX = Math.abs(to.x - from.x);
        const deltaY = Math.abs(to.y - from.y);
        const straightLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const approxLength = straightLength * 1.15; // ~15% longer for curve
        return { d, approxLength: Math.round(approxLength) };
    };

    // Render a pin at given position
    const renderPin = (pin: Pin) => {
        const pinImage = pin.image || '/soccer_ball_2.png';
        const isLogoPin = pin.image === '/logo_u30.png';
        
        // If it's the logo pin, just show the image without pin shape
        if (isLogoPin) {
            return (
                <g 
                    transform={`translate(${pin.x}, ${pin.y})`}
                    onClick={(e: any) => handlePinClick(pin, e)}
                    style={{ cursor: pin.profile ? 'pointer' : 'default' }}
                >
                    {/* White glow filter definition */}
                    <defs>
                        <filter id="white-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                            <feOffset dx="0" dy="0" result="offsetblur" />
                            <feFlood floodColor="white" floodOpacity="0.8" />
                            <feComposite in2="offsetblur" operator="in" />
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Logo image with glow */}
                    <image
                        href={pinImage}
                        x="-35"
                        y="-40"
                        width="60"
                        height="80"
                        preserveAspectRatio="xMidYMid meet"
                        filter="url(#white-glow)"
                    />
                </g>
            );
        }
        
        // Regular pin with soccer ball
        return (
            <g 
                transform={`translate(${pin.x}, ${pin.y})`}
                onClick={(e: any) => handlePinClick(pin, e)}
                style={{ cursor: pin.profile ? 'pointer' : 'default' }}
            >
                {/* Pin shadow */}
                <ellipse cx="0" cy="25" rx="8" ry="3" fill="rgba(0,0,0,0.3)" />
                
                {/* Pin body - blue with white stroke */}
                <path
                    d="M 0,-20 C -8,-20 -15,-13 -15,-5 C -15,5 0,20 0,20 C 0,20 15,5 15,-5 C 15,-13 8,-20 0,-20 Z"
                    fill="#1E3C73"
                    stroke="white"
                    strokeWidth="2"
                />
                
                {/* Circular clip for image */}
                <defs>
                    <clipPath id={`clip-${pin.name.replace(/\s+/g, '-')}`}>
                        <circle cx="0" cy="-5" r="12" />
                    </clipPath>
                </defs>
                
                {/* Image in center */}
                <image
                    href={pinImage}
                    x="-12"
                    y="-17"
                    width="24"
                    height="24"
                    clipPath={`url(#clip-${pin.name.replace(/\s+/g, '-')})`}
                    preserveAspectRatio="xMidYMid slice"
                />
            </g>
        );
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>Loading map...</div>;
    }

    return (
        <div className="" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%', 
            gap: '20px',
            background: 'radial-gradient(circle, #234c8a 0%, #181e46 100%)',
            padding: '20px 0'
        }}>
            <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '20px 0',
                textAlign: 'center'
            }}>
                See Where Our Union 30 is Playing
                
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="477 421 593.3779761904764 318.2870370370371"
                preserveAspectRatio="xMidYMid meet"
                width={width}
                height={height}
                className={className}
                style={style}
            >
                {states.map((path) => (
                    <path
                        key={path.id}
                        d={path.d}
                        id={path.id}
                        className="mapsvg-region"
                        onClick={() => handleClick(path.id)}
                        style={{
                            fill: 'transparent',
                            stroke,
                            strokeWidth,
                            cursor
                        }}
                    />
                ))}
                
                {/* Animated curved routes from central to each destination */}
                {animateKey > 0 && destinations.map((dest, index) => {
                    const { d, approxLength } = getPathData(centralPin, dest);
                    const duration = 2 + index * 0.5;
                    return (
                        <React.Fragment key={`${animateKey}-${dest.name}`}>
                            <defs>
                                {/* Mask that reveals the dotted line progressively */}
                                <mask id={`line-mask-${dest.name.replace(/\s+/g, '-')}`}>
                                    <path
                                        d={d}
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                        strokeDasharray={approxLength}
                                        strokeDashoffset={approxLength}
                                    >
                                        <animate
                                            attributeName="stroke-dashoffset"
                                            from={approxLength}
                                            to="0"
                                            dur={`${duration}s`}
                                            fill="freeze"
                                            repeatCount="1"
                                        />
                                    </path>
                                </mask>
                            </defs>
                            {/* Dotted line with mask applied */}
                            <path
                                d={d}
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                strokeLinecap="round"
                                mask={`url(#line-mask-${dest.name.replace(/\s+/g, '-')})`}
                            />
                            {/* Traveling solid line segment */}
                            <path
                                d={d}
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeDasharray={`30,${approxLength}`}
                                strokeLinecap="round"
                                strokeDashoffset={approxLength + 30}
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from={approxLength + 30}
                                    to="0"
                                    dur={`${duration}s`}
                                    fill="freeze"
                                    repeatCount="1"
                                />
                            </path>
                        </React.Fragment>
                    );
                })}
                
                {/* Central pin (Kansas City) - rendered after paths so it appears on top */}
                {renderPin(centralPin)}
                
                {/* Destination pins - rendered after paths so they appear on top */}
                {destinations.map((dest, index) => {
                    const duration = 2 + index * 0.5;
                    return (
                        <g 
                            key={dest.name}
                            transform={`translate(${dest.x}, ${dest.y})`}
                            opacity="0"
                        >
                            <g transform="translate(0, 0) scale(0)">
                                {renderPin({ ...dest, x: 0, y: 0 })}
                                <animateTransform
                                    attributeName="transform"
                                    type="scale"
                                    values="0;1.2;1"
                                    begin={`${duration}s`}
                                    dur="0.4s"
                                    fill="freeze"
                                />
                            </g>
                            <animate
                                attributeName="opacity"
                                from="0"
                                to="1"
                                begin={`${duration}s`}
                                dur="0.01s"
                                fill="freeze"
                            />
                        </g>
                    );
                })}
                
            </svg>
            </div>

            {/* Profile Popup */}
            {selectedProfile && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        animation: 'fadeIn 0.2s ease-out'
                    }}
                    onClick={closeProfilePopup}
                >
                    <style>{`
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes popupGrow {
                            from {
                                transform: translate(${clickPosition ? `${clickPosition.x - window.innerWidth / 2}px, ${clickPosition.y - window.innerHeight / 2}px` : '0, 0'}) scale(0);
                                opacity: 0;
                            }
                            to {
                                transform: translate(0, 0) scale(1);
                                opacity: 1;
                            }
                        }
                    `}</style>
                    <div 
                        style={{
                            background: 'linear-gradient(135deg, #234c8a 0%, #1E3C73 100%)',
                            padding: '40px',
                            borderRadius: '16px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            maxWidth: '400px',
                            width: '90%',
                            textAlign: 'center',
                            position: 'relative',
                            animation: 'popupGrow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeProfilePopup}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: 'white',
                                padding: '5px 10px',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                        >
                            ×
                        </button>
                        
                        <img 
                            src={selectedProfile.image} 
                            alt={selectedProfile.name}
                            style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginBottom: '24px',
                                border: '4px solid white',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                            }}
                            onError={(e) => {
                                e.currentTarget.src = '/placeholder-avatar.jpg';
                            }}
                        />
                        
                        <h2 style={{ 
                            margin: '0 0 12px 0', 
                            color: 'white',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}>
                            {selectedProfile.name}
                        </h2>
                        
                        <p style={{ 
                            margin: '0 0 24px 0', 
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '18px',
                            fontWeight: '500'
                        }}>
                            {selectedProfile.position}
                        </p>
                        
                        <button
                            onClick={closeProfilePopup}
                            style={{
                                padding: '12px 32px',
                                backgroundColor: 'white',
                                color: '#1E3C73',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Map;