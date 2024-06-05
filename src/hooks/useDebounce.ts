import { useState, useEffect, useRef } from 'react';

const useDebounce = (text: string, delay = 500): string => {
	const [debouncedValue, setDebouncedValue] = useState<string>(text);
	const timerRef = useRef<number>();

	useEffect(() => {
		timerRef.current = setTimeout(() => setDebouncedValue(text), delay);

		return () => {
			clearTimeout(timerRef.current);
		};
	}, [text, delay]);

	return debouncedValue;
};

export default useDebounce;
