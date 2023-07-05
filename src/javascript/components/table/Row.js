import createHTMLElement from '../../utils/createHTMLElement';

const Row = (elements, driverName) => {
	const row = createHTMLElement('tr', null, {
		children: elements,
		attrs: {
			['data-tooltip']: driverName,
		},
	});

	row.addEventListener('click', event => {
		console.log(event.currentTarget.dataset.tooltip);
	});

	return row;
};

export default Row;
