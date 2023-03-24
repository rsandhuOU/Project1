var champions = document.querySelectorAll('[data-component="slideshow"]');
champions.forEach(slides);

function slides(slideshow) {
	var slides = document.querySelectorAll(`#${slideshow.id} [role="list"] .slide`);

	var x = 0, time = 3000;
	slides[x].classList.add('active');

	setInterval( () => {
		slides[x].classList.remove('active');
		x++;
		if (x === slides.length) x = 0;
		slides[x].classList.add('active');
	}, time);
}