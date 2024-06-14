import { FormEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchForm from '../components/search-form';
import WordList from '../components/word-list';
import Header from '../components/header';

import { useTrieAutoComplete } from '../../../hooks/useTrieAutoComplete';

import '../trie-autocomplete.css';

function AutocompleteClient() {
	const inputRef = useRef<HTMLInputElement>(null);

	const autocomplete = useTrieAutoComplete();
	const [words, setWords] = useState<string[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setWords(autocomplete.suggestWord(searchParams.get('q') ?? ''));

		if (inputRef.current?.value !== null && inputRef.current?.value !== undefined) {
			inputRef.current.value = searchParams.get('q') ?? '';
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setSuggestedWords = useCallback(() => {
		if (inputRef.current?.value === null || inputRef.current?.value === undefined) return;

		setSearchParams({ q: inputRef.current.value });
		const suggestedWords = autocomplete.suggestWord(inputRef.current.value);

		setWords(suggestedWords);
	}, [autocomplete, setSearchParams]);

	const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		(e) => {
			e.preventDefault();

			if (inputRef.current?.value === null || inputRef.current?.value === undefined) return;

			autocomplete.insertWord(inputRef.current.value);
			inputRef.current.value = '';
			setSuggestedWords();
		},
		[autocomplete, setSuggestedWords]
	);

	const handleDeleteWord: MouseEventHandler<HTMLSpanElement> = useCallback(
		(e) => {
			const target = e.currentTarget as HTMLElement;

			if (inputRef.current?.value === null || inputRef.current?.value === undefined) return;

			autocomplete.deleteWord(target.previousSibling?.textContent ?? '');
			inputRef.current.value = '';
			setSuggestedWords();
		},
		[autocomplete, setSuggestedWords]
	);

	return (
		<div className="autocomplete-client">
			<Header headerName="Client" navigateTo="server" />
			<SearchForm inputRef={inputRef} onSubmit={onSubmit} setSuggestedWords={setSuggestedWords} />
			<WordList words={words} onDeleteWord={handleDeleteWord} />
		</div>
	);
}

export default AutocompleteClient;
