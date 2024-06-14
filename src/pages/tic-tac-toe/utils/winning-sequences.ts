const diagonalSequences = [
	[
		[0, 0],
		[1, 1],
		[2, 2],
	],
	[
		[0, 2],
		[1, 1],
		[2, 0],
	],
];

const verticalWinningSequences = [
	[
		[0, 0],
		[1, 0],
		[2, 0],
	],
	[
		[0, 1],
		[1, 1],
		[2, 1],
	],
	[
		[0, 2],
		[1, 2],
		[2, 2],
	],
];

const horizontalWinningSequences = [
	[
		[0, 0],
		[0, 1],
		[0, 2],
	],
	[
		[1, 0],
		[1, 1],
		[1, 2],
	],
	[
		[2, 0],
		[2, 1],
		[2, 2],
	],
];

export const winningSequences = [...diagonalSequences, ...horizontalWinningSequences, ...verticalWinningSequences];
