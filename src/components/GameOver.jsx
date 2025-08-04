import React from 'react'
import { useGameStore } from '../store/gameStore'

const GameOver = ({ onRestart }) => {
  const { score } = useGameStore()

  return (
    <div className="game-over">
      <h2>🎮 Game Over!</h2>
      <div style={{ fontSize: '20px', marginBottom: '20px' }}>
        Final Score: {score.toLocaleString()}
      </div>
      <button onClick={onRestart}>
        🎯 Play Again
      </button>
    </div>
  )
}

export default GameOver 