import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavRoute } from '../../../routes';

import './navigation-tree.css';

type Props = {
	depth: number;
} & NavRoute;

export default function NavigationTree({ children, depth, name, path }: Props): JSX.Element {
	const [isExpanded, setExpanded] = useState<boolean>(false);

	const handleBtnClick = () => {
		setExpanded((prev) => !prev);
	};

	return (
		<>
			<div className="nav-leaf">
				{children ? (
					<div className="nav-leaf-item" onClick={handleBtnClick}>
						<span>{name}</span>
						<span className="nav-leaf-expand-icon" style={{ transform: isExpanded ? 'rotate(180deg)' : 'unset' }}>
							&#8963;
						</span>
					</div>
				) : (
					<NavLink key={path} to={path ?? ''}>
						{name}
					</NavLink>
				)}
			</div>

			<div className="nav-branch" style={{ display: isExpanded ? 'flex' : 'none', paddingLeft: `${depth * 10}px` }}>
				{children?.map((childRoute) => {
					const childPath = `${path}/${childRoute.path}`;
					const childName = childRoute.name;
					return <NavigationTree key={childPath} children={childRoute.children} name={childName} path={childPath} depth={depth + 1} />;
				})}
			</div>
		</>
	);
}
