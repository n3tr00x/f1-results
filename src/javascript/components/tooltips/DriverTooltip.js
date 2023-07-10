import createHTMLElement from '../../utils/createHTMLElement';

const DriverTooltip = text => {
	const p = createHTMLElement('p', text);

	return createHTMLElement('div', null, {
		className: 'driver-tooltip',
		children: [p],
	});
};

export default DriverTooltip;
