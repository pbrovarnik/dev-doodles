import { FormEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

import Header from '../components/header';
import SearchForm from '../components/search-form';
import WordList from '../components/word-list';

import '../trie-autocomplete.css';

const BASE_URL = new URL(`${import.meta.env.APP_SERVER_URL}/api/v1/autocomplete`);
const INSERT_URL = new URL(`${BASE_URL}/insert`);
const DELETE_URL = new URL(`${BASE_URL}/delete`);
const SUGGEST_URL = new URL(`${BASE_URL}/suggest`);

function AutocompleteServer() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [words, setWords] = useState<string[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const insertData = useFetch();
	const deleteData = useFetch();
	const suggestionData = useFetch<{ suggestions: string[] }>();

	useEffect(() => {
		SUGGEST_URL.searchParams.set('q', searchParams.get('q') ?? '');
		suggestionData.executeFetch(SUGGEST_URL.href).then((data) => setWords(data?.suggestions));

		if (inputRef.current?.value !== null && inputRef.current?.value !== undefined) {
			inputRef.current.value = searchParams.get('q') ?? '';
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setSuggestedWords = useCallback(async () => {
		if (inputRef.current?.value === null || inputRef.current?.value === undefined) return;

		setSearchParams({ q: inputRef.current.value });

		SUGGEST_URL.searchParams.set('q', inputRef.current.value);
		const data = await suggestionData.executeFetch(SUGGEST_URL.href);

		setWords(data.suggestions);
	}, [setSearchParams, suggestionData]);

	const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		async (e) => {
			e.preventDefault();
			if (inputRef.current?.value === null || inputRef.current?.value === undefined) return;

			await insertData.executeFetch(INSERT_URL.href, {
				method: 'POST',
				body: JSON.stringify({
					word: inputRef.current.value,
				}),
			});

			inputRef.current.value = '';
			setSuggestedWords();
		},
		[insertData, setSuggestedWords]
	);

	const handleDeleteWord: MouseEventHandler<HTMLSpanElement> = useCallback(
		async (e) => {
			const target = e.currentTarget as HTMLElement;

			await deleteData.executeFetch(DELETE_URL.href, {
				method: 'DELETE',
				body: JSON.stringify({
					word: target.previousSibling?.textContent ?? '',
				}),
			});

			if (inputRef.current?.value === null || inputRef.current?.value === undefined) return;

			inputRef.current.value = '';
			setSuggestedWords();
		},
		[deleteData, setSuggestedWords]
	);

	return (
		<div className="autocomplete-server">
			<Header headerName="Server" navigateTo="client" />
			<SearchForm inputRef={inputRef} onSubmit={onSubmit} setSuggestedWords={setSuggestedWords} />
			<WordList words={words} onDeleteWord={handleDeleteWord} />
		</div>
	);
}

export default AutocompleteServer;
