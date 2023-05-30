export default class Slider {
	constructor(sliderClass, glidejs, options) {
		Object.assign(this, {
			sliderClass,
			plugin: glidejs,
			options,
		});
	}

	mount = () => {
		const slider = new this.plugin(this.sliderClass, this.options).mount();
	};

	init = () => {
		this.mount();
	};
}
