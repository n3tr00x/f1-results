import { getRaceDetails } from '../../state/state';
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

			const component = Details();
			Loader(content, false, true);
			content.appendChild(component);
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

	console.log(details);

	return createHTMLElement('p', details.date);
};

export default RaceDetails;
