class CardClass extends HTMLElement {
  constructor() {
    // Always call super() first in the constructor
    super(); 
    
    // Attach a shadow root to the element to encapsulate its styles
    this.attachShadow({ mode: 'open' });
  }

  // connectedCallback runs exactly when the element is added to the HTML document
  connectedCallback() {
    // Read properties passed in via HTML attributes, acting like React/Vue props
    const label = this.getAttribute('label') || 'Untitled Label';
    // const topic = this.getAttribute('topic') || 'General';
    // Inject the HTML and CSS directly into the Shadow DOM
    this.shadowRoot.innerHTML = /*html*/`
    <style>
        
        /* ==============================
        COURSE CARD
        ============================== */

        .course-card {
            width: 100%;
            max-width: 760px;
            min-height: auto;

            display: flex;
            flex-direction: column;

            padding: 28px;

            background: #ffffff;
            border: 1px solid #e5e9e6;
            border-radius: 20px;

            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);

            box-sizing: border-box;
        }

        /* HEADER */

        .course-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }

        .course-status {
            padding: 6px 14px;
            background: #dcfce7;
            color: #006c35;
            border-radius: 50px;
            font-size: 15px;
            font-weight: 600;
        }

        .course-meeting-status {
            display: flex;
            align-items: center;
            gap: 7px;
            color: #465148;
            font-size: 15px;
        }

        .course-meeting-status svg {
            width: 21px;
            height: 21px;
            stroke: #006c35;
            stroke-width: 2.2;
            fill: none;
        }

        /* INFORMATION */

        .course-information {
            margin-top: 22px;
        }

        .course-title {
            margin: 0;
            color: #202522;
            font-size: clamp(23px, 2.2vw, 32px);
            font-weight: 700;
            line-height: 1.3;
        }

        .course-instructor {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
            color: #465148;
            font-size: 17px;
        }

        .course-instructor svg {
            width: 21px;
            height: 21px;
            flex-shrink: 0;
            stroke: currentColor;
            stroke-width: 2.2;
            fill: none;
        }

        /* STATISTICS */

        .course-statistics {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 18px;

            margin-top: 28px;
            padding: 13px 16px;

            background: #f1f3f5;
            border-radius: 12px;
        }

        .course-stat-item {
            display: flex;
            align-items: center;
            gap: 7px;

            color: #465148;
            font-size: 16px;
            white-space: nowrap;
        }

        .course-stat-item svg {
            width: 21px;
            height: 21px;
            flex-shrink: 0;
            stroke: #006c35;
            stroke-width: 2;
            fill: none;
        }

        .stat-separator {
            color: #414b42;
            font-size: 17px;
            font-weight: 700;
        }

        /* PROGRESS */

        .course-progress {
            margin-top: 38px;
        }

        .progress-information {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;

            margin-bottom: 10px;

            color: #465148;
            font-size: 16px;
        }

        .progress-information strong {
            color: #006c35;
            font-size: 17px;
        }

        .progress-track {
            width: 100%;
            height: 11px;
            overflow: hidden;
            background: #e5e7eb;
            border-radius: 50px;
        }

        .progress-fill {
            height: 100%;
            background: #168044;
            border-radius: inherit;
            transition: width .3s ease;
        }

        /* BUTTON */

        .course-action {
            min-height: 52px;

            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;

            margin-top: 25px;
            padding: 4px 16px;

            background: #168044;
            color: #ffffff;

            border-radius: 11px;
            text-decoration: none;

            font-size: 18px;
            font-weight: 600;

            transition: background .2s ease;
        }

        .course-action:hover {
            background: #096b35;
        }

        .course-action svg {
            width: 22px;
            height: 22px;
            stroke: currentColor;
            stroke-width: 2.2;
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        /* ==============================
        TABLET
        ============================== */

        @media (max-width: 768px) {

            .course-card {
                max-width: 100%;
                padding: 22px;
            }

            .course-title {
                font-size: 26px;
            }

            .course-statistics {
                gap: 12px;
            }

            .course-stat-item {
                font-size: 14px;
            }

            .course-progress {
                margin-top: 30px;
            }
        }

        /* ==============================
        MOBILE
        ============================== */

        @media (max-width: 480px) {

            .course-card {
                padding: 18px;
                border-radius: 16px;
            }

            .course-header {
                align-items: flex-start;
                flex-direction: column;
                gap: 10px;
            }

            .course-status {
                font-size: 13px;
            }

            .course-meeting-status {
                font-size: 13px;
            }

            .course-title {
                font-size: 23px;
            }

            .course-instructor {
                font-size: 14px;
            }

            .course-statistics {
                gap: 12px;
                padding: 12px;
                margin-top: 22px;
            }

            .course-stat-item {
                font-size: 13px;
            }

            .course-stat-item svg {
                width: 18px;
                height: 18px;
            }

            .stat-separator {
                font-size: 14px;
            }

            .course-progress {
                margin-top: 28px;
            }

            .progress-information {
                font-size: 12px;
            }

            .progress-information strong {
                font-size: 14px;
            }

            .course-action {
                min-height: 46px;
                font-size: 16px;
                margin-top: 20px;
            }
        }

    </style>
    <article class="course-card">

        <!-- Header -->
        <div class="course-header">

            <span class="course-status">
                Sedang Berlangsung
            </span>

            <div class="course-meeting-status">
                <svg viewBox="0 0 24 24">
                    <path d="M3 5H21V19H3Z"/>
                    <path d="M7 9C10 9 13 12 13 15"/>
                    <path d="M7 12C9 12 10 13 10 15"/>
                    <circle cx="7" cy="15" r="1"/>
                    <path d="M16 9L19 12L16 15"/>
                </svg>

                <span>Sesi Tatap Muka Aktif</span>
            </div>

        </div>

        <!-- Course Information -->
        <div class="course-information">

            <h2 class="course-title">
                Bahasa Inggris Komunikasi Terapan
            </h2>

            <div class="course-instructor">
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="7" r="4"/>
                    <path d="M3 21V19C3 15.5 7 14 12 14C17 14 21 15.5 21 19V21H3Z"/>
                </svg>

                <span>Dr. Danang Wijaya, M.Hum.</span>
            </div>

        </div>

        <!-- Course Statistics -->
        <div class="course-statistics">

            <div class="course-stat-item">
                <svg viewBox="0 0 24 24">
                    <path d="M6 3H14L20 9V21H6V3Z"/>
                    <path d="M14 3V9H20"/>
                    <path d="M9 14H17M9 17H17"/>
                </svg>

                <span>12 Materi</span>
            </div>

            <span class="stat-separator">•</span>

            <div class="course-stat-item">
                <svg viewBox="0 0 24 24">
                    <rect x="5" y="5" width="14" height="17" rx="1"/>
                    <path d="M9 3V7M15 3V7M8 11H16M8 15H16"/>
                </svg>

                <span>4 Kuis</span>
            </div>

            <span class="stat-separator">•</span>

            <div class="course-stat-item">
                <svg viewBox="0 0 24 24">
                    <rect x="3" y="5" width="14" height="14" rx="1"/>
                    <path d="M17 10L22 7V17L17 14"/>
                </svg>

                <span>Tatap Muka Aktif</span>
            </div>

        </div>

        <!-- Course Progress -->
        <div class="course-progress">

            <div class="progress-information">
                <span>
                    Progres Kelas (9 dari 12 materi selesai)
                </span>

                <strong>75%</strong>
            </div>

            <div
                class="progress-track"
                role="progressbar"
                aria-label="Progres kelas"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
            >
                <div class="progress-fill" style="width: 75%;"></div>
            </div>

        </div>

        <!-- Action Button -->
        <a href="#" class="course-action">
            <span>Masuk Kelas</span>

            <svg viewBox="0 0 24 24">
                <path d="M5 12H19"/>
                <path d="M12 5L19 12L12 19"/>
            </svg>
        </a>

    </article>

    `;
  }
}

// Register the custom HTML tag
// Rule: Custom element names MUST contain a hyphen (-) to avoid clashing with future standard HTML tags
customElements.define('card-class', CardClass);