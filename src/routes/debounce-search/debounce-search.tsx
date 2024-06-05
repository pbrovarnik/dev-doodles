import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

const DATA: string[] = [
	'blitz',
	'quartz',
	'flame',
	'jovial',
	'swift',
	'glyph',
	'brisk',
	'plume',
	'whirl',
	'vivid',
	'crisp',
	'gleam',
	'nexus',
	'zenith',
	'flick',
	'quiver',
	'shimmer',
	'zephyr',
	'clutch',
	'fringe',
];

export default function DebounceSearch() {
	const [data, setData] = useState<string[]>([]);

	useEffect(() => {
		setData(DATA);
	}, []);

	return <Child data={data} />;
}

function Child({ data }: { data: string[] }) {
	const [query, setQuery] = useState('');
	const debounce = useDebounce(query);

	const filtered = data.filter((word) => word.includes(debounce));

	return (
		<div>
			<input onChange={(e) => setQuery(e.target.value)} />
			{filtered.map((word, idx) => (
				<p key={idx}>{word}</p>
			))}
		</div>
	);
}
