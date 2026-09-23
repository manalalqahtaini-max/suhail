import { useEffect, useMemo, useState } from 'react'
import ThreeDNav from './ThreeDNav'
import IndoorMap from './IndoorMap'
import BottomNav from './BottomNav'
import { calculateRoute, roomForDestination, type PlanPoint } from '../data/elcFloorPlan'

type Tab = 'map' | 'schedule' | 'game' | 'profile'

interface NavigationOverlayProps {
  destination: 'b203' | 'innovation'
  navStep: number
  floor: 1 | 2
  onStepAdvance: () => void
  onFloorTransition: () => void
  onArrival: () => void
  activeTab: Tab
  onTabChange: (t: Tab) => void
}

const segmentDistance = (a: PlanPoint, b: PlanPoint) => Math.round(Math.hypot(a.x - b.x, a.z - b.z) * 2.2)

function turnInstruction(previous: PlanPoint, current: PlanPoint, next: PlanPoint, room: string) {
  const a = { x: current.x - previous.x, z: current.z - previous.z }
  const b = { x: next.x - current.x, z: next.z - current.z }
  const cross = a.x * b.z - a.z * b.x
  if (Math.abs(cross) < 0.01) return `Continue straight for ${segmentDistance(current, next)} m`
  return `${cross > 0 ? 'Turn right' : 'Turn left'} at the corridor`
}

export default function NavigationOverlay({
  destination,
  navStep,
  floor,
  onStepAdvance,
  onArrival,
  activeTab,
  onTabChange,
}: NavigationOverlayProps) {
  const [started, setStarted] = useState(false)
  const roomId = roomForDestination(destination)
  const route = useMemo(() => calculateRoute(roomId), [roomId])
  const index = Math.min(navStep, route.length - 1)
  const isLast = index >= route.length - 1
  const previous = route[Math.max(0, index - 1)]
  const current = route[index]
  const next = route[Math.min(route.length - 1, index + 1)]
  const remaining = Math.round(route.slice(index + 1).reduce((sum, point, i) => sum + segmentDistance(route[index + i], point), 0))
  const instruction = isLast
    ? `You have arrived at ${roomId}`
    : index === 0
      ? `Continue straight for ${segmentDistance(current, next)} m`
      : turnInstruction(previous, current, next, roomId)

  useEffect(() => {
    if (!started) return
    const timer = window.setTimeout(() => {
      if (isLast) onArrival()
      else onStepAdvance()
    }, isLast ? 1800 : 2900)
    return () => window.clearTimeout(timer)
  }, [started, index, isLast, onArrival, onStepAdvance])

  const icon = instruction.includes('left') ? 'left' : instruction.includes('right') ? 'right' : isLast ? 'arrive' : 'straight'
  const progress = ((index + 1) / route.length) * 100

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#F2EFE9' }}>
      <div style={{ height: 56, flexShrink: 0, background: '#F2EFE9' }} />
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <ThreeDNav destination={destination} navStep={index} floor={floor} overview={!started} />

        <div className="animate-float-in" style={{
          position: 'absolute', top: 10, left: 12, right: 12, zIndex: 30,
          background: '#0E4A46', borderRadius: 18, padding: '13px 14px',
          boxShadow: '0 6px 18px rgba(10,53,53,.16)', display: 'flex', alignItems: 'center', gap: 11,
        }}>
          <div style={{ width: 43, height: 43, borderRadius: 12, background: 'rgba(255,255,255,.18)', display: 'grid', placeItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {icon === 'arrive' ? <polyline points="20 6 9 17 4 12" />
                : icon === 'left' ? <><path d="M19 12H6" /><polyline points="11 7 6 12 11 17" /></>
                  : icon === 'right' ? <><path d="M5 12h13" /><polyline points="13 7 18 12 13 17" /></>
                    : <><path d="M12 19V5" /><polyline points="7 10 12 5 17 10" /></>}
            </svg>
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ color: 'white', fontSize: 14, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {started ? instruction : `Route to ${roomId}`}
            </div>
            <div style={{ color: 'rgba(255,255,255,.76)', font: "12px 'Inter', sans-serif", marginTop: 3 }}>
              {started ? `${remaining} m remaining · ELC Middle Floor` : 'Review the complete corridor route'}
            </div>
          </div>
          <div style={{ color: 'white', fontSize: 11, fontWeight: 800, background: 'rgba(255,255,255,.16)', padding: '6px 8px', borderRadius: 9 }}>
            {roomId}
          </div>
        </div>

        {!started && (
          <div style={{
            position: 'absolute', left: 14, right: 14, bottom: 98, padding: 14,
            background: 'rgba(255,255,255,.96)', borderRadius: 18, boxShadow: '0 6px 18px rgba(10,53,53,.12)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
              <div>
                <div style={{ color: '#0E4A46', fontSize: 14, fontWeight: 800 }}>ELC Middle Floor</div>
                <div style={{ color: '#2F6F62', font: "11px 'Inter', sans-serif", marginTop: 2 }}>Valid corridor route to the room entrance</div>
              </div>
              <span style={{ color: '#2F6F62', fontSize: 12, fontWeight: 800 }}>{remaining} m</span>
            </div>
            <button onClick={() => setStarted(true)} style={{
              width: '100%', border: 0, borderRadius: 12, padding: 13, color: 'white',
              background: '#0E4A46', fontSize: 14, fontWeight: 800, cursor: 'pointer',
            }}>Start walking</button>
          </div>
        )}

        {started && (
          <>
            <div style={{
              position: 'absolute', left: 12, bottom: 102, width: 112, height: 100,
              borderRadius: 14, overflow: 'hidden', border: '2px solid white',
              boxShadow: '0 4px 14px rgba(10,53,53,.16)', background: '#8FAF9C66',
            }}>
              <IndoorMap floor={1} userPos={{ x: 0, y: (index / Math.max(1, route.length - 1)) * 560 }}
                showRoute destination={destination} />
              <span style={{ position: 'absolute', left: 6, top: 6, background: '#0E4A46', color: 'white', borderRadius: 5, padding: '2px 5px', fontSize: 8, fontWeight: 700 }}>
                ELC · Middle
              </span>
            </div>
            <div style={{
              position: 'absolute', left: 136, right: 12, bottom: 102, background: 'white',
              borderRadius: 14, padding: '12px 14px', boxShadow: '0 4px 14px rgba(10,53,53,.12)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2F6F62', fontSize: 11, marginBottom: 8 }}>
                <span>To {roomId} entrance</span><strong style={{ color: '#2F6F62' }}>{remaining} m</strong>
              </div>
              <div style={{ height: 5, borderRadius: 4, background: '#8FAF9C66' }}>
                <div style={{ height: '100%', width: `${progress}%`, borderRadius: 4, background: '#8DC8D3', transition: 'width .6s ease' }} />
              </div>
            </div>
          </>
        )}
      </div>
      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  )
}
