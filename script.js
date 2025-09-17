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
  const statsChart = document.getElementById('statsChart');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      if (statsChart) {
        statsChart.classList.add('visible'); // Show chart after loader hides
      }
    }, 4500);
  }

  // ---------- VanillaTilt init ----------
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.project-card, .skill-item, .stat-item, .message-box, .feedback-item, .access-box'), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      scale: 1.05
    });
  }

  // ---------- Navbar underline + gradient text ----------
  (function initNavUnderline() {
    const navLinksContainer = document.querySelector('.nav-links');
    if (!navLinksContainer) return;

    // Ensure container positioned
    if (window.getComputedStyle(navLinksContainer).position === 'static') {
      navLinksContainer.style.position = 'relative';
    }

    // Create underline
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

      // Gradient text effect
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

    // Place underline on load
    const initialActive = navLinksContainer.querySelector('li a.active');
    if (initialActive) moveToElement(initialActive);

    window.addEventListener('resize', () => {
      const active = navLinksContainer.querySelector('li a.active');
      if (active) moveToElement(active);
      else movingUnderline.style.opacity = '0';
    });
  })();

  // ---------- News Section Animation ----------
  const items = document.querySelectorAll(".news-item");
  if (items.length > 0) {
    let index = 0;

    function showNextNews() {
      items.forEach((item, i) => {
        item.classList.remove("active");
      });

      items[index].classList.add("active");
      index = (index + 1) % items.length;
    }

    // Initial display
    showNextNews();
    setInterval(showNextNews, 3000); // Change every 3 seconds
  }

  // ---------- Navbar Toggle ----------
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    // Toggle menu on button click
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      console.log('Toggle clicked:', {
        navLinksActive: navLinks.classList.contains('active'),
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (event) => {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnToggle = navToggle.contains(event.target);
      if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        console.log('Closed toggle due to outside click');
      }
    });
  } else {
    console.error('Navbar toggle failed: .nav-toggle or .nav-links not found');
  }

  // ---------- Explore Section Tab Switching ----------
  window.showTab = function(tabId) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to clicked tab and corresponding content
    document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add('active');
    const tabContent = document.getElementById(tabId);
    if (tabContent) tabContent.classList.add('active');
  };

  // ---------- Chart.js ----------
  const statsCanvas = document.getElementById('statsChart');
  if (statsCanvas && typeof Chart !== 'undefined') {
    const ctx = statsCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'User Activity',
          data: [10, 20, 15, 30, 25, 40],
          borderColor: '#059669',
          backgroundColor: 'rgba(5,150,105,0.2)',
          fill: true
        }]
      },
      options: {
        responsive: true, // Ensure chart adapts to container
        maintainAspectRatio: true, // Maintain aspect ratio to prevent stretching
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
});