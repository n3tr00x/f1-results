import createHTMLElement from './utils/createHTMLElement';
import Header from './components/Header';
import Main from './components/Main';

const App = () => {
	const header = Header();
	const main = Main();

	return createHTMLElement('div', null, {
		attrs: {
			id: 'root',
		},
		children: [header, main],
	});
};

export default App;
