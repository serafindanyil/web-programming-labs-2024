const buttonNavEl = document.querySelector(".btn-mobile-nav");
const buttonSticky = document.querySelector(".main-nav-list");
const mainNavEl = document.querySelector(".main-nav");

buttonNavEl.addEventListener("click", function () {
	mainNavEl.classList.toggle("nav-open");

	if (mainNavEl.classList.contains("nav-open")) {
		document.body.style.overflow = "hidden"; // Вимкнути скролл
	} else {
		document.body.style.overflow = "visible"; // Увімкнути скролл
	}
});

// Deleting class nav open after pressing some sticky button
buttonSticky.addEventListener("click", function () {
	mainNavEl.classList.remove("nav-open");
});
