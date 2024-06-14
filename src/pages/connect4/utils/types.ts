import { RED, TIE, YELLOW } from './constants';

export type Player = typeof RED | typeof YELLOW | typeof TIE;

export type Board = {
	isWinningCell: boolean;
	player: Player | null;
};

export type Winner = {
	board: Board[][];
	gameWinner: Player | null;
};

export type Coord = [number, number];
export type DropCoinReturn = { board: Board[][]; coords: Coord; isFull: boolean };
