const buttonNavEl = document.querySelector(".btn-mobile-nav");
const buttonSticky = document.querySelector(".main-nav-list");
const mainNavEl = document.querySelector(".main-nav");

buttonNavEl.addEventListener("click", function () {
	mainNavEl.classList.toggle("nav-open");

	// document.body.classList.toggle("no-scroll");

	if (mainNavEl.classList.contains("nav-open")) {
		document.body.classList.add("no-scroll");
	} else {
		document.body.classList.remove("no-scroll");
	}
});

// Deleting class nav open after pressing some sticky button
buttonSticky.addEventListener("click", function () {
	mainNavEl.classList.remove("nav-open");
	document.body.classList.remove("no-scroll");
});
