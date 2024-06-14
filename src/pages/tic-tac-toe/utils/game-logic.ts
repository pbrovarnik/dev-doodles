import { TIE } from './constants';
import { BoardType, Player, Winner } from './types';
import { winningSequences } from './winning-sequences';
import { PLAYER_O, PLAYER_X } from './constants';

export const checkWinner = (board: BoardType[][]): Winner | null => {
	for (const sequence of winningSequences) {
		let winningCells: number[][] = [];
		let count = 0;

		for (let i = 0; i < sequence.length - 1; i++) {
			const [row, col] = sequence[i];
			const [nextRow, nextCol] = sequence[i + 1];

			const currentCell = board[row][col];
			const nextCell = board[nextRow][nextCol];

			if (currentCell && currentCell === nextCell) {
				winningCells.push([row, col]);
				count++;
			} else {
				winningCells = [];
				count = 0;
			}

			if (count === 2) {
				winningCells.push([nextRow, nextCol]);

				return { player: currentCell as Player, winningCells };
			}
		}
	}

	const isTieGame = board.every((row) => row.every((cell) => cell !== null));

	return isTieGame ? { player: TIE, winningCells: [] } : null;
};

export function bestMove(board: BoardType[][]): number[] | null {
	let bestScore = -Infinity;
	let move = null;

	for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
		for (let colIdx = 0; colIdx < board[rowIdx].length; colIdx++) {
			if (board[rowIdx][colIdx] === null) {
				board[rowIdx][colIdx] = PLAYER_O;

				const score = miniMax(board, false);

				board[rowIdx][colIdx] = null;

				if (score > bestScore) {
					bestScore = score;
					move = [rowIdx, colIdx];
				}
			}
		}
	}

	return move;
}

const scores: Record<Player, number> = {
	X: -10,
	O: 10,
	Tie: 0,
};

function miniMax(board: BoardType[][], maximizingPlayer: boolean): number {
	const result = checkWinner(board);
	if (result !== null) return scores[result.player];

	let bestScore = maximizingPlayer ? -Infinity : Infinity;

	for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
		for (let colIdx = 0; colIdx < board[rowIdx].length; colIdx++) {
			if (board[rowIdx][colIdx] === null) {
				board[rowIdx][colIdx] = maximizingPlayer ? PLAYER_O : PLAYER_X;

				const score = miniMax(board, !maximizingPlayer);

				board[rowIdx][colIdx] = null;

				bestScore = maximizingPlayer ? Math.max(bestScore, score) : Math.min(bestScore, score);
			}
		}
	}

	return bestScore;
}
