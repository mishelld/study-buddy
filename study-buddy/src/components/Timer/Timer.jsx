import { useState, useEffect } from "react";



function formatTime(seconds) {


    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const mm = mins < 10 ? "0" + mins : "" + mins;
    const ss = secs < 10 ? "0" + secs : "" + secs;

    return mm + ":" + ss;
}

export default function Timer() {
    const initialSeconds = 25 * 60 // 25 minutes is pomedro classic timer length

    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    function start() {
        setIsRunning(true);
    }

    function pause() {
        setIsRunning(false);
    }

    function reset() {
        setIsRunning(false);
        setTimeLeft(initialSeconds);
    };


    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) return 0;
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRunning]);

    return (
        <div>
            <p style={{ fontWeight: "bold", fontSize: 24 }}>
                {formatTime(timeLeft)}
            </p>
            <div>
                <button onClick={start} disabled={isRunning || timeLeft === 0}>
                    Start
                </button>
                <button onClick={pause} disabled={!isRunning}>
                    Pause
                </button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

