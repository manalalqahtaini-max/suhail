import BottomNav from './BottomNav'
import { student, achievements, pointsHistory } from '../data/mockData'

type Tab = 'map' | 'schedule' | 'game' | 'profile'

interface GameScreenProps {
  activeTab: Tab
  onTabChange: (t: Tab) => void
  bonusPoints: number
}

function AchievementIcon({ id }: { id: string }) {
  const common = {
    width: 23,
    height: 23,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (id === 'campus-explorer') {
    return <svg viewBox="0 0 24 24" {...common}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><path d="M9 3v15M15 6v15" /></svg>
  }
  if (id === 'streak-3') {
    return <svg viewBox="0 0 24 24" {...common}><path d="M12 22c4.4 0 7-3.2 7-7.3 0-3.1-1.7-6.1-5.1-8.8.1 2-1 3.4-2.2 4.3.2-3.2-1.7-5.9-4.3-8.2.2 4.4-2.4 6.7-2.4 11.3C5 18.4 8 22 12 22Z" /><path d="M9.5 17.1c0-1.7 1-3 2.5-4.4 1.7 1.4 2.5 2.8 2.5 4.4a2.5 2.5 0 0 1-5 0Z" /></svg>
  }
  if (id === 'night-owl') {
    return <svg viewBox="0 0 24 24" {...common}><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z" /></svg>
  }
  return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
}

export default function GameScreen({ activeTab, onTabChange, bonusPoints }: GameScreenProps) {
  const totalPoints = student.points + bonusPoints
  const progress = Math.min(totalPoints / student.maxPoints, 1)

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#F8F7F2' }}>
      {/* Header */}
      <div
        style={{
          background: '#0E4A46',
          paddingTop: 60,
          paddingBottom: 24,
          paddingLeft: 24,
          paddingRight: 24,
          flexShrink: 0,
        }}
      >
        {/* Level badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
              Current Level
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '26px', fontWeight: 800, color: 'white' }}>
              Level {student.level} · {student.title}
            </div>
          </div>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.15)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#D7BF88" />
            </svg>
          </div>
        </div>

        {/* Points progress */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', fontWeight: 800, color: 'white' }}>
              {totalPoints.toLocaleString()} pts
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
              {student.maxPoints - totalPoints} to Level 5
            </span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4 }}>
            <div
              style={{
                height: '100%',
                background: '#D7BF88',
                borderRadius: 4,
                width: `${progress * 100}%`,
                transition: 'width 1s ease',
              }}
            />
          </div>
        </div>

        {/* Streak */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '6px 14px',
          }}
        >
          <AchievementIcon id="streak-3" />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: 'white' }}>
            {student.streak}-Day Streak
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '90px' }} className="hide-scrollbar">

        {/* Achievements */}
        <div style={{ padding: '20px 16px 8px' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 700, color: '#0A3535', marginBottom: '12px' }}>
            Achievements
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {achievements.map((a) => (
              <div
                key={a.id}
                style={{
                  background: a.earned ? 'white' : '#F2EFE9',
                  border: `1.5px solid ${a.earned ? '#8FAF9C26' : '#8FAF9C66'}`,
                  borderRadius: '16px',
                  padding: '16px',
                  opacity: a.earned ? 1 : 0.5,
                }}
              >
                <div style={{ width: 28, height: 28, marginBottom: '8px', color: a.earned ? '#2F6F62' : '#2F6F62' }}>
                  <AchievementIcon id={a.id} />
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#0A3535', marginBottom: '4px' }}>
                  {a.name}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#2F6F62', lineHeight: 1.4 }}>
                  {a.desc}
                </div>
                {a.earned && (
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2F6F62' }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 700, color: '#2F6F62' }}>Earned</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Points history */}
        <div style={{ padding: '8px 16px' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 700, color: '#0A3535', marginBottom: '12px' }}>
            Recent Points
          </div>
          {pointsHistory.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                background: i === 0 ? '#8FAF9C26' : 'white',
                border: `1px solid ${i === 0 ? '#2F6F6230' : '#8FAF9C66'}`,
                borderRadius: '14px',
                marginBottom: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: i === 0 ? '#2F6F62' : '#F2EFE9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg viewBox="0 0 24 24" style={{ width: 16, height: 16 }}>
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={i === 0 ? 'white' : '#D7BF88'} />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A3535' }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#2F6F62' }}>{item.time}</div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  fontWeight: 800,
                  color: '#2F6F62',
                }}
              >
                +{item.points}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  )
}
