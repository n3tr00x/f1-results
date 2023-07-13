import { getRaceDetails, getRound, getSeason } from '../../state/state';
import { fetchRaceDetails } from '../../utils/api';
import createHTMLElement from '../../utils/createHTMLElement';
import Loader from '../loader/Loader';

const RaceDetails = () => {
	const details = renderRaceDetails('current', 'last');

	return createHTMLElement('div', null, {
		className: 'race-details',
		children: [details],
	});
};

export const renderRaceDetails = (season, round) => {
	const contentContainer = document.querySelector('.race-details__content');

	if (contentContainer) contentContainer.remove();

	const content = createHTMLElement('div', null, {
		className: 'race-details__content',
	});

	const getData = async (season, round) => {
		try {
			Loader(content, true, true);
			const response = await fetchRaceDetails(season, round);
			if (response?.error) throw response.message;

			const elements = Details();
			Loader(content, false, true);
			elements.forEach(component => content.appendChild(component));
		} catch (error) {
			const text = createHTMLElement('p', error, { className: 'error' });
			content.appendChild(text);
			Loader(content, false, true);
		}
	};

	getData(season, round);

	return content;
};

const Details = () => {
	const details = getRaceDetails();

	const roundText = createHTMLElement(
		'p',
		`Runda ${details.round} (${details.season})`
	);

	const round = createHTMLElement('div', null, {
		className: 'race-details__round',
		children: [roundText],
	});

	const flag = createHTMLElement('img', null, {
		className: 'race-details__flag',
		attrs: {
			src: details.flag,
			alt: `${details.country} nation flag`,
		},
	});

	const information = createHTMLElement('div', null, {
		className: 'race-details__information',
		children: [
			createHTMLElement('h2', details.raceName),
			createHTMLElement('p', `${details.date} - ${details.locality}`),
		],
	});

	return [round, flag, information];
};

export default RaceDetails;
