const resetActiveTab = () => {
	const tabs = document.querySelectorAll('.results-tabs__button');

	tabs.forEach(tab => {
		if (tab.getAttribute('data-tab') === 'race') {
			tab.classList.add('results-tabs__button--active');
		} else {
			tab.classList.remove('results-tabs__button--active');
		}
	});
};

export default resetActiveTab;
