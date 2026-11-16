class CardSummary extends HTMLElement {
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

            /* ==========================
            ACTIVE CLASS CARD
            ========================== */

            .active-class-card {
                width: 100%;
                min-height: 180px;
                flex: 1 1 200px; 
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 16px 24px;

                background: #ffffff;
                border: 1px solid #e5e9e6;
                border-radius: 26px;

                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);

                box-sizing: border-box;
            }

            /* ICON */

            .active-class-icon {
                width: 88px;
                height: 88px;
                min-width: 88px;

                display: flex;
                align-items: center;
                justify-content: center;

                background: #dcfce7;
                border-radius: 16px;

                color: #006c35;
            }

            .active-class-icon svg {
                width: 48px;
                height: 48px;
            }

            /* CONTENT */

            .active-class-info {
                display: flex;
                flex-direction: column;
                width:100%;
            }

            .active-class-label {
                margin:0px;
                font-size: 16px;
                font-weight: 500;
                letter-spacing: 2px;
                color: #465148;
                white-space: nowrap;
            }

            .active-class-count {
                margin:0px;
                font-size: 28px;
                font-weight: 700;
                line-height: 1.2;
                color: #202522;
            }

            /* ==========================
            TABLET
            ========================== */

            @media (max-width: 768px) {

                .active-class-card {
                    min-height: 180px;
                    padding: 28px;
                    gap: 24px;
                    border-radius: 22px;
                }

                .active-class-icon {
                    width: 72px;
                    height: 72px;
                    min-width: 72px;
                }

                .active-class-icon svg {
                    width: 40px;
                    height: 40px;
                }

                .active-class-label {
                    font-size: 18px;
                    letter-spacing: 1.5px;
                }

                .active-class-count {
                    font-size: 29px;
                }
            }

            /* ==========================
            MOBILE
            ========================== */

            @media (max-width: 480px) {

                .active-class-card {
                    min-height: 145px;
                    padding: 22px;
                    gap: 18px;
                    border-radius: 20px;
                }

                .active-class-icon {
                    width: 62px;
                    height: 62px;
                    min-width: 62px;
                    border-radius: 13px;
                }

                .active-class-icon svg {
                    width: 34px;
                    height: 34px;
                }

                .active-class-info {
                    gap: 6px;
                }

                .active-class-label {
                    font-size: 14px;
                    letter-spacing: 1.2px;
                }

                .active-class-count {
                    font-size: 25px;
                }
            }

            /* ==========================
            EXTRA SMALL MOBILE
            ========================== */

            @media (max-width: 350px) {

                .active-class-card {
                    padding: 16px;
                    gap: 14px;
                }

                .active-class-icon {
                    width: 52px;
                    height: 52px;
                    min-width: 52px;
                }

                .active-class-icon svg {
                    width: 29px;
                    height: 29px;
                }

                .active-class-label {
                    font-size: 12px;
                }

                .active-class-count {
                    font-size: 22px;
                }
            }

        </style>

        <div class="active-class-card">

            <div class="active-class-icon">
                <svg viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M3 16L24 5L45 16L24 27L3 16Z"/>
                    <path d="M10 20V32L24 40L38 32V20"/>
                    <path d="M45 16V30"/>
                </svg>
            </div>

            <div class="active-class-info">
                <span class="active-class-label">
                    ${label}
                </span>
                <h3 class="active-class-count">
                    2 Kelas Terdaftar
                </h3>
            </div>

        </div>

    `;
  }
}

// Register the custom HTML tag
// Rule: Custom element names MUST contain a hyphen (-) to avoid clashing with future standard HTML tags
customElements.define('card-summary', CardSummary);