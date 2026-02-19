import { useState, useEffect, useContext } from "react";
import { TaskContext } from "../../providers/TaskProvider";



function formatTime(seconds) {


    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const mm = mins < 10 ? "0" + mins : "" + mins;
    const ss = secs < 10 ? "0" + secs : "" + secs;

    return mm + ":" + ss;
}

export default function Timer({ taskId }) {
    const initialSeconds = 25 * 60 // 25 minutes is pomedro classic timer length

    const [timeLeft, setTimeLeft] = useState(() => {
        const savedLeftTime = localStorage.getItem(`timer_left_${taskId}`);
        return savedLeftTime ? Number(savedLeftTime) : initialSeconds;
    });

    const [isRunning, setIsRunning] = useState(false);
    const [last_started_at, setLastStartedAt] = useState(null)

    const { addStudyTime } = useContext(TaskContext);


    function start() {
        setIsRunning(true);
        setLastStartedAt(Date.now());
    }

    function pause() {
        setIsRunning(false);
        commitFocusedTime();
    }

    function reset() {
        setIsRunning(false);
        setTimeLeft(initialSeconds);

        setLastStartedAt(null);

        localStorage.removeItem(`timer_left_${taskId}`);


    };

    function commitFocusedTime() {
        if (!last_started_at) return;

        const now = Date.now();
        const diffSeconds = Math.floor((now - last_started_at) / 1000);


        if (diffSeconds > 0) {
            addStudyTime(taskId, diffSeconds);
        }

        setLastStartedAt(null);


    }


    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {

                    setIsRunning(false);
                    commitFocusedTime();

                    return 0;

                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);


    }, [isRunning]);

    useEffect(() => {
        localStorage.setItem(`timer_left_${taskId}`, String(timeLeft));
    }, [timeLeft]);


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

