import { PLAYER_O, PLAYER_X } from './constants';
import { checkWinner } from './game-logic';
import { BoardType, Player } from './types';

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
