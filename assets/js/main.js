/**
 * Urvesh Shekhawat Portfolio - Main Application Logic
 * Interactive UI, Canvas Visuals, Modal Handlers, Theme Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Engine ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeIcon(nextTheme);
    window.showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  };

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    } else {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', window.toggleTheme);
  }

  // --- 2. Typewriter Effect ---
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Full Stack Developer',
    'Cybersecurity Specialist',
    'Software Engineer'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingElement) return;
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentRole.length) {
      speed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();

  // --- 3. Ambient Canvas Grid & Interactive Constellation ---
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = Math.min(Math.floor(window.innerWidth / 20), 55);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        color: i % 2 === 0 ? 'rgba(6, 182, 212, ' : 'rgba(99, 102, 241, '
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles with faint lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.16 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect particles to mouse cursor when hovered
        if (mouse.x && mouse.y) {
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < mouse.radius) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.35 * (1 - mDist / mouse.radius)})`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.5)';
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --- 4. Navbar Scroll Effect & Scrollspy ---
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    // Sync Mobile Bottom Dock active state
    const dockItems = document.querySelectorAll('.mobile-dock-item[data-dock]');
    dockItems.forEach((item) => {
      item.classList.remove('active');
      const dockTarget = item.getAttribute('data-dock');
      if (dockTarget === currentSectionId) {
        item.classList.add('active');
      }
    });
  });

  // --- Mobile Drawer & Menu Toggle Handlers ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  }

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeMobileDrawer();
      }
    });
  }

  mobileDrawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });


  // --- 5. Projects Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-wrapper');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-categories') || '';
        if (filterCategory === 'all' || categories.includes(filterCategory)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Project Details Data & Modal ---
  const projectData = {
    vulneye: {
      title: 'VulnEye — Enterprise Web Vulnerability & SOC Intelligence Platform',
      badge: 'Cybersecurity & SOC Intelligence • Flask & Python',
      status: 'Flagship Production Platform',
      description: 'VulnEye is an enterprise-grade cybersecurity scanning and threat intelligence platform engineered for security engineers, DevOps specialists, and penetration testers. It delivers non-intrusive perimeter audits that detect critical exposures—such as missing OWASP security headers, exposed database ports, TLS/SSL cipher weaknesses, sensitive dotfile leaks (.env, .git), and CORS misconfigurations—without launching destructive payloads. Paired with an AI Threat Explainer delivering dual-language (English & Hindi) remediation guides and automated Nginx/Linux UFW hardening scripts.',
      highlights: [
        'Multi-Vector Perimeter Scanner: Multi-threaded TCP sweep across 13+ ports (21-27017), TLS/SSL protocol inspection, OWASP headers (HSTS, CSP, X-Frame-Options), sensitive file exposure (.env, .git, .sql), CORS wildcard checks, and built-in SSRF-safe subnet blocking.',
        'Real-Time SSE Audit Terminal: Live telemetry streaming via Server-Sent Events (/scan/stream) with visual HUD radar animations and Web Audio sound synthesizer feedback.',
        'AI Bilingual Threat Explainer (/analyzer): Dual-language executive summaries and exploit walkthroughs (English & Hindi / हिंग्लिश) with auto-generated drop-in Nginx server blocks and UFW firewall commands.',
        'Executive SOC Command Center & 24/7 Watchlist: ApexCharts risk distribution charts, continuous domain risk drift monitoring, and side-by-side target audit comparator (/compare).',
        'Cyber Defense Utilities Suite (/tools): Integrated CVSS v3.1 calculator, SSL certificate chain inspector, OWASP headers checker, subdomain enumerator, and password entropy calculator.',
        'SIEM Alerts & Dynamic Badges: Automated Discord/Slack webhook alert dispatchers for high/critical risks, dynamic SVG security grade badges (/api/v1/badge), and ReportLab 4.x corporate PDF dossiers.',
        'Commercial SaaS Tiering: 3 membership tiers with working multi-gateway checkout (Credit Cards, UPI/QR, PayPal, Crypto) and auto-generated PDF receipts.'
      ],
      techStack: ['Python 3.9+', 'Flask 3.x', 'SQLAlchemy', 'PostgreSQL / SQLite', 'Server-Sent Events (SSE)', 'ApexCharts', 'ReportLab 4.x', 'Authlib (Google OAuth 2.0)', 'Web Audio API', 'Vercel / Render'],
      github: 'https://github.com/Urvesh-Shekhawat/VulnEye',
      liveDemo: 'https://vuln-eye-seven.vercel.app/'
    },
    aerosky: {
      title: 'AeroSky — Advanced Weather Dashboard & Analytics PWA',
      badge: 'Progressive Web App • Vanilla JS • Open-Meteo',
      status: 'Live & Offline-Ready',
      description: 'AeroSky is a premium, modern, and fully asynchronous weather dashboard built with Vanilla JavaScript, HTML5, and CSS3. Designed as an installable Progressive Web App (PWA) with offline support through Service Workers and caching, it delivers real-time weather metrics, comprehensive Air Quality Index (AQI) data, a detailed 7-day forecast, and an hourly forecast complete with dynamic SVG sparkline charts and live weather-based theme shifting.',
      highlights: [
        'Progressive Web App (PWA): Fully installable on mobile and desktop devices with complete offline UI resilience powered by Service Workers (sw.js) and Cache API storage.',
        'Real-Time Weather Metrics & AQI: High-accuracy tracking of temperature, feels-like, humidity, wind speed, barometric pressure, cloud cover, UV index, and dedicated Air Quality Index health grading.',
        'Dynamic SVG Sparklines & Sun Tracker: Horizontally scrollable 24-hour forecast with custom SVG sparkline graphs and an animated SVG arc tracking the sun\'s position between sunrise and sunset.',
        '7-Day Meteorological Predictions: Daily high/low temperature range visualizations and 7-day weather outlooks with instant °C / °F client-side conversion without data re-fetching.',
        'Dynamic Glassmorphic Themes & Pinned Cities: UI palette shifts in real time based on active weather conditions (sunny, night, rain, snow, thunderstorm) with localStorage pinned favorite locations.',
        'Smart Geolocation & Location Search: Auto-suggest geocoding via Open-Meteo API and reverse geocoding via OpenStreetMap Nominatim with HTML5 Geolocation support.'
      ],
      techStack: ['JavaScript (ES6+)', 'HTML5', 'CSS3 (Variables)', 'PWA', 'Service Workers', 'Open-Meteo API', 'OSM Nominatim', 'SVG Charts', 'Lucide Icons'],
      github: 'https://github.com/Urvesh-Shekhawat/AeroSky',
      liveDemo: 'https://aero-sky.vercel.app/'
    },
    launchdesk: {
      title: 'LaunchDesk — AI-Supercharged Customer Support SaaS',
      badge: 'Next.js App Router • TypeScript • AI Copilot',
      status: 'Live & Fully Interactive',
      description: 'Customer support, supercharged by AI. LaunchDesk is a modern, responsive, and highly interactive SaaS frontend engineered for customer support teams. It demonstrates production-level UI/UX, robust state management, and detailed component architecture designed to streamline support workflows.',
      highlights: [
        'Unified Support Inbox: Manage, filter, and reply to customer tickets in real-time with priority categorization and search.',
        'AI Copilot UI: Interface design for AI-generated response drafts, intelligent ticket summaries, and internal team collaboration notes.',
        'Interactive Analytics Dashboard: Comprehensive support performance metrics, resolution tracking, and charts built with Recharts.',
        'Client-Side State Persistence: Global AppContext state management saving ticket creations, profile changes, and avatars directly to browser localStorage without a backend.',
        'Production Component Architecture: Engineered with Next.js App Router, strict TypeScript interfaces, Tailwind CSS v4, Lucide React icons, and seamless dark/light theme toggle.'
      ],
      techStack: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS v4', 'Recharts', 'Lucide React', 'React.js', 'LocalStorage'],
      github: 'https://github.com/Urvesh-Shekhawat/launchdesk',
      liveDemo: 'https://launchdesk-pied.vercel.app/'
    },
    aurora: {
      title: 'Aurora Store — Premium E-Commerce Capstone Project',
      badge: 'React 19 • Redux Toolkit • Full Stack',
      status: 'Live & Fully Tested',
      description: 'Aurora Store is a premium, high-fidelity Single Page Application (SPA) designed to showcase modern enterprise-grade web engineering practices. It features a scalable Redux Toolkit architecture, robust routing with React Router v7, a secure mock authentication system, an interactive shopping cart drawer, a validated checkout process, and an administrative dashboard to manage products with real-time inventory analytics.',
      highlights: [
        'Enterprise State Management: Built on Redux Toolkit (cartSlice, productSlice, themeSlice, authSlice) for predictable, synchronized state that seamlessly persists sessions, cart contents, and themes to localStorage.',
        'Industry Standard Routing & Security: Powered by React Router v7 with <ProtectedRoute> wrappers securing Admin Dashboard & Checkout views behind mock JWT authentication.',
        'Sliding Cart Drawer: Blur-backdrop sliding drawer with promo coupon inputs (e.g., AURORA20 for 20% off), real-time tax/shipping calculations, and item quantity controls.',
        'Validated Checkout & Billing: Secure payment checkout form with 16-digit credit card masking, expiry validation, and payment authorization feedback loaders.',
        'Admin CRUD Dashboard: Administrative panel with real-time analytics overview cards (Inventory Valuations, Catalog Items, Average Ratings, Low Stock alerts) and full Product CRUD forms.',
        'Comprehensive Testing & Modern Tooling: Integrated Vitest and React Testing Library unit test suites for core business logic, bundled via Vite 8 (Rolldown) and styled with Tailwind CSS v4 and custom design tokens.'
      ],
      techStack: ['React 19', 'TypeScript', 'Redux Toolkit', 'React Router v7', 'Vite 8', 'Vitest', 'Tailwind CSS v4', 'Lucide React'],
      github: 'https://github.com/Urvesh-Shekhawat/Aurora',
      liveDemo: 'https://aurora-inky-chi.vercel.app/'
    }
  };

  const projectModalBackdrop = document.getElementById('project-modal-backdrop');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.getElementById('project-modal-close');

  window.openProjectModal = function(projectId) {
    const data = projectData[projectId];
    if (!data || !projectModalBackdrop || !projectModalBody) return;

    projectModalBody.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <span class="badge badge-cyan">${data.badge}</span>
        <span style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--accent-emerald);">● ${data.status}</span>
      </div>
      <h2 style="font-size: 1.7rem; margin-bottom: 16px;">${data.title}</h2>
      <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.7; margin-bottom: 24px;">
        ${data.description}
      </p>

      <h4 style="font-size: 1.1rem; margin-bottom: 14px; color: var(--accent-cyan);">Key Architecture & Features</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px;">
        ${data.highlights.map(h => `
          <li style="position: relative; padding-left: 24px; color: var(--text-secondary); font-size: 0.94rem; line-height: 1.6;">
            <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">▹</span>
            ${h}
          </li>
        `).join('')}
      </ul>

      <h4 style="font-size: 1.1rem; margin-bottom: 14px; color: var(--accent-cyan);">Technologies & Frameworks</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 30px;">
        ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        ${data.liveDemo ? `
          <a href="${data.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Launch Live Demo ↗
          </a>
        ` : ''}
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn ${data.liveDemo ? 'btn-secondary' : 'btn-primary'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          Explore Source on GitHub
        </a>
        <button onclick="document.getElementById('project-modal-backdrop').classList.remove('active')" class="btn btn-outline">Close Details</button>
      </div>
    `;

    projectModalBackdrop.classList.add('active');
  };

  if (projectModalClose) {
    projectModalClose.addEventListener('click', () => {
      projectModalBackdrop.classList.remove('active');
    });
  }

  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', (e) => {
      if (e.target === projectModalBackdrop) {
        projectModalBackdrop.classList.remove('active');
      }
    });
  }

  // --- 7. Toast Notifications & Clipboard Utilities ---
  window.showToast = function(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${msg}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  window.copyToClipboard = function(text, label = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(label);
    }).catch(() => {
      window.showToast('Copied: ' + text);
    });
  };

  // Attach copy listeners
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const val = el.getAttribute('data-copy');
      const label = el.getAttribute('data-copy-label') || 'Copied!';
      window.copyToClipboard(val, label);
    });
  });

  // --- 8. Contact Form Handling ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        window.showToast('⚠️ Please fill in all required fields.');
        return;
      }

      // Generate mailto link fallback for instant transmission
      const mailtoUrl = `mailto:urvesh.shekhawat24@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      window.showToast('🚀 Message received! Opening email client...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);

      contactForm.reset();
    });
  }
});
