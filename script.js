/* ==========================================
   MAKITA DCM501 — script.js
========================================== */

/* ==========================
   NAVBAR
========================== */
const navbar = document.querySelector(".navbar");
let navbarActivated = false;

window.addEventListener("scroll", () => {
	if (!navbarActivated && window.scrollY > 50) {
		navbar.classList.add("visible");
		navbarActivated = true;
	}
});

/* ==========================
   NAVEGACIÓN DEL MENÚ (centra la sección destino en pantalla)
========================== */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener("click", (e) => {
		const target = document.querySelector(link.getAttribute("href"));
		if (!target) return;
		e.preventDefault();
if (target.id === "inicio") {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
} else {
		const targetRect = target.getBoundingClientRect();
		const targetCenter = targetRect.top + targetRect.height / 2;
		const viewportCenter = window.innerHeight / 2;
		const scrollTarget = window.scrollY + (targetCenter - viewportCenter);

		window.scrollTo({ top: scrollTarget, behavior: "smooth" });

		if (navbar.classList.contains("active")) {
			navbar.classList.remove("active");
		}
	});
});


/* ==========================
   PREGUNTAS FRECUENTES
========================== */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
	const question = item.querySelector(".faq-question");
	question.addEventListener("click", () => {
		item.classList.toggle("open");
	});
});

/* ==========================
   MENÚ HAMBURGUESA
========================== */
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle) {
	menuToggle.addEventListener("click", () => {
		navbar.classList.toggle("active");
	});
}

document.addEventListener("click", (e) => {
	if (
		navbar.classList.contains("active") &&
		!navbar.contains(e.target)
	) {
		navbar.classList.remove("active");
	}
});

/* ==========================
   REVEAL AL HACER SCROLL
========================== */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("active");
			}
		});
	},
	{ threshold: 0.15 }
);

reveals.forEach((item) => revealObserver.observe(item));

/* ==========================
   CARRUSEL DE PASOS
========================== */
const slideMedias = document.querySelectorAll(".slide-media");
const captions = document.querySelectorAll(".caption");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;

function showSlide(index) {
	slideMedias.forEach((slide, i) => {
		slide.classList.toggle("active", i === index);
	});
	captions.forEach((caption, i) => {
		caption.classList.toggle("active", i === index);
	});
	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === index);
	});
}

if (nextBtn && prevBtn) {
	nextBtn.addEventListener("click", () => {
		currentSlide = (currentSlide + 1) % slideMedias.length;
		showSlide(currentSlide);
	});

	prevBtn.addEventListener("click", () => {
		currentSlide = (currentSlide - 1 + slideMedias.length) % slideMedias.length;
		showSlide(currentSlide);
	});
}

/* ==========================
   PARTES INTERACTIVAS (HOTSPOTS)
========================== */
const hotspots = document.querySelectorAll(".hotspot");
const specBoxes = document.querySelectorAll(".spec-box");
const partsImage = document.getElementById("partsImage");

hotspots.forEach((button) => {
	button.addEventListener("click", () => {
		hotspots.forEach((btn) => btn.classList.remove("active"));
		button.classList.add("active");

		specBoxes.forEach((box) => box.classList.remove("active"));

		const target = document.getElementById(button.dataset.target);
		if (target) target.classList.add("active");

		if (partsImage && button.dataset.image) {
			partsImage.src = button.dataset.image;
		}
	});
});

/* ==========================
   SELECTOR DE COLORES
========================== */
const colorButtons = document.querySelectorAll(".color-option");
const machineImage = document.getElementById("coffeeMachine");

colorButtons.forEach((button) => {
	button.addEventListener("click", () => {
		colorButtons.forEach((btn) => btn.classList.remove("active"));
		button.classList.add("active");
		machineImage.src = button.dataset.image;
	});
});

