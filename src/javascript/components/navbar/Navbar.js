import createHTMLElement from '../../utils/createHTMLElement';
import { renderSchedule } from '../SeasonScheduleModal';
import calendar from '../../../assets/calendar.svg';
import lastRace from '../../../assets/last-race.svg';
import grandPrix from '../../../assets/grand-prix.svg';
import {
	renderQualifyingResultContent,
	renderRaceResultContent,
} from '../results/TabContent';
import ButtonWithIcon from './ButtonWithIcon';
import resetActiveTab from '../../utils/resetActiveTab';

const Navbar = () => {
	const seasonButton = ButtonWithIcon('Wybierz sezon', calendar);
	const lastRaceButton = ButtonWithIcon('Ostatni wyścig', lastRace);
	const grandPrixButton = ButtonWithIcon('Grand Prix', grandPrix);

	seasonButton.addEventListener('click', () => {
		const modal = document.querySelector('.season-modal');
		modal.classList.add('season-modal--active');
	});

	grandPrixButton.addEventListener('click', () => {
		const modal = document.querySelector('.season-schedule-modal');
		modal.classList.add('season-schedule-modal--active');
	});

	lastRaceButton.addEventListener('click', () => {
		const content = document.querySelector('.results-content');
		const schedule = document.querySelector('.season-schedule-modal');

		resetActiveTab();

		content.appendChild(renderRaceResultContent('current', 'last'));
		content.appendChild(renderQualifyingResultContent('current', 'last'));
		schedule.appendChild(renderSchedule(new Date().getFullYear()));
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

export default Navbar;
