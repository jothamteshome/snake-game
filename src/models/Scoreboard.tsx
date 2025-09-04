/**
 * Manages the current score and persistent high score
 * for the Snake game.
 */
export class Scoreboard {
    /**
     * Current score of the ongoing game session.
     * @private
     */
    private score: number;

    /**
     * Highest score recorded across sessions.
     * Loaded from `localStorage` on creation.
     * @private
     */
    private highScore: number;


    /**
     * Initializes a new Scoreboard.
     * Starts the session score at 0, and loads
     * the stored high score from localStorage.
     */
    constructor() {
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('highScore') || "0");
    }


    /**
     * Gets the current game score.
     *
     * @returns {number} The current score.
     */
    getScore(): number {
        return this.score;
    }


    /**
     * Increments the current score by 1.
     * If the new score beats the high score,
     * updates and persists the high score.
     */
    incrementScore(): void {
        this.score += 1;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.setHighScore();
        }
    }

    /**
     * Gets the highest score achieved.
     *
     * @returns {number} The stored high score.
     */
    getHighScore(): number {
        return this.highScore;
    }


    /**
     * Saves the current high score to localStorage.
     * This ensures persistence across sessions.
     */
    private setHighScore(): void {
        localStorage.setItem('highScore', this.highScore.toString());
    }
}