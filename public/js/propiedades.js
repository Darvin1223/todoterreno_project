import Browser from './modules/browser.js';
import buttonsPagination from './modules/buttons-pagination.js';

const d = document;

d.addEventListener('DOMContentLoaded', () => {
	const listenerBrowser = new Browser(
		'.browser__search-input',
		'#provincia',
		'#municipio',
		'.browser__search-button'
	).init();

	buttonsPagination();
});
