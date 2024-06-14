import { ChangeEventHandler } from 'react';
import Switch from '../../../components/switch/switch';

type Props = {
	onAiSwitchChange: ChangeEventHandler<HTMLInputElement>;
	onAiStartSwitchChange: ChangeEventHandler<HTMLInputElement>;
	isAiPlaying: boolean;
};

export default function header({ onAiSwitchChange, onAiStartSwitchChange, isAiPlaying }: Props) {
	return (
		<div className="c4-header">
			<div className="c4-switches">
				<div className="c4-switch">
					<label>Play agains AI?</label>
					<Switch onSwitchChange={onAiSwitchChange} />
				</div>
				{isAiPlaying && (
					<div className="c4-switch">
						<label>Does AI start?</label>
						<Switch onSwitchChange={onAiStartSwitchChange} />
					</div>
				)}
			</div>
			<h1>Connect 4</h1>
		</div>
	);
}
