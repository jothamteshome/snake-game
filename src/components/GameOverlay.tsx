// GameOverlay.tsx
// Implements a game overlay using React.
// Handles per-status styling and on-click handling

interface GameOverlayProps {
    status: "start" | "won" | "lost";
    onAction: () => void;
}

interface GameOverlayButtonProps {
    text: string;
    color: "red" | "green" | "blue";
    onAction: () => void;
}

interface GameOverlayTitleProps {
    title: string;
    color: "red" | "green" | "blue";
}


/**
 * Game overlay button component
 * - Styles and displays a button styled in the given color
 * - Passes an action to the button's onClick handler
 */
function GameOverlayButton({ text, color, onAction }: GameOverlayButtonProps) {
    // Color mappings to tailwindCSS class
    // Required to avoid dynamic creation of tailwind classes
    const backgroundColorMap = {
        red: "bg-red-500",
        green: "bg-green-500",
        blue: "bg-blue-500"
    }

    const hoverColorMap = {
        red: "hover:bg-red-600",
        green: "hover:bg-green-600",
        blue: "hover:bg-blue-600"
    }

    
    return (
        <button className={`w-1/2 h-1/12 text-xs sm:text-sm md:text-base ${backgroundColorMap[color]} rounded ${hoverColorMap[color]}`} onClick={onAction}>
            {text}
        </button>
    );
}


/**
 * Game overlay title component
 * - Styles and displays a title styled in the given color
 */
function GameOverlayTitle({ title, color }: GameOverlayTitleProps) {
    // Color mappings to tailwindCSS class
    // Required to avoid dynamic creation of tailwind classes
    const textColorMap = {
        red: "text-red-500", 
        green: "text-green-500", 
        blue: "text-blue-500"
    }

    const outlineColorMap = {
        red: "outline-red-500", 
        green: "outline-green-500", 
        blue: "outline-blue-500"
    }

    return (
        <div className={`w-full h-1/2 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl ${textColorMap[color]} font-bold rounded outline-2 ${outlineColorMap[color]} bg-neutral-700`}>
            {title}
        </div>
    );
}


/**
 * Game overlay component
 * - Displays the game overlay component
 * - Handles different overly based on game status and button action
 */
function GameOverlay({ status, onAction }: GameOverlayProps) {
    let title: string = "";
    let buttonText: string = "";
    let statusColor: "red" | "green" | "blue";

    // Determine the title, button text, 
    // and status color based on game status
    switch(status) {
        case "start":
            title = "Snake Game";
            buttonText = "Start Game";
            statusColor = "blue";
            break;
        case "won":
            title = "You Win";
            buttonText = "Play Again";
            statusColor = "green";
            break;
        case "lost":
            title = "Game Over";
            buttonText = "Try Again";
            statusColor = "red";
            break;
    }

    return (
        <div className="absolute z-2 w-5/6 max-w-[80vw] h-5/6 flex flex-col justify-around items-center">
            <GameOverlayTitle title={title} color={statusColor}/>
            <GameOverlayButton text={buttonText} color={statusColor} onAction={onAction}/>
        </div>
    );
}

export { GameOverlay };