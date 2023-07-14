import createHTMLElement from '../utils/createHTMLElement';
import Wrapper from './Wrapper';
import Navbar from './navbar/Navbar';

const Header = () => {
	const navbar = Navbar();

	const brandName = createHTMLElement('h1', 'F1 RESULTS', {
		className: 'header__title',
	});

	const headerContainer = createHTMLElement('div', null, {
		className: 'header__container',
		children: [brandName, navbar],
	});

	return createHTMLElement('header', null, {
		className: 'header',
		children: [Wrapper([headerContainer])],
	});
};

export default Header;
