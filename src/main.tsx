import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SnakeGame from './components/SnakeGame.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='min-w-screen min-h-screen flex items-center justify-center'>
      <SnakeGame />
    </div>
  </StrictMode>,
)
