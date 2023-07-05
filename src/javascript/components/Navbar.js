import createHTMLElement from '../utils/createHTMLElement';
import { renderContent as renderSchedule } from './SeasonScheduleModal';
import calendar from '../assets/calendar.svg';
import lastRace from '../assets/last-race.svg';
import grandPrix from '../assets/grand-prix.svg';
import { renderRaceResultContent } from './results/ResultContent';

const Navbar = () => {
	const seasonButton = createButtonWithIcon('Wybierz sezon', calendar);
	const lastRaceButton = createButtonWithIcon('Ostatni wyścig', lastRace);
	const grandPrixButton = createButtonWithIcon('Grand Prix', grandPrix);

	seasonButton.addEventListener('click', () => {
		const modal = document.querySelector('.season-modal');
		modal.classList.add('season-modal--active');
	});

	grandPrixButton.addEventListener('click', () => {
		const modal = document.querySelector('.season-schedule-modal');
		modal.classList.add('season-schedule-modal--active');

		const schedule = renderSchedule();
		modal.appendChild(schedule);
	});

	lastRaceButton.addEventListener('click', () => {
		const content = document.querySelector('.results-content');
		const result = renderRaceResultContent('current', 'last');

		content.appendChild(result);
	});

	const menuItems = [
		createHTMLElement('li', null, { children: [seasonButton] }),
		createHTMLElement('li', null, { children: [lastRaceButton] }),
		createHTMLElement('li', null, { children: [grandPrixButton] }),
	];

	const menu = createHTMLElement('ul', null, { children: menuItems });

	return createHTMLElement('nav', null, {
		className: 'mobile-nav',
		children: [menu],
	});
};

const createButtonWithIcon = (text, image, buttonName) => {
	const icon = createHTMLElement('img', null, {
		classList: 'icon',
		attrs: { src: image },
	});
	const desc = createHTMLElement('span', text);
	const button = createHTMLElement('button', null, {
		className: buttonName,
		children: [icon, desc],
	});

	return button;
};

export default Navbar;
