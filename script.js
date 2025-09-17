// Set stroke-dasharray and stroke-dashoffset dynamically for animated paths
document.addEventListener('DOMContentLoaded', () => {
    const paths = ['outer-triangle', 'slash', 'right-arrow', 'left-arrow', 'inner-triangle'];
    paths.forEach(id => {
        const path = document.getElementById(id);
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        path.style.transition = 'stroke-dashoffset 4s ease-in-out'; // Smooth transition
    });

    // Hide loader after 4.5 seconds (to allow animations to complete)
    setTimeout(() => {
        document.querySelector('.loading-page').classList.add('hidden');
    }, 4500);

    // Initialize 3D tilt effect (though no project-card, skill-item, or stat-item exist yet)
    if (VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll('.project-card, .skill-item, .stat-item'), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.05
        });
    }
});

// Quick Access Tabs
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Chart.js for Stats Section
const ctx = document.getElementById('statsChart').getContext('2d');
const statsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'User Activity',
            data: [10, 20, 15, 30, 25, 40],
            borderColor: '#059669',
            backgroundColor: 'rgba(5, 150, 105, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});