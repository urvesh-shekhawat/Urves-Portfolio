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
    'Cybersecurity Enthusiast',
    'Hackathon Runner-Up',
    'Lead @ Amity Coding Club'
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
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-open');
      });
    });
  }

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
      title: 'VulnEye — Enterprise Web Vulnerability & SOC Platform',
      badge: 'Cybersecurity & Full Stack',
      status: 'Flagship Production Platform',
      description: 'An enterprise-grade, automated perimeter assessment platform designed to identify critical attack surfaces, verify OWASP Top 10 vulnerabilities, and provide AI-generated remediation patches for DevOps teams.',
      highlights: [
        'Multi-vector vulnerability scanner with multi-threaded TCP reconnaissance, SSL/TLS certificate cipher validation, and SSRF-safe target checks.',
        'Real-time Server-Sent Events (SSE) audit terminal and interactive SOC dashboard displaying risk analytics and asset monitoring.',
        'AI-Powered Bilingual Threat Analyzer generating vulnerability impact analysis and instant Nginx/Linux UFW configuration hardening scripts.',
        'RESTful APIs with Bearer-token authentication, Discord/Slack alerting webhooks, dynamic SVG status badges, and automated PDF/JSON audit reports.',
        'OAuth 2.0 user authentication, SQLAlchemy persistence, CVSS v3.1 scoring utilities, deployed across Vercel & Render.'
      ],
      techStack: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'JavaScript', 'OWASP Top 10', 'Nmap', 'Docker', 'Vercel', 'Render'],
      github: 'https://github.com/Urvesh-Shekhawat/VulnEye'
    },
    aerosky: {
      title: 'AeroSky — Advanced Weather Dashboard & Analytics PWA',
      badge: 'Progressive Web App',
      status: 'Live & Offline-Ready',
      description: 'A lightning-fast, highly aesthetic Progressive Web App (PWA) delivering hyper-localized weather analytics, Air Quality Index (AQI) metrics, and interactive visualizations.',
      highlights: [
        'Integrates Open-Meteo and OpenStreetMap APIs with fuzzy search, geolocation-based weather retrieval, and reverse geocoding.',
        'Interactive SVG visualizations featuring real-time temperature sparklines and animated sun-position arc tracker.',
        'Full offline support powered by Service Workers and Cache API, storing favorite cities and custom configurations.',
        'Dynamic weather-based themes and instant Celsius/Fahrenheit metric conversion.'
      ],
      techStack: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'PWA', 'Service Workers', 'Open-Meteo API', 'SVG Charts'],
      github: 'https://github.com/Urvesh-Shekhawat/AeroSky'
    },
    launchdesk: {
      title: 'LaunchDesk — Developer Workspace & Productivity Hub',
      badge: 'TypeScript Full Stack',
      status: 'Public Repository',
      description: 'A streamlined workspace designed for developers and engineering teams to organize workflows, monitor project milestones, and manage API integrations seamlessly.',
      highlights: [
        'Built with modern TypeScript ensuring strong type safety and maintainable software architecture.',
        'Modular dashboard layouts with drag-and-drop workflow tracking.',
        'Integrated API client simulation for rapid endpoint testing and status monitoring.'
      ],
      techStack: ['TypeScript', 'React.js', 'Node.js', 'CSS Modules', 'REST APIs'],
      github: 'https://github.com/Urvesh-Shekhawat/launchdesk'
    },
    aurora: {
      title: 'Aurora — Modern Interactive Web Application',
      badge: 'Frontend Engineering',
      status: 'Public Repository',
      description: 'A responsive and intuitive web application focusing on high-polish UI design, fluid micro-interactions, and optimized render performance.',
      highlights: [
        'Engineered with TypeScript for scalable and clean architecture.',
        'Modern component structure with customizable theme tokens and glassmorphism styling.',
        'Optimized for fast first contentful paint (FCP) and smooth 60fps animations.'
      ],
      techStack: ['TypeScript', 'JavaScript', 'CSS3', 'Responsive Design'],
      github: 'https://github.com/Urvesh-Shekhawat/Aurora'
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
        <a href="${data.github}" target="_blank" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          Explore Source on GitHub
        </a>
        <button onclick="document.getElementById('project-modal-backdrop').classList.remove('active')" class="btn btn-secondary">Close Details</button>
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
