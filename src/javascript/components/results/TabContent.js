import createHTMLElement from '../../utils/createHTMLElement';
import { fetchQualifyingResult, fetchRaceResult } from '../../utils/api';
import Table, { QualifyingResult, RaceResult } from '../table/Table';
import Loader from '../Loader';

const TabContent = () => {
	const raceResultContent = renderRaceResultContent('current', 'last');
	const qualifyingResultContent = renderQualifyingResultContent(
		'current',
		'last'
	);

	return createHTMLElement('div', null, {
		className: 'results-content',
		children: [qualifyingResultContent, raceResultContent],
	});
};

export const renderRaceResultContent = (season, round) => {
	const contentContainer = document.querySelector('.results-content__race');

	if (contentContainer) contentContainer.remove();

	const content = createHTMLElement('div', null, {
		className: ['results-content__race', 'results-content--active'],
		attrs: {
			['data-tab']: 'race',
		},
	});

	const headings = [
		'POS',
		'NUM',
		'KIEROWCA',
		'ZESPÓŁ',
		'OKRĄŻENIA',
		'CZAS',
		'PKT',
	];

	const getData = async (season, round) => {
		try {
			content.appendChild(Loader(true));
			const response = await fetchRaceResult(season, round);
			if (response?.error) throw response.message;

			const tableBody = RaceResult();
			const table = Table(headings, tableBody);
			Loader(false);
			content.appendChild(table);
		} catch (error) {
			const text = createHTMLElement('p', error);
			content.appendChild(text);
			Loader(false);
		}
	};

	getData(season, round);

	return content;
};

export const renderQualifyingResultContent = (season, round) => {
	const contentContainer = document.querySelector(
		'.results-content__qualifying'
	);

	if (contentContainer) contentContainer.remove();

	const content = createHTMLElement('div', null, {
		className: 'results-content__qualifying',
		attrs: {
			['data-tab']: 'qualifying',
		},
	});

	const headings = ['POS', 'NUM', 'KIEROWCA', 'ZESPÓŁ', 'Q1', 'Q2', 'Q3'];

	const getData = async (season, round) => {
		try {
			content.appendChild(Loader(true));

			const response = await fetchQualifyingResult(season, round);
			if (response?.error) throw response.message;

			const tableBody = QualifyingResult();
			const table = Table(headings, tableBody);

			Loader(false);
			content.appendChild(table);
		} catch (error) {
			const text = createHTMLElement('p', error);
			content.appendChild(text);
			Loader(false);
		}
	};

	getData(season, round);

	return content;
};

export default TabContent;
