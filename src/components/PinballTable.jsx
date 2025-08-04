import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { usePlane, useBox, useSphere } from '@react-three/cannon'
import { useGameStore } from '../store/gameStore'
import Ball from './Ball'
import Flipper from './Flipper'
import Bumper from './Bumper'
import Wall from './Wall'
import Plunger from './Plunger'

const PinballTable = () => {
  const { 
    isPlaying, 
    isPaused, 
    setLeftFlipper, 
    setRightFlipper,
    addScore,
    loseLife
  } = useGameStore()

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || isPaused) return
      
      switch(e.code) {
        case 'ArrowLeft':
          setLeftFlipper(true)
          break
        case 'ArrowRight':
          setRightFlipper(true)
          break
        case 'Space':
          // Ball launch handled in Plunger component
          break
        case 'KeyP':
          // Pause handled in GameUI
          break
      }
    }

    const handleKeyUp = (e) => {
      if (!isPlaying || isPaused) return
      
      switch(e.code) {
        case 'ArrowLeft':
          setLeftFlipper(false)
          break
        case 'ArrowRight':
          setRightFlipper(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isPlaying, isPaused, setLeftFlipper, setRightFlipper])

  return (
    <>
      {/* Table base with space theme */}
      <Wall position={[0, 0, 0]} args={[20, 0.5, 30]} color="#1a1a2e" />
      
      {/* Side walls */}
      <Wall position={[-10, 2, 0]} args={[0.5, 4, 30]} color="#2c2c54" />
      <Wall position={[10, 2, 0]} args={[0.5, 4, 30]} color="#2c2c54" />
      
      {/* Back wall */}
      <Wall position={[0, 2, 15]} args={[20, 4, 0.5]} color="#2c2c54" />
      
      {/* Front wall (with gap for ball drain) */}
      <Wall position={[-8, 2, -15]} args={[4, 4, 0.5]} color="#2c2c54" />
      <Wall position={[8, 2, -15]} args={[4, 4, 0.5]} color="#2c2c54" />
      
      {/* Ball drain area */}
      <Wall position={[0, 0, -15]} args={[8, 0.1, 0.5]} color="#e74c3c" />
      
      {/* Flippers */}
      <Flipper 
        position={[-3, 0.5, -8]} 
        rotation={[0, 0, 0]}
        isLeft={true}
      />
      <Flipper 
        position={[3, 0.5, -8]} 
        rotation={[0, 0, 0]}
        isLeft={false}
      />
      
      {/* Main Bumpers */}
      <Bumper position={[-5, 1, 5]} />
      <Bumper position={[5, 1, 5]} />
      <Bumper position={[0, 1, 8]} />
      <Bumper position={[-3, 1, 2]} />
      <Bumper position={[3, 1, 2]} />
      
      {/* Additional Space Bumpers */}
      <Bumper position={[-7, 1, 3]} />
      <Bumper position={[7, 1, 3]} />
      <Bumper position={[-2, 1, 6]} />
      <Bumper position={[2, 1, 6]} />
      
      {/* Mission Targets (simplified as bumpers for now) */}
      <Bumper position={[-6, 1, 8]} />
      <Bumper position={[6, 1, 8]} />
      <Bumper position={[0, 1, 12]} />
      <Bumper position={[-4, 1, 10]} />
      <Bumper position={[4, 1, 10]} />
      
      {/* Plunger */}
      <Plunger position={[0, 0.5, -12]} />
      
      {/* Ball */}
      <Ball />
      
      {/* Space-themed decorative elements */}
      <mesh position={[0, 0.3, 0]} receiveShadow>
        <planeGeometry args={[18, 28]} />
        <meshStandardMaterial color="#0f0f23" transparent opacity={0.9} />
      </mesh>
      
      {/* Stars background effect */}
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 16,
          0.4,
          (Math.random() - 0.5) * 26
        ]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </>
  )
}

export default PinballTable 