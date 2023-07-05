import createHTMLElement from '../utils/createHTMLElement';

const Loader = isLoading => {
	if (!isLoading) document.querySelector('.loader').remove();

	return createHTMLElement('span', null, {
		className: 'loader',
	});
};

export default Loader;
