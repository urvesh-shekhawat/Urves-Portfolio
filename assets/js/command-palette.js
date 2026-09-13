/**
 * Command Palette (Ctrl/Cmd + K) for Quick Navigation & Actions
 * Urvesh Shekhawat Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const paletteBackdrop = document.getElementById('cmd-palette-backdrop');
  const paletteInput = document.getElementById('cmd-palette-input');
  const paletteList = document.getElementById('cmd-palette-list');
  const triggers = document.querySelectorAll('.cmd-k-trigger');

  if (!paletteBackdrop || !paletteInput || !paletteList) return;

  const commands = [
    { title: 'Home / Systems Topology', category: 'Navigation', shortcut: 'G H', action: () => scrollToSection('#hero') },
    { title: 'Selected Work & Case Studies', category: 'Navigation', shortcut: 'G W', action: () => scrollToSection('#projects') },
    { title: 'Cybersecurity Lab & Attack Surface', category: 'Navigation', shortcut: 'G L', action: () => scrollToSection('#security-lab') },
    { title: 'Engineering Profile & Bio', category: 'Navigation', shortcut: 'G P', action: () => scrollToSection('#about') },
    { title: 'Experience & Internships', category: 'Navigation', shortcut: 'G E', action: () => scrollToSection('#experience') },
    { title: 'Hackathons & Honors', category: 'Navigation', shortcut: 'G A', action: () => scrollToSection('#achievements') },
    { title: 'Technical Stack Matrix', category: 'Navigation', shortcut: 'G S', action: () => scrollToSection('#stack') },
    { title: 'Get In Touch / Contact', category: 'Navigation', shortcut: 'G C', action: () => scrollToSection('#contact') },
    { title: 'Execute VulnEye Perimeter Scan', category: 'Security', shortcut: 'E S', action: () => window.runAuditSimulation() },
    { title: 'Launch VulnEye SOC Platform (Live)', category: 'Deployments', shortcut: 'L V', action: () => window.open('https://vuln-eye-seven.vercel.app/', '_blank') },
    { title: 'Launch AeroSky Weather PWA (Live)', category: 'Deployments', shortcut: 'L A', action: () => window.open('https://aero-sky.vercel.app/', '_blank') },
    { title: 'Launch LaunchDesk AI SaaS (Live)', category: 'Deployments', shortcut: 'L L', action: () => window.open('https://launchdesk-pied.vercel.app/', '_blank') },
    { title: 'Launch Aurora Store E-Commerce (Live)', category: 'Deployments', shortcut: 'L S', action: () => window.open('https://aurora-inky-chi.vercel.app/', '_blank') },
    { title: 'View VulnEye Architecture Spec', category: 'Case Studies', shortcut: 'V V', action: () => window.openProjectModal('vulneye') },
    { title: 'View AeroSky PWA Architecture Spec', category: 'Case Studies', shortcut: 'V A', action: () => window.openProjectModal('aerosky') },
    { title: 'View LaunchDesk SaaS Architecture Spec', category: 'Case Studies', shortcut: 'V L', action: () => window.openProjectModal('launchdesk') },
    { title: 'View Aurora Store Architecture Spec', category: 'Case Studies', shortcut: 'V S', action: () => window.openProjectModal('aurora') },
    { title: 'View Zenith Tasks Architecture Spec', category: 'Case Studies', shortcut: 'V Z', action: () => window.openProjectModal('zenith') },
    { title: 'Download Resume (PDF)', category: 'Actions', shortcut: 'D R', action: () => downloadResume() },
    { title: 'Copy Email Address', category: 'Actions', shortcut: 'C E', action: () => window.copyToClipboard('urvesh.shekhawat24@gmail.com', 'Email copied!') },
    { title: 'Copy Phone Number', category: 'Actions', shortcut: 'C P', action: () => window.copyToClipboard('+917378254896', 'Phone copied!') },
    { title: 'Toggle Dark / Light Theme', category: 'Preferences', shortcut: 'T M', action: () => window.toggleTheme() },
    { title: 'Open GitHub Profile', category: 'Socials', shortcut: 'O G', action: () => window.open('https://github.com/Urvesh-Shekhawat', '_blank') },
    { title: 'Open LinkedIn Profile', category: 'Socials', shortcut: 'O L', action: () => window.open('https://linkedin.com/in/urvesh-shekhawat', '_blank') }
  ];

  let selectedIndex = 0;
  let filteredCommands = [...commands];

  function openPalette() {
    paletteBackdrop.classList.add('active');
    paletteInput.value = '';
    selectedIndex = 0;
    renderCommands(commands);
    setTimeout(() => paletteInput.focus(), 50);
  }

  function closePalette() {
    paletteBackdrop.classList.remove('active');
  }

  function scrollToSection(id) {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/Urvesh_Shekhawat_Resume.pdf';
    link.download = 'Urvesh_Shekhawat_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (window.showToast) window.showToast('📄 Resume download started!');
  }

  function renderCommands(items) {
    paletteList.innerHTML = '';
    filteredCommands = items;

    if (items.length === 0) {
      paletteList.innerHTML = '<li style="padding: 18px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No matching directives found.</li>';
      return;
    }

    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `cmd-item ${index === selectedIndex ? 'selected' : ''}`;
      li.innerHTML = `
        <div class="cmd-item-left">
          <span style="font-size: 0.72rem; color: var(--accent-cyan); font-family: var(--font-mono);">${item.category}</span>
          <span>${item.title}</span>
        </div>
        <span class="cmd-item-shortcut">${item.shortcut}</span>
      `;

      li.addEventListener('click', () => {
        executeCommand(item);
      });

      paletteList.appendChild(li);
    });
  }

  function executeCommand(item) {
    closePalette();
    item.action();
  }

  // Keyboard navigation & search input listener
  paletteInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderCommands(commands);
      return;
    }

    const matches = commands.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.category.toLowerCase().includes(query) ||
      c.shortcut.toLowerCase().includes(query)
    );
    selectedIndex = 0;
    renderCommands(matches);
  });

  paletteInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        renderCommands(filteredCommands);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
        renderCommands(filteredCommands);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  // Global hotkey: Ctrl+K or Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (paletteBackdrop.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && paletteBackdrop.classList.contains('active')) {
      closePalette();
    }
  });

  triggers.forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      openPalette();
    });
  });

  paletteBackdrop.addEventListener('click', (e) => {
    if (e.target === paletteBackdrop) {
      closePalette();
    }
  });
});
