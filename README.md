# Snake Game

A simple **Snake game** built with **React** and **TypeScript**. Includes scoring, high score tracking, and responsive controls.  

## Features

- Playable snake on a `40x40` grid.  
- Eat food to grow the snake.  
- Tracks current score and high score (saved in local storage).  
- Game over and victory conditions.  
- Directional snake head and subtle gradient body for visual clarity.  

## Installation

1. Clone the repository:  
```
git clone https://github.com/jothamteshome/snake-game.git
cd snake-game
```

2. Install dependencies:  
```
npm install
# or
yarn
```

3. Start the development server:  
```
npm run dev
# or
yarn dev
```

4. Open your browser at `http://localhost:5173` (Vite default).  

## Controls

- **Arrow keys**: Move the snake up, down, left, or right.  

## Project Structure

- `src/models` — Core game logic (Snake, Food, Scoreboard, Game class).  
- `src/components` — React components (SnakeGame, ScoreboardDisplay, GameOverlay).  
- `src/utils` — Utility functions (random integer generator, etc.).  

## Customization

- Change **board size** or **cell size** in `SnakeGame.tsx` via `BOARD_SIZE` and `CELL_SIZE`.  
- Adjust **snake colors** and gradient in the `draw()` function.  
