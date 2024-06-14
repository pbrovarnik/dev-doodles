import { RED, YELLOW } from './constants';
import { Player } from './types';
import { winningSequences } from './winning-sequences';

class Board {
	private board: (Player | null)[][];
	private winner: Player | null = null;

	public winningCells: number[][] = [];

	constructor(public rows: number, public columns: number) {
		this.board = Array.from({ length: rows }, () => Array(columns).fill(null));
	}

	public dropCoin(player: Player, colIdx: number): boolean {
		for (let i = this.board.length - 1; i >= 0; i--) {
			if (this.board[i][colIdx] === null) {
				this.board[i][colIdx] = player;
				return true;
			}
		}

		return false;
	}

	public removeTopCoin(colIdx: number): boolean {
		for (let i = 0; i < this.board.length; i++) {
			if (this.board[i][colIdx] !== null) {
				this.board[i][colIdx] = null;
				return true;
			}
		}

		return false;
	}

	public getWinner(): Player | null {
		for (const sequence of winningSequences) {
			let winningCells: number[][] = [];
			let count = 0;

			for (let i = 0; i < sequence.length; i++) {
				const [row, col] = sequence[i];
				const currentCell = this.board[row][col];

				if (i === 0 || (currentCell && currentCell === this.board[sequence[i - 1][0]][sequence[i - 1][1]])) {
					winningCells.push([row, col]);
					count++;
				} else {
					winningCells = [[row, col]];
					count = 1;
				}

				if (count === 4) {
					this.winner = currentCell;
					return currentCell;
				}
			}
		}

		this.winner = null;
		return this.winner;
	}

	public isBoardFull(): boolean {
		for (const row of this.board) {
			for (const cell of row) {
				if (cell === null) return false;
			}
		}
		return true;
	}
}

export function miniMax(depth: number, board: Board, maximizingPlayer: boolean): number {
	if (depth <= 0) return 0;

	const winner = board.getWinner();
	if (winner) {
		if (winner === YELLOW) return depth;
		if (winner === RED) return -depth;
	}
	if (board.isBoardFull()) return 0;

	let bestValue = maximizingPlayer ? -Infinity : Infinity;
	for (let i = 0; i < board.rows; i++) {
		if (!board.dropCoin(maximizingPlayer ? YELLOW : RED, i)) continue;
		const value = miniMax(depth - 1, board, !maximizingPlayer);
		bestValue = maximizingPlayer ? Math.max(bestValue, value) : Math.min(bestValue, value);
		board.removeTopCoin(i);
	}
	return bestValue;
}
