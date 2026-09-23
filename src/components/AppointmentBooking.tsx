import { useState } from 'react'

interface AppointmentBookingProps {
  onConfirm: (time: string) => void
  onBack: () => void
}

const TIMES = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM']

export default function AppointmentBooking({ onConfirm, onBack }: AppointmentBookingProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [purpose, setPurpose] = useState('')

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F8F7F2', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          background: 'white',
          paddingTop: 60,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          borderBottom: '1px solid #8FAF9C66',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <button
            onClick={onBack}
            style={{
              background: '#F2EFE9',
              border: 'none',
              borderRadius: '10px',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#2F6F62',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 18, height: 18 }}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: 800, color: '#0A3535' }}>
            Book Appointment
          </span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', paddingBottom: '100px' }} className="hide-scrollbar">

        {/* Faculty card */}
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            border: '1px solid #8FAF9C66',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '16px',
              background: '#0E4A46',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              fontWeight: 800,
              color: 'white',
              flexShrink: 0,
            }}
          >
            AA
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 700, color: '#0A3535', marginBottom: '2px' }}>
              Dr. Ahmad Alqahtani
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#2F6F62', marginBottom: '6px' }}>Computer Science</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" style={{ width: 12, height: 12 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62' }}>Office C214 · Building C</span>
            </div>
          </div>
          <div
            style={{
              background: '#8FAF9C26',
              borderRadius: '10px',
              padding: '6px 10px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: '#2F6F62',
            }}
          >
            Available
          </div>
        </div>

        {/* Date */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#2F6F62', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Select Date
          </div>
          <div
            style={{
              background: 'white',
              border: '1.5px solid #2F6F62',
              borderRadius: '14px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" style={{ width: 18, height: 18 }}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 700, color: '#2F6F62' }}>
              Tuesday, Sep 23
            </span>
            <span style={{ marginLeft: 'auto', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62' }}>Today</span>
          </div>
        </div>

        {/* Time slots */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#2F6F62', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Available Times
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {TIMES.map((time) => {
              const sel = selectedTime === time
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  style={{
                    padding: '14px 8px',
                    border: `1.5px solid ${sel ? '#2F6F62' : '#8FAF9C66'}`,
                    borderRadius: '14px',
                    background: sel ? '#2F6F62' : 'white',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: 700,
                    color: sel ? 'white' : '#0A3535',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </div>

        {/* Purpose */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#2F6F62', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Meeting Purpose <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
          </div>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g. Discuss project progress, ask about assignment…"
            rows={3}
            style={{
              width: '100%',
              border: '1.5px solid #8FAF9C66',
              borderRadius: '14px',
              padding: '14px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#0A3535',
              resize: 'none',
              outline: 'none',
              background: 'white',
              lineHeight: 1.5,
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px',
          paddingBottom: '32px',
          background: 'white',
          borderTop: '1px solid #8FAF9C66',
        }}
      >
        <button
          onClick={() => selectedTime && onConfirm(selectedTime)}
          disabled={!selectedTime}
          style={{
            width: '100%',
            padding: '16px',
            background: selectedTime ? '#2F6F62' : '#8FAF9C66',
            border: 'none',
            borderRadius: '14px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: 700,
            color: selectedTime ? 'white' : '#2F6F62',
            cursor: selectedTime ? 'pointer' : 'default',
            transition: 'all 0.2s',
          }}
        >
          {selectedTime ? `Book ${selectedTime}` : 'Select a time to continue'}
        </button>
      </div>
    </div>
  )
}
