/* =====================
   PROJECT DATA
   Add your real projects here
===================== */
const projects = [
  // Example — uncomment and fill in your own:
  // {
  //   title: "My Game Title",
  //   description: "Short description of your project.",
  //   badge: "Game",          // Game | Asset | Mobile Game
  //   tags: ["Unity", "C#"],
  //   image: "assets/my-screenshot.png",
  //   page: "https://your-project-link.com"
  // }
];

/* =====================
   RENDER PROJECTS
===================== */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  if (projects.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-muted);text-align:center;grid-column:1/-1;padding:3rem 0;">Projects coming soon...</p>`;
    return;
  }

  grid.innerHTML = projects.map((p, i) => `
    <article class="project-card fade-up" style="transition-delay:${i * 80}ms">
      <div class="project-thumb">
        <img src="${p.image}" alt="${p.title} screenshot" loading="lazy"
             onerror="this.src='assets/fallback.svg'" />
        <span class="project-badge">${p.badge}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${p.page}" target="_blank" rel="noopener" class="project-link primary-link">View Project</a>
        </div>
      </div>
    </article>
  `).join('');

  observeFadeElements();
}

/* =====================
   PARTICLES
===================== */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${40 + Math.random() * 60}%;
      animation-duration: ${4 + Math.random() * 6}s;
      animation-delay: ${Math.random() * 6}s;
      opacity: 0;
      background: ${Math.random() > .5 ? 'var(--accent)' : 'var(--accent2)'};
    `;
    container.appendChild(p);
  }
}

/* =====================
   NAVBAR SCROLL + ACTIVE
===================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* =====================
   MOBILE NAV TOGGLE
===================== */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
}

/* =====================
   SCROLL FADE-IN
===================== */
function observeFadeElements() {
  const els = document.querySelectorAll('.fade-up:not(.observed)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => {
    el.classList.add('observed');
    observer.observe(el);
  });
}

function initFadeObserver() {
  document.querySelectorAll('.about-grid, .contact-card, .section-title, .section-subtitle').forEach(el => {
    el.classList.add('fade-up');
  });
  observeFadeElements();
}

/* =====================
   FOOTER YEAR
===================== */
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* =====================
   INIT
===================== */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initMobileNav();
  renderProjects();
  initFadeObserver();
  setYear();
});
