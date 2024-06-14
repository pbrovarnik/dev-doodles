import { Board as BoardType } from '../utils/types';
import { RED, YELLOW } from '../utils/constants';

type Props = {
	board: BoardType[][];
};

export default function Board({ board }: Props) {
	return (
		<div className="c4-board">
			{board.map((row, rowIdx) => (
				<div key={rowIdx} id={String(rowIdx)} className="c4-row">
					{row.map((cell, colIdx) => (
						<div
							key={colIdx}
							id={String(colIdx)}
							className={`c4-cell ${cell.player === RED ? 'red-checker' : cell.player === YELLOW ? 'yellow-checker' : ''} ${cell.isWinningCell ? 'pulse' : ''}`.trim()}
						/>
					))}
				</div>
			))}
		</div>
	);
}
