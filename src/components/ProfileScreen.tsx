import BottomNav from './BottomNav'
import { student, achievements, appointments, navHistory } from '../data/mockData'

type Tab = 'map' | 'schedule' | 'game' | 'profile'

interface ProfileScreenProps {
  activeTab: Tab
  onTabChange: (t: Tab) => void
  bonusPoints: number
}

export default function ProfileScreen({ activeTab, onTabChange, bonusPoints }: ProfileScreenProps) {
  const totalPoints = student.points + bonusPoints

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#F8F7F2' }}>
      {/* Header */}
      <div
        style={{
          background: '#0E4A46',
          paddingTop: 60,
          paddingBottom: 28,
          paddingLeft: 20,
          paddingRight: 20,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Avatar */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Inter', sans-serif",
              fontSize: '22px',
              fontWeight: 800,
              color: 'white',
              flexShrink: 0,
            }}
          >
            LA
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '2px' }}>
              {student.name}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.65)', marginBottom: '8px' }}>
              {student.id}
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.18)',
                borderRadius: '20px',
                padding: '4px 12px',
              }}
            >
              <svg viewBox="0 0 24 24" style={{ width: 12, height: 12 }}>
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#D7BF88" />
              </svg>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: 'white' }}>
                Level {student.level} · {student.title}
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          {[
            { label: 'Points', value: totalPoints.toLocaleString() },
            { label: 'Achievements', value: achievements.filter((a) => a.earned).length },
            { label: 'Navigations', value: student.navigations },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(255,255,255,0.12)',
                borderRadius: '14px',
                padding: '12px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: 800, color: 'white' }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: '90px' }} className="hide-scrollbar">

        {/* Upcoming appointments */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 700, color: '#0A3535', marginBottom: '12px' }}>
            Upcoming Appointments
          </div>
          {appointments.map((appt) => (
            <div
              key={appt.id}
              style={{
                background: 'white',
                border: '1px solid #8FAF9C66',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: '#8FAF9C26',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#2F6F62',
                }}
              >
                AA
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 700, color: '#0A3535' }}>
                  {appt.faculty}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62' }}>
                  {appt.date} · {appt.time} · {appt.office}
                </div>
              </div>
              <div
                style={{
                  background: '#8FAF9C26',
                  borderRadius: '20px',
                  padding: '4px 10px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#2F6F62',
                }}
              >
                Confirmed
              </div>
            </div>
          ))}
        </div>

        {/* Navigation history */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 700, color: '#0A3535', marginBottom: '12px' }}>
            Recent Navigations
          </div>
          {navHistory.map((nav) => (
            <div
              key={nav.id}
              style={{
                background: 'white',
                border: '1px solid #8FAF9C66',
                borderRadius: '14px',
                padding: '14px 16px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
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
                <svg viewBox="0 0 24 24" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" style={{ width: 16, height: 16 }}>
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0A3535' }}>
                  {nav.from} → {nav.to}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#2F6F62' }}>{nav.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Settings row */}
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 700, color: '#0A3535', marginBottom: '12px' }}>
            Settings
          </div>
          {['Notifications', 'Language', 'Accessibility', 'About Suhail'].map((item) => (
            <div
              key={item}
              style={{
                background: 'white',
                border: '1px solid #8FAF9C66',
                borderRadius: '14px',
                padding: '14px 16px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500, color: '#0A3535' }}>
                {item}
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="#8FAF9C66" strokeWidth="2" strokeLinecap="round" style={{ width: 16, height: 16 }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  )
}
