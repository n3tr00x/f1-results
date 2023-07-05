import createHTMLElement from '../../utils/createHTMLElement';

const Row = elements => {
	return createHTMLElement('tr', null, {
		children: elements,
	});
};

export default Row;
