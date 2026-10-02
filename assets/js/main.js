/**
 * Urvesh Shekhawat — Portfolio Application Engine
 * Minimal, accessible, and responsive client-side interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Theme Engine (Default: Dark) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeIcon(nextTheme);
    window.showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} theme`);
  };

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
    } else {
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', window.toggleTheme);
  }

  // --- 2. Project Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = card.classList.contains('flagship') && window.innerWidth >= 860 ? 'grid' : 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 3. Security Lab Vector Inspector ---
  const vectorTabs = document.querySelectorAll('.vector-tab-btn[data-vector]');
  const labTerminalTitle = document.getElementById('lab-terminal-title');
  const labTerminalContent = document.getElementById('lab-terminal-content');

  const securityVectors = {
    owasp: {
      title: 'OWASP Security Headers Policy',
      html: `
        <div class="term-output-line"><span class="term-text-blue">[+] Auditing HTTP Response Security Headers...</span></div>
        <div class="term-output-line">• Content-Security-Policy (CSP): <span class="term-text-green">PASS (strict-dynamic default-src 'self')</span></div>
        <div class="term-output-line">• HTTP Strict Transport Security (HSTS): <span class="term-text-green">PASS (max-age=31536000; includeSubDomains)</span></div>
        <div class="term-output-line">• X-Frame-Options: <span class="term-text-green">PASS (DENY)</span></div>
        <div class="term-output-line">• X-Content-Type-Options: <span class="term-text-green">PASS (nosniff)</span></div>
        <div class="term-output-line">• Referrer-Policy: <span class="term-text-green">PASS (strict-origin-when-cross-origin)</span></div>
        <div class="term-output-line mt-2"><span class="term-text-amber">[#] Auto-Generated Nginx Defense Configuration:</span></div>
        <div class="term-code-snippet"># Drop-in HTTP Security Headers for Nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline';";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;</div>
      `
    },
    recon: {
      title: 'TCP Port Reconnaissance & Firewall Rules',
      html: `
        <div class="term-output-line"><span class="term-text-blue">[+] Probing target perimeter ports with non-intrusive sockets...</span></div>
        <div class="term-output-line">• Port 80 (HTTP)       : <span class="term-text-amber">REDIRECT (301 Permanent -> HTTPS)</span></div>
        <div class="term-output-line">• Port 443 (HTTPS)     : <span class="term-text-green">OPEN (TLS 1.3 / AES-256-GCM)</span></div>
        <div class="term-output-line">• Port 22 (SSH)        : <span class="term-text-green">FILTERED (Key Auth Only)</span></div>
        <div class="term-output-line">• Port 3306 (MySQL)    : <span class="term-text-green">CLOSED (No Public Exposure)</span></div>
        <div class="term-output-line">• Port 27017 (MongoDB) : <span class="term-text-green">CLOSED (Perimeter Isolated)</span></div>
        <div class="term-output-line mt-2"><span class="term-text-amber">[#] Linux UFW Firewall Hardening:</span></div>
        <div class="term-code-snippet"># Baseline Minimal Firewall Policy
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 443/tcp
sudo ufw enable</div>
      `
    },
    auth: {
      title: 'Authentication & Session Integrity',
      html: `
        <div class="term-output-line"><span class="term-text-blue">[+] Verifying authentication pipelines & signature handling...</span></div>
        <div class="term-output-line">• Identity Provider   : <span class="term-text-green">Google OAuth 2.0 (PKCE Workflow)</span></div>
        <div class="term-output-line">• JWT Signing         : <span class="term-text-green">HS256 (Signed with strong secret key)</span></div>
        <div class="term-output-line">• Cookie Storage      : <span class="term-text-green">HttpOnly, Secure, SameSite=Strict</span></div>
        <div class="term-output-line">• Rate Limiting       : <span class="term-text-green">Enabled (5 attempts / lockout period)</span></div>
        <div class="term-output-line mt-2"><span class="term-text-amber">[#] Flask JWT Route Decorator:</span></div>
        <div class="term-code-snippet">@jwt_required()
def protected_dashboard():
    current_user = get_jwt_identity()
    return jsonify({"status": "authenticated", "user": current_user})</div>
      `
    },
    ssrf: {
      title: 'SSRF & Sensitive Dotfile Protection',
      html: `
        <div class="term-output-line"><span class="term-text-blue">[+] Testing path traversal & sensitive file exfiltration...</span></div>
        <div class="term-output-line">• Path /.env           : <span class="term-text-green">404 NOT FOUND (Blocked by Nginx rule)</span></div>
        <div class="term-output-line">• Path /.git/HEAD      : <span class="term-text-green">404 NOT FOUND (Blocked by Nginx rule)</span></div>
        <div class="term-output-line">• Path /backup.sql     : <span class="term-text-green">404 NOT FOUND (Protected)</span></div>
        <div class="term-output-line">• SSRF Subnet Filter   : <span class="term-text-green">127.0.0.1 & 169.254.169.254 Prohibited</span></div>
        <div class="term-output-line mt-2"><span class="term-text-amber">[#] Nginx Hidden Dotfile Guard:</span></div>
        <div class="term-code-snippet">location ~ /\\.(env|git|htaccess|bak|sql) {
    deny all;
    return 404;
}</div>
      `
    },
    siem: {
      title: 'SIEM Alert Webhooks & PDF Reports',
      html: `
        <div class="term-output-line"><span class="term-text-blue">[+] Verifying alerting pipelines and report compilation...</span></div>
        <div class="term-output-line">• Discord SIEM Webhook : <span class="term-text-green">CONNECTED (Dispatches on High/Critical findings)</span></div>
        <div class="term-output-line">• Slack SOC Channel    : <span class="term-text-green">READY</span></div>
        <div class="term-output-line">• Executive PDF Dossier: <span class="term-text-green">ReportLab 4.x Template Active</span></div>
        <div class="term-output-line">• Dynamic Risk Badges  : <span class="term-text-green">Generated dynamically via SVG</span></div>
        <div class="term-output-line mt-2"><span class="term-text-amber">[#] Python Discord Webhook Dispatcher:</span></div>
        <div class="term-code-snippet">payload = {
    "embeds": [{
        "title": "Perimeter Vulnerability Alert",
        "description": "Port 3306 exposed on host",
        "color": 15548997
    }]
}
requests.post(DISCORD_WEBHOOK_URL, json=payload, timeout=5)</div>
      `
    }
  };

  vectorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      vectorTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const vec = tab.getAttribute('data-vector');
      const data = securityVectors[vec];
      if (data && labTerminalTitle && labTerminalContent) {
        labTerminalTitle.textContent = data.title;
        labTerminalContent.innerHTML = data.html;
      }
    });
  });

  // --- 4. Project Details Modal ---
  const projectDetails = {
    vulneye: {
      title: 'VulnEye',
      tagline: 'Web Vulnerability Scanner & SOC Intelligence Platform',
      badge: 'Cybersecurity • Python & Flask',
      description: 'VulnEye is an automated web vulnerability scanning and security intelligence platform designed to identify critical perimeter risks without intrusive payloads. It checks for missing OWASP security headers, open database ports, TLS/SSL cipher weaknesses, and sensitive dotfile leaks (.env, .git). Includes bilingual AI remediation guides (English & Hindi) and auto-generated Nginx/UFW configuration files.',
      features: [
        'Multi-vector reconnaissance probing TCP ports (21-27017), TLS/SSL cipher suites, and OWASP response headers.',
        'Real-time scan telemetry streamed directly to the frontend using Server-Sent Events (SSE).',
        'Bilingual threat explainer (English/Hindi) generating actionable fix guides and Linux firewall rules.',
        'Continuous domain risk watchlist and executive ReportLab PDF report generation.'
      ],
      techStack: ['Python 3.9+', 'Flask 3.x', 'SQLAlchemy', 'Server-Sent Events (SSE)', 'ApexCharts', 'ReportLab 4.x', 'OAuth 2.0'],
      liveDemo: 'https://vuln-eye-seven.vercel.app/',
      github: 'https://github.com/Urvesh-Shekhawat/VulnEye'
    },
    aerosky: {
      title: 'AeroSky',
      tagline: 'Weather Intelligence & Analytics PWA',
      badge: 'Progressive Web App • Vanilla JS',
      description: 'AeroSky is an asynchronous weather dashboard Progressive Web App built with Vanilla JavaScript, HTML5, and CSS3. It features offline support via Service Workers, real-time meteorological metrics, dedicated Air Quality Index (AQI) ratings, dynamic SVG sparklines, and sunrise/sunset sun tracking.',
      features: [
        'Installable cross-platform PWA with offline UI resilience powered by Service Workers (`sw.js`).',
        '24-hour hourly forecast visualizer using custom SVG sparkline graphs.',
        'Open-Meteo API integration for weather forecasting and Air Quality Index (AQI) health grading.',
        'Client-side °C / °F switching and pinned favorite cities in localStorage.'
      ],
      techStack: ['JavaScript (ES6+)', 'PWA', 'Service Workers', 'Open-Meteo API', 'SVG Charts', 'LocalStorage'],
      liveDemo: 'https://aero-sky.vercel.app/',
      github: 'https://github.com/Urvesh-Shekhawat/AeroSky'
    },
    launchdesk: {
      title: 'LaunchDesk',
      tagline: 'AI-Supercharged Customer Support SaaS',
      badge: 'Next.js App Router • TypeScript',
      description: 'LaunchDesk is a customer support SaaS application designed to streamline support team workflows. Built with the Next.js App Router and TypeScript, it features a unified ticket inbox, simulated AI reply draft generation, customer sentiment summaries, and interactive resolution charts.',
      features: [
        'Unified support inbox with live priority filtering, search, and status tracking.',
        'AI copilot workflow for automated ticket responses and sentiment summaries.',
        'Performance analytics and resolution trends built with Recharts.',
        'Client-side persistence using AppContext and localStorage.'
      ],
      techStack: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Lucide React'],
      liveDemo: 'https://launchdesk-pied.vercel.app/',
      github: 'https://github.com/Urvesh-Shekhawat/launchdesk'
    },
    aurora: {
      title: 'Aurora Store',
      tagline: 'E-Commerce Capstone SPA',
      badge: 'React 19 • Redux Toolkit',
      description: 'Aurora Store is a Single Page Application demonstrating enterprise front-end patterns. Built on React 19, Redux Toolkit, and React Router v7, it features synchronized cart state, mock JWT authentication, admin product CRUD management, and a comprehensive Vitest test suite.',
      features: [
        'Redux Toolkit architecture managing synchronized cart, product, and authentication state.',
        'Protected route wrappers securing checkout and admin inventory management.',
        'Sliding cart drawer with coupon validation and price calculation.',
        'Unit and component testing with Vitest and React Testing Library.'
      ],
      techStack: ['React 19', 'TypeScript', 'Redux Toolkit', 'React Router v7', 'Vitest', 'Tailwind CSS'],
      liveDemo: 'https://aurora-inky-chi.vercel.app/',
      github: 'https://github.com/Urvesh-Shekhawat/Aurora'
    },
    zenith: {
      title: 'Zenith Tasks',
      tagline: 'Drag-and-Drop Task Management PWA',
      badge: 'PWA • HTML5 DnD',
      description: 'Zenith Tasks is a task workspace featuring native HTML5 drag-and-drop Kanban columns, category filtering, productivity statistics, and offline Progressive Web App architecture.',
      features: [
        'HTML5 Drag & Drop API interface for moving tasks across customizable workflow columns.',
        'Productivity velocity charts and category statistics with Chart.js.',
        'Service Worker caching for instant offline load times.',
        'Client-side state persistence in localStorage.'
      ],
      techStack: ['Vanilla JavaScript', 'HTML5 Drag & Drop', 'PWA', 'Chart.js', 'LocalStorage'],
      liveDemo: null,
      github: 'https://github.com/Urvesh-Shekhawat/Zenith-Tasks'
    }
  };

  const projectModalBackdrop = document.getElementById('project-modal-backdrop');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.getElementById('project-modal-close');

  window.openProjectModal = function(id) {
    const data = projectDetails[id];
    if (!data || !projectModalBackdrop || !projectModalBody) return;

    projectModalBody.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
        <span class="project-badge-pill">${data.badge}</span>
      </div>
      <h3 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${data.title}</h3>
      <div style="font-size: 0.875rem; font-weight: 600; color: var(--accent-text); margin-bottom: 16px;">${data.tagline}</div>
      
      <p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.65; margin-bottom: 20px;">
        ${data.description}
      </p>

      <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 10px;">Key Features</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
        ${data.features.map(f => `
          <li style="position: relative; padding-left: 18px; color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
            <span style="position: absolute; left: 0; color: var(--accent-primary); font-weight: bold;">•</span>
            ${f}
          </li>
        `).join('')}
      </ul>

      <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 10px;">Tech Stack</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px;">
        ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
        ${data.liveDemo ? `
          <a href="${data.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>Live Demo</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        ` : ''}
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          <span>GitHub Repository</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
      </div>
    `;

    projectModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function() {
    if (projectModalBackdrop) {
      projectModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (projectModalClose) {
    projectModalClose.addEventListener('click', window.closeProjectModal);
  }

  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', (e) => {
      if (e.target === projectModalBackdrop) {
        window.closeProjectModal();
      }
    });
  }

  // --- 5. Mobile Drawer ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileDrawer);

  drawerLinks.forEach(l => {
    l.addEventListener('click', closeMobileDrawer);
  });

  // Global Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeProjectModal();
      closeMobileDrawer();
    }
  });

  // --- 6. Scrollspy ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // --- 7. Toast & Copy Utilities ---
  window.showToast = function(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  };

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-copy-label') || 'Copied to clipboard!';
      
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => window.showToast(label));
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        window.showToast(label);
      }
    });
  });

  // --- 8. Contact Form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim() || `Portfolio Contact from ${name}`;
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        window.showToast('Please fill out all required fields.');
        return;
      }

      const mailtoUrl = `mailto:urvesh.shekhawat24@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;
      window.showToast('Opening email client...');
      contactForm.reset();
    });
  }

});
