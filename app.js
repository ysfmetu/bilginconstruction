// ===== BİLGİN İNŞAAT – JavaScript =====

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

// ---- Hero background zoom ----
const heroBg = document.getElementById('hero-bg');
if (heroBg) {
  setTimeout(() => heroBg.classList.add('zoomed'), 100);
}

// ---- Particle animation ----
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const colors = [
    'rgba(201,168,76,0.12)',
    'rgba(201,168,76,0.08)',
    'rgba(255,255,255,0.06)'
  ];

  for (let i = 0; i < 18; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 8 + 3;
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(particle);
  }
}
createParticles();

// ---- Scroll animations (IntersectionObserver) ----
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = entry.target.parentElement
          ? Array.from(entry.target.parentElement.children).filter(el => el.classList.contains('fade-in'))
          : [];
        const sibIdx = siblings.indexOf(entry.target);
        const delay = sibIdx >= 0 ? sibIdx * 80 : 0;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

// ---- Counter animation ----
function animateCounter(el, target, suffix, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start);
  }, 16);
}

// Trigger counter when hero stats are in view
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        animateCounter(el, target, '');
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);
statNumbers.forEach(el => counterObserver.observe(el));

// ---- Gallery filter ----
function filterGallery(cat, clickedTab) {
  // Update active tab
  document.querySelectorAll('.gallery-tab').forEach(tab => tab.classList.remove('active'));
  clickedTab.classList.add('active');

  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-cat');
    const show = cat === 'tum' || itemCat === cat || itemCat === 'tum';
    if (show) {
      item.style.display = '';
      item.style.opacity = '0';
      setTimeout(() => {
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        item.style.opacity = '1';
      }, 50);
    } else {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.95)';
      setTimeout(() => {
        item.style.display = 'none';
        item.style.transform = '';
      }, 350);
    }
  });
}

// ---- Contact form ----
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  const successEl = document.getElementById('form-success');

  // Simulate form submit
  btn.innerHTML = '⏳ Gönderiliyor...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Teklif İste`;
    btn.disabled = false;
    successEl.style.display = 'block';
    e.target.reset();

    setTimeout(() => {
      successEl.style.display = 'none';
    }, 5000);
  }, 1200);
}

// ---- Smooth scroll for all anchors ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinksAll.forEach(link => {
    link.classList.remove('active-link');
    const href = link.getAttribute('href').replace('#', '');
    if (href === current) {
      link.classList.add('active-link');
    }
  });
}, { passive: true });

// ---- Hamburger animation ----
const hamStyle = document.createElement('style');
hamStyle.textContent = `
  .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .nav-link.active-link { color: #C9A84C !important; }
`;
document.head.appendChild(hamStyle);

// ---- Gallery lightbox (simple) ----
document.querySelectorAll('.gallery-item:not(.video-placeholder)').forEach(item => {
  item.style.cursor = 'zoom-in';
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.92);
      display: flex; align-items: center; justify-content: center;
      cursor: zoom-out;
      animation: fadeInLightbox 0.25s ease;
    `;

    const imgClone = document.createElement('img');
    imgClone.src = img.src;
    imgClone.alt = img.alt;
    imgClone.style.cssText = `
      max-width: 90vw; max-height: 88vh;
      border-radius: 12px;
      box-shadow: 0 32px 80px rgba(0,0,0,0.6);
      border: 1px solid rgba(201,168,76,0.2);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute; top: 24px; right: 24px;
      background: rgba(201,168,76,0.9); color: #0A1628;
      border: none; border-radius: 50%;
      width: 44px; height: 44px;
      font-size: 1.1rem; font-weight: 800; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    `;

    overlay.appendChild(imgClone);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const close = () => {
      document.body.removeChild(overlay);
      document.body.style.overflow = '';
    };

    overlay.addEventListener('click', close);
    closeBtn.addEventListener('click', close);

    document.addEventListener('keydown', function escClose(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escClose); }
    });
  });
});

// Lightbox animation
const lbStyle = document.createElement('style');
lbStyle.textContent = `@keyframes fadeInLightbox { from { opacity: 0; } to { opacity: 1; } }`;
document.head.appendChild(lbStyle);

console.log('✅ BS60 Yapı web sitesi yüklendi.');
