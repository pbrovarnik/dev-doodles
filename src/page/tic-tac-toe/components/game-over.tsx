import { useMemo } from 'react';
import { Player } from '../utils/types';
import { PLAYER_X, PLAYER_O } from '../utils/constants';

type Props = {
	winningPlayer: Player;
	onResetClick: () => void;
};
export default function GameOver({ winningPlayer, onResetClick }: Props) {
	const gameOverText = useMemo(() => {
		const baseGameOverText = `player wins!!`;

		return winningPlayer === PLAYER_X ? `${PLAYER_X} ${baseGameOverText}` : winningPlayer === PLAYER_O ? `${PLAYER_O} ${baseGameOverText}` : 'Tie game!!';
	}, [winningPlayer]);

	return (
		<>
			<h2 className="ttt-game-msg">{gameOverText}</h2>
			<button onClick={onResetClick}>Reset</button>
		</>
	);
}
