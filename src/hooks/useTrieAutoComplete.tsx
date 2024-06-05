import { useEffect, useRef } from 'react';
import TrieAutoComplete from '../utils/trie-autocomplete';
import { dictionary } from '../utils/dictionary.json';

export function useTrieAutoComplete() {
	const autoCompleteRef = useRef<TrieAutoComplete>();

	if (!autoCompleteRef.current) {
		autoCompleteRef.current = new TrieAutoComplete();
	}

	useEffect(() => {
		dictionary.forEach((word) => autoCompleteRef.current?.insertWord(word));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return autoCompleteRef.current!;
}
