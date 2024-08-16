import { useEffect, useRef, useState } from 'react';
import './whack-a-mole.css';

const INITIAL_TIMER = 3;
// board
const BOARD = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];

export default function WhackAMole() {
	// state
	// keep track of score
	const [score, setScore] = useState(0);
	// keep track of time left in game
	const [timer, setTimer] = useState(INITIAL_TIMER);
	// isGameRunning
	const [isGameRunning, setIsGameRunning] = useState(false);
	// randomRow
	const [randomRow, setRandomRow] = useState(-1);
	// randomCol
	const [randomCol, setRandomCol] = useState(-1);

	// refs
	const internalTimerIdRef = useRef<number>();
	const internalRandomCellIdRef = useRef<number>();

	// useEffect and clean up
	useEffect(() => {
		return () => {
			clearInterval(internalTimerIdRef.current);
			clearInterval(internalRandomCellIdRef.current);
		};
	}, []);

	// handlers
	// start game
	const onStartGame = () => {
		setScore(0);
		setTimer(INITIAL_TIMER);
		setIsGameRunning(true);
		// -start interval
		internalTimerIdRef.current = setInterval(() => {
			// --decrease timer by 1s
			setTimer((prev) => {
				if (prev <= 0) {
					setIsGameRunning(false);
					setRandomRow(-1);
					setRandomCol(-1);
					clearInterval(internalTimerIdRef.current);
					clearInterval(internalRandomCellIdRef.current);
					return 0;
				}

				return prev - 1;
			});
		}, 1000);

		internalRandomCellIdRef.current = setInterval(() => {
			// --every second set a randomRow and randomCol
			setRandomRow(Math.floor(Math.random() * BOARD.length));
			setRandomCol(Math.floor(Math.random() * BOARD[0].length));
		}, 600);
	};

	// cell click
	const onCellClick = () => {
		// -on active cell click
		// --add 1 to score
		setScore((prev) => (prev += 1));
		// --set randomRow and randomCol to -1
		setRandomRow(-1);
		setRandomCol(-1);
	};

	// renders
	// timer
	// score
	// board
	// --each cell will have onclick and pointer-events
	// ---if current is active point-events: auto else none
	// ---if current cell set className to active
	// start button
	// gameover text with reset button

	return (
		<div className="wam">
			<div className="wam-timer">Time: {timer}</div>
			<div className="wam-score">Score: {score}</div>
			<div className="wam-board">
				{BOARD.map((row, rowId) => (
					<div key={rowId} className="wam-row">
						{row.map((cell, cellIdx) => {
							const isMole = randomRow === rowId && randomCol === cellIdx;

							return (
								<div
									key={cellIdx}
									style={{
										backgroundColor: isMole ? 'red' : '',
									}}
									className="wam-cell"
									onClick={isMole ? onCellClick : undefined}>
									{cell}
								</div>
							);
						})}
					</div>
				))}
			</div>
			{!isGameRunning && <button onClick={onStartGame}>Start</button>}
		</div>
	);
}
