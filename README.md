# 🎯 3D Pinball Game

A modern 3D pinball game built with React, Three.js, and React Three Fiber, inspired by the classic Windows 3D Pinball game.

## 🚀 Features

- **Realistic 3D Physics**: Powered by React Three Cannon for accurate ball physics
- **Interactive Flippers**: Control with arrow keys for authentic pinball action
- **Scoring System**: Hit bumpers to earn points and track your score
- **Multiple Lives**: Classic 3-life system with visual heart indicators
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Responsive Controls**: Keyboard controls for flippers, plunger, and game management

## 🎮 Controls

- **Left/Right Arrow Keys**: Control the flippers
- **Spacebar**: Launch the ball (hold to charge, release to launch)
- **P Key**: Pause/Resume the game
- **Mouse**: Orbit camera around the table (drag to rotate, scroll to zoom)

## 🛠️ Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

## 🎯 Gameplay

1. **Start the Game**: Click "Start Game" to begin
2. **Launch the Ball**: Press and hold Spacebar, then release to launch with power
3. **Control Flippers**: Use Left/Right arrow keys to activate flippers
4. **Score Points**: Hit bumpers to earn points (100 points each)
5. **Avoid Drain**: Keep the ball from falling through the drain at the bottom
6. **Manage Lives**: You have 3 lives - use them wisely!

## 🏆 Scoring System

- **Bumper Hits**: 100 points each
- **Flipper Saves**: No direct points, but saves your ball
- **Multiplier**: Chain hits for potential bonus points

## 🎨 Technical Stack

- **React 18**: Modern React with hooks
- **Three.js**: 3D graphics and rendering
- **React Three Fiber**: React renderer for Three.js
- **React Three Cannon**: Physics engine for realistic ball movement
- **Zustand**: State management for game logic
- **Framer Motion**: Smooth animations and transitions
- **Vite**: Fast development and build tool

## 🎨 Visual Features

- **Realistic Materials**: Metal flippers, glowing bumpers, and reflective ball
- **Dynamic Lighting**: Ambient and directional lighting with shadows
- **Smooth Animations**: Flipper movement, bumper activation, and ball physics
- **Modern UI**: Glassmorphism design with blur effects and gradients

## 🔧 Customization

The game is built with modular components, making it easy to customize:

- **Add New Bumpers**: Modify the `PinballTable.jsx` component
- **Change Physics**: Adjust material properties in individual components
- **Modify Scoring**: Update the scoring logic in the game store
- **Add Sound Effects**: Integrate audio for enhanced gameplay

## 🐛 Known Issues

- Ball physics may occasionally behave unexpectedly at high speeds
- Camera controls are limited to prevent disorientation
- Mobile support is limited (desktop recommended)

## 📝 License

MIT License - feel free to use and modify as needed!

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Enjoy the game! 🎮✨** 