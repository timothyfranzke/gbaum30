import { ImageResponse } from 'next/og';

export const alt = 'Union 30 — Complete Goalkeeper Development';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: '#05070E',
          position: 'relative',
          fontFamily: '"Bebas Neue", Impact, sans-serif',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(rgba(244,237,224,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,237,224,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Larger grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(rgba(244,237,224,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(244,237,224,0.08) 1px, transparent 1px)',
            backgroundSize: '200px 200px',
          }}
        />

        {/* Blue diagonal accent */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -100,
            width: 600,
            height: 900,
            background: 'linear-gradient(135deg, #0033A0 0%, transparent 70%)',
            opacity: 0.3,
            transform: 'rotate(-15deg)',
            display: 'flex',
          }}
        />

        {/* Corner marks */}
        {/* Top-left */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 32,
            width: 36,
            height: 36,
            borderTop: '3px solid #E8734A',
            borderLeft: '3px solid #E8734A',
            display: 'flex',
          }}
        />
        {/* Top-right */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            right: 32,
            width: 36,
            height: 36,
            borderTop: '3px solid #E8734A',
            borderRight: '3px solid #E8734A',
            display: 'flex',
          }}
        />
        {/* Bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: 32,
            width: 36,
            height: 36,
            borderBottom: '3px solid #E8734A',
            borderLeft: '3px solid #E8734A',
            display: 'flex',
          }}
        />
        {/* Bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            right: 32,
            width: 36,
            height: 36,
            borderBottom: '3px solid #E8734A',
            borderRight: '3px solid #E8734A',
            display: 'flex',
          }}
        />

        {/* LIVE badge top-left */}
        <div
          style={{
            position: 'absolute',
            top: 36,
            left: 84,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              background: '#E8734A',
              color: '#05070E',
              padding: '4px 10px',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1.5,
              display: 'flex',
              fontFamily: 'monospace',
            }}
          >
            ● LIVE
          </div>
          <div
            style={{
              color: '#F4EDE0',
              fontSize: 13,
              letterSpacing: 1.5,
              fontFamily: 'monospace',
              display: 'flex',
            }}
          >
            UNION30 — EST. 2017
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'relative',
            gap: 0,
            paddingLeft: 84,
          }}
        >
          {/* U30 badge */}
          <div
            style={{
              width: 64,
              height: 64,
              background: '#0033A0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F4EDE0',
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            U30
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 96,
              lineHeight: 0.88,
              color: '#F4EDE0',
              textAlign: 'left',
              letterSpacing: -2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <span>COMPLETE</span>
            <span>GOALKEEPER</span>
            <span style={{ color: '#E8734A' }}>DEVELOPMENT.</span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              marginTop: 28,
              fontSize: 14,
              letterSpacing: 3,
              color: '#8A8F9A',
              fontFamily: 'monospace',
              display: 'flex',
            }}
          >
            GRASSROOTS · CLUB · COLLEGE · PRO
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            left: 84,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              color: '#E8734A',
              fontFamily: 'monospace',
              fontWeight: 700,
              display: 'flex',
            }}
          >
            ● 8 LOCATIONS AND GROWING
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 36,
            right: 84,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              color: '#8A8F9A',
              fontFamily: 'monospace',
              display: 'flex',
            }}
          >
            UNION30.COM
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
