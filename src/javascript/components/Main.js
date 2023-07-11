import createHTMLElement from '../utils/createHTMLElement';
import Wrapper from './Wrapper';
import RaceDetails from './race_details/RaceDetails';
import Results from './results/Results';

const Main = () => {
	const raceDetails = RaceDetails();
	const results = Results();

	return createHTMLElement('main', null, {
		className: 'main',
		children: [Wrapper([raceDetails, results])],
	});
};

export default Main;
