import { useEffect, useRef, useState } from 'react';
import './timer.css';

export default function Timer() {
	// state hooks
	// isTimerStarted
	const [isTimerStarted, setIsTimerStarted] = useState(false);
	// isTimerRunning
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	// timer
	const [timer, setTimer] = useState(0);
	// hours duration
	const [hoursDuration, setHoursDuration] = useState(0);
	// minutes duration
	const [minutesDuration, setMinutesDuration] = useState(0);
	// seconds duration
	const [secondsDuration, setSecondsDuration] = useState(0);

	const totalTime = hoursDuration * 60 * 60 * 1000 + minutesDuration * 60 * 1000 + secondsDuration * 1000;

	// ref hook
	// intervalIdRef
	const intervalIdRef = useRef<number>();

	// useEffect cleanup
	useEffect(() => {
		if (timer === 0 && isTimerStarted) {
			clearInterval(intervalIdRef.current);
			setTimer(totalTime);
			setIsTimerRunning(false);
			setIsTimerStarted(false);
		}
	}, [isTimerStarted, timer, totalTime]);

	useEffect(() => {
		return () => {
			clearInterval(intervalIdRef.current);
		};
	}, []);

	// button handlers
	// start handler
	const onStart = () => {
		if (!isTimerStarted) setTimer(totalTime);

		intervalIdRef.current = setInterval(() => {
			setTimer((prev) => Math.max(prev - 10, 0));
		});
		setIsTimerStarted(true);
		setIsTimerRunning(true);
	};

	// pause handler
	const onPause = () => {
		clearInterval(intervalIdRef.current);
		setIsTimerRunning(false);
	};

	// cancel handler
	const onCancel = () => {
		clearInterval(intervalIdRef.current);
		setTimer(totalTime);
		setIsTimerStarted(false);
		setIsTimerRunning(false);
	};

	// time formatter
	const setPad = (timer: number, maxLength: number = 2) => timer.toString().padStart(maxLength, '0');

	const formatTime = (timer: number) => {
		const hours = Math.floor(timer / (60 * 60 * 1000)) % (60 * 60);
		const minutes = Math.floor(timer / (60 * 1000)) % 60;
		const seconds = Math.floor(timer / 1000) % 60;
		const milliseconds = timer % 1000;

		return `${setPad(hours)}:${setPad(minutes)}:${setPad(seconds)}.${setPad(milliseconds, 3).slice(0, -1)}`;
	};

	// renders
	// <input /> for hours, minutes, seconds
	// display timer
	// <button /> for start, pause, cancel
	return (
		<div className="timer">
			<div className="timer-inputs">
				<div className="timer-input">
					<label>Hours</label>
					<input type="number" onChange={(e) => setHoursDuration(Number(e.target.value))} value={hoursDuration} />
				</div>
				<div className="timer-input">
					<label>Minutes</label>
					<input type="number" onChange={(e) => setMinutesDuration(Number(e.target.value))} value={minutesDuration} />
				</div>
				<div className="timer-input">
					<label>Seconds</label>
					<input type="number" onChange={(e) => setSecondsDuration(Number(e.target.value))} value={secondsDuration} />
				</div>
			</div>
			<div className="time">{formatTime(timer)}</div>
			<div className="timer-btns">
				{isTimerRunning ? <button onClick={onPause}>Pause</button> : <button onClick={onStart}>Start</button>}
				<button disabled={!isTimerStarted} onClick={onCancel}>
					Cancel
				</button>
			</div>
		</div>
	);
}
