import { useEffect, useState } from 'react'

interface ArrivalScreenProps {
  destination: 'b203' | 'innovation'
  onViewGame: () => void
  onContinue: () => void
}

const CONFETTI_COLORS = ['#2F6F62', '#D7BF88', '#E4A756', '#8FAF9C', '#8DC8D3', '#F8F7F2']

function Confetti() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {Array.from({ length: 22 }, (_, i) => {
        const left = 10 + Math.random() * 80
        const delay = Math.random() * 1.5
        const size = 6 + Math.random() * 8
        const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${10 + Math.random() * 30}%`,
              left: `${left}%`,
              width: size,
              height: size,
              background: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              opacity: 0,
              animation: `confetti-fall 2.5s ease ${delay}s forwards`,
            }}
          />
        )
      })}
    </div>
  )
}

export default function ArrivalScreen({ destination, onViewGame, onContinue }: ArrivalScreenProps) {
  const [points, setPoints] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 1200
    const target = 50
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setPoints(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const isB203 = destination === 'b203'

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#F8F7F2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 24px',
        overflow: 'hidden',
      }}
    >
      <Confetti />

      {/* Dynamic Island spacer */}
      <div style={{ height: 72 }} />

      {/* Success circle */}
      <div
        className="animate-bounce-in"
        style={{
          width: 96,
          height: 96,
          borderRadius: '50%',
          background: '#2F6F62',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(10,53,53,0.12)',
          marginBottom: '24px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 44, height: 44 }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* You made it */}
      <div
        className="animate-fade-up"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '30px',
          fontWeight: 800,
          color: '#0A3535',
          marginBottom: '8px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          animationDelay: '0.2s',
        }}
      >
        You made it!
      </div>

      <div
        className="animate-fade-up"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          color: '#2F6F62',
          textAlign: 'center',
          marginBottom: '32px',
          lineHeight: 1.5,
          position: 'relative',
          zIndex: 2,
          animationDelay: '0.35s',
        }}
      >
        {isB203
          ? 'You arrived at the L059 entrance before class starts.'
          : 'You arrived at the L035 lab entrance.'}
      </div>

      {/* Time card */}
      {isB203 && (
        <div
          className="animate-fade-up"
          style={{
            width: '100%',
            background: 'white',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            display: 'flex',
            justifyContent: 'space-around',
            position: 'relative',
            zIndex: 2,
            animationDelay: '0.5s',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62', marginBottom: '4px' }}>Arrival</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', fontWeight: 800, color: '#2F6F62' }}>9:54 AM</div>
          </div>
          <div style={{ width: 1, background: '#8FAF9C66' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62', marginBottom: '4px' }}>Class starts</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', fontWeight: 800, color: '#0A3535' }}>10:00 AM</div>
          </div>
        </div>
      )}

      {/* Points badge */}
      <div
        className="animate-count-up"
        style={{
          background: '#D7BF88',
          borderRadius: '20px',
          padding: '16px 32px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 14px rgba(10,53,53,0.10)',
          position: 'relative',
          zIndex: 2,
          animationDelay: '0.7s',
        }}
      >
        <svg viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" />
        </svg>
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', fontWeight: 800, color: 'white' }}>
            +{points}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>Points earned</div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', zIndex: 2 }}>
        {isB203 && (
          <button
            onClick={onViewGame}
            style={{
              width: '100%',
              padding: '16px',
              background: '#2F6F62',
              border: 'none',
              borderRadius: '14px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 700,
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(10,53,53,0.14)',
              transition: 'transform 0.15s',
            }}
            onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)' }}
            onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
            onTouchStart={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)' }}
            onTouchEnd={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
          >
            View in Game
          </button>
        )}
        <button
          onClick={onContinue}
          style={{
            width: '100%',
            padding: '16px',
            background: isB203 ? 'transparent' : '#2F6F62',
            border: isB203 ? '1.5px solid #8FAF9C66' : 'none',
            borderRadius: '14px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            color: isB203 ? '#2F6F62' : 'white',
            cursor: 'pointer',
            transition: 'transform 0.15s',
          }}
          onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)' }}
          onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
          onTouchStart={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)' }}
          onTouchEnd={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
        >
          Back to Map
        </button>
      </div>
    </div>
  )
}
