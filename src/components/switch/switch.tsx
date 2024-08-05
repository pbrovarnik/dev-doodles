import { ChangeEventHandler } from 'react';
import './switch.css';

type Props = {
	onSwitchChange: ChangeEventHandler<HTMLInputElement>;
};

export default function Swtich({ onSwitchChange }: Props) {
	return (
		<label className="switch">
			<input type="checkbox" onChange={onSwitchChange} />
			<span className="slider round" />
		</label>
	);
}
