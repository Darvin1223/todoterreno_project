import Slider from './modules/slider.js';

const d = document;

d.addEventListener('DOMContentLoaded', () => {
	const sliderOptions = {
		type: 'carousel',
		perView: 3,
		breakpoints: {
			1015: {
				perView: 2,
			},
			540: {
				perView: 1,
			},
		},
	};

	const firstSlider = new Slider('.slider-uno', Glide, sliderOptions).init();
	const secondSlider = new Slider('.slider-dos', Glide, sliderOptions).init();
});
