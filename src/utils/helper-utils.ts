export function debounce(callback: (...args: unknown[]) => void, delay: number) {
	let timeout: number;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(callback, delay);
	};
}
