class Sidebar extends HTMLElement {
  constructor() {
    // Always call super() first in the constructor
    super(); 
    this.menu = {
        'dashboard' : 'Dashboard',
        'kelas-saya' : 'Kelas Saya',
        'materi-tersimpan' : 'Materi Tersimpan',
        'profil' : 'Profil'
    }
    // Attach a shadow root to the element to encapsulate its styles
    this.attachShadow({ mode: 'open' });
  }

  // connectedCallback runs exactly when the element is added to the HTML document
  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/`
    <style>
        .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    background: #fff;
    border-right: 1px solid #e8ede9;
    padding: 28px 16px 24px;
    display: flex;
    flex-direction: column;
    z-index: 1000;
}

/* BRAND */

.brand {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    margin-bottom: 38px;
}

.brand-logo {
    width: 52px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 17px;
    background: #12813f;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.brand-logo svg {
    width: 31px;
    height: 31px;
}

.brand-info h1 {
    font-size: 19px;
    font-weight: 600;
    color: #202522;
    white-space: nowrap;
}

.brand-info p {
    font-size: 12px;
    color: #465148;
    margin-top: 3px;
}

/* NAVIGATION */

.nav-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.nav-item {
    min-height: 54px;
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 0 16px;
    border-radius: 15px;
    text-decoration: none;
    color: #414b42;
    font-size: 16px;
    font-weight: 500;
    transition: .2s ease;
}

.nav-item svg {
    width: 23px;
    height: 23px;
    stroke: currentColor;
    stroke-width: 2.2;
    fill: none;
    flex-shrink: 0;
}

.nav-item:hover {
    background: #f0f8f2;
    color: #006c35;
}

.nav-item.active {
    background: #dcfce7;
    color: #006c35;
    font-weight: 600;
}

/* BOTTOM */

.sidebar-bottom {
    margin-top: auto;
}

.semester-card {
    background: #f1f3f4;
    border: 1px solid #e2e8e4;
    border-radius: 17px;
    padding: 17px;
    margin-bottom: 15px;
}

.semester-title {
    display: flex;
    align-items: center;
    gap: 9px;
    color: #006c35;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 9px;
}

.semester-title svg {
    width: 24px;
    height: 24px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
}

.semester-description {
    font-size: 13px;
    line-height: 1.5;
    color: #465148;
}

.help-link {
    min-height: 48px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 15px;
    text-decoration: none;
    margin-bottom:15%;
    color: #414b42;
    font-size: 16px;
    border-radius: 12px;
}

.help-link:hover {
    background: #f0f8f2;
}

.help-link svg {
    width: 23px;
    height: 23px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
}

/* =========================
   MAIN CONTENT
========================= */

.main-content {
    margin-left: 280px;
    padding: 32px;
    min-height: 100vh;
}

.mobile-header {
    display: none;
}

/* OVERLAY */

.sidebar-overlay {
    display: none;
}

/* =========================
   MOBILE & TABLET
========================= */

@media (max-width: 767px) {

    .sidebar {
        width: min(300px, 85vw);
        padding: 24px 16px;
        transform: translateX(-100%);
        transition: transform .3s ease;
        box-shadow: none;
    }

    .sidebar.open {
        transform: translateX(0);
        box-shadow: 5px 0 25px rgba(0,0,0,.08);
    }

    .brand {
        margin-bottom: 30px;
    }

    .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.35);
        z-index: 999;
        display: block;
        opacity: 0;
        visibility: hidden;
        transition: .3s ease;
    }

    .sidebar-overlay.show {
        opacity: 1;
        visibility: visible;
    }

    .mobile-header {
        height: 64px;
        display: flex;
        align-items: center;
        gap: 13px;
        padding: 0 18px;
        background: #fff;
        border-bottom: 1px solid #e8ede9;
        position: sticky;
        top: 0;
        z-index: 900;
    }

    .menu-toggle {
        width: 40px;
        height: 40px;
        border: none;
        background: #f0f8f2;
        color: #08743a;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .menu-toggle svg {
        width: 23px;
        height: 23px;
        stroke: currentColor;
        fill: none;
        stroke-width: 2;
    }

    .mobile-header h2 {
        font-size: 17px;
        font-weight: 600;
        color: #202522;
    }

    .main-content {
        margin-left: 0;
        padding: 20px 16px;
    }

    body.menu-open {
        overflow: hidden;
    }
}

/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 380px) {

    .sidebar {
        width: 85vw;
    }

    .brand-info h1 {
        font-size: 17px;
    }

    .nav-item {
        font-size: 15px;
    }
}
    </style>
      
<header class="mobile-header">
    <button class="menu-toggle" id="menuToggle"
            aria-label="Buka menu"
            aria-expanded="false"
            aria-controls="sidebar">
        <svg viewBox="0 0 24 24">
            <path d="M3 6H21M3 12H21M3 18H21"/>
        </svg>
    </button>

    <h2>EduKasi Terbuka</h2>
</header>

<!-- OVERLAY -->
<div class="sidebar-overlay" id="sidebarOverlay"></div>

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">

    <!-- BRAND -->
    <div class="brand">

        <div class="brand-logo">
            <svg viewBox="0 0 48 48"
                 fill="none"
                 stroke="currentColor"
                 stroke-width="3"
                 stroke-linecap="round"
                 stroke-linejoin="round">
                <circle cx="24" cy="9" r="6"/>
                <path d="M24 23C17 16 9 17 7 18V39C14 36 20 37 24 43"/>
                <path d="M24 23C31 16 39 17 41 18V39C34 36 28 37 24 43"/>
                <path d="M24 23V43"/>
            </svg>
        </div>

        <div class="brand-info">
            <h1>EduKasi Terbuka</h1>
            <p>Akses Belajar Mandiri</p>
        </div>

    </div>

    <!-- NAVIGATION -->
    <nav class="nav-menu" id="nav-menu">

        <a href="#" class="nav-item active" data-page="dashboard">
            <svg viewBox="0 0 24 24">
                <path d="M3 10L12 3L21 10V21H14V14H10V21H3V10Z"/>
            </svg>
            <span>Dashboard</span>
        </a>

        <a href="#" class="nav-item" data-page="kelas-saya">
            <svg viewBox="0 0 24 24">
                <path d="M2 8L12 3L22 8L12 13L2 8Z"/>
                <path d="M6 10V16L12 20L18 16V10"/>
                <path d="M22 8V15"/>
            </svg>
            <span>Kelas Saya</span>
        </a>

        <a href="#" class="nav-item" data-page="materi-tersimpan">
            <svg viewBox="0 0 24 24">
                <path d="M5 3H19V21L12 17L5 21V3Z"/>
            </svg>
            <span>Materi Tersimpan</span>
        </a>

        <a href="#" class="nav-item" data-page="profil">
            <svg viewBox="0 0 24 24">
                <circle cx="12" cy="7" r="4"/>
                <path d="M3 21V19C3 15 7 13 12 13C17 13 21 15 21 19V21H3Z"/>
            </svg>
            <span>Profil</span>
        </a>

    </nav>

    <!-- BOTTOM -->
    <div class="sidebar-bottom">

        <div class="semester-card">

            <div class="semester-title">
                <svg viewBox="0 0 24 24">
                    <path d="M2 8L12 3L22 8L12 13L2 8Z"/>
                    <path d="M6 10V16L12 20L18 16V10"/>
                    <path d="M22 8V15"/>
                </svg>
                <span>Semester Ganjil</span>
            </div>

            <p class="semester-description">
                Tingkat Lanjutan • Periode<br>
                2024/2025
            </p>

        </div>

        <a href="#" class="help-link">
            <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.5 9A2.5 2.5 0 0 1 14 7.5C14 10 12 10 12 13"/>
                <path d="M12 17H12.01"/>
            </svg>
            <span>Pusat Bantuan</span>
        </a>

    </div>

  </aside>

    `;

    const sidebarMenu = this.shadowRoot.getElementById('nav-menu');

    sidebarMenu.addEventListener('click', (event) => {
        // Check if the clicked element (or its parent) is a menu-item
        const clickedItem = event.target.closest('.nav-item');
        if (!clickedItem) return;

        // Find the currently active item and remove the 'active' class
        const currentActive = sidebarMenu.querySelector('.nav-item.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }

        // Add the 'active' class to the clicked item
        clickedItem.classList.add('active');

        const pageName = clickedItem.dataset.page
        const label = this.menu[pageName] || ''
        this.dispatchEvent(new CustomEvent('sidebar-navigated', {
            detail: { page: pageName, label: label },
            bubbles: true,
            composed: true 
        }))
    });
  }
}

customElements.define('sidebar-custom', Sidebar);