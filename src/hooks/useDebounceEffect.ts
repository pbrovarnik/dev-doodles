import { useState, useEffect, useRef } from 'react';

const useDebounceEffect = (text: string, delay = 500): string => {
	const [debouncedValue, setDebouncedValue] = useState<string>(text);
	const timeoutIdRef = useRef<number>();

	useEffect(() => {
		timeoutIdRef.current = setTimeout(() => setDebouncedValue(text), delay);

		return () => {
			clearTimeout(timeoutIdRef.current);
		};
	}, [text, delay]);

	return debouncedValue;
};

export default useDebounceEffect;
