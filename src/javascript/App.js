import { getSeason, setCircuits } from './state/state';
import { fetchAllCircuits } from './utils/api';
import createHTMLElement from './utils/createHTMLElement';
import CircuitsModal from './components/SeasonScheduleModal';
import Header from './components/Header';
import Navbar from './components/navbar/Navbar';
import SeasonModal from './components/SeasonModal';
import Main from './components/Main';

const App = () => {
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
