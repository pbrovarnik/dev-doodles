import { MouseEventHandler } from 'react';
import { Board } from '../utils/types';
import ArrowDownIcon from './arrow-down-icon';

type Props = {
	board: Board[][];
	insertBtnColor: (colIdx: number) => string;
	isGameOver: boolean;
	onColumnClick: MouseEventHandler<HTMLButtonElement>;
};

export default function InsertRows({ board, insertBtnColor, isGameOver, onColumnClick }: Props) {
	const boardRow = board[0];

	return (
		<div className="insert-row">
			{board[0].map((_, insertCellIdx) => (
				<button
					key={insertCellIdx}
					id={String(insertCellIdx)}
					style={{
						backgroundColor: insertBtnColor(insertCellIdx),
					}}
					disabled={isGameOver || !!boardRow[insertCellIdx].player}
					onClick={onColumnClick}
					className="insert-cell">
					<ArrowDownIcon />
				</button>
			))}
		</div>
	);
}
