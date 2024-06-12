import { Board, Winner } from '../utils/types';
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

			if (count === 3) {
				winningCells.push([nextRow, nextCol]);

				return { gameWinner: currentCell, winningCells };
			}
		}

		winningCells = [];
		count = 0;
	}

	return null;
};
