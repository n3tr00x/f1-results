import { fetchRaceResult } from '../../utils/api';
import createHTMLElement from '../../utils/createHTMLElement';
import Table from './Table';

const TabContent = () => {
	const qualifyingResultContent = createHTMLElement('div', null, {
		className: 'results-content__qualifying',
		attrs: {
			['data-tab']: 'qualifying',
		},
		children: [],
	});

	const raceResultContent = renderRaceResultContent('current', 'last');

	return createHTMLElement('div', null, {
		className: 'results-content',
		children: [qualifyingResultContent, raceResultContent],
	});
};

export const renderRaceResultContent = (season, round) => {
	const raceContent = document.querySelector('.results-content__race');

	if (raceContent) raceContent.remove();

	const raceResultContent = createHTMLElement('div', null, {
		className: ['results-content__race', 'results-content--active'],
		attrs: {
			['data-tab']: 'race',
		},
	});

	fetchRaceResult(season, round).then(() => {
		const table = Table();
		raceResultContent.appendChild(table);
	});

	return raceResultContent;
};

export default TabContent;
