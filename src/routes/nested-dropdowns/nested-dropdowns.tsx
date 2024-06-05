import { ChangeEventHandler, useRef, useState } from 'react';

type CityType = {
	id: string;
	name: string;
};

type CountryType = {
	id: string;
	name: string;
	cities: CityType[];
};

const countries: CountryType[] = [
	{
		id: 'usa',
		name: 'USA',
		cities: [
			{ id: 'nyc', name: 'New York' },
			{ id: 'la', name: 'Los Angeles' },
			{ id: 'chi', name: 'Chicago' },
			{ id: 'hou', name: 'Houston' },
			{ id: 'phx', name: 'Phoenix' },
		],
	},
	{
		id: 'can',
		name: 'Canada',
		cities: [
			{ id: 'tor', name: 'Toronto' },
			{ id: 'van', name: 'Vancouver' },
			{ id: 'mon', name: 'Montreal' },
			{ id: 'cal', name: 'Calgary' },
			{ id: 'ott', name: 'Ottawa' },
		],
	},
	{
		id: 'aus',
		name: 'Australia',
		cities: [
			{ id: 'syd', name: 'Sydney' },
			{ id: 'mel', name: 'Melbourne' },
			{ id: 'bne', name: 'Brisbane' },
			{ id: 'per', name: 'Perth' },
			{ id: 'adl', name: 'Adelaide' },
		],
	},
	{
		id: 'ger',
		name: 'Germany',
		cities: [
			{ id: 'ber', name: 'Berlin' },
			{ id: 'ham', name: 'Hamburg' },
			{ id: 'mun', name: 'Munich' },
			{ id: 'cgn', name: 'Cologne' },
			{ id: 'fra', name: 'Frankfurt' },
		],
	},
	{
		id: 'jpn',
		name: 'Japan',
		cities: [
			{ id: 'tok', name: 'Tokyo' },
			{ id: 'osa', name: 'Osaka' },
			{ id: 'kyo', name: 'Kyoto' },
			{ id: 'yok', name: 'Yokohama' },
			{ id: 'nag', name: 'Nagoya' },
		],
	},
];

export default function NestedDropdowns() {
	const citiesRef = useRef<HTMLSelectElement>(null);
	const [countryId, setCountryId] = useState('');

	const cities = countries.find((country) => country.id === countryId)?.cities ?? [];

	const handleCountrySelect: ChangeEventHandler<HTMLSelectElement> | undefined = (e) => {
		setCountryId(e.target.value);

		if (citiesRef.current) citiesRef.current.selectedIndex = 0;
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: '10px' }}>
			<select onChange={handleCountrySelect} defaultValue="default">
				<option value="default" disabled hidden>
					Select Country
				</option>
				{countries.map((country) => (
					<option key={country.id} value={country.id}>
						{country.name}
					</option>
				))}
			</select>
			<select ref={citiesRef} disabled={!cities.length} defaultValue="default">
				<option value="default" disabled hidden>
					Select City
				</option>
				{cities.map((city) => (
					<option key={city.id} value={city.id}>
						{city.name}
					</option>
				))}
			</select>
		</div>
	);
}
