import React from 'react'
import { useBox } from '@react-three/cannon'

const Ramp = ({ position, rotation = [0, 0, 0] }) => {
  const [ref] = useBox(() => ({
    mass: 0,
    position,
    rotation,
    args: [3, 0.2, 6],
    material: { friction: 0.1, restitution: 0.7 }
  }))

  return (
    <group position={position} rotation={rotation}>
      {/* Ramp surface */}
      <mesh ref={ref} castShadow receiveShadow>
        <boxGeometry args={[3, 0.2, 6]} />
        <meshStandardMaterial 
          color="#4a4a4a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Ramp sides */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[3.2, 0.4, 0.2]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      
      {/* Ramp end wall */}
      <mesh position={[0, 0.1, 3]} castShadow>
        <boxGeometry args={[3.2, 0.4, 0.2]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      
      {/* Ramp start wall */}
      <mesh position={[0, 0.1, -3]} castShadow>
        <boxGeometry args={[3.2, 0.4, 0.2]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      
      {/* Ramp lights */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[2.8, 0.05, 5.8]} />
        <meshStandardMaterial 
          color="#4a90e2"
          emissive="#4a90e2"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

export default Ramp 