import { getRaceResult } from '../../state/state';
import createHTMLElement from '../../utils/createHTMLElement';

const Table = () => {
	return createHTMLElement('table', '', {
		children: [Headings(), Result()],
	});
};

const Result = () => {
	const resultList = getRaceResult();

	const result = resultList.map(driver => {
		const rows = Object.values(driver);
		const elements = rows.map(row => createHTMLElement('td', row));

		return Row(elements);
	});

	return createHTMLElement('tbody', null, {
		children: result,
	});
};

const Row = elements => {
	return createHTMLElement('tr', null, {
		children: elements,
	});
};

const Headings = () => {
	const headingsList = [
		'POS',
		'NUM',
		'KIEROWCA',
		'ZESPÓŁ',
		'OKRĄŻENIA',
		'CZAS',
		'PKT',
	];

	const headings = headingsList.map(heading =>
		createHTMLElement('th', heading)
	);

	return createHTMLElement('thead', null, {
		children: [Row(headings)],
	});
};

export default Table;
