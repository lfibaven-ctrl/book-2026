const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
const progressBar = document.querySelector('#progressBar');
const modal = document.querySelector('#bookModal');
const openBookButtons = [document.querySelector('#openBook'), document.querySelector('#openBookImage')];
const closeBook = document.querySelector('#closeBook');
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
  header.classList.toggle('scrolled', scrollTop > 60);

  const current = sections
    .filter(section => section.offsetTop <= scrollTop + 180)
    .at(-1)?.id;

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

function openModal() {
  if (!modal.open) modal.showModal();
  document.body.classList.add('modal-open');
}

function closeModal() {
  if (modal.open) modal.close();
  document.body.classList.remove('modal-open');
}

openBookButtons.forEach(button => button?.addEventListener('click', openModal));
closeBook.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('load', updateScrollUI);
document.querySelector('#currentYear').textContent = new Date().getFullYear();
