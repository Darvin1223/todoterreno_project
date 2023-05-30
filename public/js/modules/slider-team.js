const slider_team = (slideSelector) => {
	const glide = new Glide(slideSelector, {
		type: 'carousel',
		perView: 4,
		breakpoints: {
			1080: {
				perView: 3,
			},
			700: {
				perView: 2,
			},
			470: {
				perView: 1,
			},
		},
	});

	glide.mount();
};

export default slider_team;
