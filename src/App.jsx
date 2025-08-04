import React, { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [gameState, setGameState] = useState({
    score: 0,
    lives: 3,
    level: 1,
    isPlaying: false,
    isGameOver: false,
    isLevelComplete: false
  })

  const [gameObjects, setGameObjects] = useState({
    paddle: { x: 350, y: 550, width: 100, height: 10 },
    ball: { x: 400, y: 540, radius: 5, dx: 3, dy: -3 },
    bricks: [],
    brickRows: 5,
    brickCols: 10,
    brickWidth: 70,
    brickHeight: 20,
    brickPadding: 5
  })

  // Initialize bricks for current level
  const initializeBricks = useCallback((level) => {
    const bricks = []
    const rows = Math.min(3 + level, 8) // More rows for higher levels
    const cols = 10
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        bricks.push({
          x: col * (gameObjects.brickWidth + gameObjects.brickPadding) + gameObjects.brickPadding,
          y: row * (gameObjects.brickHeight + gameObjects.brickPadding) + gameObjects.brickPadding + 50,
          width: gameObjects.brickWidth,
          height: gameObjects.brickHeight,
          visible: true,
          color: `hsl(${row * 30 + 180 + (level * 20)}, 70%, 60%)`,
          points: 10 + (level * 5) // More points for higher levels
        })
      }
    }
    return bricks
  }, [gameObjects.brickWidth, gameObjects.brickHeight, gameObjects.brickPadding])

  // Initialize bricks when level changes
  useEffect(() => {
    const bricks = initializeBricks(gameState.level)
    setGameObjects(prev => ({ ...prev, bricks }))
  }, [gameState.level, initializeBricks])

  // Draw game function
  const drawGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw paddle
    ctx.fillStyle = '#4a90e2'
    ctx.fillRect(gameObjects.paddle.x, gameObjects.paddle.y, gameObjects.paddle.width, gameObjects.paddle.height)
    
    // Draw ball
    ctx.beginPath()
    ctx.arc(gameObjects.ball.x, gameObjects.ball.y, gameObjects.ball.radius, 0, Math.PI * 2)
    ctx.fillStyle = '#ffd700'
    ctx.fill()
    ctx.closePath()
    
    // Draw bricks
    gameObjects.bricks.forEach(brick => {
      if (brick.visible) {
        ctx.fillStyle = brick.color
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 1
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height)
      }
    })
  }, [gameObjects])

  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameState.isPlaying || gameState.isGameOver) {
      // Still draw the game even when not playing
      drawGame()
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    
    // Update ball position
    const newBall = { ...gameObjects.ball }
    newBall.x += newBall.dx
    newBall.y += newBall.dy
    
    // Ball collision with walls
    if (newBall.x <= newBall.radius || newBall.x >= canvas.width - newBall.radius) {
      newBall.dx = -newBall.dx
    }
    if (newBall.y <= newBall.radius) {
      newBall.dy = -newBall.dy
    }
    
    // Ball collision with paddle
    const paddle = gameObjects.paddle
    if (newBall.y >= paddle.y - newBall.radius &&
        newBall.x >= paddle.x &&
        newBall.x <= paddle.x + paddle.width) {
      newBall.dy = -Math.abs(newBall.dy)
      // Adjust ball direction based on where it hits the paddle
      const hitPos = (newBall.x - paddle.x) / paddle.width
      newBall.dx = (hitPos - 0.5) * 6
    }
    
    // Ball falls below paddle
    if (newBall.y >= canvas.height) {
      setGameState(prev => ({
        ...prev,
        lives: prev.lives - 1,
        isPlaying: false
      }))
      if (gameState.lives <= 1) {
        setGameState(prev => ({ ...prev, isGameOver: true }))
      }
      return
    }
    
    // Ball collision with bricks
    const newBricks = gameObjects.bricks.map(brick => {
      if (!brick.visible) return brick
      
      if (newBall.x >= brick.x &&
          newBall.x <= brick.x + brick.width &&
          newBall.y >= brick.y &&
          newBall.y <= brick.y + brick.height) {
        newBall.dy = -newBall.dy
        setGameState(prev => ({ ...prev, score: prev.score + brick.points }))
        return { ...brick, visible: false }
      }
      return brick
    })
    
    // Check if all bricks are destroyed
    if (newBricks.every(brick => !brick.visible)) {
      setGameState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        isLevelComplete: true 
      }))
      return
    }
    
    // Update game objects - but preserve paddle position from controls
    const newGameObjects = {
      ...gameObjects,
      ball: newBall,
      bricks: newBricks
      // Don't update paddle here - let controls handle it
    }
    
    setGameObjects(newGameObjects)
    
    // Draw the updated game
    drawGame()
    
    // Continue animation loop
    animationRef.current = requestAnimationFrame(gameLoop)
  }, [gameObjects, gameState.isPlaying, gameState.isGameOver, drawGame])

  // Start game loop
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isGameOver) {
      animationRef.current = requestAnimationFrame(gameLoop)
    } else {
      // Draw static game when not playing
      drawGame()
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.isGameOver, gameLoop, drawGame])

  // Draw game when objects change (for static rendering)
  useEffect(() => {
    if (!gameState.isPlaying) {
      drawGame()
    }
  }, [gameObjects, gameState.isPlaying, drawGame])

  // Mouse movement handler
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    
    // Update paddle position
    setGameObjects(prev => ({
      ...prev,
      paddle: {
        ...prev.paddle,
        x: Math.max(0, Math.min(canvas.width - prev.paddle.width, mouseX - prev.paddle.width / 2))
      }
    }))
  }, [])

  // Keyboard controls
  const handleKeyDown = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const paddleSpeed = 50 // Increased from 20 to 50 for faster movement
    const currentPaddle = gameObjects.paddle
    
    switch(e.code) {
      case 'ArrowLeft':
        e.preventDefault()
        setGameObjects(prev => ({
          ...prev,
          paddle: {
            ...prev.paddle,
            x: Math.max(0, prev.paddle.x - paddleSpeed)
          }
        }))
        break
      case 'ArrowRight':
        e.preventDefault()
        setGameObjects(prev => ({
          ...prev,
          paddle: {
            ...prev.paddle,
            x: Math.min(canvas.width - prev.paddle.width, prev.paddle.x + paddleSpeed)
          }
        }))
        break
    }
  }, [gameObjects.paddle])

  // Mouse movement event listener
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    // Add mouse move listener
    canvas.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  // Keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const startGame = () => {
    setGameState(prev => ({ 
      ...prev, 
      isPlaying: true, 
      isGameOver: false, 
      isLevelComplete: false 
    }))
    setGameObjects(prev => ({
      ...prev,
      ball: { x: 400, y: 540, radius: 5, dx: 3, dy: -3 }
    }))
  }

  const nextLevel = () => {
    if (gameState.level < 5) {
      setGameState(prev => ({ 
        ...prev, 
        level: prev.level + 1, 
        isLevelComplete: false 
      }))
      setGameObjects(prev => ({
        ...prev,
        ball: { x: 400, y: 540, radius: 5, dx: 3, dy: -3 },
        paddle: { x: 350, y: 550, width: 100, height: 10 }
      }))
    } else {
      // Game completed
      alert(`Congratulations! You've completed all 5 levels! Final Score: ${gameState.score}`)
      resetGame()
    }
  }

  const resetGame = () => {
    setGameState({
      score: 0,
      lives: 3,
      level: 1,
      isPlaying: false,
      isGameOver: false,
      isLevelComplete: false
    })
    setGameObjects(prev => ({
      ...prev,
      ball: { x: 400, y: 540, radius: 5, dx: 3, dy: -3 },
      paddle: { x: 350, y: 550, width: 100, height: 10 }
    }))
  }

  return (
    <div className="App">
      <div className="game-container">
        <div className="game-info">
          <h1>🎮 Brick Breaker</h1>
          <div className="stats">
            <div>Score: {gameState.score}</div>
            <div>Level: {gameState.level}/5</div>
            <div>Lives: {'❤️'.repeat(gameState.lives)}</div>
          </div>
          {!gameState.isPlaying && !gameState.isGameOver && !gameState.isLevelComplete && (
            <button onClick={startGame} className="start-btn">
              Start Game
            </button>
          )}
          {gameState.isLevelComplete && (
            <div className="level-complete">
              <h2>Level {gameState.level} Complete!</h2>
              <p>Score: {gameState.score}</p>
              {gameState.level < 5 ? (
                <button onClick={nextLevel} className="next-btn">
                  Next Level
                </button>
              ) : (
                <button onClick={resetGame} className="reset-btn">
                  Play Again
                </button>
              )}
            </div>
          )}
          {gameState.isGameOver && (
            <div className="game-over">
              <h2>Game Over!</h2>
              <p>Final Score: {gameState.score}</p>
              <button onClick={resetGame} className="reset-btn">
                Play Again
              </button>
            </div>
          )}
        </div>
        
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="game-canvas"
        />
        
        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>Move your mouse over the game area OR use Left/Right arrow keys</li>
            <li>Break all the bricks to complete the level</li>
            <li>Don't let the ball fall below the paddle</li>
            <li>Complete all 5 levels to win!</li>
            <li>Higher levels have more bricks and points</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App 