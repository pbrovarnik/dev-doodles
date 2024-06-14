import { NavLink, Outlet } from 'react-router-dom';
import routes from '../routes';

import './layout.css';
import ThemeToggle from '../../components/theme-toggle/theme-toggle';

function Layout() {
	return (
		<div className="layout">
			<aside className="sidebar paper-layout ">
				<h2 className="title">DevDoodles</h2>
				<nav className="navigation-links">
					{routes.map(({ name, path }) => (
						<NavLink key={path} to={path}>
							{name}
						</NavLink>
					))}
				</nav>
				<ThemeToggle />
			</aside>
			<main className="main-content paper-layout ">
				<Outlet />
			</main>
		</div>
	);
}

export default Layout;
