import { ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import Board from './components/board';
import { BoardType, Player } from './utils/types';
import GameOver from './components/game-over';
import { PLAYER_O, PLAYER_X, TIE } from './utils/constants';
import { checkWinner } from './utils/game-logic';
import Header from './components/header/header';
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
			winner.winningCells.forEach(([row, col]) => {
				boardRef.current?.children[row]?.children[col]?.children[0]?.classList.add('pulse');
			});

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

	const handleCellClick: MouseEventHandler<HTMLDivElement> = useCallback(
		({ currentTarget }) => {
			const parentElm = currentTarget.parentElement;
			const rowId = Number(parentElm?.parentElement?.id);
			const colId = Number(parentElm?.id);

			turn(rowId, colId);
			checkWin();
		},
		[checkWin, turn]
	);

	const clearPulse = () => {
		// clear pulse className
		if (boardRef.current?.children?.length) {
			for (let i = 0; i < boardRef.current?.children?.length; i++) {
				const rows = boardRef.current?.children[i].children;
				for (let j = 0; j < rows.length; j++) {
					boardRef.current?.children[i]?.children[j]?.children[0]?.classList.remove('pulse');
				}
			}
		}
	};

	const handleReset = () => {
		setBoard(defaultBoard());
		setIsGameOver(() => false);
		setWinningPlayer(() => null);
		setIsXTurn(() => !isAiFirstRef.current);
		clearPulse();
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
