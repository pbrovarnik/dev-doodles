import { TIE } from './constants';
import { BoardType, Player, Winner } from './types';
import { winningSequences } from './winning-sequences';

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
