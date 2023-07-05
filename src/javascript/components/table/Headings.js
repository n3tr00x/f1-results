import createHTMLElement from '../../utils/createHTMLElement';
import Row from './Row';

const Headings = headingsList => {
	// const headingsList = ['POS', 'NUM', 'KIEROWCA', 'ZESPÓŁ', 'Q1', 'Q2', 'Q3'];

	const headings = headingsList.map(heading =>
		createHTMLElement('th', heading)
	);

	return createHTMLElement('thead', null, {
		children: [Row(headings)],
	});
};

export default Headings;
