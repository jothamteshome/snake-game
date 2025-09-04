/**
 * Represents the Snake entity in the game.
 * Handles movement, growth, direction, and self-collision.
 */
export class Snake {
    /** The list of snake body segments, starting with the head. */
    private body: { x: number, y: number}[];

    /** A set of occupied positions for O(1) collision checks. */
    private bodySet: Set<string>;

    /** The current movement direction of the snake. */
    private direction: "up" | "down" | "left" | "right";

    /** Whether the snake has collided with itself. */
    private selfCollision: boolean;

    /**
     * Initializes the snake at a given location and direction.
     * @param startLocation Initial head location.
     * @param startDirection Initial movement direction.
     */
    constructor(startLocation: { x: number, y: number }, startDirection: "up" | "down" | "left" | "right") {
        this.body = [startLocation];
        this.bodySet = new Set([this.coordToString(this.body[0])]);
        this.direction = startDirection;
        this.selfCollision = false;
    }

    /**
     * Converts a coordinate to a unique string key for storage in the Set.
     */
    private coordToString(p: {x: number, y: number}): string {
        return `${p.x},${p.y}`;
    }


    /**
     * Checks if the snake occupies a given position.
     */
    occupies(p: {x: number, y: number}): boolean {
        return this.bodySet.has(this.coordToString(p));
    }


    /**
     * Moves the snake one step in its current direction.
     * Removes the tail unless growing, and sets self-collision if necessary.
     */
    move(): void {
        const head = this.body[0];
        const newHead = { ...head };        

        // Update new head position based on direction
        switch (this.direction) {
            case "right": newHead.x += 1; break;
            case "left": newHead.x -= 1; break;
            case "up": newHead.y -= 1; break;
            case "down": newHead.y += 1; break;
        }

        // Remove old tail
        const tail = this.body.pop();
        if (tail) this.bodySet.delete(this.coordToString(tail));

        // Set self-collision and return
        if (this.occupies(newHead)) {
            this.selfCollision = true; 
            return;
        }

        // Add new head at front
        this.body.unshift(newHead);
        this.bodySet.add(this.coordToString(newHead));
    }


    /**
     * Grows the snake by duplicating the last segment.
     * Note: This only works correctly if called immediately after `move()`.
     */
    grow(): void {
        const tail = this.body[this.body.length - 1];
        const newTail = { ...tail };
        this.body.push(newTail);
        this.bodySet.add(this.coordToString(newTail));
    }


    /**
     * Sets the current movement direction.
     */
    setDirection(direction: "up" | "down" | "left" | "right"): void {
        this.direction = direction;
    }


    /**
     * Gets the current movement direction.
     */
    getDirection(): "up" | "down" | "left" | "right" {
        return this.direction;
    }


    /**
     * Gets the snake's head position.
     */
    getHead(): {x: number, y: number} {
        return this.body[0];
    }


    /**
     * Returns whether the snake has collided with itself.
     */
    isSelfCollision(): boolean {
        return this.selfCollision;
    }


    /**
     * Returns a copy of the snake's body segments.
     */
    getBody(): { x: number; y: number }[] {
        return this.body.map(segment => ({ ...segment }));
    }


    /**
     * Gets the current length of the snake.
     */
    getBodyLength(): number {
        return this.body.length;
    }
}