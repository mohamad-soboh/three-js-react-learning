import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

/**
 * LESSON 2: Animated Box with State
 * 
 * Key concepts:
 * - useFrame with state: Reading React state in animation loop
 * - Math functions: Using sin/cos for smooth oscillations
 * - Position and scale animations
 * - Combining multiple animations
 */

function AnimatedBox() {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // state.clock.elapsedTime: Time since start in seconds
      const time = state.clock.elapsedTime

      // Floating animation using sine wave
      // Math.sin oscillates between -1 and 1
      meshRef.current.position.y = Math.sin(time * 2) * 0.3

      // Rotation animation
      meshRef.current.rotation.y = time * 0.5
      meshRef.current.rotation.z = Math.sin(time) * 0.1

      // Scale pulse animation when hovered
      const targetScale = hovered ? 1.3 : 1
      // Lerp (linear interpolation) for smooth transitions
      meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1
      meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1
      meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#ff6b6b" />

      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Rounded box for softer look */}
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color={hovered ? '#22c55e' : '#f59e0b'}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Grid helper for reference */}
      <gridHelper args={[10, 10, '#444', '#222']} position={[0, -1.5, 0]} />
    </>
  )
}

export default AnimatedBox
