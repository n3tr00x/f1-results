import createHTMLElement from '../../utils/createHTMLElement';

const Loader = (content, isLoading) => {
	if (isLoading) {
		const loader = createHTMLElement('span', null, {
			className: 'loader',
		});
		content.appendChild(loader);
	} else {
		content.querySelector('.loader').remove();
	}
};

export default Loader;
