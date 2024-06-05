import { FC, MouseEventHandler } from 'react';

type Props = {
	words: string[];
	onDeleteWord: MouseEventHandler<HTMLSpanElement>;
};

const WordList: FC<Props> = ({ words, onDeleteWord }) => {
	return (
		<div className="word-list">
			{words.map((word) => (
				<div className="word-container" key={word}>
					<span>{word}</span>
					<span onClick={onDeleteWord}>x</span>
				</div>
			))}
		</div>
	);
};

export default WordList;
