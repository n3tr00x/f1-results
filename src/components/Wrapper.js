import createHTMLElement from '../utils/createHTMLElement';

const Wrapper = children => {
	return createHTMLElement('div', null, {
		className: 'wrapper',
		children: children,
	});
};

export default Wrapper;
