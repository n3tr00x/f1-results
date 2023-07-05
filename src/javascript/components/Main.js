import createHTMLElement from '../utils/createHTMLElement';
import Results from './results/Results';

const Main = () => {
	const results = Results();

	return createHTMLElement('main', null, {
		className: 'main',
		children: [results],
	});
};

export default Main;
