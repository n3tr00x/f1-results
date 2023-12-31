import { getCircuits, getSeason } from '../../state/state';
import { fetchAllCircuits } from '../../utils/api';
import createHTMLElement from '../../utils/createHTMLElement';
import resetActiveTab from '../../utils/resetActiveTab';
import Loader from '../loader/Loader';
import { renderRaceDetails } from '../race_details/RaceDetails';
import {
	renderQualifyingResultContent,
	renderRaceResultContent,
} from '../results/TabContent';

const SeasonScheduleModal = () => {
	const season = getSeason();
	const content = renderSchedule(season);

	const modal = createHTMLElement('div', null, {
		className: 'season-schedule-modal',
		children: [content],
	});

	modal.addEventListener('click', event => {
		event.currentTarget.classList.remove('season-schedule-modal--active');
		document.body.classList.remove('hidden');
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
			Loader(content, true);
			const response = await fetchAllCircuits(season);
			if (response?.error) throw response.message;

			const components = Rounds();
			Loader(content, false);
			components.forEach(component => content.appendChild(component));
		} catch (error) {
			const text = createHTMLElement('p', error, { className: 'error' });
			content.appendChild(text);
			Loader(content, false);
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
		const details = document.querySelector('.race-details');

		resetActiveTab();
		const season = getSeason();
		const round = event.currentTarget.dataset.round;

		results.appendChild(renderRaceResultContent(season, round));
		results.appendChild(renderQualifyingResultContent(season, round));
		details.appendChild(renderRaceDetails(season, round));
	});

	return roundComponent;
};

export default SeasonScheduleModal;
