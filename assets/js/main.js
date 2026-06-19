const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

const sections = document.querySelectorAll('section');
const navMenuLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navMenuLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active-link');
    }
  });
});

const revealElements = document.querySelectorAll(
  '.section-header, .about-content, .skill-category, .project-card, .contact-item'
);

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      element.classList.add('show');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const heroTitle = document.querySelector('.hero h2');
const originalText = heroTitle.textContent;
let index = 0;

function typeEffect() {
  heroTitle.textContent = '';

  const typing = setInterval(() => {
    heroTitle.textContent += originalText[index];
    index++;

    if (index === originalText.length) {
      clearInterval(typing);
    }
  }, 80);
}

window.addEventListener('load', typeEffect);

const buttons = document.querySelectorAll('.btn');

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const icon = themeToggle.querySelector('i');

  if (currentTheme === 'dark') {
    document.body.removeAttribute('data-theme');

    icon.classList.remove('bi-sun-fill');
    icon.classList.add('bi-moon-fill');

  } else {
    document.body.setAttribute('data-theme', 'dark');

    icon.classList.remove('bi-moon-fill');
    icon.classList.add('bi-sun-fill');
  }
});

const galleryState = {
  viajar: 0,
  kiosco: 0
};

let currentGallery = null;

const galleries = {
  viajar: [
    'assets/images/proyectos/viajar/01-hoteles.png',
    'assets/images/proyectos/viajar/02-detalle-hotel-1.png',
    'assets/images/proyectos/viajar/03-detalle-hotel-2.png',
    'assets/images/proyectos/viajar/04-habitaciones-1.png',
    'assets/images/proyectos/viajar/05-habitaciones-2.png',
    'assets/images/proyectos/viajar/06-viajes.png',
    'assets/images/proyectos/viajar/07-formulario-pasajero.png',
    'assets/images/proyectos/viajar/08-tours.png',
    'assets/images/proyectos/viajar/09-detalle-tour.png',
    'assets/images/proyectos/viajar/10-carrito.png',
    'assets/images/proyectos/viajar/11-mercadopago.png',
    'assets/images/proyectos/viajar/12-dashboard-hotel-1.png',
    'assets/images/proyectos/viajar/13-dashboard-hotel-2.png',
    'assets/images/proyectos/viajar/14-dashboard-admin-1.png',
    'assets/images/proyectos/viajar/15-dashboard-admin-2.png',
    'assets/images/proyectos/viajar/16-auditorias.png',
    'assets/images/proyectos/viajar/17-usuarios-perfiles.png'
  ],

  kiosco: [
    'assets/images/proyectos/kiosco/01-login.png',
    'assets/images/proyectos/kiosco/02-pos.png',
    'assets/images/proyectos/kiosco/03-caja.png',
    'assets/images/proyectos/kiosco/04-productos.png',
    'assets/images/proyectos/kiosco/05-proveedores.png',
    'assets/images/proyectos/kiosco/06-reporte-ventas.png',
    'assets/images/proyectos/kiosco/07-historial-ventas.png',
    'assets/images/proyectos/kiosco/08-usuarios.png'
  ]
};

function updateGallery(galleryName) {

  const currentIndex = galleryState[galleryName];

  document.getElementById(`${galleryName}-image`).src =
    galleries[galleryName][currentIndex];

  document.getElementById(`${galleryName}-counter`).textContent =
    `${currentIndex + 1} / ${galleries[galleryName].length}`;

}

function changeImage(galleryName, direction) {

  galleryState[galleryName] += direction;

  if (galleryState[galleryName] >= galleries[galleryName].length) {
    galleryState[galleryName] = 0;
  }

  if (galleryState[galleryName] < 0) {
    galleryState[galleryName] =
      galleries[galleryName].length - 1;
  }

  updateGallery(galleryName);

}

window.addEventListener('load', () => {

  updateGallery('viajar');
  updateGallery('kiosco');

});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxCounter = document.getElementById('lightbox-counter');

