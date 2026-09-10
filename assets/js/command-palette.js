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
    { title: 'Go to Hero / Intro', category: 'Navigation', shortcut: 'G H', action: () => scrollToSection('#hero') },
    { title: 'About Urvesh', category: 'Navigation', shortcut: 'G A', action: () => scrollToSection('#about') },
    { title: 'Experience & Internships', category: 'Navigation', shortcut: 'G E', action: () => scrollToSection('#experience') },
    { title: 'Projects Showcase', category: 'Navigation', shortcut: 'G P', action: () => scrollToSection('#projects') },
    { title: 'Hackathons & Achievements', category: 'Navigation', shortcut: 'G H', action: () => scrollToSection('#achievements') },
    { title: 'Technical Skills Matrix', category: 'Navigation', shortcut: 'G S', action: () => scrollToSection('#skills') },
    { title: 'Education & Academics', category: 'Navigation', shortcut: 'G D', action: () => scrollToSection('#education') },
    { title: 'Launch VulnEye SOC Platform (Live)', category: 'Projects', shortcut: 'L V', action: () => window.open('https://vuln-eye-seven.vercel.app/', '_blank') },
    { title: 'Launch AeroSky Weather PWA (Live)', category: 'Projects', shortcut: 'L A', action: () => window.open('https://aero-sky.vercel.app/', '_blank') },
    { title: 'Launch LaunchDesk AI SaaS (Live)', category: 'Projects', shortcut: 'L L', action: () => window.open('https://launchdesk-pied.vercel.app/', '_blank') },
    { title: 'Launch Aurora Store E-Commerce (Live)', category: 'Projects', shortcut: 'L S', action: () => window.open('https://aurora-inky-chi.vercel.app/', '_blank') },
    { title: 'View VulnEye SOC Platform Details', category: 'Projects', shortcut: 'P V', action: () => window.openProjectModal('vulneye') },
    { title: 'View AeroSky Weather PWA Details', category: 'Projects', shortcut: 'P A', action: () => window.openProjectModal('aerosky') },
    { title: 'View LaunchDesk AI SaaS Details', category: 'Projects', shortcut: 'P L', action: () => window.openProjectModal('launchdesk') },
    { title: 'View Aurora Store Details', category: 'Projects', shortcut: 'P S', action: () => window.openProjectModal('aurora') },
    { title: 'Download Resume (PDF)', category: 'Actions', shortcut: 'D R', action: () => downloadResume() },
    { title: 'Copy Email Address', category: 'Actions', shortcut: 'C E', action: () => window.copyToClipboard('urvesh.shekhawat24@gmail.com', 'Email copied!') },
    { title: 'Copy Phone Number', category: 'Actions', shortcut: 'C P', action: () => window.copyToClipboard('+917378254896', 'Phone copied!') },
    { title: 'Toggle Light / Dark Mode', category: 'Preferences', shortcut: 'T M', action: () => window.toggleTheme() },
    { title: 'Open GitHub Profile', category: 'Socials', shortcut: 'G B', action: () => window.open('https://github.com/Urvesh-Shekhawat', '_blank') },
    { title: 'Open LinkedIn Profile', category: 'Socials', shortcut: 'L I', action: () => window.open('https://linkedin.com/in/urvesh-shekhawat', '_blank') }
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
      paletteList.innerHTML = '<li style="padding: 20px; text-align: center; color: var(--text-muted);">No matching commands found.</li>';
      return;
    }

    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `cmd-item ${index === selectedIndex ? 'selected' : ''}`;
      li.innerHTML = `
        <div class="cmd-item-left">
          <span style="font-size: 0.8rem; color: var(--accent-cyan); font-family: var(--font-mono);">${item.category}</span>
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

  paletteInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const results = commands.filter(cmd => 
      cmd.title.toLowerCase().includes(query) ||
      cmd.category.toLowerCase().includes(query) ||
      cmd.shortcut.toLowerCase().includes(query)
    );
    selectedIndex = 0;
    renderCommands(results);
  });

  paletteInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedIndex < filteredCommands.length - 1) {
        selectedIndex++;
        updateSelection();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedIndex > 0) {
        selectedIndex--;
        updateSelection();
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

  function updateSelection() {
    const items = paletteList.querySelectorAll('.cmd-item');
    items.forEach((item, i) => {
      if (i === selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  triggers.forEach(trigger => trigger.addEventListener('click', openPalette));

  paletteBackdrop.addEventListener('click', (e) => {
    if (e.target === paletteBackdrop) {
      closePalette();
    }
  });

  // Global Keyboard listener
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (paletteBackdrop.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });
});
