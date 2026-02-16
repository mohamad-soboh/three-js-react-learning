import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

/**
 * LESSON 1: Basic Cube
 * 
 * Key concepts:
 * - mesh: The basic 3D object (geometry + material)
 * - boxGeometry: Defines the shape (width, height, depth)
 * - meshStandardMaterial: Defines appearance (color, roughness, etc.)
 * - useRef: Reference to the mesh for animations
 * - useFrame: Runs every frame (60fps) for animations
 */

function BasicCube() {
  // Create a reference to access the mesh directly
  const meshRef = useRef<Mesh>(null)

  // useFrame runs on every frame (like requestAnimationFrame)
  // delta is the time since last frame for smooth animations
  useFrame((_, delta) => {
    if (meshRef.current) {
      // Rotate the cube on Y and X axes
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.rotation.x += delta * 0.2
    }
  })

  return (
    <>
      {/* Ambient light - provides base illumination */}
      <ambientLight intensity={0.3} />
      
      {/* Directional light - like the sun, casts shadows */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      {/* The 3D mesh (cube) */}
      <mesh ref={meshRef}>
        {/* boxGeometry: args = [width, height, depth] */}
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        
        {/* meshStandardMaterial: physically-based rendering material */}
        <meshStandardMaterial 
          color="#6366f1"  // Indigo color
          roughness={0.3}  // 0 = shiny, 1 = matte
          metalness={0.2}  // 0 = plastic, 1 = metal
        />
      </mesh>
    </>
  )
}

export default BasicCube
