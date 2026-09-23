import IndoorMap from './IndoorMap'
import BottomNav from './BottomNav'

type Tab = 'map' | 'schedule' | 'game' | 'profile'

interface MapScreenProps {
  floor: 1 | 2
  onFloorChange: (f: 1 | 2) => void
  activeTab: Tab
  onTabChange: (t: Tab) => void
  onSearchTap: () => void
  onAskSuhail: () => void
  userPos?: { x: number; y: number }
  showRoute?: boolean
  destination?: 'b203' | 'innovation' | 'c214' | null
  destPin?: { x: number; y: number; label: string }
  animateRoute?: boolean
}

export default function MapScreen({
  floor,
  onFloorChange,
  activeTab,
  onTabChange,
  onSearchTap,
  onAskSuhail,
  userPos,
  showRoute,
  destination,
  destPin,
  animateRoute,
}: MapScreenProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#F8F7F2' }}>

      {/* Dynamic Island spacer */}
      <div style={{ height: 56, flexShrink: 0 }} />

      {/* Search bar */}
      <div style={{ position: 'absolute', top: 60, left: 16, right: 16, zIndex: 30 }}>
        <button
          onClick={onSearchTap}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'white',
            border: '1px solid #8FAF9C66',
            borderRadius: '16px',
            padding: '13px 16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#2F6F62" strokeWidth="2.5" strokeLinecap="round" style={{ width: 18, height: 18, flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span
            style={{
              flex: 1,
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#2F6F62',
              fontWeight: 400,
            }}
          >
            Where do you want to go?
          </span>
          <div
            style={{
              background: '#8FAF9C26',
              borderRadius: '8px',
              padding: '4px 8px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              color: '#2F6F62',
            }}
          >
            Search
          </div>
        </button>
      </div>

      {/* Map fill */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <IndoorMap
          floor={floor}
          userPos={userPos}
          showRoute={showRoute}
          destination={destination}
          destPin={destPin}
          animateRoute={animateRoute}
        />

        {/* The supplied reference defines one authoritative middle-floor plan. */}
        <div
          style={{
            position: 'absolute',
            top: '62px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #8FAF9C66',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          }}
        >
          <button
            onClick={() => onFloorChange(1)}
            style={{
              width: 44, height: 44, border: 'none', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 800,
              background: '#2F6F62', color: 'white',
            }}
          >
            MID
          </button>
        </div>

        {/* Map controls */}
        <div
          style={{
            position: 'absolute',
            bottom: '148px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {/* Locate me */}
          <button
            style={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              background: 'white',
              border: '1px solid #8FAF9C66',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" style={{ width: 18, height: 18 }}>
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            </svg>
          </button>
        </div>

        {/* Ask Suhail FAB */}
        <button
          onClick={onAskSuhail}
          style={{
            position: 'absolute',
            bottom: '88px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#0E4A46',
            border: 'none',
            borderRadius: '28px',
            padding: '12px 18px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(10,53,53,0.18)',
            transition: 'transform 0.15s',
          }}
          onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.95)' }}
          onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
          onTouchStart={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.95)' }}
          onTouchEnd={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" />
            <path d="M19 15L19.75 17.75L22.5 18.5L19.75 19.25L19 22L18.25 19.25L15.5 18.5L18.25 17.75L19 15Z" fill="rgba(255,255,255,0.7)" />
          </svg>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '0.01em',
            }}
          >
            Ask Suhail
          </span>
        </button>
      </div>

      {/* Bottom nav */}
      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  )
}
