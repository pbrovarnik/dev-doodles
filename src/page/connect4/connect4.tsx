import { ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import Board from './components/board';
import GameOver from './components/game-over';
import InsertRows from './components/insert-rows';
import { TIE, RED_COLOR, YELLOW_COLOR, YELLOW, RED } from './utils/constants';
import { Board as BoardType, Player } from './utils/types';
import { bestMove, checkWinner, dropCoin } from './utils/game-logic';
import Header from './components/header';

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
	const [winningPlayer, setWinningPlayer] = useState<Player | null>(null);
	const [isAiPlaying, setIsAiPlaying] = useState<boolean>(false);

	const numberOfTurns = useRef<number>(0);
	const isAiFirstRef = useRef<boolean>(false);

	const turn = useCallback(
		(colId: number) => {
			const updatedBoard = dropCoin(board, isRedTurn ? RED : YELLOW, colId).board;
			setBoard([...updatedBoard]);

			const winner = ++numberOfTurns.current > 6 ? checkWinner(board) : null;

			if (winner?.gameWinner === TIE) {
				setWinningPlayer(TIE);
				setIsGameOver(() => true);
			} else if (winner) {
				setBoard([...winner.board]);
				setWinningPlayer(winner.gameWinner);
				setIsGameOver(() => true);
			} else {
				setIsRedTurn((prev) => !prev);
			}
		},
		[board, isRedTurn]
	);

	useEffect(() => {
		if (isAiPlaying && !isRedTurn && !isGameOver) {
			setTimeout(() => {
				const coords = bestMove(structuredClone(board));
				if (coords) turn(coords[1]);
			}, 500);
		}
	}, [board, isAiPlaying, isGameOver, isRedTurn, turn]);

	const handleReset = useCallback(() => {
		setBoard(defaultBoard());
		setIsRedTurn(() => !isAiFirstRef.current);
		setIsGameOver(() => false);
		setWinningPlayer(() => null);
		numberOfTurns.current = 0;
	}, []);

	const handleColumnClick: MouseEventHandler<HTMLButtonElement> = (e) => turn(Number(e.currentTarget.id));

	const insertBtnColor = useCallback((colIdx: number) => (isGameOver || board[0][colIdx].player ? 'unset' : isRedTurn ? RED_COLOR : YELLOW_COLOR), [board, isGameOver, isRedTurn]);

	const handleAiSwitchChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		setIsAiPlaying(() => currentTarget.checked);
		handleReset();
	};

	const handleAiStartSwitchChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		isAiFirstRef.current = currentTarget.checked;
		handleReset();
	};

	return (
		<div className="connect-4">
			<Header onAiSwitchChange={handleAiSwitchChange} onAiStartSwitchChange={handleAiStartSwitchChange} isAiPlaying={isAiPlaying} />
			<InsertRows board={board} insertBtnColor={insertBtnColor} isDisabled={isAiPlaying && !isRedTurn} isGameOver={isGameOver} onColumnClick={handleColumnClick} />
			<Board board={board} />
			{isGameOver && <GameOver numberOfTurns={numberOfTurns.current} winningPlayer={winningPlayer} onResetClick={handleReset} />}
		</div>
	);
}
