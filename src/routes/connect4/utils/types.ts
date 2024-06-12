import { RED, TIE, YELLOW } from './constants';

export type Player = typeof RED | typeof YELLOW | typeof TIE | null;

export type Board = {
	isWinningCell: boolean;
	player: Player;
};

type WinningCells = number[][];

export type Winner = {
	gameWinner: Player;
	winningCells: WinningCells;
};

export type Check = {
	count: number;
	winningCells: WinningCells;
};
