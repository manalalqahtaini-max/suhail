import { calculateRoute, CORRIDORS, ELC_ROOMS, roomForDestination, START, type RoomKind } from '../data/elcFloorPlan'

interface IndoorMapProps {
  floor: 1 | 2
  userPos?: { x: number; y: number }
  destPin?: { x: number; y: number; label: string }
  showRoute?: boolean
  destination?: 'b203' | 'innovation' | 'c214' | null
  animateRoute?: boolean
}

const colors: Record<RoomKind, string> = {
  classroom: '#E9B85F',
  office: '#9DB5C2',
  lounge: '#496EA7',
  conference: '#C95B55',
  lab: '#E9B85F',
  toilet: '#A86E82',
  tea: '#6F8D4F',
  lift: '#9D5268',
  stairs: '#A69B91',
  store: '#A69B91',
  mechanical: '#9A7663',
  electrical: '#C2637A',
}

const sx = (x: number) => 20 + x * 9
const sy = (z: number) => 112 + z * 14

export default function IndoorMap({
  userPos,
  showRoute = false,
  destination = null,
  animateRoute = false,
}: IndoorMapProps) {
  const roomId = destination === 'c214' ? 'L037' : destination ? roomForDestination(destination) : null
  const route = roomId ? calculateRoute(roomId) : []
  const routeString = route.map((p) => `${sx(p.x)},${sy(p.z)}`).join(' ')
  const selected = ELC_ROOMS.find((r) => r.id === roomId)
  const routeUser = showRoute && route.length
    ? route[Math.min(route.length - 1, Math.max(0, Math.round(((userPos?.y ?? 490) / 560) * (route.length - 1))))]
    : START

  return (
    <svg viewBox="0 0 400 560" width="100%" height="100%" aria-label="ELC Building Middle Floor map">
      <defs>
        <filter id="room-shadow"><feDropShadow dx="2" dy="3" stdDeviation="2" floodOpacity=".18" /></filter>
        <filter id="route-glow"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <rect width="400" height="560" fill="#8FAF9C66" />
      <rect x="0" y="0" width="400" height="105" fill="#8FAF9C26" />
      <text x="200" y="46" textAnchor="middle" fill="#0E4A46" fontSize="14" fontWeight="800" fontFamily="Inter">
        ELC Building · Middle Floor
      </text>
      <text x="200" y="67" textAnchor="middle" fill="#2F6F62" fontSize="9" fontWeight="600" fontFamily="Inter">
        Classrooms L035–L066 · Teachers' Offices · Services
      </text>

      {/* Continuous inverted-U walkable circulation from the reference plan. */}
      {CORRIDORS.map((c, i) => (
        <rect key={i} x={sx(c.x)} y={sy(c.z)} width={c.w * 9} height={c.d * 14}
          fill="#F7F4ED" stroke="#8FAF9C66" strokeWidth="1.2" />
      ))}

      {ELC_ROOMS.map((r) => {
        const isSelected = r.id === roomId
        const fontSize = r.id.length > 8 ? 5.5 : r.id.length > 5 ? 6.5 : 8
        return (
          <g key={r.id} filter="url(#room-shadow)">
            <rect x={sx(r.x)} y={sy(r.z)} width={r.w * 9} height={r.d * 14} rx="1.5"
              fill={colors[r.kind]}
              stroke={isSelected ? '#8DC8D3' : '#3D4946'} strokeWidth={isSelected ? 2.2 : 1} />
            <text x={sx(r.x + r.w / 2)} y={sy(r.z + r.d / 2) + 3} textAnchor="middle"
              fill="#0A3535" fontSize={fontSize} fontWeight="700" fontFamily="Inter">
              {r.id}
            </text>
          </g>
        )
      })}

      {/* Door openings are plotted at each room's single corridor-facing entrance. */}
      {ELC_ROOMS.map((r) => {
        const vertical = r.entranceSide === 'east' || r.entranceSide === 'west'
        return <line key={`door-${r.id}`} x1={sx(r.entrance.x) - (vertical ? 0 : 4)}
          y1={sy(r.entrance.z) - (vertical ? 5 : 0)}
          x2={sx(r.entrance.x) + (vertical ? 0 : 4)}
          y2={sy(r.entrance.z) + (vertical ? 5 : 0)}
          stroke="#FFFDF8" strokeWidth="3.5" />
      })}

      {showRoute && routeString && (
        <g>
          <polyline points={routeString} fill="none" stroke="#8DC8D3" strokeWidth="12" opacity=".24" filter="url(#route-glow)" />
          <polyline points={routeString} fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={routeString} fill="none" stroke="#8DC8D3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="8 5" className={animateRoute ? 'animate-route-draw' : undefined} />
        </g>
      )}

      {selected && (
        <g transform={`translate(${sx(selected.entrance.x)},${sy(selected.entrance.z)})`}>
          <circle r="11" fill="#8DC8D3" stroke="white" strokeWidth="3" />
          <circle r="3" fill="white" />
        </g>
      )}
      <g transform={`translate(${sx(routeUser.x)},${sy(routeUser.z)})`}>
        <circle r="15" fill="#2F6F62" opacity=".16" className="animate-pulse-ring" />
        <circle r="8" fill="white" stroke="#2F6F62" strokeWidth="3" />
        <circle r="3.5" fill="#2F6F62" />
      </g>
    </svg>
  )
}
