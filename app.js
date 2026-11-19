const $ = (s, root = document) => root.querySelector(s);
const body = document.body;

const savedTheme = localStorage.getItem('fuel-theme');
const savedDir = localStorage.getItem('fuel-dir');
if (savedTheme === 'dark') body.classList.add('dark');
if (savedDir === 'rtl') body.classList.add('rtl');

function refreshTools() {
  const isDark = body.classList.contains('dark');
  const isRtl = body.classList.contains('rtl');
  document.querySelectorAll('[data-theme]').forEach((btn) => {
    btn.textContent = isDark ? '☀ Light' : '◐ Dark';
    btn.setAttribute('aria-pressed', String(isDark));
  });
  document.querySelectorAll('[data-rtl]').forEach((btn) => {
    btn.textContent = isRtl ? 'LTR' : 'RTL';
    btn.setAttribute('aria-pressed', String(isRtl));
  });
}

document.querySelectorAll('[data-theme]').forEach((btn) => {
  btn.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('fuel-theme', body.classList.contains('dark') ? 'dark' : 'light');
    refreshTools();
  });
});

document.querySelectorAll('[data-rtl]').forEach((btn) => {
  btn.addEventListener('click', () => {
    body.classList.toggle('rtl');
    localStorage.setItem('fuel-dir', body.classList.contains('rtl') ? 'rtl' : 'ltr');
    refreshTools();
  });
});

refreshTools();

const menuBtn = $('[data-menu]');
const navLinks = $('.navlinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const EYE_OPEN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
  btn.innerHTML = EYE_OPEN_SVG;
  btn.addEventListener('click', () => {
    const wrap = btn.closest('.password-wrap');
    const input = wrap ? wrap.querySelector('input') : null;
    if (!input) return;
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    btn.innerHTML = isHidden ? EYE_OFF_SVG : EYE_OPEN_SVG;
    btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    btn.setAttribute('aria-pressed', String(isHidden));
  });
});

const topBtn = $('[data-top]');
if (topBtn) {
  const toggleTopBtn = () => {
    topBtn.classList.toggle('show', window.scrollY > 180);
  };
  window.addEventListener('scroll', toggleTopBtn, { passive: true });
  toggleTopBtn();
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.querySelectorAll('form[data-demo]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = $('[data-message]', form);
    if (msg) {
      msg.textContent = form.dataset.success || 'Thanks! Your request has been submitted (demo).';
    }
  });
});

document.querySelectorAll('[data-social-auth]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.auth-card');
    const msg = card ? $('[data-message]', card) : null;
    if (msg) {
      msg.textContent = `Continue with ${btn.dataset.socialAuth} selected (demo).`;
    }
  });
});

const FALLBACK_SVG =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="#1e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#f8fafc" font-family="sans-serif" font-size="24">Waypoint+ Fuel &amp; Market</text></svg>'
  );

document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', () => {
    if (!img.dataset.fallbackApplied) {
      img.dataset.fallbackApplied = 'true';
      img.src = FALLBACK_SVG;
    }
  });
});
