import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

/**
 * LESSON 4: Multiple Objects and Groups
 * 
 * Key concepts:
 * - Group: Container for multiple objects that move together
 * - useMemo: Optimize by computing values once
 * - Mapping over arrays to create multiple objects
 * - Position offsets and transformations
 */

// Generate random data for boxes
function generateBoxData(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
    ] as [number, number, number],
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    scale: 0.2 + Math.random() * 0.4,
    rotationSpeed: 0.5 + Math.random() * 1.5,
    floatOffset: Math.random() * Math.PI * 2,
  }))
}

function FloatingBox({ 
  position, 
  color, 
  scale, 
  rotationSpeed, 
  floatOffset 
}: {
  position: [number, number, number]
  color: string
  scale: number
  rotationSpeed: number
  floatOffset: number
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      // Individual floating animation with offset
      meshRef.current.position.y = position[1] + Math.sin(time + floatOffset) * 0.3
      meshRef.current.rotation.x = time * rotationSpeed * 0.5
      meshRef.current.rotation.y = time * rotationSpeed
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} />
    </mesh>
  )
}

function MultipleObjects() {
  const groupRef = useRef<Group>(null)

  // useMemo prevents recreation on every render
  const boxes = useMemo(() => generateBoxData(20), [])

  // Rotate the entire group slowly
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, -5]} intensity={15} color="#ff6b6b" />

      {/* Group: All children move together as one unit */}
      <group ref={groupRef}>
        {boxes.map((box) => (
          <FloatingBox
            key={box.id}
            position={box.position}
            color={box.color}
            scale={box.scale}
            rotationSpeed={box.rotationSpeed}
            floatOffset={box.floatOffset}
          />
        ))}
      </group>

      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.1} 
          metalness={0.9}
          emissive="#6366f1"
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  )
}

export default MultipleObjects
