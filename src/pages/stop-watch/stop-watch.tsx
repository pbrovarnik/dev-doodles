import { useState, useRef, useEffect } from 'react';
import './stop-watch.css';

type Lap = { time: string; name: string };

export default function StopWatch() {
	// state hook
	// timer: number
	// isTimerRunning: boolean
	// laps: { time: number, name: string }[]
	const [timer, setTimer] = useState(0);
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [laps, setLaps] = useState<Lap[]>([]);

	// ref hook
	// add a intervalIdRef
	const intervalIdRef = useRef<number>();

	// clean up the interval in useEffect if leaving the component
	useEffect(() => {
		return () => {
			clearInterval(intervalIdRef.current);
		};
	}, []);

	// onStartTimer function
	const onStartTimer = () => {
		// -start the interval to increment the timer state
		intervalIdRef.current = setInterval(() => {
			setTimer((prev) => prev + 10);
		}, 10);
		// -set isTimerRunning state to true
		setIsTimerRunning(true);
	};

	// onStopTimer function
	const onStopTimer = () => {
		// -clear interval to stop timer state from incrementing
		clearInterval(intervalIdRef.current);
		intervalIdRef.current = undefined;
		// -set isTimerRunning state to false
		setIsTimerRunning(false);
	};

	// onResetTimer function
	const onResetTimer = () => {
		// -set timer state to 0
		setTimer(0);
		// -set laps to []
		setLaps([]);
	};

	// onAddLap function
	const onAddLap = () => {
		// -push new lap to laps[] --> { time: timer, name: laps.length + 1 }
		setLaps((prev) => [...prev, { time: formatTime(timer), name: `Lap ${String((laps?.length ?? 0) + 1)}` }]);
	};

	// const getTime = (milli: number) => {
	// 	const time = new Date(milli);
	// 	const hours = time.getUTCHours();
	// 	const minutes = time.getMinutes();
	// 	const seconds = time.getSeconds();
	// 	const milliseconds = time.getMilliseconds();
	// 	return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
	// };

	const setPad = (time: number, maxLength: number = 2) => time.toString().padStart(maxLength, '0');

	const formatTime = (time: number) => {
		const hours = Math.floor((time / (60 * 60 * 1000)) % (60 * 60));
		const minutes = Math.floor((timer / (60 * 1000)) % 60);
		const seconds = Math.floor((timer / 1000) % 60);
		const milliseconds = timer % 1000;

		return `${setPad(hours)}:${setPad(minutes)}:${setPad(seconds)}.${setPad(milliseconds, 3).slice(0, -1)}`;
	};

	// In the render
	// timer as 00:00.00
	// buttons starting, stoping, reseting, lap based on appropriate state
	// List of laps if laps array is not empty

	return (
		<div className="stop-watch">
			<div className="timer-container">{formatTime(timer)}</div>
			<div className="stop-watch-btn-container">
				{isTimerRunning ? <button onClick={onStopTimer}>Stop</button> : <button onClick={onStartTimer}>Start</button>}
				{isTimerRunning ? <button onClick={onAddLap}>Lap</button> : <button onClick={onResetTimer}>Reset</button>}
			</div>
			<div className="laps">
				{laps.map((lap, idx) => (
					<div key={idx}>
						<div className="lap">
							<div>{lap.name}</div>
							<div>{lap.time}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
