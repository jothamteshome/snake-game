/**
 * Returns a random integer between `min` and `max` (inclusive).
 *
 * @param min - The minimum integer value.
 * @param max - The maximum integer value.
 * @returns A random integer in the range [min, max].
 *
 * Example:
 * ```ts
 * randInt(1, 6); // simulates a dice roll (1–6)
 * randInt(6, 1); // also → 1 through 6
 * ```
 */
function randInt(min: number, max: number): number {
    if (min > max) {
        [min, max] = [max, min];
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export { randInt };