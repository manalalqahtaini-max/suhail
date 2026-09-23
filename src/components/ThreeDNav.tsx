import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { calculateRoute, CORRIDORS, ELC_ROOMS, roomForDestination, type PlanPoint, type PlanRoom, type RoomKind } from '../data/elcFloorPlan'

const roomColors: Record<RoomKind, string> = {
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

const wx = (x: number) => x - 20
const wz = (z: number) => z - 14

function Wall({ x, z, w, d, y = 1.4, h = 2.8 }: { x: number; z: number; w: number; d: number; y?: number; h?: number }) {
  return (
    <mesh position={[wx(x), y, wz(z)]} castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color="#E7E3DA" roughness={0.92} />
    </mesh>
  )
}

function DoorWall({ room, side }: { room: PlanRoom; side: PlanRoom['entranceSide'] }) {
  const t = 0.16
  const gap = 1
  const isDoor = room.entranceSide === side
  const horizontal = side === 'north' || side === 'south'
  const length = horizontal ? room.w : room.d
  const start = horizontal ? room.x : room.z
  const at = horizontal ? room.entrance.x : room.entrance.z
  const fixed = horizontal
    ? room.z + (side === 'south' ? room.d : 0)
    : room.x + (side === 'east' ? room.w : 0)

  if (!isDoor) {
    return horizontal
      ? <Wall x={room.x + room.w / 2} z={fixed} w={length} d={t} />
      : <Wall x={fixed} z={room.z + room.d / 2} w={t} d={length} />
  }

  const before = at - gap / 2 - start
  const after = start + length - (at + gap / 2)
  return (
    <>
      {before > 0.05 && (horizontal
        ? <Wall x={start + before / 2} z={fixed} w={before} d={t} />
        : <Wall x={fixed} z={start + before / 2} w={t} d={before} />)}
      {after > 0.05 && (horizontal
        ? <Wall x={at + gap / 2 + after / 2} z={fixed} w={after} d={t} />
        : <Wall x={fixed} z={at + gap / 2 + after / 2} w={t} d={after} />)}
      {/* Header preserves the wall boundary while leaving a valid doorway. */}
      <mesh position={horizontal ? [wx(at), 2.5, wz(fixed)] : [wx(fixed), 2.5, wz(at)]}>
        <boxGeometry args={horizontal ? [gap, 0.6, t] : [t, 0.6, gap]} />
        <meshStandardMaterial color="#E7E3DA" />
      </mesh>
    </>
  )
}

function RoomLabel({ room }: { room: PlanRoom }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 96
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'rgba(255,255,255,.92)'
    ctx.roundRect(8, 8, 240, 80, 14)
    ctx.fill()
    ctx.fillStyle = '#0E4A46'
    ctx.font = `700 ${room.id.length > 7 ? 25 : 34}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(room.id, 128, 48)
    const result = new THREE.CanvasTexture(canvas)
    result.colorSpace = THREE.SRGBColorSpace
    return result
  }, [room.id])

  useEffect(() => () => texture.dispose(), [texture])
  return (
    <sprite position={[wx(room.x + room.w / 2), 1.15, wz(room.z + room.d / 2)]} scale={[2.4, 0.9, 1]}>
      <spriteMaterial map={texture} depthTest={false} />
    </sprite>
  )
}

function RoomGeometry({ room, selected }: { room: PlanRoom; selected: boolean }) {
  return (
    <group>
      <mesh position={[wx(room.x + room.w / 2), 0.04, wz(room.z + room.d / 2)]} receiveShadow>
        <boxGeometry args={[room.w, 0.08, room.d]} />
        <meshStandardMaterial color={roomColors[room.kind]} roughness={0.9}
          emissive={selected ? '#8DC8D3' : '#000000'} emissiveIntensity={selected ? 0.24 : 0} />
      </mesh>
      {(['north', 'south', 'east', 'west'] as const).map((side) => <DoorWall key={side} room={room} side={side} />)}
      <RoomLabel room={room} />
    </group>
  )
}

function RouteGeometry({ route }: { route: PlanPoint[] }) {
  return (
    <group>
      {route.slice(1).map((point, i) => {
        const prev = route[i]
        const dx = point.x - prev.x
        const dz = point.z - prev.z
        return (
          <mesh key={i} position={[wx((point.x + prev.x) / 2), 0.14, wz((point.z + prev.z) / 2)]}>
            <boxGeometry args={[Math.abs(dx) || 0.28, 0.12, Math.abs(dz) || 0.28]} />
            <meshStandardMaterial color="#8DC8D3" emissive="#8DC8D3" emissiveIntensity={0.28} />
          </mesh>
        )
      })}
    </group>
  )
}

function UserMarker({ point }: { point: PlanPoint }) {
  const ref = useRef<THREE.Group>(null)
  const elapsed = useRef(0)
  useFrame((_, delta) => {
    elapsed.current += delta
    if (ref.current) ref.current.position.y = 0.55 + Math.sin(elapsed.current * 3) * 0.08
  })
  return (
    <group ref={ref} position={[wx(point.x), 0.55, wz(point.z)]}>
      <mesh castShadow><sphereGeometry args={[0.32, 20, 20]} /><meshStandardMaterial color="#2F6F62" /></mesh>
      <mesh position={[0, -0.47, 0]}><cylinderGeometry args={[0.18, 0.32, 0.65, 20]} /><meshStandardMaterial color="#2F6F62" /></mesh>
    </group>
  )
}

function CameraRig({ route, navStep, overview }: { route: PlanPoint[]; navStep: number; overview: boolean }) {
  const { camera } = useThree()
  const pos = useRef(new THREE.Vector3(0, 28, 30))
  const look = useRef(new THREE.Vector3())
  useFrame((_, dt) => {
    const index = Math.min(route.length - 1, Math.max(0, navStep))
    const current = route[index]
    const next = route[Math.min(route.length - 1, index + 1)]
    let desiredPos: THREE.Vector3
    let desiredLook: THREE.Vector3
    if (overview) {
      desiredPos = new THREE.Vector3(0, 31, 30)
      desiredLook = new THREE.Vector3(0, 0, 0)
    } else {
      const direction = new THREE.Vector3(next.x - current.x, 0, next.z - current.z).normalize()
      desiredPos = new THREE.Vector3(wx(current.x) - direction.x * 3.4, 5.2, wz(current.z) - direction.z * 3.4)
      desiredLook = new THREE.Vector3(wx(current.x) + direction.x * 4.5, 0.8, wz(current.z) + direction.z * 4.5)
    }
    const amount = 1 - Math.exp(-dt * 2.2)
    pos.current.lerp(desiredPos, amount)
    look.current.lerp(desiredLook, amount)
    camera.position.copy(pos.current)
    camera.lookAt(look.current)
  })
  return null
}

export interface ThreeDNavProps {
  destination: 'b203' | 'innovation'
  navStep: number
  floor: 1 | 2
  overview?: boolean
}

export default function ThreeDNav({ destination, navStep, overview = false }: ThreeDNavProps) {
  const roomId = roomForDestination(destination)
  const route = useMemo(() => calculateRoute(roomId), [roomId])
  const point = route[Math.min(route.length - 1, Math.max(0, navStep))]
  return (
    <Canvas shadows="percentage" camera={{ fov: 48, near: 0.1, far: 100, position: [0, 31, 30] }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <color attach="background" args={['#F2EFE9']} />
      <ambientLight intensity={1.45} />
      <directionalLight castShadow position={[8, 24, 12]} intensity={2.4} shadow-mapSize={[1024, 1024]} />
      <mesh position={[0, -0.08, 1]} receiveShadow>
        <boxGeometry args={[43, 0.12, 32]} />
        <meshStandardMaterial color="#F2EFE9" roughness={1} />
      </mesh>
      {CORRIDORS.map((c, i) => (
        <mesh key={i} position={[wx(c.x + c.w / 2), 0.01, wz(c.z + c.d / 2)]} receiveShadow>
          <boxGeometry args={[c.w, 0.08, c.d]} />
          <meshStandardMaterial color="#F5F1E8" roughness={0.85} />
        </mesh>
      ))}
      {ELC_ROOMS.map((room) => <RoomGeometry key={room.id} room={room} selected={room.id === roomId} />)}
      <RouteGeometry route={route} />
      <UserMarker point={point} />
      <CameraRig route={route} navStep={navStep} overview={overview} />
    </Canvas>
  )
}
