interface AppointmentConfirmedProps {
  time: string
  onViewOnMap: () => void
  onDone: () => void
}

export default function AppointmentConfirmed({ time, onViewOnMap, onDone }: AppointmentConfirmedProps) {
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
      {/* Dynamic Island spacer */}
      <div style={{ height: 80 }} />

      {/* Check */}
      <div
        className="animate-bounce-in"
        style={{
          width: 88,
          height: 88,
          borderRadius: '50%',
          background: '#2F6F62',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(10,53,53,0.12)',
          marginBottom: '24px',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40 }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <div
        className="animate-fade-up"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '28px',
          fontWeight: 800,
          color: '#0A3535',
          marginBottom: '8px',
          textAlign: 'center',
        }}
      >
        Appointment Confirmed
      </div>

      <div
        className="animate-fade-up"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: '#2F6F62',
          textAlign: 'center',
          marginBottom: '32px',
          lineHeight: 1.5,
          animationDelay: '0.15s',
        }}
      >
        Your appointment has been successfully scheduled.
      </div>

      {/* Confirmation card */}
      <div
        className="animate-fade-up"
        style={{
          width: '100%',
          background: 'white',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
          animationDelay: '0.3s',
        }}
      >
        {/* Faculty */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F2EFE9' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              background: '#0E4A46',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 800,
              color: 'white',
              flexShrink: 0,
            }}
          >
            AA
          </div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 700, color: '#0A3535' }}>
              Dr. Ahmad Alqahtani
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62' }}>Computer Science</div>
          </div>
        </div>

        {/* Details grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { label: 'Date', value: 'Tuesday, Sep 23' },
            { label: 'Time', value: time },
            { label: 'Location', value: 'Office C214' },
            { label: 'Building', value: 'Building C' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: '#F8F7F2',
                borderRadius: '12px',
                padding: '12px',
              }}
            >
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#2F6F62', marginBottom: '4px' }}>
                {item.label}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#0A3535' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={onViewOnMap}
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(10,53,53,0.14)',
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
          View Office on Map
        </button>
        <button
          onClick={onDone}
          style={{
            width: '100%',
            padding: '16px',
            background: 'transparent',
            border: '1.5px solid #8FAF9C66',
            borderRadius: '14px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            color: '#2F6F62',
            cursor: 'pointer',
            transition: 'transform 0.15s',
          }}
          onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)' }}
          onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
          onTouchStart={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)' }}
          onTouchEnd={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
        >
          Done
        </button>
      </div>
    </div>
  )
}
