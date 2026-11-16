import './components/sidebar.js';
import './components/top-navbar.js';
import './components/card-summary.js';
import './components/card-class.js';
import './components/card-upcoming-class.js';
import './components/card-activity.js';
import './components/card-class-filter.js';
import './components/card-class-item.js';
import './pages/dashboard.js';
import './pages/kelas-saya.js';

const routes = {
    'dashboard': '<page-dashboard></page-dashboard>',
    'kelas-saya': '<page-kelas-saya></page-kelas-saya>',
};

const contentArea = document.getElementById('content-area');

function navigateTo(pageName) {
    const htmlToRender = routes[pageName] || '<h2>404 - Page Not Found</h2>';
    
    contentArea.innerHTML = htmlToRender;
}

navigateTo('dashboard');

document.addEventListener('sidebar-navigated', (event) => {
    navigateTo(event.detail.page)
})