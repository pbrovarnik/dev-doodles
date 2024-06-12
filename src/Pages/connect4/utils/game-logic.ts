import { Board, Winner } from '../utils/types';
import { RED, YELLOW } from './constants';
import { winningSequences } from './winning-sequences';

export const checkWinner = (board: Board[][]): Winner | null => {
	let winningCells = [];
	let count = 0;

	for (const sequence of winningSequences) {
		for (let i = 0; i < sequence.length - 1; i++) {
			const [row, col] = sequence[i];
			const [nextRow, nextCol] = sequence[i + 1];

			const currentCell = board[row][col].player;
			const nextCell = board[nextRow][nextCol].player;

			if (currentCell && currentCell === nextCell) {
				winningCells.push([row, col]);
				count++;
			} else {
				winningCells = [];
				count = 0;
			}
			console.log('count', count);
			console.log('winningCells', winningCells);
			if (count === 3) {
				winningCells.push([nextRow, nextCol]);
				winningCells.forEach(([row, col]) => (board[row][col].isWinningCell = true));

				return { board, gameWinner: currentCell };
			}
		}

		winningCells = [];
		count = 0;
	}

	return null;
};

export const turn = (board: Board[][], colIdx: number, isRedTurn: boolean): Board[][] => {
	for (let i = board.length - 1; i >= 0; i--) {
		const cell = board[i][colIdx].player;

		if (!cell) {
			board[i][colIdx].player = isRedTurn ? RED : YELLOW;
			break;
		}
	}

	return board;
};
