import createHTMLElement from '../utils/createHTMLElement';
import { getRound, getSeason, setRound, setSeason } from '../state/state';
import {
	renderQualifyingResultContent,
	renderRaceResultContent,
} from './results/TabContent';
import resetActiveTab from '../utils/resetActiveTab';
import { renderSchedule } from './SeasonScheduleModal';

const SeasonModal = () => {
	const title = createHTMLElement('h2', 'Wybierz sezon:', {
		className: 'season-modal__title',
	});

	const selectSeason = createSelectTag();

	selectSeason.addEventListener('change', async event => {
		const results = document.querySelector('.results-content');
		const schedule = document.querySelector('.season-schedule-modal');

		modal.classList.remove('season-modal--active');
		resetActiveTab();

		setSeason(event.target.value);
		setRound('1');

		const selectedSeason = getSeason();
		const round = getRound();

		results.appendChild(renderRaceResultContent(selectedSeason, round));
		results.appendChild(
			renderQualifyingResultContent(selectedSeason, round)
		);
		schedule.appendChild(renderSchedule(selectedSeason));
	});

	const content = createHTMLElement('div', null, {
		className: 'season-modal__content',
		children: [title, selectSeason],
	});

	const modal = createHTMLElement('div', null, {
		className: 'season-modal',
		children: [content],
	});

	modal.addEventListener('click', event => {
		event.target.classList.remove('season-modal--active');
	});

	return modal;
};

const createSelectTag = () => {
	const firstSeason = 1950;
	const currentSeason = new Date().getFullYear();
	const allSeasons = allSeasonsGenerate(currentSeason, firstSeason, 1);

	const options = allSeasons.map(season =>
		createHTMLElement('option', `Sezon ${season}`, {
			attrs: { value: season },
		})
	);

	const select = createHTMLElement('select', null, {
		className: 'season-modal__seasons',
		children: options,
	});

	return select;
};

const allSeasonsGenerate = (start, stop, step) => {
	return Array.from(
		{ length: (start - stop) / step + 1 },
		(value, index) => start - index * step
	);
};

export default SeasonModal;
