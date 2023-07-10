import createHTMLElement from '../../utils/createHTMLElement';
import DriverTooltip from '../tooltips/DriverTooltip';

const Row = (elements, driverName) => {
	const row = createHTMLElement('tr', null, {
		children: elements,
		attrs: {
			['data-tooltip']: driverName,
		},
	});

	row.addEventListener('click', event => {
		const body = document.querySelector('body');
		const tooltip = DriverTooltip(event.currentTarget.dataset.tooltip);

		body.appendChild(tooltip);

		setTimeout(() => {
			tooltip.remove();
		}, 1000);
	});

	return row;
};

export default Row;
