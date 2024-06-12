import { MouseEventHandler } from 'react';
import { Board } from '../utils/types';

type Props = {
	board: Board[][];
	insertBtnColor: (colIdx: number) => string;
	isGameOver: boolean;
	onColumnClick: MouseEventHandler<HTMLButtonElement>;
};

export default function InsertRows({ board, insertBtnColor, isGameOver, onColumnClick }: Props) {
	return (
		<div className="insert-row">
			{board[0].map((_, insertCellIdx) => (
				<button
					key={insertCellIdx}
					id={String(insertCellIdx)}
					style={{
						backgroundColor: insertBtnColor(insertCellIdx),
					}}
					disabled={isGameOver || !!board[0][insertCellIdx].player}
					onClick={onColumnClick}
					className="insert-cell">
					<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
						<path d="M8 10l4 4 4-4" stroke="black" strokeWidth="2" fill="none" />
					</svg>
				</button>
			))}
		</div>
	);
}
