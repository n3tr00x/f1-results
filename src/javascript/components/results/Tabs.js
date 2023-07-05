import createHTMLElement from '../../utils/createHTMLElement';

const Tabs = () => {
	const qualifyingResultButton = createHTMLElement('button', 'Kwalifikacje', {
		className: 'results-tabs__button',
		attrs: {
			['data-tab']: 'qualifying',
		},
	});
	const raceResultButton = createHTMLElement('button', 'Wyścig', {
		className: ['results-tabs__button', 'results-tabs__button--active'],
		attrs: {
			['data-tab']: 'race',
		},
	});

	const buttons = [qualifyingResultButton, raceResultButton];

	buttons.forEach(button => {
		button.addEventListener('click', event => {
			const tabId = event.target.dataset.tab;
			const contents = document.querySelectorAll('.results-content div');

			buttons.forEach(button =>
				button.classList.remove('results-tabs__button--active')
			);
			contents.forEach(content =>
				content.classList.remove('results-content--active')
			);

			const activeContent = document.querySelector(
				`.results-content div[data-tab="${tabId}"]`
			);
			activeContent.classList.add('results-content--active');
			event.target.classList.add('results-tabs__button--active');
		});
	});

	return createHTMLElement('div', null, {
		className: 'results-tabs',
		children: [qualifyingResultButton, raceResultButton],
	});
};

export default Tabs;
