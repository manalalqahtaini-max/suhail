// First-person indoor corridor perspective view
// Uses single-point perspective: VP=(195,220), VPL=130, VPR=260

interface FirstPersonNavProps {
  destination: 'b203' | 'innovation'
  navStep: number
  floor: 1 | 2
}

const VP = { x: 195, y: 220 }
const VPL = 130
const VPR = 260

// ── Perspective geometry helpers ──────────────────────────────────────────────
// Right wall door at fraction f from VP to screen edge (f=0=far, f=1=near)
// Returns polygon points string
function rightDoorPts(f: number) {
  const xL = Math.round(260 + 130 * f)
  const yTop = Math.round(220 - 133.6 * f)
  const yBot = Math.round(220 + 260 * f)
  return `${xL},${yTop} 390,86 390,480 ${xL},${yBot}`
}

// Left wall door at fraction f from VP to screen edge
function leftDoorPts(f: number) {
  const xR = Math.round(130 * f)
  const yTop = Math.round(133.6 * f + 86.4)
  const yBot = Math.round(480 - 260 * f)
  return `0,86 ${xR},${yTop} ${xR},${yBot} 0,480`
}

// Label centroid for right door at f
function rightDoorLabel(f: number): { x: number; y: number } {
  const xL = 260 + 130 * f
  const yTop = 220 - 133.6 * f + (133.6 * f + 260 * f) * 0.45
  return { x: Math.round((xL + 390) / 2), y: Math.round(yTop) }
}

// Label centroid for left door at f
function leftDoorLabel(f: number): { x: number; y: number } {
  const xR = 130 * f
  const yMid = 133.6 * f + 86.4 + (480 - 260 * f - 133.6 * f - 86.4) * 0.45
  return { x: Math.round(xR / 2), y: Math.round(yMid) }
}

// ── Scene configurations ──────────────────────────────────────────────────────
type FarEndType = 'corridor' | 'junction-right' | 'junction-left' | 'stairs' | 'dest-right' | 'dest-large'
type Direction = 'straight' | 'right' | 'left' | 'up' | 'arrived'

interface SceneConfig {
  farEnd: FarEndType
  leftDoor?: { f: number; label: string }
  rightDoor?: { f: number; label: string; highlighted?: boolean }
  direction: Direction
  floorLabel?: string
  farLabel?: string
}

const SCENES: Record<string, SceneConfig> = {
  'b203-f1-0': {
    farEnd: 'corridor',
    leftDoor: { f: 0.62, label: 'Library' },
    rightDoor: { f: 0.42, label: 'B101' },
    direction: 'straight',
  },
  'b203-f1-1': {
    farEnd: 'junction-right',
    leftDoor: { f: 0.38, label: 'Lab A1' },
    direction: 'right',
  },
  'b203-f1-2': {
    farEnd: 'stairs',
    direction: 'up',
  },
  'b203-f2-0': {
    farEnd: 'corridor',
    rightDoor: { f: 0.5, label: 'C211' },
    direction: 'straight',
    floorLabel: 'Floor 2',
  },
  'b203-f2-1': {
    farEnd: 'junction-left',
    leftDoor: { f: 0.5, label: 'B201' },
    direction: 'left',
    floorLabel: 'Floor 2',
  },
  'b203-f2-2': {
    farEnd: 'dest-right',
    leftDoor: { f: 0.7, label: 'B201' },
    rightDoor: { f: 0.62, label: 'B203', highlighted: true },
    direction: 'arrived',
    floorLabel: 'Floor 2',
  },
  'innovation-0': {
    farEnd: 'corridor',
    leftDoor: { f: 0.62, label: 'Library' },
    rightDoor: { f: 0.42, label: 'B101' },
    direction: 'straight',
  },
  'innovation-1': {
    farEnd: 'junction-right',
    direction: 'right',
  },
  'innovation-2': {
    farEnd: 'dest-large',
    direction: 'straight',
    farLabel: 'Innovation Hall',
  },
  'innovation-3': {
    farEnd: 'dest-large',
    direction: 'arrived',
    farLabel: 'FARQ Hackathon',
  },
}

function getScene(destination: string, navStep: number, floor: number): SceneConfig {
  if (destination === 'b203') {
    if (floor === 1) return SCENES[`b203-f1-${Math.min(navStep, 2)}`]
    return SCENES[`b203-f2-${Math.min(navStep, 2)}`]
  }
  return SCENES[`innovation-${Math.min(navStep, 3)}`]
}

