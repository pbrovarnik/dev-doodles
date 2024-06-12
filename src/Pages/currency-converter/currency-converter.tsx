import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import './currency-converter.css';

type Inputs = {
	fromCurrency: string;
	toCurrency: string;
	amount: number;
};

const HOST = 'api.frankfurter.app';

function App() {
	const [rate, setRate] = useState('');
	const [currencies, setCurrencies] = useState<[string, unknown][]>();
	const [isLoading, setLoading] = useState(false);
	const [isCurrencyLoading, setCurrencyLoading] = useState(false);

	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<Inputs>();

	useEffect(() => {
		setCurrencyLoading(true);
		fetch(`https://${HOST}/currencies`)
			.then((resp) => resp.json())
			.then((currencies) => {
				setCurrencyLoading(false);
				setCurrencies(Object.entries(currencies));
			});
	}, []);

	const onSubmit: SubmitHandler<Inputs> = (values) => {
		const from = values.fromCurrency;
		const to = values.toCurrency;
		const amount = values.amount;

		setLoading(true);
		fetch(`https://${HOST}/latest?amount=${amount}&from=${from}&to=${to}`)
			.then((resp) => resp.json())
			.then((data) => {
				setLoading(false);
				console.log('data', data);
				const covertedRate = new Intl.NumberFormat('en-US', { style: 'currency', currency: to }).format(data.rates[to] ?? 0);
				setRate(covertedRate);
			});
	};

	const rateDisplayComponent = isLoading ? (
		<span>loading...</span>
	) : (
		<>
			<span>Amount: </span>
			<span>{rate}</span>
		</>
	);

	if (isCurrencyLoading && !currencies) return <>loading...</>;

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>From:</label>
				<select {...register('fromCurrency', { required: true })}>
					{currencies?.map(([value, name], idx) => (
						<option key={idx} value={value}>
							{value}: {name as string}
						</option>
					))}
				</select>
				{errors.fromCurrency && <span>This field is required</span>}
				<label>To:</label>
				<select {...register('toCurrency', { required: true })}>
					{currencies?.map(([value, name], idx) => (
						<option key={idx} value={value}>
							{value}: {name as string}
						</option>
					))}
				</select>
				{errors.toCurrency && <span>This field is required</span>}
				<label>Amount:</label>
				<input type="number" {...register('amount', { required: true })} />
				{errors.amount && <span>This field is required</span>}
				<input type="submit" />
			</form>

			<div className="rate-display">{rate && rateDisplayComponent}</div>
		</div>
	);
}

export default App;