let zoomLevel = 1;
let zoomed = false;

let isDragging = false;

let startX = 0;
let startY = 0;

let translateX = 0;
let translateY = 0;

function resetZoom() {
  zoomLevel = 1;
  zoomed = false;

  translateX = 0;
  translateY = 0;

  lightboxImage.style.transform =
    `translate(0px, 0px) scale(1)`;
}

function updateLightboxImage() {

  const currentIndex = galleryState[currentGallery];

  lightboxImage.src =
    galleries[currentGallery][currentIndex];

  lightboxCounter.textContent =
    `${currentIndex + 1} / ${galleries[currentGallery].length}`;

  updateGallery(currentGallery);

  resetZoom();

}

lightboxPrev.addEventListener('click', (e) => {

  e.stopPropagation();

  galleryState[currentGallery]--;

  if (galleryState[currentGallery] < 0) {
    galleryState[currentGallery] =
      galleries[currentGallery].length - 1;
  }

  updateLightboxImage();

});

lightboxNext.addEventListener('click', (e) => {

  e.stopPropagation();

  galleryState[currentGallery]++;

  if (
    galleryState[currentGallery] >=
    galleries[currentGallery].length
  ) {
    galleryState[currentGallery] = 0;
  }

  updateLightboxImage();

});

function openLightbox(galleryName) {

  currentGallery = galleryName;

  const currentIndex = galleryState[galleryName];

  resetZoom();

  lightboxImage.src =
    galleries[galleryName][currentIndex];

  lightboxCounter.textContent =
    `${currentIndex + 1} / ${galleries[galleryName].length}`;

  lightbox.classList.add('active');

  document.body.style.overflow = 'hidden';

}

document
  .getElementById('viajar-image')
  .addEventListener('click', () => {
    openLightbox('viajar');
  });

document
  .getElementById('kiosco-image')
  .addEventListener('click', () => {
    openLightbox('kiosco');
  });

lightboxClose.addEventListener('click', () => {

  lightbox.classList.remove('active');

  document.body.style.overflow = '';

  resetZoom();

});

document.addEventListener('keydown', (e) => {

  if (e.key === 'Escape' && lightbox.classList.contains('active')) {

    lightbox.classList.remove('active');

    document.body.style.overflow = '';

    resetZoom();

  }

});

lightboxImage.addEventListener('wheel', (e) => {

  e.preventDefault();

  if (e.deltaY < 0) {

    zoomLevel += 0.2;

  } else {

    zoomLevel -= 0.2;

    translateX *= 0.8;
    translateY *= 0.8;

  }

  zoomLevel = Math.max(1, Math.min(5, zoomLevel));

  if (zoomLevel <= 1.2) {

    translateX = 0;
    translateY = 0;

  }

  lightboxImage.style.transform =
    `translate(${translateX}px, ${translateY}px)
     scale(${zoomLevel})`;

});

lightboxImage.addEventListener('dblclick', () => {
  zoomed = !zoomed;

  if (zoomed) {
    zoomLevel = 2;
  } else {
    zoomLevel = 1;
  }

  lightboxImage.style.transform =
  `translate(${translateX}px, ${translateY}px)
   scale(${zoomLevel})`;
});

lightboxImage.addEventListener('mousedown', (e) => {

  if (zoomLevel <= 1) return;

  e.preventDefault();

  isDragging = true;

  startX = e.clientX - translateX;
  startY = e.clientY - translateY;

  lightboxImage.classList.add('dragging');
});

document.addEventListener('mousemove', (e) => {

  if (!isDragging) return;

  translateX = e.clientX - startX;
  translateY = e.clientY - startY;

  lightboxImage.style.transform =
    `translate(${translateX}px, ${translateY}px)
     scale(${zoomLevel})`;
});

document.addEventListener('mouseup', () => {

  isDragging = false;

  lightboxImage.classList.remove('dragging');
});
