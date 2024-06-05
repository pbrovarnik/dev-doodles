import { Link } from 'react-router-dom';

export default function Root() {
	return (
		<div id="sidebar">
			<h1>Dev Doodles</h1>
			<nav>
				<ul>
					<li>
						<Link to="dots">Dots</Link>
					</li>
					<li>
						<Link to="sodoku">Sodoku</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
