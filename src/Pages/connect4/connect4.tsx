import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import InsertRows from './components/insert-rows';
import Board from './components/board';
import GameOver from './components/game-over';

import { checkWinner, turn } from './utils/game-logic';
import { RED_COLOR, TIE, YELLOW_COLOR } from './utils/constants';
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
			const updatedBoard = turn(board, Number(e.currentTarget.id), isRedTurn);
			setBoard([...updatedBoard]);

			const winner = ++numberOfTurns.current > 6 ? checkWinner(board) : null;
			const isTieGame = board[0].every((value) => value.player !== null);

			if (winner) {
				setBoard([...winner.board]);
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
			<h1>Connect 4</h1>
			<InsertRows board={board} insertBtnColor={insertBtnColor} isGameOver={isGameOver} onColumnClick={handleColumnClick} />
			<Board board={board} />
			{isGameOver && <GameOver numberOfTurns={numberOfTurns.current} winningPlayer={winningPlayer} onResetClick={handleReset} />}
		</div>
	);
}
