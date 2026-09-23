import BottomNav from './BottomNav'
import { schedule, appointments } from '../data/mockData'

type Tab = 'map' | 'schedule' | 'game' | 'profile'
type SchedTab = 'classes' | 'appointments'

interface ScheduleScreenProps {
  activeTab: Tab
  onTabChange: (t: Tab) => void
  schedTab: SchedTab
  onSchedTabChange: (t: SchedTab) => void
  onBookAppointment: () => void
  hasAppointment: boolean
}

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  class: { bg: '#8FAF9C26', text: '#2F6F62' },
  lab: { bg: '#8FAF9C26', text: '#2F6F62' },
  meeting: { bg: '#F2EFE9', text: '#E4A756' },
  event: { bg: '#F2EFE9', text: '#0E4A46' },
}

function ScheduleTypeIcon({ type, color }: { type: string; color: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
      {type === 'lab' ? <><rect x="2" y="3" width="12" height="8" rx="1.5" /><path d="M5 14h6M8 11v3" /></>
        : type === 'meeting' ? <><circle cx="5" cy="6" r="2" /><circle cx="11" cy="6" r="2" /><path d="M1.5 13c.5-2.2 1.7-3.3 3.5-3.3S8 10.8 8.5 13M8 12.5c.5-1.9 1.5-2.8 3-2.8s2.5 1 3 2.8" /></>
          : type === 'event' ? <><path d="M4 2h8v3c0 3-1.7 5-4 5S4 8 4 5V2Z" /><path d="M4 4H2v1c0 1.7 1 2.8 2.6 3M12 4h2v1c0 1.7-1 2.8-2.6 3M8 10v3M5.5 14h5" /></>
            : <><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M5 1.5v3M11 1.5v3M2 6h12" /></>}
    </svg>
  )
}

export default function ScheduleScreen({
  activeTab,
  onTabChange,
  schedTab,
  onSchedTabChange,
  onBookAppointment,
  hasAppointment,
}: ScheduleScreenProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#F8F7F2' }}>
      {/* Header */}
      <div
        style={{
          background: 'white',
          paddingTop: 60,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 0,
          borderBottom: '1px solid #8FAF9C66',
          flexShrink: 0,
        }}
      >
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '24px', fontWeight: 800, color: '#0A3535', marginBottom: '16px' }}>
          My Schedule
        </div>

        {/* Date chip */}
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#8FAF9C26',
              borderRadius: '20px',
              padding: '6px 14px',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2F6F62' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#2F6F62' }}>
              Tuesday, Sep 23
            </span>
          </div>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '0', background: '#F2EFE9', borderRadius: '12px', padding: '4px' }}>
          {(['classes', 'appointments'] as SchedTab[]).map((t) => (
            <button
              key={t}
              onClick={() => onSchedTabChange(t)}
              style={{
                flex: 1,
                padding: '9px',
                border: 'none',
                borderRadius: '10px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: schedTab === t ? 'white' : 'transparent',
                color: schedTab === t ? '#0A3535' : '#2F6F62',
                boxShadow: schedTab === t ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
                textTransform: 'capitalize',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ height: 16 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: '90px' }} className="hide-scrollbar">

        {schedTab === 'classes' && (
          <>
            {schedule.map((item, i) => {
              const color = TYPE_COLORS[item.type] || TYPE_COLORS.class
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    marginBottom: '12px',
                    animation: `fade-up 0.4s ease ${i * 0.07}s both`,
                  }}
                >
                  {/* Time column */}
                  <div
                    style={{
                      width: 56,
                      flexShrink: 0,
                      paddingTop: '16px',
                      textAlign: 'right',
                    }}
                  >
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#2F6F62' }}>
                      {item.time.split(' ')[0]}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#2F6F62' }}>
                      {item.time.split(' ')[1]}
                    </div>
                  </div>

                  {/* Timeline line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2F6F62', flexShrink: 0 }} />
                    {i < schedule.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: '#8FAF9C66', margin: '4px 0' }} />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      flex: 1,
                      background: 'white',
                      borderRadius: '16px',
                      padding: '14px 16px',
                      border: '1px solid #8FAF9C66',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: color.bg,
                            borderRadius: '20px',
                            padding: '2px 10px',
                            marginBottom: '8px',
                          }}
                        >
                          <ScheduleTypeIcon type={item.type} color={color.text} />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 700, color: color.text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {item.type}
                          </span>
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 700, color: '#0A3535', marginBottom: '4px' }}>
                          {item.course}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" style={{ width: 12, height: 12 }}>
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62' }}>
                            {item.room} · {item.building}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        )}

        {schedTab === 'appointments' && (
          <>
            <button
              onClick={onBookAppointment}
              style={{
                width: '100%',
                padding: '14px',
                background: '#2F6F62',
                border: 'none',
                borderRadius: '14px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ width: 16, height: 16 }}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Book Appointment
            </button>

            {hasAppointment ? (
              <div
                style={{
                  background: 'white',
                  border: '1.5px solid #8FAF9C26',
                  borderRadius: '16px',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '14px',
                      background: '#8FAF9C26',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      fontWeight: 800,
                      color: '#2F6F62',
                    }}
                  >
                    AA
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 700, color: '#0A3535' }}>
                      Dr. Ahmad Alqahtani
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62' }}>Computer Science</div>
                  </div>
                  <div
                    style={{
                      marginLeft: 'auto',
                      background: '#8FAF9C26',
                      borderRadius: '20px',
                      padding: '4px 10px',
                    }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: '#2F6F62' }}>Confirmed</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, background: '#F8F7F2', borderRadius: '10px', padding: '10px 12px' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#2F6F62', marginBottom: '2px' }}>Date</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#0A3535' }}>Tue, Sep 23</div>
                  </div>
                  <div style={{ flex: 1, background: '#F8F7F2', borderRadius: '10px', padding: '10px 12px' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#2F6F62', marginBottom: '2px' }}>Time</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#0A3535' }}>11:30 AM</div>
                  </div>
                  <div style={{ flex: 1, background: '#F8F7F2', borderRadius: '10px', padding: '10px 12px' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#2F6F62', marginBottom: '2px' }}>Office</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#0A3535' }}>C214</div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#2F6F62', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
                No upcoming appointments
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  )
}
