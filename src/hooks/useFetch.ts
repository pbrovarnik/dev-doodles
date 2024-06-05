import { useState, useEffect } from 'react';

type ReturnState<T> = {
	data: T;
	error: boolean;
	isLoading: boolean;
};

type Props<T> = {
	defaultData: T;
	options?: ResponseInit;
	url: string;
};

const useFetch = <T>({ defaultData, options, url }: Props<T>): ReturnState<T> => {
	const [data, setData] = useState<T>(defaultData);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		fetch(url, {
			...options,
			signal,
		})
			.then((response) => {
				if (!response.ok) throw new Error('There was an issue fetching data.');
				return response.json();
			})
			.then((data) => {
				setData(data);
			})
			.catch((err: Error) => {
				if ((err as DOMException).name === 'AbortError') return;
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});

		return () => {
			controller.abort();
		};
	}, []);

	return { data, isLoading, error };
};

export default useFetch;
