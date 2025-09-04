// GameOverlay.tsx
// Implements a scoreboard using React.


/**
 * Score column component
 * - Styles and displays a column containing a score type and a score
 */
function ScoreColumn({ title, score}: { title: string, score: number}) {
    return (
        <div className="flex flex-col text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-normal">
                {title}
            </h1>
            <hr></hr>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {score}
            </h2>
        </div>
    );
}


/**
 * Scoreboard display component
 * - Styles and displays a Scoreboard element
 */
function ScoreboardDisplay({ currentScore, highScore }: { currentScore: number, highScore: number } ) {
    return (
        <div className="w-full max-w-[80vw] h-auto flex justify-around mb-8 rounded bg-black p-4 outline-2">
            <ScoreColumn title="Score" score={currentScore} />
            <ScoreColumn title="High Score" score={highScore} />
        </div>
    );
}

export { ScoreboardDisplay };