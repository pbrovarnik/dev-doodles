import { useMemo } from 'react';
import { RED, RED_COLOR, TIE_COLOR, YELLOW, YELLOW_COLOR } from '../utils/constants';
import { Player } from '../utils/types';

type Props = {
	numberOfTurns: number;
	winningPlayer: Player;
	onResetClick: () => void;
};
export default function GameOver({ numberOfTurns, winningPlayer, onResetClick }: Props) {
	const gameOverText = useMemo(() => {
		const baseGameOverText = `player wins in ${Math.ceil(numberOfTurns / 2)} turns!!`;
		return winningPlayer === RED ? `${RED} ${baseGameOverText}` : winningPlayer === YELLOW ? `${YELLOW} ${baseGameOverText}` : 'Tie game!!';
	}, [numberOfTurns, winningPlayer]);

	return (
		<>
			<h2
				style={{
					color: winningPlayer === RED ? RED_COLOR : winningPlayer === YELLOW ? YELLOW_COLOR : TIE_COLOR,
				}}
				className="c4-game-msg">
				{gameOverText}
			</h2>
			<button onClick={onResetClick}>Reset</button>
		</>
	);
}
