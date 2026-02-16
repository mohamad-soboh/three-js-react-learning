import { useState, useRef } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh } from 'three'

/**
 * LESSON 5: Interactive Scene
 * 
 * Key concepts:
 * - onClick, onPointerOver, onPointerOut events
 * - Event object and intersection point
 * - State management with interactions
 * - Cursor changes
 * - Combining Drei helpers (Text component)
 */

function InteractiveBox({ 
  position, 
  initialColor 
}: { 
  position: [number, number, number]
  initialColor: string 
}) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  useFrame((state) => {
    if (meshRef.current) {
      // Bounce on hover
      const targetY = hovered ? position[1] + 0.3 : position[1]
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1
      
      // Spin when clicked
      if (clicked) {
        meshRef.current.rotation.y += 0.1
      } else {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
      }
    }
  })

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    // Stop propagation so only this object receives the click
    event.stopPropagation()
    setClicked(!clicked)
    setClickCount((c) => c + 1)
  }

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setHovered(true)
    // Change cursor to pointer
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'default'
  }

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={clicked ? 1.2 : 1}
      >
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color={hovered ? '#22c55e' : initialColor}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      
      {/* Click counter using Drei's Text component */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {clickCount > 0 ? `Clicks: ${clickCount}` : 'Click me!'}
      </Text>
    </group>
  )
}

function InteractiveScene() {
  const [lastClickPoint, setLastClickPoint] = useState<[number, number, number] | null>(null)

  // Handle clicks on the floor to show click position
  const handleFloorClick = (event: ThreeEvent<MouseEvent>) => {
    const point = event.point
    setLastClickPoint([point.x, point.y + 0.01, point.z])
    
    // Clear after 2 seconds
    setTimeout(() => setLastClickPoint(null), 2000)
  }

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 3, -3]} intensity={15} color="#a855f7" />

      {/* Interactive boxes */}
      <InteractiveBox position={[-1.5, 0, 0]} initialColor="#6366f1" />
      <InteractiveBox position={[0, 0, 0]} initialColor="#f59e0b" />
      <InteractiveBox position={[1.5, 0, 0]} initialColor="#ec4899" />

      {/* Clickable floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.8, 0]}
        onClick={handleFloorClick}
        onPointerOver={() => document.body.style.cursor = 'crosshair'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Click indicator */}
      {lastClickPoint && (
        <mesh position={lastClickPoint}>
          <ringGeometry args={[0.2, 0.3, 32]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      )}

      {/* Instructions */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="#94a3b8"
        anchorX="center"
      >
        Click boxes to toggle spin • Click floor to mark
      </Text>
    </>
  )
}

export default InteractiveScene
