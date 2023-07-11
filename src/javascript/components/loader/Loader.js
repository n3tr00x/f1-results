import createHTMLElement from '../../utils/createHTMLElement';

const Loader = (content, isLoading, isDetailsLoader = false) => {
	if (isLoading) {
		const loader = createHTMLElement('span', null, {
			className: [
				'loader',
				isDetailsLoader ? 'loader--details' : 'loader--main',
			],
		});
		content.appendChild(loader);
	} else {
		content.querySelector('.loader').remove();
	}
};

export default Loader;
