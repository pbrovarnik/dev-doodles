import { FC, FormEventHandler, RefObject } from 'react';
import { debounce } from '../../../utils/helper-utils';

const TIMEOUT_DURATION = 300;

type Props = {
	inputRef: RefObject<HTMLInputElement>;
	onSubmit: FormEventHandler<HTMLFormElement>;
	setSuggestedWords: () => void;
};

const SearchForm: FC<Props> = ({ inputRef, onSubmit, setSuggestedWords }) => {
	return (
		<form className="ac-search-form" onSubmit={onSubmit}>
			<input ref={inputRef} onChange={debounce(() => setSuggestedWords(), TIMEOUT_DURATION)} placeholder="type something..." />
			<button type="submit">Save</button>
		</form>
	);
};

export default SearchForm;
