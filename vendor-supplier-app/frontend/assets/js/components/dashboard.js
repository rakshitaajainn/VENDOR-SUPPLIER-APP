function initDashboard() {
    // Chart initialization
    if (document.getElementById('revenueChart')) {
        console.log('Initializing revenue chart...');
        // In a real app, we would use Chart.js or similar
    }

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-counter');
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const countUp = new CountUp(stat, target, {duration: 2});
        countUp.start();
    });

    // Recent activity timeline
    const activities = [
        {id: 1, type: 'order', message: 'New order #1234 received', time: '10 min ago'},
        {id: 2, type: 'message', message: 'Customer inquiry about product', time: '25 min ago'},
        {id: 3, type: 'payment', message: 'Payment received for order #1229', time: '1 hour ago'}
    ];

    const activityList = document.getElementById('activityList');
    if (activityList) {
        activities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item py-2';
            item.innerHTML = `
                <div class="flex items-start">
                    <div class="activity-icon mr-3">
                        <i class="fas fa-${activity.type === 'order' ? 'shopping-cart' : activity.type === 'message' ? 'envelope' : 'rupee-sign'} text-primary-500"></i>
                    </div>
                    <div>
                        <p class="text-sm font-medium">${activity.message}</p>
                        <p class="text-xs text-gray-500">${activity.time}</p>
                    </div>
                </div>
            `;
            activityList.appendChild(item);
        });
    }
}

