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
}

const Map: React.FC<MapProps> = ({
    className = '',
    width = 1400,
    height = 800,
    style,
    onStateClick
}) => {
    const [animateKey, setAnimateKey] = useState(0);
    const [states, setStates] = useState<Array<{d: string; id: string; title: string}>>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

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

    const centralPin: Pin = { name: 'Kansas City', x: 785, y: 580 };

    const handleClick = (stateId: string) => {
        if (onStateClick) {
            onStateClick(stateId);
        }
    };

    const handlePinClick = (pin: Pin) => {
        if (pin.profile) {
            setSelectedProfile(pin.profile);
        }
    };

    const closeProfilePopup = () => {
        setSelectedProfile(null);
    };

    const triggerAnimation = () => {
        console.log('Animation triggered');
        setAnimateKey(prev => prev + 1);
    };

    const fill = 'rgba(27, 16, 178, 1)';
    const stroke = 'rgb(255, 255, 255)';
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
    const renderPin = (pin: Pin) => (
        <g 
            transform={`translate(${pin.x}, ${pin.y})`}
            onClick={() => handlePinClick(pin)}
            style={{ cursor: pin.profile ? 'pointer' : 'default' }}
        >
            {/* Pin shadow */}
            <ellipse cx="0" cy="25" rx="8" ry="3" fill="rgba(0,0,0,0.3)" />
            
            {/* Pin body */}
            <path
                d="M 0,-20 C -8,-20 -15,-13 -15,-5 C -15,5 0,20 0,20 C 0,20 15,5 15,-5 C 15,-13 8,-20 0,-20 Z"
                fill="#FF4444"
                stroke="#CC0000"
                strokeWidth="1"
            />
            
            {/* Pin center dot */}
            <circle cx="0" cy="-5" r="5" fill="white" />
        </g>
    );

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>Loading map...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '20px' }}>
            <button
                onClick={triggerAnimation}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#FF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}
            >
                Animate Routes
            </button>
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
                            fill,
                            stroke,
                            strokeWidth,
                            cursor
                        }}
                    />
                ))}
                
                {/* Central pin (Kansas City) */}
                {renderPin(centralPin)}
                
                {/* Destination pins */}
                {destinations.map((dest) => (
                    <React.Fragment key={dest.name}>
                        {renderPin(dest)}
                    </React.Fragment>
                ))}
                
                {/* Animated curved routes from central to each destination */}
                {animateKey > 0 && destinations.map((dest, index) => {
                    const { d, approxLength } = getPathData(centralPin, dest);
                    return (
                        <path
                            key={`${animateKey}-${dest.name}`}
                            d={d}
                            fill="none"
                            stroke="#FF4444"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            strokeLinecap="round"
                            strokeDashoffset={approxLength}  // Start fully offset (invisible)
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from={approxLength}
                                to="0"  // Reveal progressively
                                dur={`${4 + index * 1}s`}  // Staggered: 1s delay per route for sequential takeoff/landing
                                fill="freeze"
                                repeatCount="1"
                            />
                        </path>
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
                        zIndex: 1000
                    }}
                    onClick={closeProfilePopup}
                >
                    <div 
                        style={{
                            backgroundColor: 'white',
                            padding: '30px',
                            borderRadius: '12px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            maxWidth: '400px',
                            width: '90%',
                            textAlign: 'center',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeProfilePopup}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '15px',
                                background: 'none',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: '#666',
                                padding: '5px'
                            }}
                        >
                            ×
                        </button>
                        
                        <img 
                            src={selectedProfile.image} 
                            alt={selectedProfile.name}
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginBottom: '20px',
                                border: '4px solid #FF4444'
                            }}
                            onError={(e) => {
                                e.currentTarget.src = '/placeholder-avatar.jpg';
                            }}
                        />
                        
                        <h2 style={{ 
                            margin: '0 0 10px 0', 
                            color: '#333',
                            fontSize: '24px',
                            fontWeight: 'bold'
                        }}>
                            {selectedProfile.name}
                        </h2>
                        
                        <p style={{ 
                            margin: '0 0 20px 0', 
                            color: '#666',
                            fontSize: '18px'
                        }}>
                            {selectedProfile.position}
                        </p>
                        
                        <button
                            onClick={closeProfilePopup}
                            style={{
                                padding: '10px 25px',
                                backgroundColor: '#FF4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF4444'}
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