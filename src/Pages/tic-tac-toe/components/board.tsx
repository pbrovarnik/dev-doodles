import { MouseEventHandler, LegacyRef } from 'react';
import { BoardType } from '../utils/types';

type Props = {
	board: BoardType[][];
	boardRef: LegacyRef<HTMLDivElement>;
	onCellClick: MouseEventHandler<HTMLDivElement>;
};

export default function Board({ board, boardRef, onCellClick }: Props) {
	return (
		<div ref={boardRef} className="ttt-board">
			{board.map((row, rowIdx) => (
				<div key={rowIdx} id={String(rowIdx)} className="ttt-row">
					{row.map((cell, colIdx) => (
						<div key={colIdx} id={String(colIdx)} className="ttt-cell">
							<div onClick={onCellClick}>{cell}</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
