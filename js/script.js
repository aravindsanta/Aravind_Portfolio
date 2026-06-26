// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  siteNav.classList.toggle('open');
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    siteNav.classList.remove('open');
  });
});

// Close nav if user clicks outside
document.addEventListener('click', e => {
  if (siteNav.classList.contains('open') &&
      !siteNav.contains(e.target) &&
      !navToggle.contains(e.target)) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    siteNav.classList.remove('open');
  }
});

// Light bulb dark-mode toggle
const pullString = document.getElementById('pullString');
const bulb       = document.getElementById('bulb');

if (localStorage.getItem('darkMode') === 'on') {
  bulb.classList.add('on');
  document.body.classList.add('dark');
  pullString.setAttribute('aria-pressed', 'true');
}

pullString.addEventListener('click', () => {
  const isOn = bulb.classList.toggle('on');
  document.body.classList.toggle('dark', isOn);
  pullString.setAttribute('aria-pressed', String(isOn));
  localStorage.setItem('darkMode', isOn ? 'on' : 'off');
});

// Scroll reveal — only runs if motion is allowed
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealTargets = [
    ...document.querySelectorAll('.section-heading'),
    ...document.querySelectorAll('.about-content p'),
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.skill-group'),
    document.querySelector('.contact-opener'),
    document.querySelector('.contact-links'),
    document.querySelector('.contact-cities'),
  ].filter(Boolean);

  // Stagger sibling project cards and skill groups
  document.querySelectorAll('.project-card').forEach((card, i) => {
    if (i % 2 === 1) card.style.transitionDelay = '0.1s';
  });
  document.querySelectorAll('.skill-group').forEach((group, i) => {
    group.style.transitionDelay = `${i * 0.07}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  revealTargets.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
