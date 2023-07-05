import { getCircuits, getSeason } from '../state/state';
import createHTMLElement from '../utils/createHTMLElement';
import { renderRaceResultContent } from './results/ResultContent';

const SeasonScheduleModal = () => {
	const modal = createHTMLElement('div', null, {
		className: 'season-schedule-modal',
	});

	modal.addEventListener('click', event => {
		event.currentTarget.firstElementChild.remove();
		event.currentTarget.classList.remove('season-schedule-modal--active');
	});

	return modal;
};

export const renderContent = () => {
	const circuits = getCircuits();

	const rounds = circuits.map(circuit => RoundComponent(circuit));

	const content = createHTMLElement('div', null, {
		className: 'season-schedule__content',
		children: rounds,
	});

	return content;
};

const RoundComponent = ({ name, flag, country, round, date }) => {
	const countryName = createHTMLElement('h2', `${country} (${date})`);
	const raceName = createHTMLElement('p', name);

	const informationWrapper = createHTMLElement('div', null, {
		children: [countryName, raceName],
	});

	const nationFlag = createHTMLElement('img', null, {
		attrs: {
			src: flag,
			alt: country + ' nation flag',
		},
	});

	const roundText = createHTMLElement('div', null, {
		className: 'round-text',
		children: [createHTMLElement('span', round)],
	});

	const roundComponent = createHTMLElement('div', null, {
		className: 'season-schedule-modal__round',
		children: [roundText, nationFlag, informationWrapper],
		attrs: {
			['data-round']: round,
		},
	});

	roundComponent.addEventListener('click', event => {
		const results = document.querySelector('.results-content');
		const season = getSeason();
		const round = event.currentTarget.dataset.round;

		results.appendChild(renderRaceResultContent(season, round));
	});

	return roundComponent;
};

export default SeasonScheduleModal;
