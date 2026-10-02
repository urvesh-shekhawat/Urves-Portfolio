/**
 * Urvesh Shekhawat — Command Palette (Ctrl/Cmd + K)
 * Fast, keyboard-accessible navigation and quick actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.getElementById('cmd-palette-backdrop');
  const input = document.getElementById('cmd-palette-input');
  const list = document.getElementById('cmd-palette-list');
  const triggers = document.querySelectorAll('.cmd-k-trigger');

  if (!backdrop || !input || !list) return;

  const commands = [
    { title: 'Home', category: 'Navigation', shortcut: 'G H', action: () => scrollToSection('#hero') },
    { title: 'About', category: 'Navigation', shortcut: 'G A', action: () => scrollToSection('#about') },
    { title: 'Experience', category: 'Navigation', shortcut: 'G E', action: () => scrollToSection('#experience') },
    { title: 'Projects', category: 'Navigation', shortcut: 'G P', action: () => scrollToSection('#projects') },
    { title: 'Security Lab', category: 'Navigation', shortcut: 'G L', action: () => scrollToSection('#security-lab') },
    { title: 'Skills', category: 'Navigation', shortcut: 'G S', action: () => scrollToSection('#skills') },
    { title: 'Contact', category: 'Navigation', shortcut: 'G C', action: () => scrollToSection('#contact') },
    
    { title: 'VulnEye Live Demo', category: 'Projects', shortcut: 'L V', action: () => window.open('https://vuln-eye-seven.vercel.app/', '_blank') },
    { title: 'AeroSky Weather PWA', category: 'Projects', shortcut: 'L A', action: () => window.open('https://aero-sky.vercel.app/', '_blank') },
    { title: 'LaunchDesk Support SaaS', category: 'Projects', shortcut: 'L L', action: () => window.open('https://launchdesk-pied.vercel.app/', '_blank') },
    { title: 'Aurora Store SPA', category: 'Projects', shortcut: 'L S', action: () => window.open('https://aurora-inky-chi.vercel.app/', '_blank') },
    
    { title: 'View VulnEye Architecture Details', category: 'Modal', shortcut: 'V V', action: () => window.openProjectModal('vulneye') },
    { title: 'View AeroSky Details', category: 'Modal', shortcut: 'V A', action: () => window.openProjectModal('aerosky') },
    { title: 'View LaunchDesk Details', category: 'Modal', shortcut: 'V L', action: () => window.openProjectModal('launchdesk') },
    { title: 'View Aurora Store Details', category: 'Modal', shortcut: 'V S', action: () => window.openProjectModal('aurora') },
    { title: 'View Zenith Tasks Details', category: 'Modal', shortcut: 'V Z', action: () => window.openProjectModal('zenith') },

    { title: 'Download Resume (PDF)', category: 'Action', shortcut: 'D R', action: () => downloadResume() },
    { title: 'Copy Email Address', category: 'Action', shortcut: 'C E', action: () => copyEmail() },
    { title: 'Toggle Light / Dark Theme', category: 'Theme', shortcut: 'T M', action: () => window.toggleTheme() },
    { title: 'Open GitHub Profile', category: 'Social', shortcut: 'O G', action: () => window.open('https://github.com/Urvesh-Shekhawat', '_blank') },
    { title: 'Open LinkedIn Profile', category: 'Social', shortcut: 'O L', action: () => window.open('https://linkedin.com/in/urvesh-shekhawat', '_blank') }
  ];

  let selectedIndex = 0;
  let filteredCommands = [...commands];

  function openPalette() {
    backdrop.classList.add('active');
    input.value = '';
    selectedIndex = 0;
    renderCommands(commands);
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    backdrop.classList.remove('active');
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
    if (window.showToast) window.showToast('Downloading resume...');
  }

  function copyEmail() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('urvesh.shekhawat24@gmail.com').then(() => {
        if (window.showToast) window.showToast('Email copied to clipboard!');
      });
    }
  }

  function renderCommands(items) {
    list.innerHTML = '';
    filteredCommands = items;

    if (items.length === 0) {
      list.innerHTML = '<li style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.875rem;">No matching commands found.</li>';
      return;
    }

    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `cmd-item ${index === selectedIndex ? 'selected' : ''}`;
      li.innerHTML = `
        <div class="cmd-item-left">
          <span class="cmd-item-category">${item.category}</span>
          <span>${item.title}</span>
        </div>
        <span class="cmd-item-shortcut">${item.shortcut}</span>
      `;

      li.addEventListener('click', () => {
        closePalette();
        item.action();
      });

      list.appendChild(li);
    });
  }

  input.addEventListener('input', (e) => {
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

  input.addEventListener('keydown', (e) => {
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
        closePalette();
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  // Global Ctrl+K / Cmd+K listener
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closePalette();
    }
  });

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPalette();
    });
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closePalette();
    }
  });
});
