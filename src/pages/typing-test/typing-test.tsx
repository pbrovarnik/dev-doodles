import { useEffect, useRef, useState } from 'react';
import './typing-test.css';

// 	global
// - randomSentence

const RANDOM_SENTENCE =
	'The birch canoe slid on the smooth planks, the young kid jumped the rusty gate, they took the axe and the saw to the forest, a break in the dam almost caused a flood, pages bound in cloth make a book. The pup jerked the leash as he saw a feline shape, the good book informs of what we ought to know, the sky that morning was clear and bright blue, he took the lead and kept it the whole distance. Screw the round cap on as tight as needed, the horse trotted around the field at a brisk pace, jump the fence and hurry up the bank. A sash of gold silk will trim her dress, the slush lay deep along the street, a smatter of French is worse than none. The hilt of the sword was carved with fine designs.';

const DURATION = 60;

export default function TypingTest() {
	// state
	// - timer
	const [timer, setTimer] = useState(DURATION);
	// - deconstructedSentence = []
	const [deconstructedSentence, setDeconstructedSentence] = useState<{ letter: string; isCorrect: boolean | null }[]>([]);
	const [typingSpeep, setTypingSpeed] = useState(0);
	const [accuracy, setAccuracy] = useState(0);

	// derived
	const sentenceIdx = deconstructedSentence.findIndex(({ isCorrect }) => isCorrect === null);

	// ref
	// - intervalTimerRef
	const intervalTimerRef = useRef<number>();
	const correctKeyPressesRef = useRef<number>(0);
	const totalKeyPressesRef = useRef<number>(0);
	const handleKeyPressRef = useRef<(e: KeyboardEvent) => void>();

	// effect onMount
	useEffect(() => {
		// - eventCB()
		handleKeyPressRef.current = ({ key }: KeyboardEvent) => {
			if (key.length > 1) return;

			setDeconstructedSentence((prev) => {
				const sentenceIdx = prev.findIndex(({ isCorrect }) => isCorrect === null);

				if (sentenceIdx < 0) {
					if (handleKeyPressRef.current) removeEventListener('keydown', handleKeyPressRef.current);
					return prev;
				}

				//   -- we need to check if the key is equal to the next letter in the string
				//   --- if sentence[sentenceIdx] === key
				if (prev[sentenceIdx].letter === key) {
					//   ---- sentence[sentenceIdx].isCorrect = true
					prev[sentenceIdx].isCorrect = true;
					//   ---- correctKeyPresses + 1
					correctKeyPressesRef.current++;
				} else {
					//   --- else sentence[sentenceIdx].isCorrect = false
					prev[sentenceIdx].isCorrect = false;
				}

				//   --- totalKeyPresses + 1
				totalKeyPressesRef.current++;

				return [...prev];
			});
		};

		// - keydown eventListener
		addEventListener('keydown', handleKeyPressRef.current);

		// - deconstructedSentece = for each char add an object { char, isCorrect }
		setDeconstructedSentence(RANDOM_SENTENCE.split('').map((letter) => ({ letter, isCorrect: null })));

		// - setInterval inside
		intervalTimerRef.current = setInterval(() => {
			setTimer((prev) => {
				if (prev === 0) {
					clearInterval(intervalTimerRef.current);
					if (handleKeyPressRef.current) removeEventListener('keydown', handleKeyPressRef.current);
					return 0;
				}

				return prev - 1;
			});
		}, 1000);

		// - cleanup
		return () => {
			//   -- clearInterval
			clearInterval(intervalTimerRef.current);
			//   -- remove eventListener
			if (handleKeyPressRef.current) removeEventListener('keydown', handleKeyPressRef.current);
		};
	}, []);

	useEffect(() => {
		if (!deconstructedSentence.length) return;
		// - if timer then return
		if (timer && sentenceIdx >= 0) return;

		// - clearInterval
		clearInterval(intervalTimerRef.current);
		if (handleKeyPressRef.current) removeEventListener('keydown', handleKeyPressRef.current);
		// - calculateWordsPerMin
		//   -- typingSpeed = ((totalKeyPresses ÷ 5) / timer) x 60;
		setTypingSpeed(((totalKeyPressesRef.current || 0) / 5 / (Math.abs(timer - DURATION) || 0)) * 60);
		//   -- accuracy = correctKeyPresses / totalKeyPresses x 100
		setAccuracy(((correctKeyPressesRef.current || 0) / (totalKeyPressesRef.current || 0)) * 100);
	}, [deconstructedSentence, sentenceIdx, timer]);

	// render
	// - timer
	// - map deconstructedSentece and put char in span and set color green for true and red for false
	// - Display the results, including the typing speed and accuracy.
	return (
		<div>
			<div>{timer}</div>
			<div>
				{deconstructedSentence.map(({ letter, isCorrect }, idx) => (
					<span key={idx} style={{ color: isCorrect ? 'lightgreen' : isCorrect === false ? 'red' : undefined }}>
						{letter}
					</span>
				))}
			</div>
			{(!timer || sentenceIdx < 0) && (
				<div>
					<div>{Math.round(typingSpeep)} words per minute</div>
					<div>{accuracy.toFixed(2)}% accuracy</div>
				</div>
			)}
		</div>
	);
}
