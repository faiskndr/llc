class CardUpcomingClass extends HTMLElement {
  constructor() {
    super(); 
    
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const isStratToday = this.getAttribute('is-start-today') || 'false';

    this.shadowRoot.innerHTML = /*html*/`
    <style>
        .schedule-container {
            width: 100%;
            max-width: 900px;
            margin:0, auto;
            margin-bottom:16px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        /* LIVE CLASS CARD */
        .live-card {
            background: #fff;
            border: 1px solid #e0e4e7;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 2px 5px rgba(0,0,0,.05);
        }

        .live-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }

        .live-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 7px 14px;
            border-radius: 30px;
            background: #dcfce9;
            color: #006b32;
            font-size: 14px;
            font-weight: 600;
        }

        .live-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #007536;
        }

        .zoom-info {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #006b32;
            font-size: 14px;
            font-weight: 600;
        }

        .zoom-info svg {
            width: 20px;
            height: 20px;
        }

        .course-category {
            color: #007536;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: .3px;
            margin-bottom: 5px;
        }

        .course-title {
            font-size: 25px;
            line-height: 1.35;
            font-weight: 700;
            margin: 0 0 14px;
        }

        .instructor {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 22px;
        }

        .instructor-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #dcfce9;
            color: #006b32;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 17px;
            font-weight: 600;
            flex-shrink: 0;
        }

        .instructor-name {
            font-size: 17px;
            font-weight: 600;
        }

        .instructor-role {
            font-size: 15px;
            color: #4b554d;
            margin-top: 2px;
        }

        .schedule-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            background: #f1f3f5;
            padding: 14px;
            border-radius: 12px;
            margin-bottom: 24px;
        }

        .info-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .info-icon {
            width: 25px;
            height: 25px;
            color: #007536;
            flex-shrink: 0;
        }

        .info-label {
            font-size: 15px;
            color: #4b554d;
            margin-bottom: 3px;
        }

        .info-value {
            font-size: 17px;
            font-weight: 600;
        }

        .card-actions {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 11px 20px;
            border-radius: 10px;
            border: none;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            transition: .2s ease;
        }

        .btn-secondary {
            background: #f1f3f5;
            color: #202426;
        }

        .btn-secondary:hover {
            background: #e5e8eb;
        }

        .btn-primary {
            background: #13843e;
            color: #fff;
        }

        .btn-primary:hover {
            background: #086b30;
        }

        .btn-primary svg {
            width: 20px;
            height: 20px;
        }

        /* UPCOMING CLASS CARD */
        .upcoming-card {
            background: #fff;
            border: 1px solid #e0e4e7;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 2px 5px rgba(0,0,0,.05);
        }

        .upcoming-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
        }

        .upcoming-category {
            font-size: 15px;
            font-weight: 600;
            color: #007536;
            letter-spacing: .3px;
        }

        .status-badge {
            padding: 5px 12px;
            border-radius: 7px;
            background: #e5e7eb;
            color: #465047;
            font-size: 14px;
            font-weight: 600;
            white-space: nowrap;
        }

        .upcoming-title {
            font-size: 24px;
            font-weight: 500;
            margin: 5px 0 8px;
            line-height: 1.35;
        }

        .upcoming-instructor {
            color: #4b554d;
            font-size: 16px;
            margin-bottom: 14px;
        }

        .upcoming-divider {
            border: none;
            border-top: 1px solid #d8dcdf;
            margin: 0 0 12px;
        }

        .upcoming-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
        }

        .upcoming-date {
            display: flex;
            align-items: center;
            gap: 7px;
            color: #465047;
            font-size: 15px;
        }

        .upcoming-date svg {
            width: 21px;
            height: 21px;
            flex-shrink: 0;
        }

        .reminder-link {
            color: #007536;
            font-size: 15px;
            font-weight: 600;
            text-decoration: none;
            white-space: nowrap;
        }

        .reminder-link:hover {
            text-decoration: underline;
        }

        /* MOBILE */
        @media (max-width: 600px) {
            body {
                padding: 12px;
            }

            .live-card,
            .upcoming-card {
                padding: 16px;
            }

            .live-top {
                align-items: flex-start;
                flex-direction: column;
                margin-bottom: 16px;
            }

            .course-title {
                font-size: 21px;
            }

            .schedule-info {
                grid-template-columns: 1fr;
                gap: 14px;
                padding: 12px;
            }

            .card-actions {
                flex-direction: column;
            }

            .btn {
                width: 100%;
                font-size: 14px;
            }

            .upcoming-header {
                align-items: flex-start;
            }

            .upcoming-title {
                font-size: 20px;
            }

            .upcoming-footer {
                align-items: flex-start;
                flex-direction: column;
            }

            .upcoming-date,
            .reminder-link {
                font-size: 14px;
            }
        }

    </style>
    `;

    if (isStratToday == 'true') {
        this.shadowRoot.innerHTML += /*html*/`
        <div class="schedule-container">
        <!-- CARD 1: LIVE CLASS -->
            <article class="live-card">

                <div class="live-top">
                    <div class="live-badge">
                        <span class="live-dot"></span>
                        Hari Ini • 14:00 - 15:30 WIB
                    </div>

                    <div class="zoom-info">
                        <svg width="28" height="28" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="16" rx="2"/>
                            <circle cx="9" cy="10" r="2"/>
                            <path d="M6 16c1-2 5-2 6 0M14 9h4"/>
                        </svg>
                        Zoom Meeting (Ruang Kelas 02 • Tautan Aktif)
                    </div>
                </div>

                <div class="course-category">
                    BAHASA INGGRIS KOMUNIKASI TERAPAN
                </div>

                <h2 class="course-title">
                    Praktik Percakapan: Memesan Makanan & Reservasi Restoran
                </h2>

                <div class="instructor">
                    <div class="instructor-avatar">BS</div>
                    <div>
                        <div class="instructor-name">Bima Satria, M.Pd</div>
                        <div class="instructor-role">Instruktur Pengajar</div>
                    </div>
                </div>

                <div class="schedule-info">

                    <div class="info-item">
                        <svg class="info-icon" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="5" width="18" height="16" rx="1"/>
                            <path d="M16 3v4M8 3v4M3 10h18"/>
                        </svg>

                        <div>
                            <div class="info-label">Hari & Tanggal</div>
                            <div class="info-value">Senin, 24 Maret 2025</div>
                        </div>
                    </div>

                    <div class="info-item">
                        <svg class="info-icon" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 4"/>
                        </svg>

                        <div>
                            <div class="info-label">Waktu Sesi</div>
                            <div class="info-value">14.00 - 15.30 WIB</div>
                        </div>
                    </div>

                </div>

                <div class="card-actions">
                    <a href="#" class="btn btn-secondary">
                        Lihat Detail Sesi
                    </a>

                    <a href="#" class="btn btn-primary">
                        <svg width="28" height="28" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="5" width="13" height="14" rx="1"/>
                            <path d="m16 10 5-3v10l-5-3"/>
                        </svg>
                        Masuk Ruang Kelas
                    </a>
                </div>

            </article>
        </div>`
    } else {
        this.shadowRoot.innerHTML += /*html*/`
        <div class="schedule-container">
            <article class="upcoming-card">

                <div class="upcoming-header">
                    <div class="upcoming-category">
                        KORESPONDENSI EMAIL & DOKUMEN BISNIS
                    </div>

                    <span class="status-badge">Tersedia</span>
                </div>

                <h2 class="upcoming-title">
                    Struktur Penulisan Surat Penawaran Resmi
                </h2>

                <div class="upcoming-instructor">
                    Instruktur: Sarah Danastri, S.Hum.
                </div>

                <hr class="upcoming-divider">

                <div class="upcoming-footer">

                    <div class="upcoming-date">
                        <svg width="26" height="26" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="5" width="18" height="16" rx="2"/>
                            <path d="M16 3v4M8 3v4M3 10h18"/>
                            <circle cx="12" cy="15" r="1"/>
                        </svg>

                        Rabu, 26 Maret 2025 • 10:00 - 11:30 WIB
                    </div>

                    <a href="#" class="reminder-link">
                        Atur Pengingat
                    </a>

                </div>

            </article>
        </div>
        `
    }
  }
}

// Register the custom HTML tag
// Rule: Custom element names MUST contain a hyphen (-) to avoid clashing with future standard HTML tags
customElements.define('card-upcoming-class', CardUpcomingClass);