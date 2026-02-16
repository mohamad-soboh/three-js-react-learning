import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

/**
 * LESSON 3: Lighting and Materials
 * 
 * Key concepts:
 * - Different light types: ambient, directional, point, spot
 * - Light properties: color, intensity, position
 * - Different materials: Standard, Phong, Toon
 * - How materials respond to light
 */

function LightingScene() {
  const sphereRef = useRef<Mesh>(null)
  const torusRef = useRef<Mesh>(null)
  const coneRef = useRef<Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.3
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.5
      torusRef.current.rotation.y = time * 0.3
    }
    if (coneRef.current) {
      coneRef.current.rotation.y = time * 0.4
    }
  })

  return (
    <>
      {/* LIGHTS */}
      
      {/* Ambient: Equal light everywhere, no shadows */}
      <ambientLight intensity={0.2} color="#ffffff" />
      
      {/* Directional: Parallel rays like the sun */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        color="#ffffff"
        castShadow
      />
      
      {/* Point: Emits light in all directions from a point */}
      <pointLight
        position={[-3, 2, -3]}
        intensity={20}
        color="#ff6b6b"
        distance={10}
      />
      
      {/* Spot: Cone-shaped light (like a flashlight) */}
      <spotLight
        position={[3, 4, -2]}
        intensity={30}
        color="#22c55e"
        angle={0.3}
        penumbra={0.5}
        distance={15}
      />

      {/* OBJECTS WITH DIFFERENT MATERIALS */}

      {/* Sphere with Standard Material (PBR) */}
      <mesh ref={sphereRef} position={[-2, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Torus with Phong Material (classic shiny) */}
      <mesh ref={torusRef} position={[0, 0, 0]}>
        <torusGeometry args={[0.6, 0.25, 16, 32]} />
        <meshPhongMaterial
          color="#f59e0b"
          shininess={100}
          specular="#ffffff"
        />
      </mesh>

      {/* Cone with Toon Material (cel-shaded look) */}
      <mesh ref={coneRef} position={[2, -0.3, 0]}>
        <coneGeometry args={[0.6, 1.2, 32]} />
        <meshToonMaterial color="#ec4899" />
      </mesh>

      {/* Floor plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} />
      </mesh>

      {/* Light helpers (visible indicators) */}
      <mesh position={[-3, 2, -3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#ff6b6b" />
      </mesh>
    </>
  )
}

export default LightingScene
