import { getSeason, setCircuits } from '../state/state';
import { fetchAllCircuits } from '../utils/api';
import createHTMLElement from '../utils/createHTMLElement';
import CircuitsModal from './SeasonScheduleModal';
import Header from './Header';
import Navbar from './Navbar';
import SeasonModal from './SeasonModal';
import Main from './Main';

const App = () => {
	const currentSeason = getSeason();

	fetchAllCircuits(currentSeason).then(circuits => setCircuits(circuits));

	const header = Header();
	const navbar = Navbar();
	const main = Main();
	const seasonModal = SeasonModal();
	const circuitsModal = CircuitsModal();

	return createHTMLElement('div', null, {
		attrs: {
			id: 'root',
		},
		children: [header, navbar, main, seasonModal, circuitsModal],
	});
};

export default App;
