import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
	headerName: string;
	navigateTo: string;
};

const Header: FC<Props> = ({ headerName, navigateTo }) => {
	return (
		<>
			<Link to={`/trie-autocomplete/${navigateTo}`}>go to {navigateTo}</Link>
			<h1>{headerName}</h1>
		</>
	);
};

export default Header;
