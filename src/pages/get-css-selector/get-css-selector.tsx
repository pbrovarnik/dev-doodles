import { MouseEventHandler } from 'react';
import './get-css-selector.css';

export default function GetCssSelector() {
	const getCssSelector = (element: HTMLElement | null) => {
		if (!element) return;

		if (element.id) return `#${element.id}`;

		const path = [];

		while (element) {
			let selector = element.localName;
			let className = '';

			if (element.id) {
				selector += `#${element.id}`;
				path.unshift(selector);
				break;
			}

			if (element.className) {
				element.classList.forEach((name) => (className += `.${name}`));
				selector += className;
			}

			const siblings = Array.from(element.parentNode?.children ?? []);
			const filteredSiblings = siblings.filter((sibling) => `${sibling.localName}${className}` === selector);

			if (filteredSiblings.length > 1) selector += `:nth-of-type(${filteredSiblings.indexOf(element) + 1})`;

			path.unshift(selector);
			element = element.parentElement;
		}

		return path.join(' > ');
	};

	const handleAppClick: MouseEventHandler<HTMLElement> = (element) => {
		const cssSelector = getCssSelector(element.target as HTMLElement);

		alert(`Selector: ${cssSelector}`);
	};

	return (
		<div className="app" id="app" onClick={handleAppClick}>
			<h1 id="first-child">hello</h1>
			<div className="child">child 2</div>
			<div id="child">
				<p className="nested">nested child 1</p>
				<p className="nested">nested child 2</p>
			</div>
			<div className="child">
				<span className="nested">nested child 3</span>
				<div className="nested">nested child 4</div>
			</div>
		</div>
	);
}
