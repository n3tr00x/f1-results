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
		const { position, number, name, team, code, q1, q2, q3 } = driver;

		const elements = [
			createHTMLElement('td', position),
			createHTMLElement('td', number),
			createHTMLElement('td', null, {
				children: [
					createHTMLElement('span', code, { className: 'code' }),
					createHTMLElement('span', name, { className: 'full-name' }),
				],
			}),
			createHTMLElement('td', team),
			createHTMLElement('td', q1),
			createHTMLElement('td', q2),
			createHTMLElement('td', q3),
		];

		return Row(elements, `${name} (${team})`);
	});

	return createHTMLElement('tbody', null, {
		children: result,
	});
};

export const RaceResult = () => {
	const resultList = getRaceResult();

	const result = resultList.map(driver => {
		const { position, number, name, code, team, time, laps, points } =
			driver;

		const elements = [
			createHTMLElement('td', position),
			createHTMLElement('td', number),
			createHTMLElement('td', null, {
				children: [
					createHTMLElement('span', code, { className: 'code' }),
					createHTMLElement('span', name, { className: 'full-name' }),
				],
			}),
			createHTMLElement('td', team),
			createHTMLElement('td', time),
			createHTMLElement('td', laps),
			createHTMLElement('td', points),
		];

		return Row(elements, `${name} (${team})`);
	});

	return createHTMLElement('tbody', null, {
		children: result,
	});
};

export default Table;
