/**
 * Represents a food item that the snake can eat.
 */
export class Food {
    /**
     * Current position of the food on the game board.
     * Stored as { x, y } coordinates.
     * @private
     */
    private location: { x: number, y: number};


    /**
     * Creates a new food instance at a default location (10, 10).
     * The location can later be updated when the food is eaten.
     */
    constructor() {
        this.location = {x: 10, y: 10};
    }


    /**
     * Returns the current location of the food.
     * A shallow copy is returned to prevent external mutation
     * of the internal state.
     *
     * @returns {{x: number, y: number}} The food's current position.
     */
    getLocation(): {x: number, y: number} {
        return { ...this.location };
    }


    /**
     * Updates the food’s location on the board.
     * Typically called after the snake eats the food,
     * so a new piece spawns at a different location.
     *
     * @param {{x: number, y: number}} newLocation - The new coordinates for the food.
     */
    setLocation(newLocation: {x: number, y: number}): void {
        this.location = newLocation;
    }

}