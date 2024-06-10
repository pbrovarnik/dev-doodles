import { useRef, useCallback } from 'react';

const useDebounceCallback = <T extends string[]>(func: (...args: T) => void, delay = 500) => {
	const timerRef = useRef<number>();

	return useCallback(
		(...args: T) => {
			clearTimeout(timerRef.current);

			timerRef.current = setTimeout(() => {
				clearTimeout(timerRef.current);
				func(...args);
			}, delay);
		},
		[func, delay]
	);
};

export default useDebounceCallback;
