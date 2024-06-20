import { Outlet } from 'react-router-dom';
import { navRoutes } from '../routes';
import ThemeToggle from '../../components/theme-toggle/theme-toggle';
import NavigationTree from './components/recursive-nav-link/navigation-tree';

import './layout.css';

function Layout() {
	return (
		<div className="layout">
			<aside className="sidebar paper-layout ">
				<h2 className="title">Dev Doodles</h2>
				<nav className="navigation-links">
					{navRoutes?.map((route) => (
						<NavigationTree key={route.path} {...route} depth={1} />
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
