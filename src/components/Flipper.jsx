import React, { useRef, useEffect } from 'react'
import { useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'

const Flipper = ({ position, rotation, isLeft }) => {
  const { leftFlipperActive, rightFlipperActive } = useGameStore()
  const isActive = isLeft ? leftFlipperActive : rightFlipperActive
  
  const [ref, api] = useBox(() => ({
    mass: 5,
    position,
    args: [2, 0.3, 0.5],
    material: { friction: 0.1, restitution: 0.5 }
  }))

  const meshRef = useRef()
  const targetRotation = useRef(0)
  const currentRotation = useRef(0)

  useEffect(() => {
    // Set initial rotation
    const baseRotation = isLeft ? -Math.PI / 4 : Math.PI / 4
    currentRotation.current = baseRotation
    targetRotation.current = baseRotation
  }, [isLeft])

  useFrame(() => {
    if (!meshRef.current) return

    // Update target rotation based on flipper state
    const baseRotation = isLeft ? -Math.PI / 4 : Math.PI / 4
    const activeRotation = isLeft ? Math.PI / 4 : -Math.PI / 4
    
    targetRotation.current = isActive ? activeRotation : baseRotation
    
    // Smooth rotation animation
    const rotationSpeed = 0.15
    currentRotation.current += (targetRotation.current - currentRotation.current) * rotationSpeed
    
    meshRef.current.rotation.z = currentRotation.current
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh castShadow>
        <boxGeometry args={[2, 0.3, 0.5]} />
        <meshStandardMaterial 
          color={isActive ? "#ff6b6b" : "#4ecdc4"}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Flipper base */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.4]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
    </group>
  )
}

export default Flipper 