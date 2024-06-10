import CheckoutLines from './checkout-lines/checkout-lines';
import CommentsTree from './comments-tree/comments-tree';
// import Connect4 from './connect4/connect4';
import CurrencyConverter from './currency-converter/currency-converter';
import DebounceSearch from './debounce-search/debounce-search';
import Dots from './dots/dots';
import FolderStructure from './folder-structure/folder-structure';
import GetCssSelector from './get-css-selector/get-css-selector';
import Home from './home/home';
import NestedComments from './nested-comments/nested-comments';
import NestedDropdowns from './nested-dropdowns/nested-dropdowns';
import SodokuBoard from './sodoku-board/sodoku-board';
import StopWatch from './stop-watch/stop-watch';
import TrieAutocomplete from './trie-autocomplete/routes/autocomplete-client';

type Route = {
	path: string;
	Element: () => JSX.Element;
	name: string;
};

const routes: Route[] = [
	{
		path: '/',
		Element: Home,
		name: 'Home',
	},
	{
		path: 'checkout-lines',
		Element: CheckoutLines,
		name: 'Checkout Lines',
	},
	{
		path: 'comments-tree',
		Element: CommentsTree,
		name: 'Comments Tree',
	},
	// {
	// 	path: 'connect4',
	// 	Element: Connect4,
	// 	name: 'Connect4',
	// },
	{
		path: 'currency-converter',
		Element: CurrencyConverter,
		name: 'Currency Converter',
	},
	{
		path: 'debounce-search',
		Element: DebounceSearch,
		name: 'Debounce Search',
	},
	{
		path: 'dots',
		Element: Dots,
		name: 'Dots',
	},
	{
		path: 'folder-structure',
		Element: FolderStructure,
		name: 'Folder Structure',
	},
	{
		path: 'get-css-selector',
		Element: GetCssSelector,
		name: 'Get Css Selector',
	},
	{
		path: 'nested-comments',
		Element: NestedComments,
		name: 'Nested Comments',
	},
	{
		path: 'nested-dropdowns',
		Element: NestedDropdowns,
		name: 'Nested Dropdowns',
	},
	{
		path: 'sodoku-board',
		Element: SodokuBoard,
		name: 'Sodoku Board',
	},
	{
		path: 'stop-watch',
		Element: StopWatch,
		name: 'Stop Watch',
	},
	{
		path: 'trie-autocomplete',
		Element: TrieAutocomplete,
		name: 'Trie Autocomplete',
	},
];

export default routes;
