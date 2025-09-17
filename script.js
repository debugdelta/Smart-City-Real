document.addEventListener('DOMContentLoaded', () => {
  // ---------- Path Animation (defensive) ----------
  const paths = ['outer-triangle', 'slash', 'right-arrow', 'left-arrow', 'inner-triangle'];
  paths.forEach(id => {
    const path = document.getElementById(id);
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.style.transition = 'stroke-dashoffset 4s ease-in-out';
  });

  // ---------- Loader hide ----------
  const loader = document.querySelector('.loading-page');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 4500);
  }

  // ---------- VanillaTilt init ----------
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.project-card, .skill-item, .stat-item'), {
      max: 15, speed: 400, glare: true, "max-glare": 0.3, scale: 1.05
    });
  }

  // ---------- Navbar underline + gradient text ----------
  (function initNavUnderline() {
    const navLinksContainer = document.querySelector('.nav-links');
    if (!navLinksContainer) return;

    // ensure container positioned
    if (window.getComputedStyle(navLinksContainer).position === 'static') {
      navLinksContainer.style.position = 'relative';
    }

    // create underline
    let movingUnderline = navLinksContainer.querySelector('.moving-underline');
    if (!movingUnderline) {
      movingUnderline = document.createElement('span');
      movingUnderline.className = 'moving-underline';
      navLinksContainer.appendChild(movingUnderline);
    }

    const links = Array.from(navLinksContainer.querySelectorAll('li a'));

    function moveToElement(el) {
      if (!el) return;
      const elRect = el.getBoundingClientRect();
      const contRect = navLinksContainer.getBoundingClientRect();
      const left = elRect.left - contRect.left + navLinksContainer.scrollLeft;
      movingUnderline.style.left = left + 'px';
      movingUnderline.style.width = elRect.width + 'px';
      movingUnderline.style.opacity = '1';

      // gradient text effect
      links.forEach(l => l.classList.remove('gradient-text'));
      el.classList.add('gradient-text');
    }

    function hideUnderline() {
      const active = navLinksContainer.querySelector('li a.active');
      if (active) {
        moveToElement(active);
      } else {
        movingUnderline.style.opacity = '0';
        links.forEach(l => l.classList.remove('gradient-text'));
      }
    }

    links.forEach(link => {
      link.addEventListener('mouseenter', e => moveToElement(e.currentTarget));
      link.addEventListener('focus', e => moveToElement(e.currentTarget));
      link.addEventListener('click', e => {
        links.forEach(l => l.classList.remove('active', 'gradient-text'));
        e.currentTarget.classList.add('active');
        moveToElement(e.currentTarget);
      });
    });

    navLinksContainer.addEventListener('mouseleave', hideUnderline);

    // place underline on load
    const initialActive = navLinksContainer.querySelector('li a.active');
    if (initialActive) moveToElement(initialActive);

    window.addEventListener('resize', () => {
      const active = navLinksContainer.querySelector('li a.active');
      if (active) moveToElement(active);
      else movingUnderline.style.opacity = '0';
    });
  })();

  // ---------- Chart.js ----------
  const statsCanvas = document.getElementById('statsChart');
  if (statsCanvas && typeof Chart !== 'undefined') {
    const ctx = statsCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [{
          label: 'User Activity',
          data: [10,20,15,30,25,40],
          borderColor: '#059669',
          backgroundColor: 'rgba(5,150,105,0.2)',
          fill: true
        }]
      },
      options: { responsive: false, scales: { y: { beginAtZero: true } } }
    });
  }
});
