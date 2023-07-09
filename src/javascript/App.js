import createHTMLElement from './utils/createHTMLElement';
import Header from './components/Header';
import Navbar from './components/navbar/Navbar';
import Main from './components/Main';

const App = () => {
	const header = Header();
	const navbar = Navbar();
	const main = Main();

	return createHTMLElement('div', null, {
		attrs: {
			id: 'root',
		},
		children: [header, navbar, main],
	});
};

export default App;
