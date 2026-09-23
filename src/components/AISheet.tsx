import { useState } from 'react'

interface AISheetProps {
  onNavigateThere: () => void
  onClose: () => void
}

const AI_RESPONSE = `The FARQ Hackathon is being held today at Innovation Hall, Building C, Ground Floor. It starts at 1:00 PM and is approximately a 4-minute walk from your current location.`

export default function AISheet({ onNavigateThere, onClose }: AISheetProps) {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showLocationCard, setShowLocationCard] = useState(false)

  const SUGGESTED = 'Where is the hall for today\'s FARQ Hackathon?'

  const handleSend = (text: string) => {
    if (!text.trim()) return
    setMessages((m) => [...m, { role: 'user', text }])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages((m) => [...m, { role: 'ai', text: AI_RESPONSE }])
      setTimeout(() => setShowLocationCard(true), 400)
    }, 1800)
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 70,
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
          background: 'rgba(10,40,35,0.5)',
          backdropFilter: 'blur(4px)',
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
          borderRadius: '28px 28px 0 0',
          height: '72%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -6px 20px rgba(10,53,53,0.12)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px 12px',
            borderBottom: '1px solid #F2EFE9',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#8FAF9C66' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '14px',
                background: '#0E4A46',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 22, height: 22 }}>
                <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" />
                <path d="M19 15L19.75 17.75L22.5 18.5L19.75 19.25L19 22L18.25 19.25L15.5 18.5L18.25 17.75L19 15Z" fill="rgba(255,255,255,0.7)" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', fontWeight: 800, color: '#0A3535' }}>
                Suhail AI
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62' }}>
                Your campus assistant
              </div>
            </div>
            <button
              onClick={onClose}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#2F6F62', padding: 4 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{ flex: 1, overflowY: 'auto', padding: '16px' }}
          className="hide-scrollbar"
        >
          {/* Empty state / suggestion */}
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', paddingTop: '20px' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#2F6F62', marginBottom: '16px' }}>
                Ask me anything about campus
              </div>
              <button
                onClick={() => { setInputValue(SUGGESTED) }}
                style={{
                  background: '#F8F7F2',
                  border: '1px solid #8FAF9C66',
                  borderRadius: '20px',
                  padding: '10px 16px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  color: '#2F6F62',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ width: 15, height: 15 }}>
                    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
                  </svg>
                  {SUGGESTED}
                </span>
              </button>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '12px',
                animation: 'float-in 0.3s ease',
              }}
            >
              {msg.role === 'ai' && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '10px',
                    background: '#0E4A46',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }}>
                    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" />
                  </svg>
                </div>
              )}
              <div
                style={{
                  maxWidth: '78%',
                  background: msg.role === 'user' ? '#2F6F62' : '#F8F7F2',
                  color: msg.role === 'user' ? 'white' : '#0A3535',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                  padding: '12px 14px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  lineHeight: 1.5,
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '10px',
                  background: '#0E4A46',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }}>
                  <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" />
                </svg>
              </div>
              <div style={{ background: '#F8F7F2', borderRadius: '4px 18px 18px 18px', padding: '12px 16px', display: 'flex', gap: '4px' }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#2F6F62',
                      animation: `pulse-dot 1s ease ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Location card */}
          {showLocationCard && (
            <div
              className="animate-float-in"
              style={{
                background: 'white',
                border: '1.5px solid #2F6F62',
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '12px',
                marginLeft: '36px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: '#8FAF9C26',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" style={{ width: 20, height: 20 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 700, color: '#0A3535' }}>
                    Innovation Hall
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#2F6F62' }}>
                    Building C · Ground Floor
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={onNavigateThere}
                  style={{
                    flex: 1,
                    padding: '11px',
                    background: '#2F6F62',
                    border: 'none',
                    borderRadius: '10px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ width: 14, height: 14 }}>
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  Navigate There
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '11px',
                    background: '#F8F7F2',
                    border: '1px solid #8FAF9C66',
                    borderRadius: '10px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#2F6F62',
                    cursor: 'pointer',
                  }}
                >
                  Show on Map
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div
          style={{
            padding: '12px 16px 28px',
            borderTop: '1px solid #F2EFE9',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#F8F7F2',
              border: '1.5px solid #8FAF9C66',
              borderRadius: '20px',
              padding: '10px 14px',
            }}
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
              placeholder="Ask about locations, events, services…"
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#0A3535',
                outline: 'none',
              }}
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim()}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: inputValue.trim() ? '#2F6F62' : '#8FAF9C66',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputValue.trim() ? 'pointer' : 'default',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ width: 16, height: 16 }}>
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
