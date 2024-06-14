import { ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import Board from './components/board';
import { BoardType, Player } from './utils/types';
import GameOver from './components/game-over';
import { PLAYER_O, PLAYER_X, TIE } from './utils/constants';
import { checkWinner } from './utils/game-logic';
import Header from './components/header';
import { bestMove } from './utils/mini-max';

import './tic-tac-toe.css';

const defaultBoard = (): BoardType[][] => new Array(3).fill(null).map(() => new Array(3).fill(null).map(() => null));

export default function TicTacToe() {
	const [board, setBoard] = useState<BoardType[][]>(defaultBoard());
	const [isGameOver, setIsGameOver] = useState<boolean>(false);
	const [isXTurn, setIsXTurn] = useState<boolean>(true);
	const [winningPlayer, setWinningPlayer] = useState<Player | null>(null);
	const [isAiPlaying, setIsAiPlaying] = useState<boolean>(false);

	const boardRef = useRef<HTMLDivElement>(null);
	const isAiFirstRef = useRef<boolean>(false);

	const turn = useCallback(
		(rowId: number, colId: number) => {
			(boardRef.current?.children[rowId]?.children[colId]?.children[0] as HTMLButtonElement).disabled = true;
			board[rowId][colId] = isXTurn ? PLAYER_X : PLAYER_O;
			setBoard([...board]);
			setIsXTurn((prev) => !prev);
		},
		[board, isXTurn]
	);

	const checkWin = useCallback(() => {
		const winner = checkWinner(board);

		if (winner?.player === 'Tie') {
			setWinningPlayer(TIE);
			setIsGameOver(() => true);
		} else if (winner) {
			winner.winningCells.forEach(([rowId, colId]) => {
				const cell = boardRef.current?.children[rowId]?.children[colId]?.children[0] as HTMLButtonElement;
				cell?.classList.add('pulse');
			});

			setDisabledOnBoard(true);
			setIsGameOver(() => true);
			setWinningPlayer(winner.player);
		}
	}, [board]);

	useEffect(() => {
		if (isAiPlaying && !isXTurn) {
			const aiMove = bestMove(structuredClone(board));
			if (aiMove) {
				const [rowId, colId] = aiMove;
				turn(rowId, colId);
				checkWin();
			}
		}
	}, [board, checkWin, isAiPlaying, isXTurn, turn]);

	const handleCellClick: MouseEventHandler<HTMLButtonElement> = useCallback(
		({ currentTarget }) => {
			currentTarget.disabled = true;
			const parentElm = currentTarget.parentElement;
			const rowId = Number(parentElm?.parentElement?.id);
			const colId = Number(parentElm?.id);

			turn(rowId, colId);
			checkWin();
		},
		[checkWin, turn]
	);

	const clearDisabledAndPulse = () => {
		// clear pulse className
		if (boardRef.current?.children?.length) {
			for (let rowId = 0; rowId < boardRef.current?.children?.length; rowId++) {
				const rows = boardRef.current?.children[rowId]?.children;
				for (let colId = 0; colId < rows.length; colId++) {
					const cell = rows[colId]?.children[0] as HTMLButtonElement;
					cell?.classList.remove('pulse');
					cell.disabled = false;
				}
			}
		}
	};

	const setDisabledOnBoard = (isDisabled: boolean) => {
		// clear pulse className
		if (boardRef.current?.children?.length) {
			for (let rowId = 0; rowId < boardRef.current?.children?.length; rowId++) {
				const rows = boardRef.current?.children[rowId]?.children;
				for (let colId = 0; colId < rows.length; colId++) {
					const cell = rows[colId]?.children[0] as HTMLButtonElement;
					cell.disabled = isDisabled;
				}
			}
		}
	};

	const handleReset = () => {
		setBoard(defaultBoard());
		setIsGameOver(() => false);
		setWinningPlayer(() => null);
		setIsXTurn(() => !isAiFirstRef.current);
		clearDisabledAndPulse();
	};

	const handleAiSwitchChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		setIsAiPlaying(() => currentTarget.checked);
		handleReset();
	};

	const handleAiStartSwitchChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		isAiFirstRef.current = currentTarget.checked;
		handleReset();
	};

	return (
		<div className="ttt">
			<Header onAiSwitchChange={handleAiSwitchChange} onAiStartSwitchChange={handleAiStartSwitchChange} isAiPlaying={isAiPlaying} />
			<Board boardRef={boardRef} board={board} onCellClick={handleCellClick} />
			{isGameOver && winningPlayer && <GameOver winningPlayer={winningPlayer} onResetClick={handleReset} />}
		</div>
	);
}
