import { PLAYER_O, PLAYER_X } from './constants';
import { checkWinner } from './game-logic';
import { BoardType, Player } from './types';

export function bestMove(board: BoardType[][]): number[] | null {
	let bestScore = -Infinity;
	let move = null;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] === null) {
				board[i][j] = PLAYER_O;

				const score = minimax(board, false);

				board[i][j] = null;

				if (score > bestScore) {
					bestScore = score;
					move = [i, j];
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

function minimax(board: BoardType[][], isMaximizing: boolean): number {
	const result = checkWinner(board);
	if (result !== null) return scores[result.player];

	if (isMaximizing) {
		let bestScore = -Infinity;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] === null) {
					board[i][j] = PLAYER_O;

					const score = minimax(board, false);

					board[i][j] = null;

					bestScore = Math.max(score, bestScore);
				}
			}
		}

		return bestScore;
	} else {
		let bestScore = Infinity;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] === null) {
					board[i][j] = PLAYER_X;

					const score = minimax(board, true);

					board[i][j] = null;

					bestScore = Math.min(score, bestScore);
				}
			}
		}

		return bestScore;
	}
}
