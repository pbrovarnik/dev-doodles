import { NavLink, Outlet } from 'react-router-dom';
import routes from '../routes';

import './layout.css';

function Layout() {
	return (
		<div className="layout">
			<header className="side-bar">
				<h2 className="title">Dev Doodles</h2>
				<nav className="navigation-links">
					{routes.map(({ name, path }) => (
						<NavLink key={path} to={path}>
							{name}
						</NavLink>
					))}
				</nav>
			</header>
			<main className="main-content">
				<Outlet />
			</main>
		</div>
	);
}

export default Layout;