// ── Far-end renderers ─────────────────────────────────────────────────────────
function FarEndCorridor() {
  return (
    <g>
      {/* Bright corridor opening at vanishing point */}
      <rect x={VPL - 4} y={162} width={VPR - VPL + 8} height={76} fill="#FDFCF7" />
      {/* Far corridor ceiling/floor bands */}
      <rect x={VPL} y={162} width={VPR - VPL} height={14} fill="#EAE6DE" />
      <rect x={VPL} y={218} width={VPR - VPL} height={20} fill="#E2DDD4" />
      {/* Far corridor left wall edge */}
      <line x1={VPL} y1={162} x2={VPL} y2={238} stroke="#D0CAC0" strokeWidth={1.5} />
      {/* Far corridor right wall edge */}
      <line x1={VPR} y1={162} x2={VPR} y2={238} stroke="#C8C2B8" strokeWidth={1.5} />
      {/* Ambient glow at VP */}
      <circle cx={VP.x} cy={VP.y} r={30} fill="rgba(255,253,245,0.5)" />
    </g>
  )
}

function FarEndJunctionRight() {
  return (
    <g>
      {/* Wall straight ahead — corridor ends here */}
      <rect x={VPL + 4} y={168} width={VPR - VPL - 8} height={58} fill="#E0DBD1" />
      {/* Right corridor — opens to the right past the VP */}
      <polygon points={`${VPR},170 340,178 340,262 ${VPR},230`} fill="#F8F5EE" />
      {/* Right corridor ceiling/floor */}
      <polygon points={`${VPR},170 340,178 340,190 ${VPR},180`} fill="#E8E4DC" />
      {/* Wall junction line */}
      <line x1={VPL + 4} y1={168} x2={VPR} y2={VP.y} stroke="#C8C2B8" strokeWidth={1} />
      <line x1={VPL + 4} y1={226} x2={VPR} y2={VP.y} stroke="#D0CAC0" strokeWidth={1} />
      {/* Right-turn arrow indicator on wall */}
      <g transform={`translate(${VPL + 14}, ${VP.y - 10})`}>
        <path d="M 0 10 Q 20 10 20 0 M 14 -6 L 20 0 L 14 6"
          fill="none" stroke="#8DC8D3" strokeWidth={2} strokeLinecap="round" />
      </g>
    </g>
  )
}

function FarEndJunctionLeft() {
  return (
    <g>
      {/* Wall straight ahead */}
      <rect x={VPL + 4} y={168} width={VPR - VPL - 8} height={58} fill="#E0DBD1" />
      {/* Left corridor — opens to the left */}
      <polygon points={`${VPL},170 50,178 50,262 ${VPL},230`} fill="#F8F5EE" />
      {/* Left corridor ceiling */}
      <polygon points={`${VPL},170 50,178 50,190 ${VPL},180`} fill="#E8E4DC" />
      {/* Left-turn arrow on wall */}
      <g transform={`translate(${VPR - 36}, ${VP.y - 10})`}>
        <path d="M 20 10 Q 0 10 0 0 M 6 -6 L 0 0 L 6 6"
          fill="none" stroke="#8DC8D3" strokeWidth={2} strokeLinecap="round" />
      </g>
    </g>
  )
}

