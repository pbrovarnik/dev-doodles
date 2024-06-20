import { RouteObject } from 'react-router-dom';

import CheckoutLines from './checkout-lines/checkout-lines';
import CommentsTree from './comments-tree/comments-tree';
import Connect4 from './connect4/connect4';
import CurrencyConverter from './currency-converter/currency-converter';
import DebounceSearch from './debounce-search/debounce-search';
import Dots from './dots/dots';
import GetCssSelector from './get-css-selector/get-css-selector';
import Home from './home/home';
import NestedComments from './nested-comments/nested-comments';
import NestedDropdowns from './nested-dropdowns/nested-dropdowns';
import SodokuBoard from './sodoku-board/sodoku-board';
import StopWatch from './stop-watch/stop-watch';
import TicTacToe from './tic-tac-toe/tic-tac-toe';
import TrieAutocomplete from './trie-autocomplete/trie-autocomplete';
import AutocompleteClient from './trie-autocomplete/routes/autocomplete-client';
import AutocompleteServer from './trie-autocomplete/routes/autocomplete-server';
import ErrorPage from './error-page/error-page';
import Layout from './layout/layout';
import { upperCaseFirstLetter } from '../utils/helper-utils';
import FolderStructure from './folder-structure/folder-structure';

export type NavRoute = {
	children?: NavRoute[];
	name?: string;
	path?: string;
};

const createRoutesForNav = (routes: RouteObject[]): NavRoute[] => {
	return routes.map(({ path, children }) => {
		const route: NavRoute = {
			name: path
				?.split('-')
				?.map((word) => upperCaseFirstLetter(word))
				?.join(' '),
			path,
		};

		if (children) route.children = createRoutesForNav(children);
		if (path === '/') route.name = 'Home';

		return route;
	});
};

const mainRoutes = [
	{
		index: true,
		path: '/',
		element: <Home />,
	},
	{
		path: 'checkout-lines',
		element: <CheckoutLines />,
	},
	{
		path: 'comments-tree',
		element: <CommentsTree />,
	},
	{
		path: 'connect4',
		element: <Connect4 />,
	},
	{
		path: 'currency-converter',
		element: <CurrencyConverter />,
	},
	{
		path: 'debounce-search',
		element: <DebounceSearch />,
	},
	{
		path: 'dots',
		element: <Dots />,
	},
	{
		path: 'folder-structure',
		element: <FolderStructure />,
	},
	{
		path: 'get-css-selector',
		element: <GetCssSelector />,
	},
	{
		path: 'nested-comments',
		element: <NestedComments />,
	},
	{
		path: 'nested-dropdowns',
		element: <NestedDropdowns />,
	},
	{
		path: 'sodoku-board',
		element: <SodokuBoard />,
	},
	{
		path: 'stop-watch',
		element: <StopWatch />,
	},
	{
		path: 'tic-tac-toe',
		element: <TicTacToe />,
	},
	{
		path: 'trie-autocomplete',
		element: <TrieAutocomplete />,
		children: [
			{
				path: 'client',
				element: <AutocompleteClient />,
			},
			{
				path: 'server',
				element: <AutocompleteServer />,
			},
		],
	},
];

export const navRoutes = createRoutesForNav(mainRoutes);

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: mainRoutes,
			},
		],
	},
];

export default routes;
