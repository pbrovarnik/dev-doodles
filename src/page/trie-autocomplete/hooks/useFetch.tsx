import { useCallback, useState } from 'react';

type FetchReturn<T> = {
	data: T | null;
	isLoading: boolean;
	error: Error | null;
	executeFetch: (url: string, fetchOptions?: RequestInit) => Promise<T>;
};

const TIMEOUT_DURATION = 10000;

export default function useFetch<T>(): FetchReturn<T> {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);

	const executeFetch = useCallback(
		async (url: string, fetchOptions?: RequestInit) => {
			setIsLoading(true);
			setError(null);

			try {
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);
				const fetchResults = await fetch(url, {
					...fetchOptions,
					headers: {
						'content-type': 'application/json;charset=UTF-8',
						...fetchOptions?.headers,
					},
					signal: controller.signal,
				});

				clearTimeout(timeoutId);

				if (!fetchResults.ok) throw new Error(`HTTP error! Status: ${fetchResults.status}`);

				const response = await fetchResults.json();

				setData(response);

				return response;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err) {
				if (err instanceof Error) setError(err);

				return err;
			} finally {
				setIsLoading(false);
			}
		},
		[setIsLoading, setError, setData]
	);

	return { data, error, isLoading, executeFetch };
}
