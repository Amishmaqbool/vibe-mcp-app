import React from 'react'
import { useGameStore } from '../store/gameStore'

const GameUI = () => {
  const { score, lives, isPlaying, isPaused, togglePause, startGame } = useGameStore()

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Title Section */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          margin: '0 0 5px 0',
          color: '#ffffff',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
        }}>
          3D Pinball
        </h1>
        <h2 style={{ 
          fontSize: '20px', 
          margin: '0',
          color: '#8b5cf6',
          fontStyle: 'italic'
        }}>
          Space Cadet
        </h2>
      </div>

      {/* Ball Counter */}
      <div style={{ 
        background: 'rgba(0,0,0,0.3)', 
        padding: '10px', 
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #4a4a4a'
      }}>
        <div style={{ fontSize: '16px', color: '#ffffff' }}>
          BALL {lives}
        </div>
      </div>

      {/* Score Display */}
      <div style={{ 
        background: 'rgba(0,0,0,0.3)', 
        padding: '15px', 
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #4a4a4a',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}>
          {score.toLocaleString()}
        </div>
      </div>

      {/* High Score Placeholders */}
      <div style={{ 
        background: 'rgba(0,0,0,0.3)', 
        padding: '10px', 
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #4a4a4a'
      }}>
        <div style={{ fontSize: '14px', color: '#cccccc', marginBottom: '5px' }}>
          HIGH SCORES
        </div>
        <div style={{ fontSize: '12px', color: '#888888' }}>
          1. 0
        </div>
        <div style={{ fontSize: '12px', color: '#888888' }}>
          2. 0
        </div>
      </div>

      {/* Game Controls */}
      <div style={{ marginTop: 'auto' }}>
        {!isPlaying && (
          <button 
            onClick={startGame}
            style={{
              background: 'linear-gradient(45deg, #4a90e2, #357abd)',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: 'white',
              width: '100%',
              marginBottom: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            START GAME
          </button>
        )}
        
        {isPlaying && (
          <button 
            onClick={togglePause}
            style={{
              background: isPaused ? 'linear-gradient(45deg, #4CAF50, #45a049)' : 'linear-gradient(45deg, #ff9800, #f57c00)',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: 'white',
              width: '100%',
              marginBottom: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {isPaused ? 'RESUME' : 'PAUSE'}
          </button>
        )}
        
        {/* Instructions */}
        <div style={{ 
          background: 'rgba(0,0,0,0.3)', 
          padding: '15px', 
          borderRadius: '5px',
          border: '1px solid #4a4a4a',
          fontSize: '12px',
          color: '#cccccc'
        }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
            CONTROLS:
          </div>
          <div style={{ marginBottom: '4px' }}>← → Arrow Keys: Flippers</div>
          <div style={{ marginBottom: '4px' }}>Spacebar: Launch Ball</div>
          <div style={{ marginBottom: '4px' }}>P: Pause Game</div>
          <div style={{ marginBottom: '8px' }}>Mouse: Rotate View</div>
          <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#8b5cf6' }}>
            Hit Mission Targets To Select Mission
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameUI 