(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const navLinks = nav.querySelectorAll('a');
  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });

  const toast = document.querySelector('.toast');
  document.querySelector('#notify-form').addEventListener('submit', (event) => {
    event.preventDefault();
    toast.textContent = 'Thanks! You’re on the list for the next auction.';
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3200);
  });

  // GSAP + ScrollTrigger: graceful fallback if CDN is unavailable.
  const initMotion = () => {
    if (!window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-copy > *', { y: 24, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out', delay: .15 });
    gsap.utils.toArray('.step-row').forEach((row) => {
      gsap.from(row.querySelector('.step-copy'), {
        y: 35, opacity: 0, duration: .8, ease: 'power2.out',
        scrollTrigger: { trigger: row, start: 'top 82%' }
      });
      gsap.from(row.querySelector('.step-visual'), {
        y: 45, opacity: 0, duration: .9, ease: 'power2.out',
        scrollTrigger: { trigger: row, start: 'top 82%' }
      });
    });
    gsap.from('.team-card', {
      y: 35, opacity: 0, duration: .7, stagger: .15, ease: 'power2.out',
      scrollTrigger: { trigger: '.team-grid', start: 'top 82%' }
    });
    gsap.from('.service-card', {
      y: 35, opacity: 0, duration: .7, stagger: .15, ease: 'power2.out',
      scrollTrigger: { trigger: '.service-grid', start: 'top 82%' }
    });
    gsap.from('.cta-banner > div', {
      x: -30, opacity: 0, duration: .8, ease: 'power2.out',
      scrollTrigger: { trigger: '.cta-banner', start: 'top 85%' }
    });
  };
  if (document.readyState === 'complete') initMotion();
  else window.addEventListener('load', initMotion, { once: true });
})();