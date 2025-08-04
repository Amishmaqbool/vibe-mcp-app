import { create } from 'zustand'

export const useGameStore = create((set, get) => ({
  // Game state
  score: 0,
  lives: 3,
  isGameOver: false,
  isPlaying: false,
  isPaused: false,
  
  // Ball state
  ballPosition: [0, 5, 0],
  ballVelocity: [0, 0, 0],
  
  // Flipper states
  leftFlipperActive: false,
  rightFlipperActive: false,
  
  // Game mechanics
  addScore: (points) => set((state) => ({ 
    score: state.score + points 
  })),
  
  loseLife: () => set((state) => {
    const newLives = state.lives - 1
    return {
      lives: newLives,
      isGameOver: newLives <= 0,
      isPlaying: newLives > 0
    }
  }),
  
  resetGame: () => set({
    score: 0,
    lives: 3,
    isGameOver: false,
    isPlaying: true,
    isPaused: false,
    ballPosition: [0, 5, 0],
    ballVelocity: [0, 0, 0]
  }),
  
  setBallPosition: (position) => set({ ballPosition: position }),
  setBallVelocity: (velocity) => set({ ballVelocity: velocity }),
  
  setLeftFlipper: (active) => set({ leftFlipperActive: active }),
  setRightFlipper: (active) => set({ rightFlipperActive: active }),
  
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  
  startGame: () => set({ isPlaying: true, isGameOver: false }),
  
  endGame: () => set({ isGameOver: true, isPlaying: false })
})) 