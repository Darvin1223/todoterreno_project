const buttonsPagination = () => {
	const btnPrev = document.querySelector('.pagination__link--prev');
	const btnNext = document.querySelector('.pagination__link--next');
	const buttons = Array.from(document.querySelectorAll('[data-btn-link]'));
	const lastButton = buttons[buttons.length - 1];
	const firstButton = buttons[0];

	const querySearch = location.search;
	const queryParamsDefault = new URLSearchParams(querySearch);
	const queryParamsPrev = new URLSearchParams(querySearch);
	const queryParamsNext = new URLSearchParams(querySearch);
	const newPageNumberNext = Number(queryParamsDefault.get('page')) + 1;
	const newPageNumberPrev = Number(queryParamsDefault.get('page')) - 1;

	queryParamsPrev.set('page', `${newPageNumberPrev}`);
	btnPrev.href = `propiedades?${queryParamsPrev.toString()}`;

	queryParamsNext.set('page', `${newPageNumberNext}`);
	btnNext.href = `propiedades?${queryParamsNext.toString()}`;

	const handlerDisabledClick = (event) => {
		event.preventDefault();
	};

	if (Number(lastButton.textContent) === Number(queryParamsDefault.get('page'))) {
		btnNext.classList.add('pagination__link--disabled');
		btnNext.addEventListener('click', handlerDisabledClick);
	}

	if (Number(firstButton.textContent) === Number(queryParamsDefault.get('page'))) {
		btnPrev.classList.add('pagination__link--disabled');
		btnPrev.addEventListener('click', handlerDisabledClick);
	}
};

export default buttonsPagination;
