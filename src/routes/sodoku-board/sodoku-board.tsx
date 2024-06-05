import { ChangeEventHandler, useState } from 'react';
import './sodoku-board.css';

const defaultBoard: number[][] = Array.from(Array(9), () => new Array(9).fill(''));

export default function SodokuBoard() {
	const [board, setBoard] = useState<number[][]>(structuredClone(defaultBoard));
	const [gameMsg, setGameMsg] = useState<string | null>(null);

	const handleCellChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const target = e.target;

		const coordX = target.parentElement?.parentElement?.id;
		const coordY = target.parentElement?.id;
		const value = Number(target.value);

		if (coordX === undefined || coordY === undefined || value > 9) return;

		board[Number(coordX)][Number(coordY)] = value;

		setBoard((prevBoard) => {
			prevBoard[Number(coordX)][Number(coordY)] = value;

			return [...board];
		});
	};

	const handleSolveBtn = async () => {
		setGameMsg(null);

		const boardInString = board.reduce((boardString, row) => {
			const rowStr = row.reduce((rowString, cell) => (rowString += cell || '.'), '');
			return (boardString += rowStr);
		}, '');

		try {
			const response = await fetch('http://0.0.0.0:9090/http://127.0.0.1:5001', {
				body: JSON.stringify({
					sudoku: [boardInString],
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			if (!response.ok) throw 'There was an issue with the api.';

			const { data } = await response.json();
			const gameResults = data[0];
			const solution = gameResults?.solution as string;
			const message = gameResults?.message as string;
			const statue = gameResults?.status as string;

			if (statue === 'error') {
				setGameMsg(message);
				return;
			}

			const resultsBoard = structuredClone(defaultBoard);

			for (let rowIdx = 0; rowIdx < resultsBoard.length; rowIdx++) {
				const row = resultsBoard[rowIdx];
				for (let colIdx = 0; colIdx < row.length; colIdx++) {
					resultsBoard[rowIdx][colIdx] = Number(solution.charAt(rowIdx * row.length + colIdx));
				}
			}

			setBoard(resultsBoard);
		} catch (error) {
			console.error(error);
		}
	};

	const handleClearBtn = () => {
		setBoard(structuredClone(defaultBoard));
		setGameMsg(null);
	};

	return (
		<div className="app">
			<div className="board">
				{board.map((row, rowIdx) => (
					<div key={rowIdx} id={String(rowIdx)} className="row">
						{row.map((column, colIdx) => (
							<div key={colIdx} id={String(colIdx)} className="cell">
								<input type="number" value={column} onChange={handleCellChange} />
							</div>
						))}
					</div>
				))}
			</div>
			<div className="btn-container">
				<button className="solve-btn" onClick={handleSolveBtn}>
					Solve
				</button>
				<button className="clear-btn" onClick={handleClearBtn}>
					Clear
				</button>
			</div>
			{gameMsg && <div className="game-msg">{gameMsg}</div>}
		</div>
	);
}
