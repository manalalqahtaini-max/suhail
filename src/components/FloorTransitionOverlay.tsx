import { useEffect } from 'react'

interface FloorTransitionOverlayProps {
  fromFloor: 1 | 2
  toFloor: 1 | 2
  onComplete: () => void
}

export default function FloorTransitionOverlay({ fromFloor, toFloor, onComplete }: FloorTransitionOverlayProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0E4A46',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 80,
        animation: 'fade-in 0.3s ease',
      }}
    >
      {/* Geometric pattern */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}
        viewBox="0 0 440 956"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 6 }, (_, i) => (
          <circle key={i} cx="220" cy="478" r={60 + i * 60} fill="none" stroke="white" strokeWidth="1" />
        ))}
      </svg>

      {/* Elevator/stairs animation */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '24px',
          background: 'rgba(255,255,255,0.15)',
          border: '2px solid rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          animation: 'bounce-in 0.5s ease',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{ width: 36, height: 36 }}>
          <path d="M3 21h6v-6h6v-6h6" />
          <line x1="3" y1="21" x2="3" y2="15" />
          <line x1="9" y1="15" x2="9" y2="9" />
          <line x1="15" y1="9" x2="15" y2="3" />
        </svg>
      </div>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        Taking stairs
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>From</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>
            Floor {fromFloor}
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                border: '2px solid rgba(255,255,255,0.6)',
                borderLeft: 'none',
                borderBottom: 'none',
                transform: 'rotate(45deg)',
                animation: `fade-in 0.4s ease ${i * 0.15}s both`,
              }}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>To</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', fontWeight: 800, color: 'white' }}>
            Floor {toFloor}
          </div>
        </div>
      </div>

      {/* Loading dots */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.6)',
              animation: `pulse-dot 1.2s ease ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
