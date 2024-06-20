export function debounce(callback: (...args: unknown[]) => void, delay: number) {
	let timeout: number;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(callback, delay);
	};
}

export function getLsItem(key: string) {
	const value = localStorage.getItem(key);

	if (!value) return null;

	try {
		return JSON.parse(value);
	} catch (error) {
		return null;
	}
}

export function setLsItem<T>(key: string, value: T) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function upperCaseFirstLetter(word: string): string {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
