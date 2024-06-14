import { useState, useRef, useEffect } from 'react';
import './stop-watch.css';

export default function StopWatch() {
	const timeInterval = useRef<number>();

	useEffect(() => {
		return () => {
			clearInterval(timeInterval.current);
		};
	}, []);

	const [timer, setTimer] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [laps, setLaps] = useState<number[]>([]);

	const handleStopStart = () => {
		if (isRunning) {
			setIsRunning((prev) => !prev);
			clearInterval(timeInterval.current);
		} else {
			setIsRunning((prev) => !prev);
			timeInterval.current = setInterval(() => {
				setTimer((prev) => prev + 1);
			}, 10);
		}
	};

	const handleLapReset = () => {
		if (isRunning) {
			setLaps((prev) => [...prev, timer]);
		} else {
			setIsRunning((prev) => !prev);
			setTimer(0);
			setLaps([]);
			clearInterval(timeInterval.current);
		}
	};

	const formatTime = (timer: number) => {
		const minutes = Math.floor((timer % 360000) / 6000)
			.toString()
			.padStart(2, '0');
		const seconds = Math.floor((timer % 6000) / 100)
			.toString()
			.padStart(2, '0');
		const milliseconds = (timer % 100).toString().padStart(2, '0');

		return `${minutes}:${seconds}.${milliseconds}`;
	};

	return (
		<div className="stop-watch">
			<div className="timer-container">{formatTime(timer)}</div>
			<div className="stop-watch-btn-container">
				<button onClick={handleLapReset} disabled={!isRunning && timer === 0}>
					{isRunning || timer === 0 ? 'Lap' : 'Reset'}
				</button>
				<button onClick={handleStopStart}>{isRunning ? 'Stop' : 'Start'}</button>
			</div>
			<div className="laps">
				{laps.map((lap, idx) => (
					<div key={lap}>
						<div className="lap">
							<div>Lap {idx + 1}</div>
							<div>{formatTime(lap)}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
