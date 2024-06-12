import { RED, TIE, YELLOW } from './constants';

export type Player = typeof RED | typeof YELLOW | typeof TIE | null;

export type Board = {
	isWinningCell: boolean;
	player: Player;
};

export type Winner = {
	gameWinner: Player;
	winningCells: number[][];
};
