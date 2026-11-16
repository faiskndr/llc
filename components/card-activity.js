class CardActivity extends HTMLElement {
  constructor() {
    super(); 
    this.attachShadow({ mode: 'open' });
  }


  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/`
        <style>                
            /* ACTIVITY CARD */
            .activity-card {
                display: flex;
                align-items: center;
                gap: 12px;

                min-height: 90px;
                padding: 14px 16px;

                background: #f1f3f5;
                border: 1px solid transparent;
                border-radius: 12px;

                text-decoration: none;
                color: #202426;

                transition: all .2s ease;
            }

            /* HOVER */
            .activity-card:hover {
                background: #e9edef;
                border-color: #dce3df;
                transform: translateY(-1px);
            }

            /* ICON */
            .activity-icon {
                width: 38px;
                height: 38px;
                min-width: 38px;

                display: flex;
                align-items: center;
                justify-content: center;

                border-radius: 50%;
                background: #ffffff;
                color: #007536;
            }

            .activity-icon svg {
                width: 19px;
                height: 19px;
            }

            /* ICON VARIANTS */
            .activity-icon.live {
                background: #dcfce9;
                color: #007536;
            }

            .activity-icon.learning {
                background: #ffffff;
                color: #007536;
            }

            .activity-icon.evaluation {
                background: #ffffff;
                color: #007536;
            }

            /* CONTENT */
            .activity-content {
                flex: 1;
                min-width: 0;
            }

            .activity-category {
                font-size: 12px;
                font-weight: 600;
                color: #007536;
                margin-bottom: 4px;
                line-height: 1.3;
            }

            .activity-title {
                font-size: 14px;
                font-weight: 700;
                color: #202426;
                line-height: 1.35;
                margin-bottom: 4px;
            }

            .activity-description {
                font-size: 12px;
                font-weight: 400;
                color: #59635c;
                line-height: 1.4;
            }

            /* MOBILE */
            @media (max-width: 480px) {
                .activity-card {
                    min-height: 82px;
                    padding: 12px;
                    gap: 10px;
                }

                .activity-icon {
                    width: 34px;
                    height: 34px;
                    min-width: 34px;
                }

                .activity-icon svg {
                    width: 17px;
                    height: 17px;
                }

                .activity-category {
                    font-size: 11px;
                }

                .activity-title {
                    font-size: 13px;
                }

                .activity-description {
                    font-size: 11px;
                }
            }
        </style>
        <a href="#" class="activity-card">
            <div class="activity-icon live">
                <svg viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="5" width="15" height="13" rx="1"/>
                    <path d="m18 9 3-2v9l-3-2"/>
                    <path d="m9 9 5 3-5 3z" fill="currentColor"/>
                </svg>
            </div>

            <div class="activity-content">
                <div class="activity-category">
                    Bahasa Inggris Komunikasi Terapan
                </div>
                <div class="activity-title">
                    Sesi Live: Praktik Percakapan Tatap Muka
                </div>
                <div class="activity-description">
                    Jam 14:00 WIB • Sesi Interaktif Wajib
                </div>
            </div>
        </a>
    `;
  }
}

customElements.define('card-activity', CardActivity);