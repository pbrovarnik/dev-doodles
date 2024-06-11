import { Board, Check, Player, Winner } from '../connect4';

const setWinner = (winningPlayer: Player, winningCells: number[][], winningCell: number[]): Winner => {
	winningCells.push(winningCell);

	return { gameWinner: winningPlayer, winningCells: winningCells };
};

const clearCheck = (check: Check) => {
	check.winningCells = [];
	check.count = 0;
};

const checkNextCell = (cell: Player, nextCell: Player, winningCell: number[], check: Check) => {
	if (cell && cell === nextCell) {
		check.winningCells.push(winningCell);
		check.count++;
	} else {
		clearCheck(check);
	}
};

const verticalCheck = (board: Board[][]) => {
	const verticalCheck: Check = {
		winningCells: [],
		count: 0,
	};

	for (let i = 0; i < board[0].length; i++) {
		for (let j = 0; j < board.length - 1; j++) {
			const cell = board[j][i]?.player;
			const nextCell = board[j + 1][i]?.player;

			if (!cell) continue;

			checkNextCell(cell, nextCell, [j, i], verticalCheck);

			if (verticalCheck.count === 3) return setWinner(cell, verticalCheck.winningCells, [j + 1, i]);
		}

		clearCheck(verticalCheck);
	}
};

const horizontalCheck = (board: Board[][]) => {
	const horizontalCheck: Check = {
		winningCells: [],
		count: 0,
	};

	for (let i = 0; i < board.length; i++) {
		const row = board[i];

		for (let j = 0; j < row.length; j++) {
			const cell = row[j]?.player;
			const nextCell = row[j + 1]?.player;

			if (!cell) continue;

			checkNextCell(cell, nextCell, [i, j], horizontalCheck);

			if (horizontalCheck.count === 3) return setWinner(cell, horizontalCheck.winningCells, [i, j + 1]);
		}

		clearCheck(horizontalCheck);
	}
};

const diagonalChecks = (board: Board[][]) => {
	const diagonalTopLeftCheck: Check = {
		winningCells: [],
		count: 0,
	};

	const diagonalTopRightCheck: Check = {
		winningCells: [],
		count: 0,
	};

	const diagonalBottomLeftCheck: Check = {
		winningCells: [],
		count: 0,
	};

	const diagonalBottomRightCheck: Check = {
		winningCells: [],
		count: 0,
	};

	for (let i = 0; i < 3; i++) {
		// top left diagonal
		for (let j = 0; j < board[i].length; j++) {
			const iIdx = i + j;

			if (iIdx + 1 >= board.length) continue;

			const cell = board[iIdx][j]?.player;
			const nextCell = board[iIdx + 1][j + 1]?.player;

			if (!cell) continue;

			checkNextCell(cell, nextCell, [iIdx, j], diagonalTopLeftCheck);

			if (diagonalTopLeftCheck.count === 3) return setWinner(cell, diagonalTopLeftCheck.winningCells, [iIdx + 1, j + 1]);
		}

		// top right diagonal
		for (let j = board[i].length - 1; j >= 0; j--) {
			const len = board.length;
			const iIdx = len - j + i;

			if (iIdx + 1 >= len) continue;

			const cell = board[iIdx][j]?.player;
			const nextCell = board[iIdx + 1][j - 1]?.player;

			if (!cell) continue;

			checkNextCell(cell, nextCell, [iIdx, j], diagonalTopRightCheck);

			if (diagonalTopRightCheck.count === 3) return setWinner(cell, diagonalTopRightCheck.winningCells, [iIdx + 1, j - 1]);
		}

		// bottom left diagonal
		for (let j = 0; j < board[i].length; j++) {
			const len = board.length - 1;
			const iIdx = len - j - i;

			if (iIdx - 1 < 0) continue;

			const cell = board[iIdx][j]?.player;
			const nextCell = board[iIdx - 1][j + 1]?.player;

			if (!cell) continue;

			checkNextCell(cell, nextCell, [iIdx, j], diagonalBottomLeftCheck);

			if (diagonalBottomLeftCheck.count === 3) return setWinner(cell, diagonalBottomLeftCheck.winningCells, [iIdx - 1, j + 1]);
		}

		// bottom right diagonal
		for (let j = board[i].length - 1; j >= 0; j--) {
			const iIdx = j - i;

			if (iIdx - 2 < 0) continue;

			const cell = board[iIdx - 1][j]?.player;
			const nextCell = board[iIdx - 2][j - 1]?.player;

			if (!cell) continue;

			checkNextCell(cell, nextCell, [iIdx - 1, j], diagonalBottomRightCheck);

			if (diagonalBottomRightCheck.count === 3) return setWinner(cell, diagonalBottomRightCheck.winningCells, [iIdx - 2, j - 1]);
		}

		clearCheck(diagonalTopLeftCheck);
		clearCheck(diagonalTopRightCheck);
		clearCheck(diagonalBottomLeftCheck);
		clearCheck(diagonalBottomRightCheck);
	}
};

export const checkWinner = (board: Board[][]): Winner | null => {
	const checks = [verticalCheck, horizontalCheck, diagonalChecks];

	for (const check of checks) {
		const result = check(board);

		if (result) return result;
	}

	return null;
};
