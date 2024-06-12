import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { checkWinner } from './utils/game-logic';
import InsertRows from './components/insert-rows';
import Board from './components/board';
import GameOver from './components/game-over';
import { RED, RED_COLOR, TIE, YELLOW, YELLOW_COLOR } from './utils/constants';
import { Board as BoardType, Player } from './utils/types';

import './connect4.css';

const defaultCell: BoardType = {
	isWinningCell: false,
	player: null,
};

const defaultBoard = (): BoardType[][] => new Array(6).fill(null).map(() => new Array(7).fill(null).map(() => ({ ...defaultCell })));

export default function Connect4() {
	const [board, setBoard] = useState<BoardType[][]>(defaultBoard());
	const [isRedTurn, setIsRedTurn] = useState<boolean>(true);
	const [isGameOver, setIsGameOver] = useState<boolean>(false);
	const [winningPlayer, setWinningPlayer] = useState<Player>(null);

	const numberOfTurns = useRef<number>(0);

	const handleColumnClick: MouseEventHandler<HTMLButtonElement> = useCallback(
		(e) => {
			const colIdx = Number(e.currentTarget.id);
			for (let i = board.length - 1; i >= 0; i--) {
				const cell = board[i][colIdx].player;

				if (!cell) {
					board[i][colIdx].player = isRedTurn ? RED : YELLOW;
					setBoard([...board]);

					break;
				}
			}

			let winner = null;
			if (++numberOfTurns.current > 6) winner = checkWinner(board);

			const isTieGame = board[0].every((value) => value.player !== null);

			if (winner) {
				winner.winningCells.forEach(([row, col]) => (board[row][col].isWinningCell = true));
				setBoard([...board]);
				setWinningPlayer(winner.gameWinner);
				setIsGameOver(() => true);
			} else if (isTieGame) {
				setWinningPlayer(TIE);
				setIsGameOver(() => true);
			} else {
				setIsRedTurn((prev) => !prev);
			}
		},
		[board, isRedTurn]
	);

	const handleReset = useCallback(() => {
		setBoard(defaultBoard());
		setIsRedTurn(() => true);
		setIsGameOver(() => false);
		setWinningPlayer(() => null);
		numberOfTurns.current = 0;
	}, []);

	const insertBtnColor = useCallback((colIdx: number) => (isGameOver || board[0][colIdx].player ? 'unset' : isRedTurn ? RED_COLOR : YELLOW_COLOR), [board, isGameOver, isRedTurn]);

	return (
		<div className="connect-4">
			<h2>Connect4</h2>
			<InsertRows board={board} insertBtnColor={insertBtnColor} isGameOver={isGameOver} onColumnClick={handleColumnClick} />
			<Board board={board} />
			{/* see if you can clean up the to use less arrays for results */}
			{/* consolidted game functions */}
			{/* see if you can mess with the length - 1 */}
			{/* no work till after 3 moves */}
			{isGameOver && <GameOver numberOfTurns={numberOfTurns.current} winningPlayer={winningPlayer} onResetClick={handleReset} />}
		</div>
	);
}
