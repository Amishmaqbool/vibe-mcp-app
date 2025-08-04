import React from 'react'
import { useBox } from '@react-three/cannon'

const Wall = ({ position, args, color = "#34495e" }) => {
  const [ref] = useBox(() => ({
    mass: 0,
    position,
    args,
    material: { friction: 0.1, restitution: 0.5 }
  }))

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default Wall 