function FarEndStairs() {
  const steps = [0, 1, 2, 3, 4, 5, 6, 7]
  return (
    <g>
      {/* Stair platform base */}
      <rect x={VPL - 10} y={218} width={VPR - VPL + 20} height={12} fill="#DDD8CE" />
      {/* Step risers going upward */}
      {steps.map((i) => {
        const w = 156 - i * 12
        const x = VP.x - w / 2
        const y = 218 - i * 19
        return (
          <g key={i}>
            {/* Riser (vertical face) */}
            <rect x={x} y={y - 10} width={w} height={10} fill={i % 2 === 0 ? '#D8D3CA' : '#DDD8CE'} />
            {/* Tread (horizontal face) */}
            <rect x={x} y={y} width={w} height={9} rx={1} fill={i % 2 === 0 ? '#ECEAE4' : '#F0EDE7'} />
            {/* Tread highlight */}
            <rect x={x + 2} y={y + 1} width={w - 4} height={2} fill="rgba(255,255,255,0.5)" />
          </g>
        )
      })}
      {/* Handrails */}
      <line x1={135} y1={225} x2={120} y2={75} stroke="#BEB8AC" strokeWidth={4} strokeLinecap="round" />
      <line x1={255} y1={225} x2={270} y2={75} stroke="#B8B2A6" strokeWidth={4} strokeLinecap="round" />
      {/* Balusters */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line x1={138 + i * 22} y1={222 - i * 19} x2={136 + i * 22} y2={230 - i * 19}
            stroke="#CCC6BC" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={252 - i * 22} y1={222 - i * 19} x2={254 - i * 22} y2={230 - i * 19}
            stroke="#C6C0B6" strokeWidth={1.5} strokeLinecap="round" />
        </g>
      ))}
      {/* Floor 2 sign above stairs */}
      <rect x={168} y={70} width={54} height={20} rx={4} fill="#8DC8D3" />
      <text x={195} y={84} textAnchor="middle" fill="white" fontSize="10" fontWeight="700"
        fontFamily="'Inter', sans-serif">Floor 2 ↑</text>
    </g>
  )
}

function FarEndDestRight() {
  return <FarEndCorridor />
}

function FarEndDestLarge({ label }: { label?: string }) {
  return (
    <g>
      {/* Grand opening — archway or large double doors */}
      <rect x={94} y={152} width={202} height={88} fill="#8FAF9C26" />
      {/* Door frame */}
      <rect x={94} y={152} width={10} height={88} fill="#7A6550" />
      <rect x={286} y={152} width={10} height={88} fill="#6E5944" />
      <rect x={94} y={152} width={202} height={12} fill="#7A6550" />
      {/* Left door panel */}
      <rect x={108} y={167} width={84} height={70} fill="#9B8268" rx={1} />
      <rect x={112} y={172} width={76} height={60} fill="rgba(255,255,255,0.06)" stroke="#7A6550" strokeWidth={0.6} />
      {/* Right door panel */}
      <rect x={198} y={167} width={84} height={70} fill="#967D65" rx={1} />
      <rect x={202} y={172} width={76} height={60} fill="rgba(255,255,255,0.06)" stroke="#7A6550" strokeWidth={0.6} />
      {/* Door handles */}
      <circle cx={194} cy={202} r={4} fill="#6B5840" />
      <circle cx={200} cy={202} r={4} fill="#6B5840" />
      {/* Open gap — bright interior visible */}
      <rect x={190} y={167} width={12} height={70} fill="#8FAF9C26" />
      {/* Destination glow through gap */}
      <rect x={190} y={167} width={12} height={70} fill="rgba(59,110,168,0.15)" />
      {/* Blue route halo */}
      <rect x={94} y={152} width={202} height={88} fill="rgba(59,110,168,0.08)" />
      {/* Hall label above doors */}
      {label && (
        <>
          <rect x={135} y={130} width={120} height={18} rx={6} fill="rgba(59,110,168,0.85)" />
          <text x={195} y={143} textAnchor="middle" fill="white" fontSize="10" fontWeight="700"
            fontFamily="'Inter', sans-serif">{label}</text>
        </>
      )}
    </g>
  )
}

