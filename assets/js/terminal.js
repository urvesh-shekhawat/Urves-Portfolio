/**
 * Interactive Cyber Terminal Simulator & Multi-Tab SOC Console
 * Urvesh Shekhawat Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const tabBtns = document.querySelectorAll('.term-tab-btn');
  const tabContents = document.querySelectorAll('.term-tab-content');
  const quickScanBtn = document.getElementById('quick-scan-trigger');
  const auditProgressBar = document.getElementById('audit-progress-bar');
  const auditStatusText = document.getElementById('audit-status-text');

  // Tab switching logic
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(`tab-${targetTab}`);
      if (activeContent) activeContent.classList.add('active');

      if (targetTab === 'cli' && terminalInput) {
        setTimeout(() => terminalInput.focus(), 50);
      }
    });
  });

  // Automated Quick Scan Simulation for Tab 1
  window.runAuditSimulation = function() {
    if (!auditProgressBar || !auditStatusText) return;
    
    // Switch to audit tab if not active
    const auditTabBtn = document.querySelector('[data-tab="audit"]');
    if (auditTabBtn && !auditTabBtn.classList.contains('active')) {
      auditTabBtn.click();
    }

    auditProgressBar.style.width = '10%';
    auditStatusText.innerHTML = '<span class="term-yellow">[*] Resolving Host & TLS Cipher Suites...</span>';

    setTimeout(() => {
      auditProgressBar.style.width = '35%';
      auditStatusText.innerHTML = '<span class="term-cyan">[*] Checking OWASP Top 10 Headers (CSP, HSTS, X-Frame)...</span>';
    }, 600);

    setTimeout(() => {
      auditProgressBar.style.width = '70%';
      auditStatusText.innerHTML = '<span class="term-purple">[*] Performing Multi-Threaded TCP Port Reconnaissance...</span>';
    }, 1200);

    setTimeout(() => {
      auditProgressBar.style.width = '90%';
      auditStatusText.innerHTML = '<span class="term-cyan">[*] AI Threat Analyzer Generating Remediation Configs...</span>';
    }, 1800);

    setTimeout(() => {
      auditProgressBar.style.width = '100%';
      auditStatusText.innerHTML = '<span class="term-green">[✔] 100% Secure! Perimeter Hardened. 0 Critical CVEs Found.</span>';
      if (window.showToast) window.showToast('🛡️ Perimeter Scan Finished: Hardened Status');
    }, 2400);
  };

  if (quickScanBtn) {
    quickScanBtn.addEventListener('click', window.runAuditSimulation);
  }

  // CLI Logic
  if (!terminalBody || !terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const welcomeBanner = [
    '<span class="term-cyan">┌────────────────────────────────────────────────────────────┐</span>',
    '<span class="term-cyan">│</span> <span class="term-green">VulnEye SOC Terminal v2.4</span> - <span class="term-purple">Automated Perimeter Assessment</span>   <span class="term-cyan">│</span>',
    '<span class="term-cyan">│</span> Developer: <span class="term-yellow">Urvesh Shekhawat</span> | Status: <span class="term-green">READY</span>                  <span class="term-cyan">│</span>',
    '<span class="term-cyan">└────────────────────────────────────────────────────────────┘</span>',
    '<span class="term-muted">Type </span><span class="term-cyan">help</span><span class="term-muted"> or </span><span class="term-cyan">scan web.target</span><span class="term-muted"> for interactive audit simulation.</span>',
  ];

  function printLine(html, className = 'terminal-line') {
    const line = document.createElement('div');
    line.className = className;
    line.innerHTML = html;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function initTerminal() {
    welcomeBanner.forEach(msg => printLine(msg));
  }

  const commands = {
    help: () => [
      '<span class="term-yellow">Available Security & Profile Commands:</span>',
      '  <span class="term-cyan">whoami</span>       - Display developer summary and profile bio',
      '  <span class="term-cyan">scan [url]</span>   - Run VulnEye perimeter audit (e.g. scan target.local)',
      '  <span class="term-cyan">skills</span>       - List core technical stack & security tools',
      '  <span class="term-cyan">projects</span>     - List flagship projects with tech stack',
      '  <span class="term-cyan">hackathon</span>    - MP Police Cyber Security Hackathon details',
      '  <span class="term-cyan">experience</span>   - View Oxella Technologies internship breakdown',
      '  <span class="term-cyan">contact</span>      - Show email, phone & social connection endpoints',
      '  <span class="term-cyan">clear</span>        - Clear terminal screen'
    ],
    whoami: () => [
      '<span class="term-green">Urvesh Shekhawat</span>',
      '<span class="term-muted">Role:</span> Full Stack Developer & Cybersecurity Specialist',
      '<span class="term-muted">Education:</span> B.Tech Computer Science @ Amity University, Gwalior (2023–2027)',
      '<span class="term-muted">Focus:</span> Web Security Perimeter Auditing, React/Node.js Architecture, Python/Flask SOC Tools',
      '<span class="term-purple">Achievement: 2nd Position in MP Police Cyber Security Hackathon (2025)</span>'
    ],
    skills: () => [
      '<span class="term-yellow">⚡ Languages:</span> Python, Java, C, C++, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3',
      '<span class="term-cyan">⚡ Frameworks & Web:</span> React 19, Next.js (App Router), Flask, Node.js, Express.js, Redux Toolkit, React Router v7, SQLAlchemy, Tailwind CSS v4, Recharts, PWA',
      '<span class="term-purple">⚡ Security & Tools:</span> OWASP Top 10, TCP Recon, Nmap, TLS/SSL, CVSS v3.1, SIEM Alerting, SSRF Mitigation, Google OAuth 2.0, JWT, Postman, Docker, Git'
    ],
    projects: () => [
      '1. <span class="term-cyan">VulnEye</span> - Enterprise Web Vulnerability & SOC Intelligence Platform (Python, Flask, SSE, ApexCharts, AI) | <a href="https://vuln-eye-seven.vercel.app/" target="_blank" class="term-green">Live Demo ↗</a>',
      '2. <span class="term-cyan">AeroSky</span> - Advanced Weather Intelligence PWA (Vanilla JS, Open-Meteo, AQI, SVG Sparklines) | <a href="https://aero-sky.vercel.app/" target="_blank" class="term-green">Live Demo ↗</a>',
      '3. <span class="term-cyan">LaunchDesk</span> - AI-Supercharged Customer Support SaaS (Next.js, TypeScript, Tailwind CSS v4, Recharts) | <a href="https://launchdesk-pied.vercel.app/" target="_blank" class="term-green">Live Demo ↗</a>',
      '4. <span class="term-cyan">Aurora Store</span> - Premium E-Commerce SPA (React 19, Redux Toolkit, React Router v7, Vitest) | <a href="https://aurora-inky-chi.vercel.app/" target="_blank" class="term-green">Live Demo ↗</a>'
    ],
    hackathon: () => [
      '<span class="term-yellow">🏆 Achievement Spotlight:</span>',
      'Secured <span class="term-green">2nd Position</span> in <span class="term-cyan">MP Police Cyber Security Hackathon</span> (Feb 2025)',
      'Recognized for rapid vulnerability analysis, defensive perimeter strategy, and threat intelligence tooling.'
    ],
    experience: () => [
      '<span class="term-green">Oxella Technologies Pvt. Ltd.</span> | Full Stack Developer Intern (Jaipur, Rajasthan)',
      '<span class="term-muted">Duration:</span> 7 July 2025 – 18 Aug 2025 (Real User Monitoring RUM Team)',
      '• Built RUM backend and frontend modules using React.js, Node.js, Express.js, and MySQL',
      '• Implemented Google OAuth 2.0 & JWT-based authorization for protected user sessions',
      '• Created validated RESTful APIs with Axios frontend integration & Postman testing'
    ],
    contact: () => [
      '<span class="term-yellow">📡 Contact Endpoints:</span>',
      '• <span class="term-muted">Email:</span> <a href="mailto:urvesh.shekhawat24@gmail.com" class="term-cyan">urvesh.shekhawat24@gmail.com</a>',
      '• <span class="term-muted">Phone:</span> <span class="term-green">+91 7378254896</span>',
      '• <span class="term-muted">LinkedIn:</span> <a href="https://linkedin.com/in/urvesh-shekhawat" target="_blank" class="term-cyan">linkedin.com/in/urvesh-shekhawat</a>',
      '• <span class="term-muted">GitHub:</span> <a href="https://github.com/Urvesh-Shekhawat" target="_blank" class="term-cyan">github.com/Urvesh-Shekhawat</a>'
    ],
    clear: () => {
      terminalBody.innerHTML = '';
      return [];
    }
  };

  function simulateScan(target = 'target.domain') {
    printLine(`<span class="term-cyan">[+] Initializing VulnEye Multi-Vector Reconnaissance on: </span><span class="term-yellow">${target}</span>`);
    
    const steps = [
      { delay: 300, text: '<span class="term-muted">[*] Performing SSRF-Safe DNS Resolution & TCP Port Recon...</span>' },
      { delay: 700, text: '<span class="term-green">[✔] TLS/SSL Certificate Analysis: Valid (TLS 1.3 / AES-256-GCM)</span>' },
      { delay: 1100, text: '<span class="term-yellow">[!] Checking OWASP Security Headers (HSTS, CSP, X-Frame-Options)...</span>' },
      { delay: 1500, text: '<span class="term-green">[✔] CORS Policy & Session Cookie Security: Secure (SameSite=Strict, HttpOnly)</span>' },
      { delay: 1900, text: '<span class="term-purple">[*] AI Threat Analyzer: Generating CVSS v3.1 Impact & Nginx Hardening Patch...</span>' },
      { delay: 2300, text: '<span class="term-green">[✔] Scan Complete! SOC Risk Score: 0/100 (Hardened Perimeter). SIEM Webhook dispatched.</span>' }
    ];

    steps.forEach(({ delay, text }) => {
      setTimeout(() => {
        printLine(text);
      }, delay);
    });
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.value.trim();
      if (!inputVal) return;

      commandHistory.push(inputVal);
      historyIndex = commandHistory.length;

      printLine(`<span class="term-prompt">urvesh@security-soc:~$</span> ${inputVal}`);
      terminalInput.value = '';

      const [cmd, ...args] = inputVal.toLowerCase().split(' ');

      if (cmd === 'scan') {
        const target = args[0] || 'target-system.local';
        simulateScan(target);
      } else if (commands[cmd]) {
        const output = commands[cmd]();
        output.forEach(line => printLine(line));
      } else {
        printLine(`<span class="term-muted">Command not recognized: '${cmd}'. Type </span><span class="term-cyan">help</span><span class="term-muted"> for list of commands.</span>`);
      }
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  initTerminal();
});
