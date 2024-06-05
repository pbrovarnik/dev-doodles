import { useEffect, useRef, useState } from 'react';

const getLineSum = (line: number[]) => line.reduce((sum, num) => (sum += num), 0);

const findShortestLineIndex = (lines: number[][]) =>
	lines.reduce(
		(minData, currentItem, currentIndex) => {
			const currentSum = getLineSum(currentItem);
			return currentSum < minData.minSum ? { minSum: currentSum, index: currentIndex } : minData;
		},
		{ minSum: Infinity, index: -1 }
	).index;

const defaultLines: number[][] = Array.from(Array(5), () => [1, 1, 1]);

export default function CheckoutLines() {
	const inputRef = useRef<HTMLInputElement>(null);
	const interval = useRef<number>();
	const [lines, setLines] = useState<number[][]>(defaultLines);
	const [isOpenLine, setIsLineOpen] = useState<boolean>(false);

	const areLineEmpty = lines.every((line) => !line.length);

	useEffect(() => {
		if (areLineEmpty) {
			clearInterval(interval.current);
			setIsLineOpen((prev) => !prev);
		}
	}, [areLineEmpty]);

	useEffect(() => {
		return () => {
			clearInterval(interval.current);
		};
	}, []);

	const handleCheckout = () => {
		if (!inputRef.current || !inputRef.current.value) return;

		const inputValue = inputRef.current.value;

		setLines((prevLines) => {
			const shortestLineIdx = findShortestLineIndex(prevLines);
			return prevLines.map((line, idx) => {
				if (idx === shortestLineIdx) {
					return [...line, Number(inputValue)];
				}

				return line;
			});
		});

		inputRef.current.value = '';
	};

	const handleOpenLines = () => {
		clearInterval(interval.current);

		interval.current = setInterval(() => {
			setLines((prev) => prev.map((line) => [line[0] - 1, ...line.slice(1)].filter((line) => line > 0)));
		}, 1000);

		setIsLineOpen((prev) => !prev);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				rowGap: '20px',
			}}>
			<div
				style={{
					display: 'flex',
					columnGap: '4px',
				}}>
				<button disabled={isOpenLine || areLineEmpty} onClick={handleOpenLines}>
					Open Lines
				</button>
				<input ref={inputRef} type="number" placeholder="How many items" />
				<button onClick={handleCheckout}>Checkout</button>
			</div>
			<Lines lines={lines} />
		</div>
	);
}

type LinesProps = {
	lines: number[][];
};

function Lines({ lines }: LinesProps) {
	return (
		<div
			style={{
				display: 'flex',
				columnGap: '50px',
			}}>
			{lines.map((line, key) => (
				<Line key={key} line={line} />
			))}
		</div>
	);
}

type LineProps = {
	line: number[];
};

function Line({ line }: LineProps) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				rowGap: '10px',
			}}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					rowGap: '10px',
					border: '1px dotted #000',
					padding: '4px 30px',
				}}>
				{line.length > 0 ? line.map((person, idx) => <div key={idx}>{person}</div>) : 'X'}
			</div>
			Total: {getLineSum(line)}
		</div>
	);
}
