// === SUBMANAGER — main.js ===

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const open = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', open);
  hamburger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  hamburger.querySelectorAll('span')[1].style.opacity  = open ? '0' : '1';
  hamburger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.querySelectorAll('span').forEach(s => s.style.transform = s.style.opacity = '');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Animated counter
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const dur    = 1600;
  const step   = 16;
  const inc    = target / (dur / step);
  let current  = 0;
  const timer  = setInterval(() => {
    current += inc;
    if (current >= target) { el.textContent = el.dataset.suffix ? target + el.dataset.suffix : target; clearInterval(timer); }
    else { el.textContent = Math.floor(current) + (el.dataset.suffix || ''); }
  }, step);
}

const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); counterIO.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterIO.observe(el));

// Smooth active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('#nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#fff' : '';
  });
}, { passive: true });
