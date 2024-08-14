import { memo, useState } from 'react';

type Color = {
	id: number;
	value: 'red' | 'green';
};

type History = {
	id: number;
	value: string;
};

const initialColors = (): Color[] => [
	{ id: 1, value: 'red' },
	{ id: 2, value: 'green' },
];

export default function DynamicSquares() {
	const [colorList, setColorList] = useState<Color[]>(initialColors());
	const [history, setHistory] = useState<History[]>([]);

	const onSquareClick = (color: Color) => {
		if (color.value === 'green') {
			const newSquareId = Math.floor(Math.random() * 100000);

			setColorList((prev) => {
				const currentColorIdx = prev.findIndex(({ id }) => id === color.id);
				prev[currentColorIdx].value = 'red';

				return [
					...prev,
					{
						id: newSquareId,
						value: 'green',
					},
				];
			});

			setHistory((prev) => [
				...prev,
				{ id: Math.floor(Math.random() * 100000), value: `Converting Square with ID ${color.id} from green to red` },
				{ id: Math.floor(Math.random() * 100000), value: `Adding green Square with ID ${newSquareId} from green to red` },
			]);
		} else if (color.value === 'red') {
			setColorList((prev) => prev.filter(({ id }) => id !== color.id));
			setHistory((prev) => [...prev, { id: Math.floor(Math.random() * 100000), value: `Deleting red Square with ID ${color.id}` }]);
		}
	};

	const onReset = () => {
		setColorList(initialColors());
		setHistory([]);
	};

	return (
		<div
			style={{
				display: 'flex',
				columnGap: '20px',
			}}>
			<div>
				<button onClick={onReset}>Reset</button>
				{colorList.map((color) => (
					<Square key={color.id} color={color} handleClick={onSquareClick} />
				))}
			</div>
			{history.length > 0 && (
				<div>
					<span>History</span>
					{history.map((history, idx) => (
						<div key={history.id}>
							<span>{idx + 1}: </span>
							<span>{history.value}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

const Square = memo(({ color, handleClick }: { color: Color; handleClick: (color: Color) => void }) => {
	const onClick = () => {
		handleClick(color);
	};

	return (
		<div
			style={{
				backgroundColor: color.value,
				width: '20px',
				height: '20px',
				margin: '10px',
			}}
			onClick={onClick}
		/>
	);
});

// Starting Point:
// A list of colors composed of "red" and "green" elements.
// A "Square" component that renders a square of a given color and executes a click method.
// TODO'S:
// Complete the implementation of App.js so that it:

// Uses the given Square component to render all squares from the "colors" list
// Exposes the following functionality:
// - click green => change current element to "red" + add 1 new "green" element at the end of the list
// - click red => delete current element
// [Optional] Add a button to reset the list of colors to its initial state
// [Optional] Render a history of user actions (clicks) in the App component
// choose your own display to do so
// Discuss the Performance and Scalability of your implementation
