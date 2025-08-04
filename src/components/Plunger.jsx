import React, { useRef, useEffect } from 'react'
import { useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'

const Plunger = ({ position }) => {
  const { isPlaying, isPaused } = useGameStore()
  const meshRef = useRef()
  const [ref, api] = useBox(() => ({
    mass: 0,
    position,
    args: [0.5, 2, 0.5],
    material: { friction: 0.1, restitution: 0.8 }
  }))

  const isPulling = useRef(false)
  const pullTime = useRef(0)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || isPaused) return
      
      if (e.code === 'Space') {
        isPulling.current = true
        pullTime.current = 0
      }
    }

    const handleKeyUp = (e) => {
      if (e.code === 'Space' && isPulling.current) {
        // Launch ball with force based on pull time
        const force = Math.min(pullTime.current * 50, 30)
        // This would need to be connected to the ball component
        isPulling.current = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isPlaying, isPaused])

  useFrame((state) => {
    if (!meshRef.current) return

    if (isPulling.current) {
      pullTime.current += state.clock.getDelta()
      
      // Animate plunger pull
      const pullDistance = Math.min(pullTime.current * 2, 1)
      meshRef.current.position.z = position[2] - pullDistance
    } else {
      // Return to original position
      meshRef.current.position.z = position[2]
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Plunger rod */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.2, 2]} />
        <meshStandardMaterial 
          color={isPulling.current ? "#ff6b6b" : "#95a5a6"}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Plunger base */}
      <mesh position={[0, -1.5, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
      
      {/* Plunger handle */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
    </group>
  )
}

export default Plunger 