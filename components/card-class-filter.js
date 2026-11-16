class CardClassFilter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['total', 'ongoing', 'completed'];
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML) {
      this.render();
      this.setupListeners();
    }
  }

  render() {
    const total = this.getAttribute('total') || '4';
    const ongoing = this.getAttribute('ongoing') || '3';
    const completed = this.getAttribute('completed') || '1';

    this.shadowRoot.innerHTML = /*html*/`
      <style>
        :host {
          display: block;
          width: 100%;
          box-sizing: border-box;
        }

        .filter-panel {
          background: #ffffff;
          border: 1px solid #e5e9e6;
          border-radius: 20px;
          padding: 24px 28px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          box-sizing: border-box;
          width: 100%;
        }

        /* TOP SECTION */
        .top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .stats-group {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-right: 24px;
          border-right: 1px solid #e8ede9;
        }

        .stat-item:last-child {
          border-right: none;
          padding-right: 0;
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          background: #dcfce7;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #006c35;
        }

        .stat-icon svg {
          width: 22px;
          height: 22px;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 24px;
          font-weight: 700;
          color: #202522;
          line-height: 1.15;
        }

        .stat-number.ongoing-accent {
          color: #006c35;
        }

        .stat-label {
          font-size: 13px;
          color: #59635c;
          margin-top: 3px;
          white-space: nowrap;
        }

        /* LEGEND */
        .status-legend {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-left: auto;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #465148;
        }

        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
        }

        .dot-ongoing {
          background-color: #12813f;
        }

        .dot-completed {
          background-color: #4ade80;
        }

        .dot-upcoming {
          background-color: #d1d5db;
        }

        /* DIVIDER */
        .filter-divider {
          height: 1px;
          background: #eef1ef;
          margin: 20px 0 18px 0;
          width: 100%;
        }

        /* BOTTOM SECTION */
        .bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .search-container {
          background: #f1f3f5;
          border-radius: 12px;
          padding: 10px 14px;
          width: 100%;
          max-width: 360px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-sizing: border-box;
          transition: border-color .2s ease, background-color .2s ease;
          border: 1px solid transparent;
        }

        .search-container:focus-within {
          background: #ffffff;
          border-color: #12813f;
        }

        .search-icon {
          width: 18px;
          height: 18px;
          color: #6b7280;
          flex-shrink: 0;
        }

        .search-input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 13.5px;
          color: #202522;
          font-family: inherit;
        }

        .search-input::placeholder {
          color: #838e85;
        }

        /* FILTER TABS */
        .filter-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: 8px 18px;
          border-radius: 50px;
          border: none;
          background: transparent;
          color: #465148;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all .2s ease;
        }

        .filter-tab:hover {
          background: #f1f3f5;
          color: #202522;
        }

        .filter-tab.active {
          background: #0d6832;
          color: #ffffff;
        }

        @media (max-width: 900px) {
          .status-legend {
            margin-left: 0;
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .filter-panel {
            padding: 18px;
          }

          .stat-item {
            padding-right: 16px;
            border-right: none;
          }

          .search-container {
            max-width: 100%;
          }

          .filter-tabs {
            width: 100%;
            justify-content: flex-start;
          }
        }
      </style>

      <div class="filter-panel">
        <!-- TOP ROW -->
        <div class="top-row">
          <div class="stats-group">
            <!-- Stat 1: Total Registered -->
            <div class="stat-item">
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-number">${total}</div>
                <div class="stat-label">Kelas Terdaftar</div>
              </div>
            </div>

            <!-- Stat 2: Ongoing -->
            <div class="stat-item">
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <circle cx="8" cy="12" r="1" fill="currentColor"/>
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  <circle cx="16" cy="12" r="1" fill="currentColor"/>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-number ongoing-accent">${ongoing}</div>
                <div class="stat-label">Sedang Berlangsung</div>
              </div>
            </div>

            <!-- Stat 3: Completed -->
            <div class="stat-item">
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-number">${completed}</div>
                <div class="stat-label">Kelas Selesai</div>
              </div>
            </div>
          </div>

          <!-- STATUS LEGEND -->
          <div class="status-legend">
            <div class="legend-item">
              <span class="dot dot-ongoing"></span>
              <span>Aktif / Berjalan</span>
            </div>
            <div class="legend-item">
              <span class="dot dot-completed"></span>
              <span>Selesai</span>
            </div>
            <div class="legend-item">
              <span class="dot dot-upcoming"></span>
              <span>Mendatang</span>
            </div>
          </div>
        </div>

        <!-- DIVIDER -->
        <div class="filter-divider"></div>

        <!-- BOTTOM ROW -->
        <div class="bottom-row">
          <div class="search-container">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input type="text" class="search-input" id="search-input" placeholder="Cari kelas atau instruktur...">
          </div>

          <div class="filter-tabs" id="filter-tabs">
            <button type="button" class="filter-tab active" data-status="semua">Semua Kelas</button>
            <button type="button" class="filter-tab" data-status="berjalan">Sedang Berjalan</button>
            <button type="button" class="filter-tab" data-status="selesai">Selesai</button>
            <button type="button" class="filter-tab" data-status="mendatang">Mendatang</button>
          </div>
        </div>
      </div>
    `;
  }

  setupListeners() {
    const searchInput = this.shadowRoot.getElementById('search-input');
    const filterTabs = this.shadowRoot.getElementById('filter-tabs');

    let activeStatus = 'semua';

    const dispatchChange = () => {
      this.dispatchEvent(new CustomEvent('class-filter-changed', {
        detail: {
          query: searchInput ? searchInput.value.trim() : '',
          status: activeStatus
        },
        bubbles: true,
        composed: true
      }));
    };

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        dispatchChange();
      });
    }

    if (filterTabs) {
      filterTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-tab');
        if (!btn) return;

        const currentActive = filterTabs.querySelector('.filter-tab.active');
        if (currentActive) {
          currentActive.classList.remove('active');
        }

        btn.classList.add('active');
        activeStatus = btn.dataset.status || 'semua';
        dispatchChange();
      });
    }
  }
}

customElements.define('card-class-filter', CardClassFilter);
