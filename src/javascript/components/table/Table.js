import { getQualifyingResult, getRaceResult } from '../../state/state';
import createHTMLElement from '../../utils/createHTMLElement';
import Headings from './Headings';
import Row from './Row';

const Table = (headingsList, resultTableBody) => {
	const headings = Headings(headingsList);

	return createHTMLElement('table', null, {
		children: [headings, resultTableBody],
	});
};

export const QualifyingResult = () => {
	const resultList = getQualifyingResult();

	const result = resultList.map(driver => {
		const rows = Object.values(driver);
		const elements = rows.map(row => createHTMLElement('td', row));

		return Row(elements);
	});

	return createHTMLElement('tbody', null, {
		children: result,
	});
};

export const RaceResult = () => {
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

export default Table;
