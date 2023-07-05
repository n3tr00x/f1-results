import { getCircuits, getSeason } from '../state/state';
import { fetchAllCircuits } from '../utils/api';
import createHTMLElement from '../utils/createHTMLElement';
import resetActiveTab from '../utils/resetActiveTab';
import Loader from './Loader';
import {
	renderQualifyingResultContent,
	renderRaceResultContent,
} from './results/TabContent';

const SeasonScheduleModal = () => {
	const season = getSeason();
	const content = renderSchedule(season);

	const modal = createHTMLElement('div', null, {
		className: 'season-schedule-modal',
		children: [content],
	});

	modal.addEventListener('click', event => {
		event.currentTarget.classList.remove('season-schedule-modal--active');
	});

	return modal;
};

export const renderSchedule = season => {
	const contentContainer = document.querySelector(
		'.season-schedule__content'
	);

	if (contentContainer) contentContainer.remove();

	const content = createHTMLElement('div', null, {
		className: 'season-schedule__content',
	});

	const getData = async season => {
		try {
			content.appendChild(Loader(true, content));
			const response = await fetchAllCircuits(season);
			if (response?.error) throw response.message;

			const components = Rounds();
			Loader(false, content);
			components.forEach(component => content.appendChild(component));
		} catch (error) {
			const text = createHTMLElement('p', error);
			content.appendChild(text);
			Loader(false);
		}
	};

	getData(season);

	return content;
};

const Rounds = () => {
	const circuits = getCircuits();

	return circuits.map(circuit => RoundComponent(circuit));
};

const RoundComponent = ({ name, country, date, flag, round }) => {
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

		resetActiveTab();
		const season = getSeason();
		const round = event.currentTarget.dataset.round;

		results.appendChild(renderRaceResultContent(season, round));
		results.appendChild(renderQualifyingResultContent(season, round));
	});

	return roundComponent;
};

export default SeasonScheduleModal;
