const buttonNavEl = document.querySelector(".btn-mobile-nav");
const buttonSticky = document.querySelector(".main-nav-list");
const mainNavEl = document.querySelector(".main-nav");

buttonNavEl.addEventListener("click", function () {
	mainNavEl.classList.toggle("nav-open");
});

// Deleting class nav open after pressing some sticky button
buttonSticky.addEventListener("click", function () {
	mainNavEl.classList.remove("nav-open");
});
