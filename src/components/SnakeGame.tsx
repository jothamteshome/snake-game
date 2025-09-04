// SnakeGame.tsx
// Implements a simple Snake game using React + Canvas.
// Handles game loop, rendering, and user input (arrow keys).

import { useEffect, useRef, useState } from "react";
import { Game } from "../models/Game";
import { ScoreboardDisplay } from "./ScoreboardDisplay";
import { GameOverlay } from "./GameOverlay";

const CELL_SIZE: number = 20;
const BOARD_SIZE: number = 40;
const FPS: number = 15;

/**
 * SnakeGame component
 * - Renders a canvas-based Snake game
 * - Handles game loop, input, and score display
 */
function SnakeGame() {
    // Initialize new canvas and game
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gameRef = useRef<Game>(new Game(BOARD_SIZE));

    // Initialize stateful elements for score
    const [currentScore, setCurrentScore] = useState(gameRef.current.getCurrentScore());
    const [highScore, setHighScore] = useState(gameRef.current.getHighScore());

    // Initialize stateful element for game status
    const [gameStatus, setGameStatus] = useState<"start" | "playing"| "won" | "lost">("start");

    // Initialize handlers to start and restart game
    const gameHandlers = {
        start: () => {
            setGameStatus("playing");
            startGame();
        },
        won: () => {
            gameRef.current.resetGame();
            setGameStatus("playing");
            startGame();
        },
        lost: () => {
            gameRef.current.resetGame();
            setGameStatus("playing");
            startGame();
        },
    };


    // Begins recursive loop handling the drawing and updating
    // of the game state at a given interval
    const startGame = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const game = gameRef.current;


        // Updates the canvas to show the position of the snake and food
        // at the current timestep
        function draw() {
            // Clear canvas
            ctx!.fillStyle = "black";
            ctx!.fillRect(0, 0, canvas!.width, canvas!.height);


            // Draw snake body
            ctx!.fillStyle = "limegreen";
            const snakeBody = game.getSnakeBody();
            for (let i = 0; i < snakeBody.length; i++) {
                const segment = snakeBody[i];
                const t = i / snakeBody.length;

                // Add slight gradient across the length of the snake
                // to make it easier to determine direction
                const r = 0;
                const g = Math.round(150 - t * 80);
                const b = Math.round(0 + t * 20);

                ctx!.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx!.fillRect(
                    segment.x * CELL_SIZE,
                    segment.y * CELL_SIZE,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }

            // Get food location
            const foodLocation = game.getFoodLocation();

            // Draw food
            ctx!.fillStyle = "red";
            ctx!.fillRect(
                foodLocation.x * CELL_SIZE,
                foodLocation.y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            );
        }


        // Create loop that runs the game
        const gameLoop = () => {
            // Update the game state
            game.updateState();

            // Update the game score based on game state
            setCurrentScore(game.getCurrentScore());
            setHighScore(game.getHighScore());

            // Check if game has ended in a win
            if (game.isGameWon()) {
                setGameStatus("won");
                return;
            }

            // Check if game has ended in a loss
            else if (game.isGameOver()) {
                setGameStatus("lost");
                return;
            }


            // Draw frame and re-call gameLoop once every 1/FPS seconds
            draw();
            setTimeout(gameLoop, 1000 / FPS);
        };

        // Start first game loop
        gameLoop();
    }


    // Initializes the keyboard arrow key interactions 
    // enabling the user to play the game
    useEffect(() => {
        // Do not take keyboard input if the game is not in a running state
        if (gameStatus !== "playing") return;

        const handleKey = (e: KeyboardEvent) => {
            const game = gameRef.current;
            switch (e.key) {
                case "ArrowUp": if (game.getSnakeDirection() !== "down") game.setSnakeDirection("up"); break;
                case "ArrowDown": if (game.getSnakeDirection() !== "up") game.setSnakeDirection("down"); break;
                case "ArrowLeft": if (game.getSnakeDirection() !== "right") game.setSnakeDirection("left"); break;
                case "ArrowRight": if (game.getSnakeDirection() !== "left") game.setSnakeDirection("right"); break;
            }
        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [gameStatus]);


    return (
        <div>
            {/** Renders the scoreboard with its current score displayed */}
            <ScoreboardDisplay currentScore={currentScore} highScore={highScore} />
            <div className="relative w-full max-w-[80vw] flex justify-center items-center">
                {/** Canvas that the game is being drawn on */}
                <canvas
                    className="rounded-[1em] outline-2 bg-black w-full max-w-[80vw] h-auto"
                    ref={canvasRef}
                    width={CELL_SIZE * BOARD_SIZE}
                    height={CELL_SIZE * BOARD_SIZE}
                />
                {/** Displays the game overlay if the game is not currently running */}
                { gameStatus !== "playing" && (
                    <GameOverlay 
                        status={gameStatus} 
                        onAction={gameHandlers[gameStatus]}
                    />
                )}
            </div>
        </div>

    );
}

export default SnakeGame;