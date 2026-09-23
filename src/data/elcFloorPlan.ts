export type RoomKind =
  | 'classroom'
  | 'office'
  | 'lounge'
  | 'conference'
  | 'lab'
  | 'toilet'
  | 'tea'
  | 'lift'
  | 'stairs'
  | 'store'
  | 'mechanical'
  | 'electrical'

export interface PlanPoint {
  x: number
  z: number
}

export interface PlanRoom {
  id: string
  x: number
  z: number
  w: number
  d: number
  kind: RoomKind
  entrance: PlanPoint
  entranceSide: 'north' | 'south' | 'east' | 'west'
}

const room = (
  id: string,
  x: number,
  z: number,
  w: number,
  d: number,
  kind: RoomKind,
  entrance: PlanPoint,
  entranceSide: PlanRoom['entranceSide'],
): PlanRoom => ({ id, x, z, w, d, kind, entrance, entranceSide })

// Simplified directly from the uploaded ELC Building – Middle Floor plan.
// Coordinates preserve the plan's inverted-U circulation, room order, and adjacencies.
export const ELC_ROOMS: PlanRoom[] = [
  room('L060', 0, 0, 4, 10, 'conference', { x: 4, z: 8 }, 'east'),
  room('L059', 4, 0, 3, 6, 'classroom', { x: 5.5, z: 6 }, 'south'),
  room('L057', 7, 0, 3, 6, 'classroom', { x: 8.5, z: 6 }, 'south'),
  room('L056', 10, 0, 3, 6, 'classroom', { x: 11.5, z: 6 }, 'south'),
  room('L053', 13, 0, 2.5, 6, 'classroom', { x: 14.25, z: 6 }, 'south'),
  room('L051', 15.5, 0, 2.5, 6, 'classroom', { x: 16.75, z: 6 }, 'south'),
  room('Store', 18, 0, 2, 3, 'store', { x: 18.7, z: 6 }, 'south'),
  room('Lift', 18, 3, 2, 3, 'lift', { x: 19, z: 6 }, 'south'),
  room('Stairs N', 20, 0, 2, 6, 'stairs', { x: 21, z: 6 }, 'south'),
  room('L046', 22, 0, 4, 6, 'classroom', { x: 24, z: 6 }, 'south'),
  room('L043', 26, 0, 4, 6, 'classroom', { x: 28, z: 6 }, 'south'),
  room('L042', 30, 0, 4, 6, 'classroom', { x: 32, z: 6 }, 'south'),
  room('Store E', 34, 0, 2, 6, 'store', { x: 35, z: 6 }, 'south'),
  room('Mechanical E', 36, 0, 4, 7, 'mechanical', { x: 36, z: 6 }, 'west'),

  room('L061', 0, 10, 4, 4, 'classroom', { x: 4, z: 12 }, 'east'),
  room('L062', 0, 14, 4, 4, 'classroom', { x: 4, z: 16 }, 'east'),
  room('L065', 0, 18, 4, 5, 'classroom', { x: 4, z: 20.5 }, 'east'),
  room('L066', 0, 23, 4, 5, 'lab', { x: 4, z: 25.5 }, 'east'),
  room('WC W', 8, 13, 3, 3, 'toilet', { x: 8, z: 14.5 }, 'west'),
  room('Electrical W', 8, 16, 3, 2, 'electrical', { x: 8, z: 17 }, 'west'),
  room('L063', 8, 18, 3, 2.5, 'conference', { x: 8, z: 19.25 }, 'west'),
  room('L064', 8, 20.5, 3, 2.5, 'office', { x: 8, z: 21.75 }, 'west'),
  room('Stairs W', 8, 23, 3, 4, 'stairs', { x: 8, z: 25 }, 'west'),

  room('Tea W', 6.5, 10, 1.5, 3, 'tea', { x: 7.25, z: 10 }, 'north'),
  room('WC NW', 8, 10, 2, 3, 'toilet', { x: 9, z: 10 }, 'north'),
  room('L058', 10, 10, 2.5, 3, 'office', { x: 11.25, z: 10 }, 'north'),
  room('L055', 12.5, 10, 2.5, 3, 'office', { x: 13.75, z: 10 }, 'north'),
  room('L054', 15, 10, 2.5, 3, 'office', { x: 16.25, z: 10 }, 'north'),
  room('L052', 17.5, 10, 2.5, 3, 'office', { x: 18.75, z: 10 }, 'north'),
  room('L050', 20, 10, 2, 3, 'office', { x: 21, z: 10 }, 'north'),
  room('L049', 22, 10, 2, 3, 'office', { x: 23, z: 10 }, 'north'),
  room('L048', 24, 10, 2.5, 3, 'office', { x: 25.25, z: 10 }, 'north'),
  room('L047', 26.5, 10, 2.5, 3, 'office', { x: 27.75, z: 10 }, 'north'),
  room('L045', 29, 10, 2, 3, 'office', { x: 30, z: 10 }, 'north'),
  room('L044', 31, 10, 2, 3, 'tea', { x: 32, z: 10 }, 'north'),
  room('WC NE', 33, 10, 2, 3, 'toilet', { x: 34, z: 10 }, 'north'),
  room('Tea E', 35, 10, 1.5, 3, 'tea', { x: 35.75, z: 10 }, 'north'),

  room('WC E', 29, 13, 3, 3, 'toilet', { x: 32, z: 14.5 }, 'east'),
  room('L038', 29, 16, 3, 3, 'conference', { x: 32, z: 17.5 }, 'east'),
  room('L037', 29, 19, 3, 3, 'lounge', { x: 32, z: 20.5 }, 'east'),
  room('Stairs E', 29, 22, 3, 4, 'stairs', { x: 32, z: 24 }, 'east'),
  room('L041', 36, 7, 4, 3, 'classroom', { x: 36, z: 8.5 }, 'west'),
  room('L040', 36, 10, 4, 4, 'classroom', { x: 36, z: 12 }, 'west'),
  room('L039', 36, 14, 4, 4, 'classroom', { x: 36, z: 16 }, 'west'),
  room('L036', 36, 18, 4, 4, 'classroom', { x: 36, z: 20 }, 'west'),
  room('L035', 36, 22, 4, 6, 'lab', { x: 36, z: 25 }, 'west'),
]

