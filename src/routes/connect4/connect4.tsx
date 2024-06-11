import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { checkWinner } from './utils/game-logic';

import './connect4.css';

const RED = 'Red';
const YELLOW = 'Yellow';
const TIE = 'Tie';
const RED_COLOR = '#d23d32';
const YELLOW_COLOR = '#fae04c';
const TIE_COLOR = '#b4762f';

export type Player = typeof RED | typeof YELLOW | typeof TIE | null;

export type Board = {
	isWinningCell: boolean;
	player: Player;
};

type WinningCells = number[][];

export type Winner = {
	gameWinner: Player;
	winningCells: WinningCells;
};

export type Check = {
	count: number;
	winningCells: WinningCells;
};

const defaultCell: Board = {
	isWinningCell: false,
	player: null,
};

const defaultBoard = (): Board[][] => structuredClone(new Array(6).fill(null).map(() => new Array(7).fill(null).map(() => ({ ...defaultCell }))));

export default function Connect4() {
	const [board, setBoard] = useState<Board[][]>(defaultBoard());

	const isRedTurn = useRef<boolean>(true);
	const isGameOver = useRef<boolean>(false);
	const winningPlayer = useRef<Player>(null);
	const numberOfTurns = useRef<number>(0);

	const baseGameOverText = `player wins in ${Math.ceil(numberOfTurns.current / 2)} turns!!`;
	const gameOverText = winningPlayer.current === RED ? `${RED} ${baseGameOverText}` : winningPlayer.current === YELLOW ? `${YELLOW} ${baseGameOverText}` : 'Tie game!!';

	const insertNextEmptyCell = useCallback(
		(colIdx: number) => {
			for (let i = board.length - 1; i >= 0; i--) {
				const cell = board[i][colIdx].player;

				if (!cell) {
					board[i][colIdx].player = isRedTurn.current ? RED : YELLOW;
					setBoard([...board]);

					return;
				}
			}
		},
		[board]
	);

	const handleColumnClick: MouseEventHandler<HTMLButtonElement> = useCallback(
		(e) => {
			insertNextEmptyCell(Number(e.currentTarget.id));

			let winner = null;
			if (++numberOfTurns.current > 6) winner = checkWinner(board);

			const isTieGame = board[0].every((value) => value.player !== null);

			if (winner || isTieGame) isGameOver.current = true;

			if (winner) {
				winner.winningCells.forEach(([row, col]) => (board[row][col].isWinningCell = true));
				setBoard([...board]);

				winningPlayer.current = winner.gameWinner;
			} else if (isTieGame) {
				winningPlayer.current = TIE;
			} else {
				isRedTurn.current = !isRedTurn.current;
			}
		},
		[board, insertNextEmptyCell]
	);

	const handleReset = useCallback(() => {
		setBoard(defaultBoard());
		isGameOver.current = false;
		isRedTurn.current = true;
		winningPlayer.current = null;
		numberOfTurns.current = 0;
	}, []);

	const insertBtnColor = useCallback((colIdx: number) => (isGameOver.current || board[0][colIdx].player ? 'unset' : isRedTurn.current ? RED_COLOR : YELLOW_COLOR), [board]);

	return (
		<div className="connect-4">
			<h2>Connect4</h2>
			<div className="insert-row">
				{board[0].map((_, insertCellIdx) => (
					<button
						key={insertCellIdx}
						id={String(insertCellIdx)}
						style={{
							backgroundColor: insertBtnColor(insertCellIdx),
						}}
						disabled={isGameOver.current || !!board[0][insertCellIdx].player}
						onClick={handleColumnClick}
						className="insert-cell">
						<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
							<path d="M8 10l4 4 4-4" stroke="black" strokeWidth="2" fill="none" />
						</svg>
					</button>
				))}
			</div>
			<div className="c4-board">
				{board.map((row, rowIdx) => (
					<div key={rowIdx} id={String(rowIdx)} className="c4-row">
						{row.map((cell, colIdx) => (
							<div
								key={colIdx}
								id={String(colIdx)}
								className={`c4-cell ${cell.player === RED ? 'red-checker' : cell.player === YELLOW ? 'yellow-checker' : ''} ${cell.isWinningCell ? 'pulse' : ''}`.trim()}
							/>
						))}
					</div>
				))}
			</div>
			{/* see if you can clean up the to use less arrays for results */}
			{/* consolidted game functions */}
			{/* see if you can mess with the length - 1 */}
			{/* no work till after 3 moves */}
			{isGameOver.current && (
				<>
					<h2
						style={{
							color: winningPlayer.current === RED ? RED_COLOR : winningPlayer.current === YELLOW ? YELLOW_COLOR : TIE_COLOR,
						}}
						className="c4-game-msg">
						{gameOverText}
					</h2>
					<button onClick={handleReset}>Reset</button>
				</>
			)}
		</div>
	);
}
