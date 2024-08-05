import { useEffect, useRef, useState } from 'react';
import { words } from './words';
import './wordle.css';

const WORDS_LENGTH = 5;

export default function Wordle() {
	// state hooks
	const [attemptedWords, setAttemptedWords] = useState<(string | null)[]>(new Array(6).fill(null));
	const [attemptedWord, setAttemptedWord] = useState('');
	const [isGameOver, setIsGameOver] = useState(false);
	const [gameOverMsg, setGameOverMsg] = useState('');

	const wordToGuessRef = useRef('');

	const setRandomWord = () => {
		// get words and pick a random word from the list
		const randomWord = words[Math.floor(Math.random() * words.length)];
		// store random word in state as wordToGuess
		wordToGuessRef.current = randomWord.toLowerCase();
	};

	useEffect(() => {
		setRandomWord();
	}, []);

	useEffect(() => {
		if (isGameOver) return;

		const handleKeyPress = (e: KeyboardEvent) => {
			if ((e.key.match(/^[A-Za-z]+$/) && e.key.length === 1) || e.key === 'Backspace') {
				setAttemptedWord((prev) => {
					if (e.key === 'Backspace') return prev.slice(0, -1);
					if (prev.length >= WORDS_LENGTH) return prev;

					return (prev += e.key.toLowerCase());
				});
			}

			if (e.key === 'Enter' && attemptedWord.length === WORDS_LENGTH) {
				const emptyRowIdx = attemptedWords.findIndex((val) => val === null);
				if (emptyRowIdx === -1) return;

				setAttemptedWords((prev) => {
					prev[emptyRowIdx] = attemptedWord;
					return prev;
				});

				setAttemptedWord('');

				const isCorrectWord = wordToGuessRef.current === attemptedWord;
				const hasNoMoreAttempts = attemptedWords.length - 1 === emptyRowIdx;

				if (isCorrectWord || hasNoMoreAttempts) {
					setIsGameOver(true);

					if (isCorrectWord) {
						setGameOverMsg('Great guess!');
					} else {
						setGameOverMsg(`Game over, the word was "${wordToGuessRef.current}".`);
					}
				}
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [attemptedWord, attemptedWords, isGameOver]);

	const onReset = () => {
		setRandomWord();
		setAttemptedWords(new Array(6).fill(null));
		setAttemptedWord('');
		setIsGameOver(false);
		setGameOverMsg('');
	};

	// renders
	// input to enter word
	// only allow 5 letter words
	// enter to submit word
	// board of 5x5 squares
	// each square contains a letter
	// once word is submitted, each square gets highlighted based on these rules
	// -letter is correct and in the right position: lightGreen
	// -letter is incorrect: lightGray
	// -letter is included in the word but incorrect postion: lightYellow
	// Gameover:
	// -if word guessed correctly it will show green on the board
	// -if all attempts exhausted show gameover with the correct word

	return (
		<div>
			<p>Type in a 5 letter word and press enter!</p>
			<div className="wordle">
				<div className="wordle-board">
					{attemptedWords.map((guess, idx) => {
						const isCurrentGuess = idx === attemptedWords.findIndex((val) => val === null);
						return <GuessLine key={idx} guess={isCurrentGuess ? attemptedWord : guess ?? ''} wordToGuess={wordToGuessRef.current} isFinal={!isCurrentGuess && guess !== null} />;
					})}
				</div>
				{isGameOver && (
					<>
						<div className="wordle-game-over">{gameOverMsg}</div>
						<button onClick={onReset}>Reset</button>
					</>
				)}
			</div>
		</div>
	);
}

function GuessLine({ guess, wordToGuess, isFinal }: { guess: string; wordToGuess: string; isFinal: boolean }) {
	const letters: string[] = [];

	for (let i = 0; i < WORDS_LENGTH; i++) {
		letters.push(guess[i]);
	}

	return (
		<div className="wordle-row">
			{letters.map((letter, idx) => (
				<WordleCell key={idx} letter={letter} isCorrect={wordToGuess[idx] === letter} hasLetterInWord={wordToGuess.includes(letter)} isFinal={isFinal} />
			))}
		</div>
	);
}

function WordleCell({ letter, isCorrect, hasLetterInWord, isFinal }: { letter: string; isCorrect: boolean; hasLetterInWord: boolean; isFinal: boolean }) {
	let className = 'wordle-cell';

	if (isFinal) {
		if (isCorrect) {
			className += ' correct';
		} else if (hasLetterInWord) {
			className += ' includes';
		} else {
			className += ' incorrect';
		}
	}

	return <div className={className}>{letter}</div>;
}
