import { useState } from 'react'

interface SearchSheetProps {
  onStartNavigation: () => void
  onClose: () => void
}

const NEARBY = [
  { id: 'L057', type: 'Classroom', building: 'ELC Building', floor: 2, walk: 2 },
  { id: 'L056', type: 'Classroom', building: 'ELC Building', floor: 2, walk: 2 },
  { id: 'L058', type: "Teachers' Office", building: 'ELC Building', floor: 2, walk: 3 },
]

export default function SearchSheet({ onStartNavigation, onClose }: SearchSheetProps) {
  const [query, setQuery] = useState('L059')
  const [showResult, setShowResult] = useState(true)

  const handleChange = (v: string) => {
    setQuery(v)
    setShowResult(v.toLowerCase().includes('l059'))
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,40,35,0.35)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Sheet */}
      <div
        className="animate-slide-up"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'white',
          borderRadius: '24px 24px 0 0',
          paddingBottom: '32px',
          maxHeight: '75%',
          overflowY: 'auto',
          boxShadow: '0 -6px 20px rgba(10,53,53,0.10)',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px', paddingBottom: '8px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#8FAF9C66' }} />
        </div>

        {/* Search input */}
        <div style={{ padding: '0 16px 16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#F8F7F2',
              border: '1.5px solid #2F6F62',
              borderRadius: '14px',
              padding: '12px 14px',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#2F6F62" strokeWidth="2.5" strokeLinecap="round" style={{ width: 18, height: 18, flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              autoFocus
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Search classrooms, offices, labs…"
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                color: '#0A3535',
                outline: 'none',
              }}
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setShowResult(false) }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F6F62', padding: 0 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Primary Result */}
        {showResult && (
          <div style={{ padding: '0 16px' }}>
            <div
              style={{
                fontSize: '11px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                color: '#2F6F62',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Best Match
            </div>

            <div
              style={{
                background: '#F8F7F2',
                border: '1.5px solid #2F6F62',
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                {/* Room thumbnail */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    background: '#2F6F62',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="2" y1="9" x2="22" y2="9" />
                    <line x1="7" y1="17" x2="7" y2="21" />
                    <line x1="17" y1="17" x2="17" y2="21" />
                    <line x1="5" y1="21" x2="19" y2="21" />
                  </svg>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: 800, color: '#0A3535' }}>
                      L059
                    </span>
                    <span
                      style={{
                        background: '#8FAF9C26',
                        color: '#2F6F62',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '20px',
                      }}
                    >
                      Classroom
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#2F6F62', marginBottom: '2px' }}>
                    ELC Building · Middle Floor
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" style={{ width: 12, height: 12 }}>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62', fontWeight: 500 }}>
                      4-minute walk
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onStartNavigation}
                style={{
                  width: '100%',
                  marginTop: '14px',
                  padding: '14px',
                  background: '#2F6F62',
                  border: 'none',
                  borderRadius: '12px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'transform 0.15s',
                }}
                onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)' }}
                onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                onTouchStart={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)' }}
                onTouchEnd={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ width: 16, height: 16 }}>
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                Start Navigation
              </button>
            </div>

            {/* Nearby */}
            <div
              style={{
                fontSize: '11px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                color: '#2F6F62',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Nearby Rooms
            </div>

            {NEARBY.map((room) => (
              <div
                key={room.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: '#F8F7F2',
                  border: '1px solid #8FAF9C66',
                  borderRadius: '12px',
                  marginBottom: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '10px',
                      background: '#F2EFE9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2F6F62" strokeWidth="2" style={{ width: 16, height: 16 }}>
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <line x1="2" y1="9" x2="22" y2="9" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 700, color: '#0A3535' }}>{room.id}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62' }}>{room.building} · Floor {room.floor}</div>
                  </div>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62' }}>{room.walk} min</div>
              </div>
            ))}
          </div>
        )}

        {!showResult && query.length > 0 && (
          <div style={{ padding: '40px 16px', textAlign: 'center', color: '#2F6F62', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
            No results for "{query}"
          </div>
        )}
      </div>
    </div>
  )
}
