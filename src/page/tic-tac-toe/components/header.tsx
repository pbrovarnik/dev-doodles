import { ChangeEventHandler } from 'react';
import Switch from '../../../components/switch/switch';

type Props = {
	onAiSwitchChange: ChangeEventHandler<HTMLInputElement>;
	onAiStartSwitchChange: ChangeEventHandler<HTMLInputElement>;
	isAiPlaying: boolean;
};

export default function header({ onAiSwitchChange, onAiStartSwitchChange, isAiPlaying }: Props) {
	return (
		<div className="ttt-header">
			<div className="ttt-switches">
				<div className="ttt-switch">
					<label>Play agains AI?</label>
					<Switch onSwitchChange={onAiSwitchChange} />
				</div>
				{isAiPlaying && (
					<div className="ttt-switch">
						<label>Does AI start?</label>
						<Switch onSwitchChange={onAiStartSwitchChange} />
					</div>
				)}
			</div>
			<h1>Tic Tac Toe</h1>
		</div>
	);
}
