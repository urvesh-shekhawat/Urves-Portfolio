/**
 * Urvesh Shekhawat — Security Lab Terminal & CLI Simulator
 * Clean, practical security inspection tool for developers and technical recruiters.
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalContent = document.getElementById('lab-terminal-content');
  const cliInput = document.getElementById('terminal-cli-input');

  if (!terminalContent || !cliInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  function printLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `term-output-line ${className}`;
    line.innerHTML = text;
    terminalContent.appendChild(line);
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }

  const commands = {
    help: () => [
      '<span class="term-text-blue">Available commands:</span>',
      '  <span class="term-text-green">whoami</span>       - Developer background and role',
      '  <span class="term-text-green">scan [domain]</span> - Simulate web perimeter security audit',
      '  <span class="term-text-green">projects</span>     - List selected software & security projects',
      '  <span class="term-text-green">skills</span>       - List core technical toolsets & languages',
      '  <span class="term-text-green">experience</span>   - Oxella Technologies internship details',
      '  <span class="term-text-green">hackathon</span>    - MP Police Cyber Security Hackathon achievement',
      '  <span class="term-text-green">contact</span>      - Direct email and professional profiles',
      '  <span class="term-text-green">clear</span>        - Clear the terminal screen'
    ],
    whoami: () => [
      '<span class="term-text-green">Urvesh Shekhawat</span>',
      'Role: Full Stack Developer &amp; Cybersecurity Enthusiast',
      'Education: B.Tech Computer Science @ Amity University Madhya Pradesh (2023–2027)',
      'Focus: Scalable Web Applications, Python/Flask Security Tools, Perimeter Auditing'
    ],
    projects: () => [
      '1. <strong class="term-text-blue">VulnEye</strong>: Web Vulnerability Scanner &amp; SOC Platform (Python, Flask, SSE) | <a href="https://vuln-eye-seven.vercel.app/" target="_blank" style="color: #4ade80; text-decoration: underline;">Live Demo ↗</a>',
      '2. <strong class="term-text-blue">AeroSky</strong>: Weather Intelligence PWA (Vanilla JS, Service Workers, Open-Meteo) | <a href="https://aero-sky.vercel.app/" target="_blank" style="color: #4ade80; text-decoration: underline;">Live Demo ↗</a>',
      '3. <strong class="term-text-blue">LaunchDesk</strong>: AI-Supercharged Customer Support SaaS (Next.js, TypeScript, Tailwind) | <a href="https://launchdesk-pied.vercel.app/" target="_blank" style="color: #4ade80; text-decoration: underline;">Live Demo ↗</a>',
      '4. <strong class="term-text-blue">Aurora Store</strong>: E-Commerce Capstone SPA (React 19, Redux Toolkit, Vitest) | <a href="https://aurora-inky-chi.vercel.app/" target="_blank" style="color: #4ade80; text-decoration: underline;">Live Demo ↗</a>',
      '5. <strong class="term-text-blue">Zenith Tasks</strong>: Drag-and-Drop Task Management PWA (HTML5 DnD, PWA, Chart.js)'
    ],
    skills: () => [
      '<span class="term-text-blue">Languages:</span> Python, JavaScript (ES6+), TypeScript, Java, C/C++, SQL, HTML5, CSS3',
      '<span class="term-text-blue">Frontend:</span> React 19, Next.js (App Router), Redux Toolkit, Tailwind CSS, PWA, Recharts',
      '<span class="term-text-blue">Backend:</span> Python (Flask), Node.js, Express.js, REST APIs, Server-Sent Events (SSE), SQLAlchemy',
      '<span class="term-text-blue">Databases:</span> PostgreSQL, MySQL, SQLite',
      '<span class="term-text-blue">Security:</span> OWASP Top 10, Port Recon, TLS/SSL, CVSS v3.1, SSRF Mitigation, OAuth 2.0 &amp; JWT'
    ],
    experience: () => [
      '1. <strong class="term-text-green">State Cyber Police Zone, Gwalior (M.P.)</strong> — Cyber Forensics &amp; Security Intern (August 2026)',
      '   • Completed 15-day intensive program on Cyber Forensics, Cybercrime Investigation &amp; Digital Evidence Handling.',
      '   • Gained hands-on experience in practical cyber policing workflows, chain-of-custody protocols &amp; threat awareness.',
      '2. <strong class="term-text-green">Oxella Technologies Pvt. Ltd.</strong> — Full Stack Developer Intern (July–August 2025)',
      '   • Built frontend &amp; backend modules for a Real User Monitoring (RUM) platform using React, Node.js, Express, MySQL.',
      '   • Implemented Google OAuth 2.0 &amp; JWT authentication workflows for secure session handling.',
      '   • Developed validated RESTful APIs integrated via Axios and tested via Postman.'
    ],
    hackathon: () => [
      '<span class="term-text-amber">🥈 MP Police Cyber Security Hackathon (Feb 2025)</span>',
      'Secured 2nd Place in the state-level hackathon organized by Madhya Pradesh Police Department.',
      'Evaluated on real-time perimeter vulnerability analysis, threat detection, and defensive remediation.'
    ],
    contact: () => [
      '• Email: <a href="mailto:urvesh.shekhawat24@gmail.com" class="term-text-blue">urvesh.shekhawat24@gmail.com</a>',
      '• LinkedIn: <a href="https://linkedin.com/in/urvesh-shekhawat" target="_blank" class="term-text-blue">linkedin.com/in/urvesh-shekhawat ↗</a>',
      '• GitHub: <a href="https://github.com/Urvesh-Shekhawat" target="_blank" class="term-text-blue">github.com/Urvesh-Shekhawat ↗</a>',
      '• Phone: +91 7378254896'
    ],
    clear: () => {
      terminalContent.innerHTML = '';
      return [];
    }
  };

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const fullCmd = cliInput.value.trim();
      if (!fullCmd) return;

      printLine(`<span class="term-text-green">urvesh@audit:~$</span> <strong>${fullCmd}</strong>`);
      commandHistory.push(fullCmd);
      historyIndex = commandHistory.length;
      cliInput.value = '';

      const [cmdName, ...args] = fullCmd.toLowerCase().split(' ');

      if (cmdName === 'scan') {
        const target = args[0] || 'example.com';
        printLine(`<span class="term-text-blue">[+] Initiating socket probe against: ${target}...</span>`);
        setTimeout(() => {
          printLine(`• Port 443 (HTTPS)     : <span class="term-text-green">OPEN (TLS 1.3 / Strict Ciphers)</span>`);
          printLine(`• OWASP Top 10 Headers: <span class="term-text-green">PASS (CSP, HSTS, X-Frame Enforced)</span>`);
          printLine(`• Sensitive Dotfiles  : <span class="term-text-green">404 NOT FOUND (Protected)</span>`);
          printLine(`• Subnet SSRF Filter   : <span class="term-text-green">ACTIVE (Private IPs Denied)</span>`);
          printLine(`<span class="term-text-green">[✔] Audit Complete: Target perimeter hardened.</span>`);
        }, 300);
        return;
      }

      if (commands[cmdName]) {
        const lines = commands[cmdName]();
        lines.forEach(l => printLine(l));
      } else {
        printLine(`<span style="color: #ef4444;">Command '${cmdName}' not recognized. Type '<span class="term-text-green">help</span>' for a list of commands.</span>`);
      }
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        cliInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        cliInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        cliInput.value = '';
      }
    }
  });

});
