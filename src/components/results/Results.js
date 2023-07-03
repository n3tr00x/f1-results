import createHTMLElement from '../../utils/createHTMLElement';
import Tabs from './ResultTabs';
import TabContent from './ResultContent';

const Results = () => {
	const tabs = Tabs();
	const content = TabContent();

	return createHTMLElement('div', null, {
		className: 'results',
		children: [tabs, content],
	});
};

export default Results;
