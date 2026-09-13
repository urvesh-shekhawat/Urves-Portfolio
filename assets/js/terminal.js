/**
 * Interactive Cyber Terminal Simulator & Multi-Vector SOC Audit Engine
 * Urvesh Shekhawat Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const auditIndicator = document.getElementById('sys-audit-indicator');

  // Automated Quick Scan Simulation
  window.runAuditSimulation = function() {
    if (window.showToast) window.showToast('🛡️ Initiating VulnEye Perimeter Assessment...');

    if (auditIndicator) {
      auditIndicator.innerHTML = '<span style="color: var(--accent-amber);">[*] RESOLVING HOST &amp; TLS 1.3 CIPHERS...</span>';
    }

    setTimeout(() => {
      if (auditIndicator) {
        auditIndicator.innerHTML = '<span style="color: var(--accent-cyan);">[*] PROBING OWASP HEADERS (HSTS, CSP, X-FRAME)...</span>';
      }
    }, 600);

    setTimeout(() => {
      if (auditIndicator) {
        auditIndicator.innerHTML = '<span style="color: var(--accent-purple);">[*] MULTI-THREADED TCP RECON ACROSS 13+ PORTS...</span>';
      }
    }, 1200);

    setTimeout(() => {
      if (auditIndicator) {
        auditIndicator.innerHTML = '<span style="color: var(--accent-cyan);">[*] AI BILINGUAL THREAT EXPLAINER COMPILING DOSSIER...</span>';
      }
    }, 1800);

    setTimeout(() => {
      if (auditIndicator) {
        auditIndicator.innerHTML = '<span style="color: var(--accent-emerald);">[✔] 100% HARDENED. 0 CRITICAL CVEs DETECTED.</span>';
      }
      if (window.showToast) window.showToast('🛡️ VulnEye Audit Complete: All Perimeters Hardened');
    }, 2400);
  };

  // Interactive CLI Logic
  if (!terminalBody || !terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const welcomeBanner = [
    '<span class="text-cyan">┌────────────────────────────────────────────────────────────┐</span>',
    '<span class="text-cyan">│</span> <span class="text-green">VulnEye SOC Terminal v2.5</span> — <span class="text-cyan">Automated Perimeter Engine</span>   <span class="text-cyan">│</span>',
    '<span class="text-cyan">│</span> Engineer: <span class="text-amber">Urvesh Shekhawat</span> | Status: <span class="text-green">ACTIVE // READY</span>         <span class="text-cyan">│</span>',
    '<span class="text-cyan">└────────────────────────────────────────────────────────────┘</span>',
    '<span style="color: var(--text-muted);">Type </span><span class="text-cyan">help</span><span style="color: var(--text-muted);"> or </span><span class="text-cyan">scan [url]</span><span style="color: var(--text-muted);"> for interactive telemetry commands.</span>',
  ];

  function printLine(html) {
    const line = document.createElement('div');
    line.style.marginBottom = '4px';
    line.innerHTML = html;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function initTerminal() {
    welcomeBanner.forEach(msg => printLine(msg));
  }

  const commands = {
    help: () => [
      '<span class="text-amber">Available Telemetry &amp; Profile Directives:</span>',
      '  <span class="text-cyan">whoami</span>       — Display engineer summary &amp; credentials',
      '  <span class="text-cyan">scan [url]</span>   — Run VulnEye perimeter audit (e.g. scan domain.local)',
      '  <span class="text-cyan">skills</span>       — List core engineering &amp; security capabilities',
      '  <span class="text-cyan">projects</span>     — Output flagship systems with live URLs',
      '  <span class="text-cyan">hackathon</span>    — MP Police Cyber Security Hackathon honor',
      '  <span class="text-cyan">experience</span>   — Oxella Technologies RUM internship details',
      '  <span class="text-cyan">contact</span>      — Show direct email, phone, and profiles',
      '  <span class="text-cyan">clear</span>        — Clear active terminal screen'
    ],
    whoami: () => [
      '<span class="text-green">Urvesh Shekhawat</span>',
      '<span style="color: var(--text-muted);">Role:</span> Full Stack Developer &amp; Cybersecurity Specialist',
      '<span style="color: var(--text-muted);">Education:</span> B.Tech Computer Science @ Amity University, Gwalior (2023–2027)',
      '<span style="color: var(--text-muted);">Focus:</span> Web Security Perimeter Auditing, React/Node.js Architecture, Python/Flask SOC Tools',
      '<span class="text-amber">Achievement: 2nd Position in MP Police Cyber Security Hackathon (2025)</span>'
    ],
    skills: () => [
      '<span class="text-amber">⚡ Languages:</span> Python, Java, C, C++, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3',
      '<span class="text-cyan">⚡ Frameworks &amp; Web:</span> React 19, Next.js (App Router), Flask, Node.js, Express.js, Redux Toolkit, React Router v7, SQLAlchemy, Tailwind CSS v4, Recharts, PWA',
      '<span class="text-green">⚡ Security &amp; Tools:</span> OWASP Top 10, TCP Recon, Nmap, TLS/SSL, CVSS v3.1, SIEM Alerting, SSRF Mitigation, Google OAuth 2.0, JWT, Postman, Docker, Git'
    ],
    projects: () => [
      '1. <span class="text-cyan">VulnEye</span> — Enterprise Web Vulnerability &amp; SOC Platform (Python, Flask, SSE, ApexCharts, AI) | <a href="https://vuln-eye-seven.vercel.app/" target="_blank" class="text-green">Live Demo ↗</a>',
      '2. <span class="text-cyan">AeroSky</span> — Weather Intelligence &amp; Analytics PWA (Vanilla JS, Open-Meteo, AQI, Sparklines) | <a href="https://aero-sky.vercel.app/" target="_blank" class="text-green">Live Demo ↗</a>',
      '3. <span class="text-cyan">LaunchDesk</span> — AI-Supercharged Customer Support SaaS (Next.js, TypeScript, Tailwind CSS v4, Recharts) | <a href="https://launchdesk-pied.vercel.app/" target="_blank" class="text-green">Live Demo ↗</a>',
      '4. <span class="text-cyan">Aurora Store</span> — Premium E-Commerce Capstone SPA (React 19, Redux Toolkit, React Router v7, Vitest) | <a href="https://aurora-inky-chi.vercel.app/" target="_blank" class="text-green">Live Demo ↗</a>',
      '5. <span class="text-cyan">Zenith Tasks</span> — Dynamic Workspace &amp; Kanban PWA (HTML5 Drag &amp; Drop, PWA, Chart.js)'
    ],
    hackathon: () => [
      '<span class="text-amber">🏆 Achievement Spotlight:</span>',
      'Secured <span class="text-green">2nd Position</span> in <span class="text-cyan">MP Police Cyber Security Hackathon</span> (Feb 2025)',
      'Recognized for rapid vulnerability analysis, defensive perimeter strategy, and threat intelligence tooling.'
    ],
    experience: () => [
      '<span class="text-green">Oxella Technologies Pvt. Ltd.</span> | Full Stack Developer Intern (Jaipur, Rajasthan)',
      '<span style="color: var(--text-muted);">Duration:</span> 7 July 2025 – 18 Aug 2025 (Real User Monitoring RUM Team)',
      '• Built RUM backend and frontend modules using React.js, Node.js, Express.js, and MySQL',
      '• Implemented Google OAuth 2.0 &amp; JWT-based authorization for protected user sessions',
      '• Created validated RESTful APIs with Axios frontend integration &amp; Postman testing'
    ],
    contact: () => [
      '<span class="text-amber">📡 Contact Endpoints:</span>',
      '• <span style="color: var(--text-muted);">Email:</span> <a href="mailto:urvesh.shekhawat24@gmail.com" class="text-cyan">urvesh.shekhawat24@gmail.com</a>',
      '• <span style="color: var(--text-muted);">Phone:</span> <span class="text-green">+91 7378254896</span>',
      '• <span style="color: var(--text-muted);">LinkedIn:</span> <a href="https://linkedin.com/in/urvesh-shekhawat" target="_blank" class="text-cyan">linkedin.com/in/urvesh-shekhawat</a>',
      '• <span style="color: var(--text-muted);">GitHub:</span> <a href="https://github.com/Urvesh-Shekhawat" target="_blank" class="text-cyan">github.com/Urvesh-Shekhawat</a>'
    ],
    clear: () => {
      terminalBody.innerHTML = '';
      return [];
    }
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const fullCmd = terminalInput.value.trim();
      if (!fullCmd) return;

      printLine(`<span class="cli-prompt">urvesh@soc:~$</span> <span class="text-primary">${fullCmd}</span>`);
      commandHistory.push(fullCmd);
      historyIndex = commandHistory.length;
      terminalInput.value = '';

      const [cmdName, ...args] = fullCmd.toLowerCase().split(' ');

      if (cmdName === 'scan') {
        const target = args[0] || 'perimeter.local';
        printLine(`<span class="text-cyan">[*] Launching VulnEye socket sweep against: ${target}...</span>`);
        printLine(`<span class="text-green">[✔] TLS 1.3 Strict Ciphers / HSTS Enforced</span>`);
        printLine(`<span class="text-green">[✔] OWASP Top 10 Headers: CSP, X-Frame-Options PASS</span>`);
        printLine(`<span class="text-green">[✔] 0 High-Risk Vulnerabilities Detected</span>`);
        return;
      }

      if (commands[cmdName]) {
        const output = commands[cmdName]();
        output.forEach(line => printLine(line));
      } else {
        printLine(`<span style="color: #ef4444;">Command not recognized: '${cmdName}'. Type '<span class="text-cyan">help</span>' for options.</span>`);
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
