import React, { useRef, useEffect } from 'react'
import { useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'

const Target = ({ position, color = "#4a90e2" }) => {
  const { addScore, isPlaying, isPaused } = useGameStore()
  const meshRef = useRef()
  const [ref, api] = useBox(() => ({
    mass: 0,
    position,
    args: [1, 0.5, 1],
    material: { friction: 0.1, restitution: 0.8 }
  }))

  const isActive = useRef(false)
  const activeTime = useRef(0)

  useEffect(() => {
    const handleCollision = (event) => {
      if (!isPlaying || isPaused) return
      
      // Add score for mission target
      addScore(250)
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
      
      // Animate target when hit
      const scale = 1 + Math.sin(activeTime.current * 15) * 0.2
      meshRef.current.scale.set(scale, scale, scale)
      
      // Deactivate after animation
      if (activeTime.current > 0.4) {
        isActive.current = false
        meshRef.current.scale.set(1, 1, 1)
      }
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Target base */}
      <mesh castShadow>
        <boxGeometry args={[1, 0.5, 1]} />
        <meshStandardMaterial 
          color={isActive.current ? "#ffd700" : color}
          emissive={isActive.current ? "#ffd700" : "#000000"}
          emissiveIntensity={isActive.current ? 0.8 : 0}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      
      {/* Target center */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial 
          color={isActive.current ? "#ffffff" : "#ffffff"}
          emissive={isActive.current ? "#ffffff" : "#000000"}
          emissiveIntensity={isActive.current ? 1 : 0}
        />
      </mesh>
      
      {/* Target ring */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <torusGeometry args={[0.4, 0.05, 16, 32]} />
        <meshStandardMaterial 
          color={isActive.current ? "#ffd700" : "#8b5cf6"}
          emissive={isActive.current ? "#ffd700" : "#000000"}
          emissiveIntensity={isActive.current ? 0.5 : 0}
        />
      </mesh>
    </group>
  )
}

export default Target 