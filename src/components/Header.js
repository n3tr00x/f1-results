import createHTMLElement from '../utils/createHTMLElement';
import Wrapper from './Wrapper';

const Header = () => {
	const brandName = createHTMLElement('h1', 'F1 RESULTS', {
		className: 'header__title',
	});

	return createHTMLElement('header', null, {
		className: 'header',
		children: [Wrapper([brandName])],
	});
};

export default Header;
