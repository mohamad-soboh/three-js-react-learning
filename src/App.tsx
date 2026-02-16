import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import BasicCube from './examples/BasicCube'
import AnimatedBox from './examples/AnimatedBox'
import LightingScene from './examples/LightingScene'
import MultipleObjects from './examples/MultipleObjects'
import InteractiveScene from './examples/InteractiveScene'
import './App.css'

type ExampleKey = 'basic' | 'animated' | 'lighting' | 'multiple' | 'interactive'

const examples: Record<ExampleKey, { title: string; description: string }> = {
  basic: {
    title: '1. Basic Cube',
    description: 'A simple rotating cube - the "Hello World" of Three.js'
  },
  animated: {
    title: '2. Animated Box',
    description: 'Learn useFrame hook for animations'
  },
  lighting: {
    title: '3. Lighting Scene',
    description: 'Different light types and materials'
  },
  multiple: {
    title: '4. Multiple Objects',
    description: 'Creating and positioning multiple 3D objects'
  },
  interactive: {
    title: '5. Interactive Scene',
    description: 'Click and hover interactions'
  }
}

function App() {
  const [currentExample, setCurrentExample] = useState<ExampleKey>('basic')

  const renderExample = () => {
    switch (currentExample) {
      case 'basic':
        return <BasicCube />
      case 'animated':
        return <AnimatedBox />
      case 'lighting':
        return <LightingScene />
      case 'multiple':
        return <MultipleObjects />
      case 'interactive':
        return <InteractiveScene />
      default:
        return <BasicCube />
    }
  }

  return (
    <div className="app">
      <nav className="sidebar">
        <h1>🎮 Three.js + React</h1>
        <p className="subtitle">Learning Examples</p>
        <ul>
          {(Object.keys(examples) as ExampleKey[]).map((key) => (
            <li key={key}>
              <button
                className={currentExample === key ? 'active' : ''}
                onClick={() => setCurrentExample(key)}
              >
                {examples[key].title}
              </button>
            </li>
          ))}
        </ul>
        <div className="info">
          <h3>{examples[currentExample].title}</h3>
          <p>{examples[currentExample].description}</p>
          <p className="controls">🖱️ Drag to rotate • Scroll to zoom</p>
        </div>
      </nav>
      
      <main className="canvas-container">
        <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
          <OrbitControls enableDamping dampingFactor={0.05} />
          {renderExample()}
        </Canvas>
      </main>
    </div>
  )
}

export default App
