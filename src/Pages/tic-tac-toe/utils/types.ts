import { PLAYER_X, PLAYER_O, TIE } from './constants';

export type Player = typeof PLAYER_X | typeof PLAYER_O | typeof TIE;
export type BoardType = Player | null;
export type Winner = {
	player: Player;
	winningCells: number[][];
};
