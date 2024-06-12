import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import routes from './routes/routes';
import ErrorPage from './components/error-page/error-page';
import Layout from './routes/layout/layout';

import './index.css';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
			<Route errorElement={<ErrorPage />}>
				{routes.map(({ name, path, Element }) => (name === 'index' ? <Route key={path} index element={<Element />} /> : <Route key={path} path={path} element={<Element />} />))}
			</Route>
		</Route>
	),
	{
		basename: '/dev-doodles',
	}
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
