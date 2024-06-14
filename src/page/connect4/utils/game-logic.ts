import { RED, TIE, YELLOW } from './constants';
import { Board, Coord, DropCoinReturn, Player, Winner } from './types';
import { winningSequences } from './winning-sequences';

export function bestMove(board: Board[][]): Coord | null {
	const moves: Coord[] = [];
	for (let i = 0; i < board[0].length; i++) {
		if (dropCoin(board, YELLOW, i).isFull) continue;
		const column = miniMax(6, board, false);
		moves.push([i, column]);
		removeTopCoin(board, i);
	}

	const maxMoveScore = Math.max(...moves.map((move) => move[1]));
	const bestMoves = moves.filter((move) => move[1] === maxMoveScore);
	const bestMove = bestMoves[Math.floor(Math.random() * bestMoves.length)]?.[0];

	return dropCoin(board, YELLOW, bestMove).coords;
}

export function dropCoin(board: Board[][], player: Player, colIdx: number): DropCoinReturn {
	for (let rowIdx = board.length - 1; rowIdx >= 0; rowIdx--) {
		if (board[rowIdx][colIdx].player === null) {
			board[rowIdx][colIdx].player = player;
			return { board, coords: [rowIdx, colIdx], isFull: false };
		}
	}

	return { board, coords: [-1, -1], isFull: true };
}

export function checkWinner(board: Board[][]): Winner | null {
	for (const sequence of winningSequences) {
		let winningCells: number[][] = [];
		let count = 0;

		for (let i = 0; i < sequence.length; i++) {
			const [row, col] = sequence[i];
			const currentCell = board[row][col].player;

			if (i === 0 || (currentCell && currentCell === board[sequence[i - 1][0]][sequence[i - 1][1]].player)) {
				winningCells.push([row, col]);
				count++;
			} else {
				winningCells = [[row, col]];
				count = 1;
			}

			if (count === 4) {
				winningCells.forEach(([winRow, winCol]) => (board[winRow][winCol].isWinningCell = true));

				return { board, gameWinner: currentCell };
			}
		}
	}

	return isBoardFull(board) ? { board, gameWinner: TIE } : null;
}

function removeTopCoin(board: Board[][], colIdx: number): boolean {
	for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
		if (board[rowIdx][colIdx].player !== null) {
			board[rowIdx][colIdx].player = null;
			return true;
		}
	}

	return false;
}

export function minMaxdropCoin(board: Board[][], player: Player, colIdx: number): boolean {
	for (let rowIdx = board.length - 1; rowIdx >= 0; rowIdx--) {
		if (board[rowIdx][colIdx].player === null) {
			board[rowIdx][colIdx].player = player;
			return false;
		}
	}

	return true;
}

function isBoardFull(board: Board[][]): boolean {
	return board.every((row) => row.every((cell) => cell.player !== null));
}

function miniMax(depth: number, board: Board[][], maximizingPlayer: boolean): number {
	if (depth <= 0) {
		// console.log('depth is', depth);
		return 0;
	}

	const winner = checkWinner(board);

	if (winner?.gameWinner === YELLOW) {
		// console.log('yellow won with a depth of', depth);
		return depth;
	}
	if (winner?.gameWinner === RED) {
		// console.log('red won with a depth of', -depth);
		return -depth;
	}

	if (isBoardFull(board)) {
		// console.log('board is full', JSON.stringify(board, null, 2));
		return 0;
	}

	let bestScore = maximizingPlayer ? -Infinity : Infinity;

	for (let i = 0; i < board.length; i++) {
		if (dropCoin(board, maximizingPlayer ? YELLOW : RED, i).isFull) continue;

		const score = miniMax(depth - 1, board, !maximizingPlayer);

		bestScore = maximizingPlayer ? Math.max(bestScore, score) : Math.min(bestScore, score);

		removeTopCoin(board, i);
	}

	return bestScore;
}
