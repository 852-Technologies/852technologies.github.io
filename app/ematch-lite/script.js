const menuButton = document.querySelector('[data-menu]');
const menu = document.querySelector('#site-nav');
const header = document.querySelector('[data-header]');

menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 8), { passive: true });

const thresholdButtons = document.querySelectorAll('[data-threshold]');
const thresholdOutput = document.querySelector('#threshold-output');
const thresholdLabel = document.querySelector('[data-threshold-label]');
const marginLabel = document.querySelector('[data-margin]');

thresholdButtons.forEach((button) => {
  button.addEventListener('click', () => {
    thresholdButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const threshold = Number(button.dataset.threshold);
    thresholdOutput.textContent = `${threshold}%`;
    thresholdLabel.textContent = `${threshold}%`;
    const margin = 94 - threshold;
    marginLabel.textContent = `${margin} ${margin === 1 ? 'point' : 'points'}`;
  });
});

document.querySelectorAll('.preference-group').forEach((group) => {
  group.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      group.querySelectorAll('button').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
    });
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
document.querySelector('#year').textContent = new Date().getFullYear();
