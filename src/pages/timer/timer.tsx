import { useCallback, useEffect, useRef, useState } from 'react';
import './timer.css';

export default function Timer() {
	// state hooks
	// isTimerStarted
	const [isTimerStarted, setIsTimerStarted] = useState(false);
	// isTimerRunning
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	// timer
	const [timer, setTimer] = useState(0);

	// ref hook
	// intervalIdRef
	const intervalIdRef = useRef<number>();
	// seconds duration
	const secondInputRef = useRef<HTMLInputElement>(null);
	// minutes duration
	const minuteInputRef = useRef<HTMLInputElement>(null);
	// hours duration
	const hourInputRef = useRef<HTMLInputElement>(null);

	// derived state
	const totalTime = useCallback(
		() => (Number(hourInputRef.current?.value) || 0) * 60 * 60 * 1000 + (Number(minuteInputRef.current?.value) || 0) * 60 * 1000 + (Number(secondInputRef.current?.value) || 0) * 1000,
		[]
	);

	// useEffect
	useEffect(() => {
		return () => {
			clearInterval(intervalIdRef.current);
		};
	}, []);

	useEffect(() => {
		if (timer === 0 && isTimerStarted) {
			clearInterval(intervalIdRef.current);
			setTimer(totalTime());
			setIsTimerRunning(false);
			setIsTimerStarted(false);
		}
	}, [isTimerStarted, timer, totalTime]);

	// button handlers
	// start handler
	const onStart = () => {
		if (!isTimerStarted) setTimer(totalTime());

		intervalIdRef.current = setInterval(() => {
			setTimer((prev) => Math.max(prev - 10, 0));
		}, 10);

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
		setTimer(totalTime());
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
					<input ref={hourInputRef} type="number" />
				</div>
				<div className="timer-input">
					<label>Minutes</label>
					<input ref={minuteInputRef} type="number" />
				</div>
				<div className="timer-input">
					<label>Seconds</label>
					<input ref={secondInputRef} type="number" />
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
