import { Link, useRouteError } from 'react-router-dom';

type RouterError = {
	statusText: string;
	message: string;
};

export default function ErrorPage() {
	const error = useRouteError() as RouterError;
	console.error(error);

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<p>
				Take me <Link to="/">Home</Link>
			</p>
		</div>
	);
}
