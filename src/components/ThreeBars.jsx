import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Bars({ values, highlights }) {
  const max = useMemo(() => Math.max(1, ...values), [values])
  return (
    <group position={[0, 0, 0]}>
      {values.map((v, i) => {
        const h = (v / max) * 4 + 0.1
        const x = i - values.length / 2
        const isA = highlights?.a === i
        const isB = highlights?.b === i
        const color = isA ? '#ef4444' : isB ? '#22c55e' : '#60a5fa'
        return (
          <mesh key={i} position={[x * 0.5, h / 2, 0]}>
            <boxGeometry args={[0.4, h, 0.4]} />
            <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function ThreeBars({ values, highlights }) {
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden bg-slate-900">
      <Canvas camera={{ position: [0, 3.5, 8], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Bars values={values} highlights={highlights} />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  )
}
