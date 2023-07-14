import createHTMLElement from '../../utils/createHTMLElement';
import DriverTooltip from '../tooltips/DriverTooltip';

const Row = (elements, driverName) => {
	const row = createHTMLElement('tr', null, {
		children: elements,
		attrs: {
			['data-tooltip']: driverName,
		},
	});

	const rowClickHandler = event => {
		const body = document.querySelector('body');
		const tooltip = DriverTooltip(event.currentTarget.dataset.tooltip);

		body.appendChild(tooltip);

		setTimeout(() => {
			tooltip.remove();
		}, 1000);
	};

	const checkInnerWidth = () => {
		if (window.innerWidth > 991)
			row.removeEventListener('click', rowClickHandler);
		else row.addEventListener('click', rowClickHandler);
	};

	checkInnerWidth();

	window.addEventListener('resize', () => {
		checkInnerWidth();
	});

	return row;
};

export default Row;
