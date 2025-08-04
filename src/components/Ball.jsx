import React, { useEffect, useRef } from 'react'
import { useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'

const Ball = () => {
  const { 
    ballPosition, 
    setBallPosition, 
    setBallVelocity, 
    loseLife,
    isPlaying,
    isPaused
  } = useGameStore()
  
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: ballPosition,
    args: [0.5],
    material: { friction: 0.1, restitution: 0.8 }
  }))

  const velocity = useRef([0, 0, 0])
  const position = useRef([0, 0, 0])

  useEffect(() => {
    api.velocity.subscribe((v) => {
      velocity.current = v
      setBallVelocity(v)
    })
    
    api.position.subscribe((p) => {
      position.current = p
      setBallPosition(p)
    })
  }, [api, setBallPosition, setBallVelocity])

  useFrame(() => {
    if (!isPlaying || isPaused) return
    
    // Check if ball fell below the table
    if (position.current[1] < -5) {
      loseLife()
      // Reset ball position
      api.position.set(0, 5, 0)
      api.velocity.set(0, 0, 0)
    }
  })

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color="#ffd700" 
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

export default Ball 