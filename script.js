const typingText = document.querySelector('#typing-text');
const phrases = ['Aspiring Front-End Developer', 'Creative Problem Solver', 'Responsive Web Builder'];
let phraseIndex = 0;
let characterIndex = phrases[0].length;
let deleting = true;

function typePhrase() {
  const phrase = phrases[phraseIndex];
  typingText.textContent = phrase.slice(0, characterIndex);
  if (deleting) {
    characterIndex -= 1;
    if (characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typePhrase, 500);
      return;
    }
  } else {
    characterIndex += 1;
    if (characterIndex > phrase.length) {
      deleting = true;
      setTimeout(typePhrase, 1400);
      return;
    }
  }
  setTimeout(typePhrase, deleting ? 45 : 80);
}
setTimeout(typePhrase, 1800);

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll('main section[id]');
const navigationLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navigationLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const status = document.querySelector('.form-status');
  status.textContent = 'Thanks for reaching out. I will get back to you soon.';
  event.target.reset();
});
document.querySelector('#year').textContent = new Date().getFullYear();
