import React, { useRef, useEffect } from 'react'
import { useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'

const Bumper = ({ position }) => {
  const { addScore, isPlaying, isPaused } = useGameStore()
  const meshRef = useRef()
  const [ref, api] = useSphere(() => ({
    mass: 0,
    position,
    args: [1],
    material: { friction: 0.1, restitution: 0.9 }
  }))

  const isActive = useRef(false)
  const activeTime = useRef(0)

  useEffect(() => {
    const handleCollision = (event) => {
      if (!isPlaying || isPaused) return
      
      // Add score and activate bumper
      addScore(100)
      isActive.current = true
      activeTime.current = 0
    }

    api.addEventListener('collide', handleCollision)
    
    return () => {
      api.removeEventListener('collide', handleCollision)
    }
  }, [api, addScore, isPlaying, isPaused])

  useFrame((state) => {
    if (!meshRef.current) return

    if (isActive.current) {
      activeTime.current += state.clock.getDelta()
      
      // Animate bumper when active
      const scale = 1 + Math.sin(activeTime.current * 20) * 0.3
      meshRef.current.scale.set(scale, scale, scale)
      
      // Deactivate after animation
      if (activeTime.current > 0.3) {
        isActive.current = false
        meshRef.current.scale.set(1, 1, 1)
      }
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Main bumper */}
      <mesh castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={isActive.current ? "#ffd700" : "#e74c3c"}
          emissive={isActive.current ? "#ffd700" : "#000000"}
          emissiveIntensity={isActive.current ? 0.8 : 0}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Bumper base */}
      <mesh position={[0, -1.2, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.4]} />
        <meshStandardMaterial color="#2c2c54" />
      </mesh>
      
      {/* Bumper ring */}
      <mesh position={[0, -0.8, 0]} castShadow>
        <torusGeometry args={[1.2, 0.1, 16, 32]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      
      {/* Space lights around bumper */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 3) * 1.5,
          -0.5,
          Math.sin(i * Math.PI / 3) * 1.5
        ]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial 
            color={isActive.current ? "#ffd700" : "#4a90e2"}
            emissive={isActive.current ? "#ffd700" : "#4a90e2"}
            emissiveIntensity={isActive.current ? 1 : 0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

export default Bumper 