import { Food } from "./Food";
import { Snake } from "./Snake";
import { randInt } from "../utils/randInt";
import { Scoreboard } from "./Scoreboard";

/**
 * Main game engine for Snake.
 * Manages snake, food, score, win/lose conditions, and board state.
 */
export class Game {
    /** The snake instance. */
    private snake!: Snake;

    /** The food instance. */
    private food!: Food;

    /** Whether the game is over (lose condition). */
    private gameOver: boolean = false;

    /** Whether the game has been won (snake fills the board). */
    private gameWon: boolean = false;

    /** Scoreboard manager for current and high scores. */
    private scoreboard: Scoreboard;

    /** Size of the square board (width = height = boardSize). */
    readonly boardSize: number;


    /**
     * Creates a new game with a given board size.
     * @param boardSize The size of the board (NxN).
     */
    constructor(boardSize: number) {
        this.boardSize = boardSize;
        this.scoreboard = new Scoreboard();

        // Initialize a new snake and food object with random spawn locations
        this.initializeSnakeAndFood();
    }


    /**
     * Initializes a snake and food with randomized positions.
     */
    private initializeSnakeAndFood(): void {
        // Randomize start location for snake between { x: [2, boardSize-3], y: [2, boardSize-3] }
        const snakeStartLocation = { x: randInt(2, this.boardSize - 3), y: randInt(2, this.boardSize - 3) };

        // Randomize start direction for snake
        const directions: ("up" | "down" | "left" | "right")[] = ["up", "down", "left", "right"];
        const snakeStartDirection = directions[randInt(0, 3)];

        this.snake = new Snake(snakeStartLocation, snakeStartDirection);
        this.food = new Food();
        this.respawnFood();
    }


    /**
     * Updates the game state by moving the snake,
     * handling collisions, and checking win/loss conditions.
     */
    updateState(): void {
        this.snake.move();

        // Set game over if self-collision occurred on move
        if (this.snake.isSelfCollision()) {
            this.gameOver = true;
            return;
        }

        const head = this.snake.getHead();

        // Handle border collision
        if (head.x < 0 || head.x >= this.boardSize || head.y < 0 || head.y >= this.boardSize) {
            this.gameOver = true;
            return;
        }

        const foodLocation = this.food.getLocation();

        // Handle food
        if (head.x === foodLocation.x && head.y === foodLocation.y) {
            this.scoreboard.incrementScore();
            this.snake.grow();

            // Win condition
            if (this.snake.getBodyLength() === this.boardSize * this.boardSize) {
                this.gameWon = true;
                this.gameOver = true;
                return;
            }

            this.respawnFood();
        }
    }


    /**
     * Respawns food at a random empty location not occupied by the snake.
     */
    respawnFood(): void {
        let newLocation;
        do {
            newLocation = { x: randInt(0, this.boardSize - 1), y: randInt(0, this.boardSize - 1) };
        } while (this.snake.occupies(newLocation));
        this.food.setLocation(newLocation);
    }


    /** Get the food's location. */
    getFoodLocation(): {x: number, y: number} {
        return this.food.getLocation();
    }


    /** Change the snake's direction. */
    setSnakeDirection(direction: "up" | "down" | "left" | "right"): void {
        this.snake.setDirection(direction);
    }


    /** Get the snake's current direction. */
    getSnakeDirection(): "up" | "down" | "left" | "right" {
        return this.snake.getDirection();
    }


    /** Get a copy of the snake's body. */
    getSnakeBody(): { x: number; y: number }[] {
        return this.snake.getBody();
    }


    /** Returns true if the game was won. */
    isGameWon(): boolean {
        return this.gameWon;
    }


    /** Returns true if the game is over (lose or win). */
    isGameOver(): boolean {
        return this.gameOver;
    }


    /** Get the current score. */
    getCurrentScore(): number {
        return this.scoreboard.getScore();
    }


    /** Get the saved high score. */
    getHighScore(): number {
        return this.scoreboard.getHighScore();
    }


    /**
     * Resets the game state.
     * You may want to preserve the high score instead.
     */
    resetGame(): void {
        this.initializeSnakeAndFood();
        this.scoreboard = new Scoreboard();
        this.gameOver = false;
        this.gameWon = false;
    }
}