export const CORRIDORS = [
  { x: 4, z: 6, w: 32, d: 4 },
  { x: 4, z: 6, w: 4, d: 22 },
  { x: 32, z: 6, w: 4, d: 22 },
]

export const START: PlanPoint = { x: 6, z: 26 }

const topXs = [...new Set(ELC_ROOMS.filter((r) => r.entranceSide === 'south' || r.entranceSide === 'north')
  .map((r) => r.entrance.x).concat([6, 34]))].sort((a, b) => a - b)
const leftZs = [...new Set(ELC_ROOMS.filter((r) =>
  (r.entranceSide === 'east' || r.entranceSide === 'west') && r.entrance.x <= 8)
  .map((r) => r.entrance.z).concat([8, 26]))].sort((a, b) => a - b)
const rightZs = [...new Set(ELC_ROOMS.filter((r) =>
  (r.entranceSide === 'east' || r.entranceSide === 'west') && r.entrance.x >= 32)
  .map((r) => r.entrance.z).concat([8, 26]))].sort((a, b) => a - b)

const distance = (a: PlanPoint, b: PlanPoint) => Math.hypot(a.x - b.x, a.z - b.z)

function dedupe(points: PlanPoint[]) {
  return points.filter((p, index) => points.findIndex((q) => q.x === p.x && q.z === p.z) === index)
}

export function calculateRoute(roomId: string): PlanPoint[] {
  const destination = ELC_ROOMS.find((r) => r.id === roomId) ?? ELC_ROOMS[1]
  const backbone = dedupe([
    ...topXs.map((x) => ({ x, z: 8 })),
    ...leftZs.map((z) => ({ x: 6, z })),
    ...rightZs.map((z) => ({ x: 34, z })),
  ])
  const nodes = dedupe([START, ...backbone, destination.entrance])
  const key = (p: PlanPoint) => `${p.x},${p.z}`
  const edges = new Map<string, PlanPoint[]>()
  const connect = (a: PlanPoint, b: PlanPoint) => {
    edges.set(key(a), [...(edges.get(key(a)) ?? []), b])
    edges.set(key(b), [...(edges.get(key(b)) ?? []), a])
  }

  const connectLine = (line: PlanPoint[]) => line.slice(1).forEach((p, i) => connect(line[i], p))
  connectLine(topXs.map((x) => ({ x, z: 8 })))
  connectLine(leftZs.map((z) => ({ x: 6, z })))
  connectLine(rightZs.map((z) => ({ x: 34, z })))
  connect({ x: 6, z: 8 }, { x: topXs.find((x) => x === 6) ?? 6, z: 8 })
  connect({ x: 34, z: 8 }, { x: topXs.find((x) => x === 34) ?? 34, z: 8 })

  const e = destination.entrance
  if (destination.entranceSide === 'north' || destination.entranceSide === 'south') connect(e, { x: e.x, z: 8 })
  else if (e.x <= 8) connect(e, { x: 6, z: e.z })
  else connect(e, { x: 34, z: e.z })

  const dist = new Map(nodes.map((n) => [key(n), Infinity]))
  const prev = new Map<string, PlanPoint>()
  const unvisited = new Set(nodes.map(key))
  dist.set(key(START), 0)
  while (unvisited.size) {
    const currentKey = [...unvisited].sort((a, b) => (dist.get(a) ?? Infinity) - (dist.get(b) ?? Infinity))[0]
    unvisited.delete(currentKey)
    const current = nodes.find((n) => key(n) === currentKey)!
    for (const next of edges.get(currentKey) ?? []) {
      const alt = (dist.get(currentKey) ?? Infinity) + distance(current, next)
      if (alt < (dist.get(key(next)) ?? Infinity)) {
        dist.set(key(next), alt)
        prev.set(key(next), current)
      }
    }
  }
  const route: PlanPoint[] = [e]
  while (key(route[0]) !== key(START)) {
    const p = prev.get(key(route[0]))
    if (!p) break
    route.unshift(p)
  }
  const clean = route.filter((p, i, arr) => i === 0 || p.x !== arr[i - 1].x || p.z !== arr[i - 1].z)
  return clean.filter((point, i) => {
    if (i === 0 || i === clean.length - 1) return true
    const before = clean[i - 1]
    const after = clean[i + 1]
    return !((before.x === point.x && point.x === after.x) || (before.z === point.z && point.z === after.z))
  })
}

export const roomForDestination = (destination: 'b203' | 'innovation') =>
  destination === 'b203' ? 'L059' : 'L035'

export const KIND_LABELS: Record<RoomKind, string> = {
  classroom: 'Classroom',
  office: "Teachers' Office",
  lounge: "Teachers' Lounge",
  conference: 'Conference Room',
  lab: 'Lab',
  toilet: 'Toilets',
  tea: 'Tea Room',
  lift: 'Lift',
  stairs: 'Stairs',
  store: 'Storeroom',
  mechanical: 'Mechanical',
  electrical: 'Electrical',
}
