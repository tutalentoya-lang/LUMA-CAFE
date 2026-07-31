// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav__links a[href^="#"]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// Fade-up on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .testi, .about__text, .about__visual, .contact__info, .contact__form, .gallery__item')
  .forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

// Contact form → WhatsApp redirect
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre  = this.nombre.value.trim();
  const mensaje = this.mensaje.value.trim();
  const notice  = document.getElementById('formNotice');

  if (!nombre || !mensaje) return;

  const text = `Hola, soy ${nombre}. ${mensaje}`;
  const url  = `https://wa.me/573212875771?text=${encodeURIComponent(text)}`;

  notice.style.color = '#D4A830';
  notice.textContent = '¡Mensaje listo! Abriendo WhatsApp…';
  setTimeout(() => window.open(url, '_blank'), 800);

  setTimeout(() => {
    this.reset();
    notice.textContent = '';
  }, 3000);
});
