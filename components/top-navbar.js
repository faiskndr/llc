class TopNavbar extends HTMLElement {
  constructor() {
    super(); 
    this.activePage = 'Dashboard'
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.listenSidebarMenu = this.listenSidebarMenu.bind(this);
    this.shadowRoot.innerHTML = /*html*/`
        <style>

            /* ==========================
            TOP NAVBAR
            ========================== */

            .top-navbar {
                width: 100%;
                min-height: 96px;
                padding: 16px 32px 16px 48px;

                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 24px;

                background: #ffffff;
                border-bottom: 1px solid #e8ede9;
                box-sizing: border-box;
            }

            /* ==========================
            BREADCRUMB
            ========================== */

            .breadcrumb {
                display: flex;
                align-items: center;
                gap: 16px;

                min-width: 0;
                font-size: 16px;
                white-space: nowrap;
            }

            .breadcrumb a {
                color: #465148;
                text-decoration: none;
                font-weight: 500;
                transition: color .2s ease;
            }

            .breadcrumb a:hover {
                color: #08743a;
            }

            .breadcrumb-separator {
                color: #c4d1c6;
                font-size: 21px;
            }

            .breadcrumb-current {
                color: #202522;
                font-weight: 600;
            }

            /* ==========================
            NAVBAR ACTIONS
            ========================== */

            .navbar-actions {
                display: flex;
                align-items: center;
                gap: 20px;
                flex-shrink: 0;
            }

            /* ==========================
            NOTIFICATION
            ========================== */

            .notification-btn {
                position: relative;

                width: 48px;
                height: 48px;

                display: flex;
                align-items: center;
                justify-content: center;

                border: none;
                background: transparent;
                border-radius: 12px;

                color: #414b42;
                cursor: pointer;

                transition: background .2s ease;
            }

            .notification-btn:hover {
                background: #f1f7f2;
            }

            .notification-btn svg {
                width: 30px;
                height: 30px;
            }

            .notification-dot {
                position: absolute;
                top: 5px;
                right: 5px;

                width: 12px;
                height: 12px;

                background: #c81e1e;
                border-radius: 50%;
                border: 2px solid #ffffff;
            }

            /* ==========================
            DIVIDER
            ========================== */

            .navbar-divider {
                width: 1px;
                height: 48px;
                background: #e1e6e2;
            }

            /* ==========================
            USER PROFILE
            ========================== */

            .user-profile {
                display: flex;
                align-items: center;
                gap: 14px;

                padding: 0;
                border: none;
                background: transparent;

                text-align: left;
                cursor: pointer;
            }

            .user-avatar {
                width: 52px;
                height: 52px;

                border-radius: 50%;
                object-fit: cover;

                border: 1px solid #e5e9e6;
            }

            .user-info {
                display: flex;
                flex-direction: column;
                gap: 3px;
            }

            .user-name {
                color: #202522;
                font-size: 18px;
                font-weight: 600;
                line-height: 1.3;
            }

            .user-status {
                color: #59645b;
                font-size: 15px;
                font-weight: 400;
                line-height: 1.3;
            }

            /* ==========================
            TABLET
            ========================== */

            @media (max-width: 768px) {

                .top-navbar {
                    min-height: 76px;
                    padding: 12px 20px;
                    gap: 12px;
                }

                .breadcrumb {
                    gap: 10px;
                    font-size: 14px;
                }

                .navbar-actions {
                    gap: 12px;
                }

                .notification-btn {
                    width: 42px;
                    height: 42px;
                }

                .notification-btn svg {
                    width: 25px;
                    height: 25px;
                }

                .navbar-divider {
                    height: 38px;
                }

                .user-avatar {
                    width: 42px;
                    height: 42px;
                }

                .user-profile {
                    gap: 9px;
                }

                .user-name {
                    font-size: 15px;
                }

                .user-status {
                    font-size: 13px;
                }
            }

            /* ==========================
            MOBILE
            ========================== */

            @media (max-width: 480px) {

                .top-navbar {
                    min-height: 68px;
                    padding: 10px 14px;
                    gap: 8px;
                }

                .breadcrumb {
                    gap: 7px;
                    font-size: 12px;
                }

                .breadcrumb-separator {
                    font-size: 16px;
                }

                .navbar-actions {
                    gap: 8px;
                }

                .notification-btn {
                    width: 36px;
                    height: 36px;
                }

                .notification-btn svg {
                    width: 22px;
                    height: 22px;
                }

                .notification-dot {
                    width: 9px;
                    height: 9px;
                    top: 4px;
                    right: 4px;
                }

                .navbar-divider {
                    height: 32px;
                }

                .user-profile {
                    gap: 7px;
                }

                .user-avatar {
                    width: 36px;
                    height: 36px;
                }

                .user-name {
                    font-size: 12px;
                }

                .user-status {
                    font-size: 10px;
                }
            }

            /* ==========================
            EXTRA SMALL MOBILE
            ========================== */

            @media (max-width: 350px) {

                .top-navbar {
                    padding: 10px;
                }

                .breadcrumb {
                    gap: 5px;
                    font-size: 11px;
                }

                .navbar-actions {
                    gap: 5px;
                }

                .user-avatar {
                    width: 32px;
                    height: 32px;
                }

                .user-name {
                    font-size: 11px;
                }

                .user-status {
                    font-size: 9px;
                }
            }

        </style>

        <header class="top-navbar">

            <!-- Breadcrumb -->
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="#">Portal Siswa</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current" id="breadcrumb-current-page">${this.activePage}</span>
            </nav>

            <!-- Header Actions -->
            <div class="navbar-actions">

                <!-- Notification -->
                <button class="notification-btn" aria-label="Notifikasi">
                    <svg viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
                        <path d="M10 21h4"/>
                    </svg>
                    <span class="notification-dot"></span>
                </button>

                <!-- Divider -->
                <div class="navbar-divider"></div>

                <!-- User Profile -->
                <button class="user-profile" type="button">

                    <img
                        class="user-avatar"
                        src="https://i.pravatar.cc/100?img=47"
                        alt="Foto profil Siti Rahma"
                    >

                    <span class="user-info">
                        <span class="user-name">Siti Rahma</span>
                        <span class="user-status">Pelajar Aktif</span>
                    </span>

                </button>

            </div>

        </header>

    `;
    
    window.addEventListener('sidebar-navigated', this.listenSidebarMenu)
  }

  disconnectedCallabck() {
    window.removeEventListener('sidebar-navigated', this.listenSidebarMenu)
  }

  listenSidebarMenu(event) {
    this.activePage = event.detail.page
    this.shadowRoot.getElementById('breadcrumb-current-page').textContent = event.detail.label
  }
}

customElements.define('top-navbar', TopNavbar);