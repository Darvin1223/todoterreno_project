export default class Browser {
	constructor(browser, province, municipality, searchButton) {
		Object.assign(this, {
			browser: document.querySelector(browser),
			province: document.querySelector(province),
			municipality: document.querySelector(municipality),
			searchButton: document.querySelector(searchButton),
		});
	}

	handlerKeyboard = (event) => {
		if (event.key === 'Enter') {
			location.href = `propiedades?page=1&title=${this.browser.value}&province=${this.province.value}&municipality=${this.municipality.value}`;
		}
	};

	handlerSubmit = (event) => {
		location.href = `propiedades?page=1&title=${this.browser.value}&province=${this.province.value}&municipality=${this.municipality.value}`;
	};

	init = () => {
		this.browser.addEventListener('keyup', this.handlerKeyboard);
		this.searchButton.addEventListener('click', this.handlerSubmit, true);
	};
}
