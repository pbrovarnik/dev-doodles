import { Link, Outlet } from 'react-router-dom';
import routes from '../routes';

import './root.css';

export default function Root() {
	return (
		<div className="side-bar">
			<h1 className="title">Dev Doodles</h1>
			<nav className="navigation-bar">
				<ul>
					{routes.map(({ name, path }) => (
						<li key={path}>
							<Link to={path}>{name}</Link>
						</li>
					))}
				</ul>
			</nav>
			<div className="detail">
				<Outlet />
			</div>
		</div>
	);
}
