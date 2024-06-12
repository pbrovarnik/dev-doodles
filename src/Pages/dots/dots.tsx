import { MouseEventHandler, useState } from 'react';
import './dots.css';

type Point = {
	x: number;
	y: number;
};

export default function Dots() {
	const [points, setPoints] = useState<Point[]>([]);
	const [undoStack, setUndoStack] = useState<Point[]>([]);

	const handleSetPoint: MouseEventHandler<HTMLDivElement> = (e) => {
		setPoints((prevPoints) => [...prevPoints, { x: e.clientX, y: e.clientY }]);
		setUndoStack([]);
	};

	const handleUndo = () => {
		const newPoints = [...points];
		const poppedPoint = newPoints.pop();

		if (!poppedPoint) return;

		setPoints(() => newPoints);
		setUndoStack((prevUndoStack) => [...prevUndoStack, poppedPoint]);
	};

	const handleRedo = () => {
		const undoPoints = [...undoStack];
		const redoPoint = undoPoints.pop();

		if (!redoPoint) return;

		setUndoStack(() => undoPoints);
		setPoints((prevPoints) => [...prevPoints, redoPoint]);
	};

	const handleClear = () => {
		setUndoStack([]);
		setPoints([]);
	};

	return (
		<div className="dots">
			<div className="dot-btn-container">
				<button disabled={!points.length} onClick={handleUndo}>
					Undo
				</button>
				<button disabled={!undoStack.length} onClick={handleRedo}>
					Redo
				</button>
				<button disabled={!points.length} onClick={handleClear}>
					Clear
				</button>
			</div>
			<div className="dots-grid" onClick={handleSetPoint}>
				{points.map((point, idx) => (
					<div
						key={`${idx}_${point.x}_${point.y}`}
						style={{
							top: point.y - 6,
							left: point.x - 5,
						}}
						className="dot"
					/>
				))}
			</div>
		</div>
	);
}