// ── Direction arrow overlays ──────────────────────────────────────────────────
function DirectionArrow({ direction }: { direction: string }) {
  if (direction === 'arrived') {
    return (
      <g transform={`translate(165, 390)`}>
        <rect width={60} height={60} rx={30} fill="#8DC8D3" opacity={0.9} />
        <path d="M 30 18 L 30 42 M 19 27 L 30 18 L 41 27" fill="none"
          stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 19 36 L 30 42 L 41 36" fill="none"
          stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={0.5} />
      </g>
    )
  }
  if (direction === 'right') {
    return (
      <g transform={`translate(270, 390)`}>
        <rect width={60} height={60} rx={30} fill="#8DC8D3" opacity={0.9} />
        <path d="M 18 30 L 42 30 M 33 19 L 42 30 L 33 41" fill="none"
          stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  }
  if (direction === 'left') {
    return (
      <g transform={`translate(60, 390)`}>
        <rect width={60} height={60} rx={30} fill="#8DC8D3" opacity={0.9} />
        <path d="M 42 30 L 18 30 M 27 19 L 18 30 L 27 41" fill="none"
          stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  }
  if (direction === 'up') {
    return (
      <g transform={`translate(165, 390)`}>
        <rect width={60} height={60} rx={30} fill="#8DC8D3" opacity={0.9} />
        <path d="M 30 42 L 30 18 M 19 29 L 30 18 L 41 29" fill="none"
          stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  }
  // straight
  return (
    <g>
      {/* Perspective arrow on floor */}
      <g transform={`translate(195, 410) scale(1, 0.35)`}>
        <path d="M 0 -60 L 0 40 M -20 -42 L 0 -60 L 20 -42"
          fill="none" stroke="#8DC8D3" strokeWidth={6} strokeLinecap="round"
          strokeLinejoin="round" opacity={0.45} />
      </g>
      {/* Arrow pill (floating) */}
      <g transform={`translate(165, 400)`}>
        <rect width={60} height={42} rx={21} fill="#8DC8D3" opacity={0.88} />
        <path d="M 30 30 L 30 12 M 20 21 L 30 12 L 40 21" fill="none"
          stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  )
}

// ── Door renderers ────────────────────────────────────────────────────────────
function RightDoor({ f, label, highlighted }: { f: number; label: string; highlighted?: boolean }) {
  const pts = rightDoorPts(f)
  const lp = rightDoorLabel(f)
  const xL = 260 + 130 * f
  const yTop = 220 - 133.6 * f
  const yBot = 220 + 260 * f

  // Glass panel (upper 30%)
  const glassH = (yBot - yTop) * 0.3
  const glassPtsXL_top = yTop
  const glassPtsXL_bot = yTop + glassH
  // At x=390: same ratios
  const glass390_top = 86
  const glass390_bot = 86 + (480 - 86) * 0.3

  const glassPts = `${Math.round(xL)},${Math.round(glassPtsXL_top)} 390,${glass390_top} 390,${Math.round(glass390_bot)} ${Math.round(xL)},${Math.round(glassPtsXL_bot)}`

  return (
    <g>
      {/* Door glow if highlighted */}
      {highlighted && (
        <polygon points={pts} fill="rgba(59,110,168,0.15)"
          stroke="#8DC8D3" strokeWidth={2} />
      )}
      {/* Door main surface */}
      <polygon points={pts} fill={highlighted ? '#8FAF9C66' : '#9B8268'}
        stroke={highlighted ? '#8DC8D3' : '#7A6550'} strokeWidth={highlighted ? 1.5 : 0.8} />
      {/* Door glass panel */}
      <polygon points={glassPts} fill={highlighted ? 'rgba(59,110,168,0.18)' : 'rgba(200,230,255,0.18)'}
        stroke={highlighted ? '#8DC8D3' : 'rgba(255,255,255,0.3)'} strokeWidth="0.5" />
      {/* Door panel divider lines */}
      <polygon points={pts} fill="none"
        stroke={highlighted ? 'rgba(59,110,168,0.4)' : 'rgba(255,255,255,0.12)'} strokeWidth="0.8" />
      {/* Room number plate */}
      <rect x={lp.x - 16} y={lp.y - 7} width={32} height={14} rx={3}
        fill={highlighted ? '#8DC8D3' : '#6B5840'} opacity={0.9} />
      <text x={lp.x} y={lp.y + 4} textAnchor="middle"
        fill="white" fontSize="9" fontWeight="700"
        fontFamily="'Inter', sans-serif">{label}</text>
      {/* Door frame */}
      {highlighted && (
        <polygon points={pts} fill="none" stroke="#8DC8D3" strokeWidth={3} opacity={0.6} />
      )}
    </g>
  )
}

function LeftDoor({ f, label }: { f: number; label: string }) {
  const pts = leftDoorPts(f)
  const lp = leftDoorLabel(f)
  const xR = 130 * f
  const yTop = 133.6 * f + 86.4
  const yBot = 480 - 260 * f
  const glassH = (yBot - yTop) * 0.3

  const glassPts = `0,86 ${Math.round(xR)},${Math.round(yTop)} ${Math.round(xR)},${Math.round(yTop + glassH)} 0,${Math.round(86 + 394 * 0.3)}`

  return (
    <g>
      <polygon points={pts} fill="#9B8268" stroke="#7A6550" strokeWidth={0.8} />
      <polygon points={glassPts} fill="rgba(200,230,255,0.16)"
        stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
      <rect x={lp.x - 14} y={lp.y - 7} width={28} height={14} rx={3}
        fill="#6B5840" opacity={0.85} />
      <text x={lp.x} y={lp.y + 4} textAnchor="middle"
        fill="white" fontSize="9" fontWeight="700"
        fontFamily="'Inter', sans-serif">{label}</text>
    </g>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FirstPersonNav({ destination, navStep, floor }: FirstPersonNavProps) {
  const scene = getScene(destination, navStep, floor)

  return (
    <svg
      viewBox="0 0 390 480"
      style={{ width: '100%', height: '100%', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fp-ceil" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAFAF5" />
          <stop offset="100%" stopColor="#EDEBE3" />
        </linearGradient>
        <linearGradient id="fp-floor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EAE3D5" />
          <stop offset="100%" stopColor="#D8D1C3" />
        </linearGradient>
        <linearGradient id="fp-lwall" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#EDEBE3" />
          <stop offset="100%" stopColor="#E0DDD4" />
        </linearGradient>
        <linearGradient id="fp-rwall" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EDEBE3" />
          <stop offset="100%" stopColor="#E5E2D9" />
        </linearGradient>
        <radialGradient id="fp-ambient" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,250,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,250,0)" />
        </radialGradient>
      </defs>

      {/* ── Base: ceiling, floor, walls ── */}

      {/* Ceiling */}
      <polygon points={`0,0 390,0 ${VPR},${VP.y} ${VPL},${VP.y}`} fill="url(#fp-ceil)" />

      {/* Floor */}
      <polygon points={`0,480 390,480 ${VPR},${VP.y} ${VPL},${VP.y}`} fill="url(#fp-floor)" />

      {/* Left wall */}
      <polygon points={`0,0 0,480 ${VPL},${VP.y}`} fill="url(#fp-lwall)" />

      {/* Right wall */}
      <polygon points={`390,0 390,480 ${VPR},${VP.y}`} fill="url(#fp-rwall)" />

      {/* Left wainscoting (lower wall panel) */}
      <polygon points={`0,330 0,480 ${VPL},${VP.y}`} fill="#C8C2B5" opacity={0.55} />

      {/* Right wainscoting */}
      <polygon points={`390,330 390,480 ${VPR},${VP.y}`} fill="#C2BCB0" opacity={0.55} />

      {/* Baseboard left */}
      <polygon points={`0,462 0,480 ${VPL},${VP.y}`} fill="#B8B1A4" opacity={0.7} />

      {/* Baseboard right */}
      <polygon points={`390,462 390,480 ${VPR},${VP.y}`} fill="#B2AAA0" opacity={0.7} />

      {/* ── Wall junction lines ── */}
      <line x1={0} y1={0} x2={VPL} y2={VP.y} stroke="rgba(0,0,0,0.09)" strokeWidth={1.2} />
      <line x1={390} y1={0} x2={VPR} y2={VP.y} stroke="rgba(0,0,0,0.09)" strokeWidth={1.2} />
      <line x1={0} y1={480} x2={VPL} y2={VP.y} stroke="rgba(0,0,0,0.12)" strokeWidth={1.5} />
      <line x1={390} y1={480} x2={VPR} y2={VP.y} stroke="rgba(0,0,0,0.12)" strokeWidth={1.5} />
      <line x1={0} y1={330} x2={VPL} y2={VP.y} stroke="rgba(0,0,0,0.06)" strokeWidth={0.8} />
      <line x1={390} y1={330} x2={VPR} y2={VP.y} stroke="rgba(0,0,0,0.06)" strokeWidth={0.8} />

      {/* ── Floor tile grid ── */}
      {/* Radiating perspective lines */}
      {[0, 78, 156, 234, 312, 390].map((tx) => (
        <line key={tx} x1={VP.x} y1={VP.y} x2={tx} y2={480}
          stroke="rgba(0,0,0,0.04)" strokeWidth={0.5} />
      ))}
      {/* Horizontal depth lines */}
      {[460, 405, 360, 322, 292, 268, 250, 236].map((ty) => (
        <line key={ty} x1={0} y1={ty} x2={390} y2={ty}
          stroke="rgba(0,0,0,0.035)" strokeWidth={0.5} />
      ))}

      {/* ── Ceiling fluorescent light strips ── */}
      <polygon points="143,0 163,0 188,220 183,220" fill="rgba(255,255,200,0.32)" />
      <polygon points="247,0 227,0 202,220 207,220" fill="rgba(255,255,200,0.32)" />
      {/* Broad ambient light from ceiling */}
      <polygon points="105,0 285,0 235,220 155,220" fill="rgba(255,255,248,0.18)" />

      {/* Light glow on floor from ceiling fixtures */}
      <polygon points={`150,480 240,480 ${VP.x+20},${VP.y} ${VP.x-20},${VP.y}`}
        fill="rgba(255,255,240,0.1)" />

      {/* Ambient radial glow at VP */}
      <ellipse cx={VP.x} cy={VP.y} rx={80} ry={60} fill="url(#fp-ambient)" />

      {/* ── Scene-specific: far end ── */}
      {scene.farEnd === 'corridor' && <FarEndCorridor />}
      {scene.farEnd === 'junction-right' && <FarEndJunctionRight />}
      {scene.farEnd === 'junction-left' && <FarEndJunctionLeft />}
      {scene.farEnd === 'stairs' && <FarEndStairs />}
      {scene.farEnd === 'dest-right' && <FarEndDestRight />}
      {scene.farEnd === 'dest-large' && <FarEndDestLarge label={scene.farLabel} />}

      {/* ── Doors ── */}
      {scene.leftDoor && (
        <LeftDoor f={scene.leftDoor.f} label={scene.leftDoor.label} />
      )}
      {scene.rightDoor && (
        <RightDoor f={scene.rightDoor.f} label={scene.rightDoor.label}
          highlighted={scene.rightDoor.highlighted} />
      )}

      {/* ── Highlighted destination pulse ring (dest-right scene) ── */}
      {scene.farEnd === 'dest-right' && scene.direction === 'arrived' && (
        <g>
          <circle cx={VP.x + 80} cy={VP.y + 20} r={28}
            fill="rgba(59,110,168,0.12)" className="animate-pulse-ring" />
          <circle cx={VP.x + 80} cy={VP.y + 20} r={18}
            fill="rgba(59,110,168,0.2)" />
        </g>
      )}

      {/* ── Wayfinding sign on wall (corridor scenes) ── */}
      {scene.farEnd === 'corridor' && (
        <g>
          {/* Small wayfinding sign on right wall */}
          <rect x={310} y={145} width={70} height={26} rx={4} fill="#8DC8D3" opacity={0.85} />
          <text x={345} y={156} textAnchor="middle" fill="white" fontSize="8" fontWeight="700"
            fontFamily="'Inter', sans-serif" opacity={0.9}>
            {destination === 'b203' && floor === 1 ? '→ Stairs' :
              destination === 'b203' && floor === 2 ? '← B201-B205' :
              '→ Innovation'}
          </text>
          <text x={345} y={166} textAnchor="middle" fill="rgba(255,255,255,0.75)"
            fontSize="7" fontFamily="'Inter', sans-serif">
            {floor === 1 ? 'Ground Floor' : 'Floor 2'}
          </text>
        </g>
      )}

      {/* ── Floor label (Floor 2 indicator) ── */}
      {scene.floorLabel && (
        <g>
          <rect x={12} y={390} width={58} height={22} rx={6}
            fill="rgba(59,110,168,0.85)" />
          <text x={41} y={405} textAnchor="middle" fill="white"
            fontSize="10" fontWeight="700"
            fontFamily="'Inter', sans-serif">
            Floor 2
          </text>
        </g>
      )}

      {/* ── Direction arrow ── */}
      <DirectionArrow direction={scene.direction} />

      {/* ── Subtle vignette edges for depth ── */}
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
        </radialGradient>
      </defs>
      <rect width="390" height="480" fill="url(#vignette)" />

      {/* ── Arrived overlay (destination scene) ── */}
      {scene.direction === 'arrived' && scene.farEnd !== 'dest-large' && (
        <g>
          <rect x={120} y={300} width={150} height={44} rx={12}
            fill="rgba(59,110,168,0.92)" />
          <text x={195} y={320} textAnchor="middle" fill="white"
            fontSize="12" fontWeight="800"
            fontFamily="'Inter', sans-serif">You have arrived</text>
          <text x={195} y={336} textAnchor="middle"
            fill="rgba(255,255,255,0.8)" fontSize="10"
            fontFamily="'Inter', sans-serif">Check in to earn points</text>
        </g>
      )}
    </svg>
  )
}
