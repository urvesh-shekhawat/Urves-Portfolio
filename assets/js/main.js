/**
 * Urvesh Shekhawat Portfolio — Main Application Engine (v3.0)
 * Command Center Visuals, Interactive Topology Engine, Custom Cursor & Telemetry HUD
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Custom Desktop Cursor ---
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorDot = document.getElementById('cursor-dot');

  if (cursorGlow && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Expand cursor on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .satellite-node, .core-hub-node, .showcase-card, .chain-node');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2.2)';
        cursorDot.style.backgroundColor = 'var(--accent-cyan)';
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // --- 2. Theme Engine ---
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    } else {
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
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', window.toggleTheme);
  }

  // --- 3. Ambient Canvas Particles ---
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = Math.min(Math.floor(window.innerWidth / 32), 40);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.6,
        color: i % 2 === 0 ? 'rgba(0, 242, 254, ' : 'rgba(99, 102, 241, '
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
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
        ctx.fillStyle = p.color + '0.45)';
        ctx.fill();
      });

      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // --- 4. Hero Interactive Security System Architecture Topology ---
  const coreHub = document.querySelector('.core-hub-node');
  const satNodes = document.querySelectorAll('.satellite-node[data-sat]');
  const heroNodeText = document.getElementById('hero-node-text');
  const heroLiveScanText = document.getElementById('hero-live-scan-text');

  const heroNodeData = {
    core: '<span class="text-cyan">CORE ARCHITECTURE:</span> Full stack engineer building end-to-end applications with hardened perimeter security, high-throughput APIs, and modern responsive interfaces.',
    web: '<span class="text-cyan">WEB SYSTEMS LAYER:</span> React 19, Next.js (App Router), TypeScript, Progressive Web Apps with offline Service Worker resilience & fluid responsive typography.',
    api: '<span class="text-cyan">API GATEWAY & BACKEND:</span> Python Flask, Node.js, Express, Server-Sent Events (SSE) telemetry, and strict RESTful schema verification.',
    soc: '<span class="text-cyan">SOC & PERIMETER DEFENSE:</span> Non-intrusive TCP port reconnaissance (21–27017), TLS/SSL cipher inspections, OWASP Top 10 compliance, and automated Nginx/UFW remediation.',
    auth: '<span class="text-cyan">AUTH &amp; DATABASE LAYER:</span> Hardened Google OAuth 2.0 PKCE workflows, JWT authorization with HttpOnly session cookies, and PostgreSQL / MySQL connection pools with parameterized queries.'
  };

  if (coreHub) {
    coreHub.addEventListener('click', () => {
      satNodes.forEach(s => s.classList.remove('active'));
      coreHub.classList.add('active');
      if (heroNodeText) heroNodeText.innerHTML = heroNodeData.core;
      if (heroLiveScanText) heroLiveScanText.textContent = 'SCANNER: IDLE // THREAT LEVEL: ZERO';
    });
  }

  satNodes.forEach(node => {
    node.addEventListener('click', () => {
      satNodes.forEach(s => s.classList.remove('active'));
      if (coreHub) coreHub.classList.remove('active');
      node.classList.add('active');

      const satKey = node.getAttribute('data-sat');
      if (heroNodeText && heroNodeData[satKey]) {
        heroNodeText.innerHTML = heroNodeData[satKey];
      }
      if (heroLiveScanText) {
        heroLiveScanText.innerHTML = `<span class="text-cyan">AUDITING NODE: ${satKey.toUpperCase()} // STATUS: PASS</span>`;
      }
    });
  });

  // --- 5. Interactive Security Lab Chain Nodes Switcher ---
  const chainNodes = document.querySelectorAll('.chain-node[data-vector]');
  const labTargetTitle = document.getElementById('lab-target-title');
  const labScreenContent = document.getElementById('lab-screen-content');

  const labVectorsData = {
    owasp: {
      title: 'VECTOR // OWASP_SECURITY_HEADERS',
      html: `
        <div class="term-line"><span class="term-prompt">&gt;</span> <span class="text-cyan">ANALYZING TARGET PERIMETER DEFENSE POLICY...</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Content-Security-Policy (CSP): <span class="text-green">PASS (strict-dynamic default-src 'self')</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> HTTP Strict Transport Security (HSTS): <span class="text-green">PASS (max-age=31536000; includeSubDomains; preload)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> X-Frame-Options: <span class="text-green">PASS (DENY)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> X-Content-Type-Options: <span class="text-green">PASS (nosniff)</span></div>
        <div class="term-line mt-2"><span class="term-prompt">&gt;</span> <span class="text-amber">AUTOMATED REMEDIATION SCRIPT:</span></div>
        <div class="code-box-inline"># VulnEye Auto-Generated Nginx Defense Configuration
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline';";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;</div>
      `
    },
    recon: {
      title: 'VECTOR // TCP_PORT_RECON_SWEEP',
      html: `
        <div class="term-line"><span class="term-prompt">&gt;</span> <span class="text-cyan">INITIATING NON-INTRUSIVE MULTI-THREADED SOCKET PROBE...</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Port 80 (HTTP)       : <span class="text-amber">REDIRECT (301 Permanent -&gt; 443)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Port 443 (HTTPS)     : <span class="text-green">OPEN (TLS 1.3 / AES-256-GCM)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Port 22 (SSH)        : <span class="text-green">FILTERED (Key Auth Only / Non-Standard)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Port 3306 (MySQL)    : <span class="text-green">CLOSED (No Public Exposure)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Port 27017 (MongoDB) : <span class="text-green">CLOSED (Perimeter Isolated)</span></div>
        <div class="term-line mt-2"><span class="term-prompt">&gt;</span> <span class="text-amber">AUTOMATED FIREWALL HARDENING:</span></div>
        <div class="code-box-inline"># VulnEye Auto-Generated Linux UFW Rules
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 443/tcp
sudo ufw enable</div>
      `
    },
    auth: {
      title: 'VECTOR // AUTHENTICATION_AND_JWT_HARDENING',
      html: `
        <div class="term-line"><span class="term-prompt">&gt;</span> <span class="text-cyan">VERIFYING AUTHENTICATION PIPELINES &amp; SIGNATURE INTEGRITY...</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Auth Provider        : <span class="text-green">Google OAuth 2.0 (PKCE Workflow)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> JWT Algorithm        : <span class="text-green">HS256 (256-bit Secret Key Signature)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Token Storage        : <span class="text-green">Secure HttpOnly SameSite=Strict Cookies</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Brute-Force Shield   : <span class="text-green">Redis IP Rate Limiter (5 attempts / lockout)</span></div>
        <div class="term-line mt-2"><span class="term-prompt">&gt;</span> <span class="text-amber">FLASK AUTH VALIDATOR HOOK:</span></div>
        <div class="code-box-inline"># Hardened Token Verification Decorator
@jwt_required()
def protected_soc_endpoint():
    claims = get_jwt()
    if claims.get('role') != 'sec_admin':
        return jsonify({'error': 'Forbidden: Insufficient Permissions'}), 403</div>
      `
    },
    ssrf: {
      title: 'VECTOR // SSRF_AND_SENSITIVE_FILE_SHIELD',
      html: `
        <div class="term-line"><span class="term-prompt">&gt;</span> <span class="text-cyan">AUDITING SUBRESOURCE PATHS &amp; SENSITIVE DOTFILES...</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Path /.env           : <span class="text-green">404 NOT FOUND (Protected)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Path /.git/HEAD      : <span class="text-green">404 NOT FOUND (Protected)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Path /backup.sql     : <span class="text-green">404 NOT FOUND (Protected)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> SSRF Internal Probe  : <span class="text-green">BLOCKED (127.0.0.1 &amp; 169.254.169.254 Denied)</span></div>
        <div class="term-line mt-2"><span class="term-prompt">&gt;</span> <span class="text-amber">NGINX SENSITIVE FILE BLOCK:</span></div>
        <div class="code-box-inline"># Block Dotfile & Backup Exfiltration
location ~ /\\.(env|git|htaccess|bak|sql) {
    deny all;
    return 404;
}</div>
      `
    },
    siem: {
      title: 'VECTOR // SIEM_WEBHOOKS_AND_REPORTLAB',
      html: `
        <div class="term-line"><span class="term-prompt">&gt;</span> <span class="text-cyan">CHECKING REAL-TIME SIEM DISPATCH STATUS...</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Discord Webhook Sync : <span class="text-green">ACTIVE (Instant Alert on High CVE)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> Slack Ops Webhook    : <span class="text-green">ACTIVE (Channel: #soc-alerts)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> SVG Risk Badge Engine: <span class="text-green">LIVE (/api/v1/badge?domain=...)</span></div>
        <div class="term-line"><span class="term-prompt">&gt;</span> PDF Executive Dossier: <span class="text-green">ReportLab 4.x Engine Ready</span></div>
        <div class="term-line mt-2"><span class="term-prompt">&gt;</span> <span class="text-amber">DISCORD SIEM ALERT PAYLOAD:</span></div>
        <div class="code-box-inline">payload = {
    "username": "VulnEye SOC Watchdog",
    "embeds": [{"title": "🚨 Security Perimeter Alert", "color": 0xef4444, "fields": [...]}]
}
requests.post(DISCORD_WEBHOOK_URL, json=payload, timeout=5)</div>
      `
    }
  };

  chainNodes.forEach(node => {
    node.addEventListener('click', () => {
      chainNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const vec = node.getAttribute('data-vector');
      const data = labVectorsData[vec];
      if (data && labTargetTitle && labScreenContent) {
        labTargetTitle.textContent = data.title;
        labScreenContent.innerHTML = data.html;
      }
    });
  });

  // --- 6. Projects Filtering Engine ---
  const filterPills = document.querySelectorAll('.filter-pill[data-filter]');
  const showcaseCards = document.querySelectorAll('.showcase-card[data-category]');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter');

      showcaseCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || cat.includes(filterVal)) {
          card.style.display = 'grid';
          card.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 7. Project Architecture Data & Modal Handler ---
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
      techStack: ['JavaScript (ES6+)]', 'HTML5', 'CSS3 (Variables)', 'PWA', 'Service Workers', 'Open-Meteo API', 'OSM Nominatim', 'SVG Charts', 'Lucide Icons'],
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
    },
    zenith: {
      title: 'Zenith Tasks — Dynamic Workspace & Kanban PWA',
      badge: 'Progressive Web App • Drag-and-Drop • Kanban',
      status: 'Offline-Ready PWA',
      description: 'Zenith Tasks is a sleek, modern task management web application designed to help users organize their daily workflows. It features a responsive UI with dark/light theme switching, interactive drag-and-drop Kanban board, powerful category filtering and sorting, celebratory confetti physics, and an offline-ready Progressive Web App (PWA) architecture.',
      highlights: [
        'Interactive Drag-and-Drop Kanban Board: Intuitive HTML5 Drag & Drop API interface allowing users to move tasks fluidly between "To Do", "In Progress", and "Done" columns.',
        'Quick-Add & Confetti Celebrations: Inline quick brain-dump field for rapid task entry paired with celebratory confetti particle feedback when completing objectives.',
        'Progressive Web App (PWA) & Offline Support: Built-in Service Worker (sw.js) and Cache API storage enabling full offline resilience and instant load times.',
        'Productivity Analytics Dashboard: Visual SVG progress rings and Chart.js integration tracking real-time completion velocity and category breakdown.',
        'Persistent Local Storage: Full client-side state synchronization persisting task metadata, priority labels, due dates, and column arrangements directly in localStorage.'
      ],
      techStack: ['Vanilla JavaScript (ES6+)', 'HTML5 (Drag & Drop)', 'CSS3', 'PWA', 'Service Workers', 'Chart.js', 'LocalStorage'],
      github: 'https://github.com/Urvesh-Shekhawat/Zenith-Tasks',
      liveDemo: ''
    }
  };

  const projectModalBackdrop = document.getElementById('project-modal-backdrop');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.getElementById('project-modal-close');

  window.openProjectModal = function(projectId) {
    const data = projectData[projectId];
    if (!data || !projectModalBackdrop || !projectModalBody) return;

    projectModalBody.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 8px; flex-wrap: wrap;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700;">${data.badge}</span>
        <span style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--accent-emerald); font-weight: 700;">● ${data.status}</span>
      </div>
      <h2 style="font-family: var(--font-display); font-size: clamp(1.3rem, 2.5vw, 1.8rem); margin-bottom: 16px; font-weight: 800;">${data.title}</h2>
      <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 24px;">
        ${data.description}
      </p>

      <h4 style="font-family: var(--font-display); font-size: 1.05rem; margin-bottom: 14px; color: var(--text-primary); font-weight: 700;">Architecture &amp; Core Highlights</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; padding: 0;">
        ${data.highlights.map(h => `
          <li style="position: relative; padding-left: 20px; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">▹</span>
            ${h}
          </li>
        `).join('')}
      </ul>

      <h4 style="font-family: var(--font-display); font-size: 1.05rem; margin-bottom: 14px; color: var(--text-primary); font-weight: 700;">Technologies &amp; Frameworks</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 30px;">
        ${data.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        ${data.liveDemo ? `
          <a href="${data.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn-card btn-card-primary">
            Launch Live Deployment ↗
          </a>
        ` : ''}
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-card ${data.liveDemo ? 'btn-card-secondary' : 'btn-card-primary'}">
          Explore Repository on GitHub
        </a>
        <button onclick="window.closeProjectModal()" class="btn-card btn-card-inspect">Close Specification</button>
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

  // Escape key global listener for modal and drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeProjectModal();
      closeMobileDrawer();
    }
  });

  // --- 8. Mobile Drawer Handlers ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
      if (drawerBackdrop) drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      if (drawerBackdrop) drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // --- 9. Navbar & Mobile Floating Dock Scrollspy ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const dockItems = document.querySelectorAll('.dock-nav-item[data-dock]');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    dockItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-dock') === currentSectionId) {
        item.classList.add('active');
      }
    });
  }, { passive: true });

  // --- 10. Toast Notifications & Clipboard Utilities ---
  window.showToast = function(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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

  function fallbackCopyText(text, label) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '-999999px';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (success) {
        window.showToast(label);
      } else {
        window.showToast('Copied: ' + text);
      }
    } catch (err) {
      window.showToast('Copied: ' + text);
    }
  }

  window.copyToClipboard = function(text, label = 'Copied to clipboard!') {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        window.showToast(label);
      }).catch(() => {
        fallbackCopyText(text, label);
      });
    } else {
      fallbackCopyText(text, label);
    }
  };

  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const val = el.getAttribute('data-copy');
      const label = el.getAttribute('data-copy-label') || 'Copied!';
      window.copyToClipboard(val, label);
    });
  });

  // --- 11. Contact Form Transmission ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        window.showToast('⚠️ Please complete all required fields.');
        return;
      }

      const mailtoUrl = `mailto:urvesh.shekhawat24@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      window.showToast('🚀 Transmission initiated! Launching email client...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      contactForm.reset();
    });
  }

});
