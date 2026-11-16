class CardClassItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'category',
      'status',
      'status-label',
      'image',
      'title',
      'description',
      'instructor',
      'sessions',
      'schedule',
      'progress',
      'action-label'
    ];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML) {
      this.render();
    }
  }

  render() {
    const category = this.getAttribute('category') || 'Kelas Umum';
    const status = (this.getAttribute('status') || 'berjalan').toLowerCase();
    const statusLabel = this.getAttribute('status-label') || (status === 'selesai' ? 'Selesai' : 'Berjalan');
    const image = this.getAttribute('image') || '';
    const title = this.getAttribute('title') || 'Judul Kelas';
    const description = this.getAttribute('description') || '';
    const instructor = this.getAttribute('instructor') || 'Nama Instruktur';
    const sessions = this.getAttribute('sessions') || '0 Sesi';
    const schedule = this.getAttribute('schedule') || '-';
    const progress = this.getAttribute('progress') || '0';
    const actionLabel = this.getAttribute('action-label') || 'Buka Detail Kelas';

    const isCompleted = status === 'selesai';

    this.shadowRoot.innerHTML = /*html*/`
      <style>
        :host {
          display: block;
          height: 100%;
        }

        .class-item-card {
          background: #ffffff;
          border: 1px solid #e5e9e6;
          border-radius: 18px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: border-box;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .class-item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
        }

        /* BANNER */
        .card-banner {
          position: relative;
          width: 100%;
          height: 156px;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 16px;
          background: #e8ede9;
        }

        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .badge-category {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(255, 255, 255, 0.94);
          color: #006c35;
          font-size: 11.5px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 50px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(4px);
        }

        .badge-status {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.94);
          color: #006c35;
          font-size: 11.5px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(4px);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #006c35;
        }

        .badge-check-icon {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #006c35;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .badge-check-icon svg {
          width: 9px;
          height: 9px;
          stroke: #ffffff;
          stroke-width: 3;
        }

        /* INFO */
        .card-info {
          display: flex;
          flex-direction: column;
        }

        .class-title {
          margin: 0 0 6px 0;
          font-size: 17px;
          font-weight: 700;
          color: #202522;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .class-desc {
          margin: 0 0 14px 0;
          font-size: 13px;
          color: #59635c;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* META BOX */
        .meta-box {
          background: #f1f3f5;
          border-radius: 10px;
          padding: 11px 12px;
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 16px;
        }

        .meta-row-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .instructor-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }

        .instructor-wrap svg {
          width: 15px;
          height: 15px;
          stroke: #006c35;
          flex-shrink: 0;
        }

        .instructor-name {
          font-size: 12.5px;
          font-weight: 600;
          color: #202522;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .session-badge {
          font-size: 11.5px;
          color: #59635c;
          flex-shrink: 0;
        }

        .meta-row-bottom {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #59635c;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .meta-row-bottom svg {
          width: 14px;
          height: 14px;
          stroke: #59635c;
          flex-shrink: 0;
        }

        /* PROGRESS */
        .progress-section {
          margin-top: auto;
          margin-bottom: 14px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 7px;
          font-size: 12.5px;
          color: #59635c;
        }

        .progress-percentage {
          color: #006c35;
          font-weight: 700;
        }

        .progress-track {
          width: 100%;
          height: 6px;
          background: #e5e7eb;
          border-radius: 50px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          width: ${progress}%;
          background: #12813f;
          border-radius: inherit;
          transition: width .3s ease;
        }

        /* ACTIONS */
        .card-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-open-class {
          flex: 1;
          height: 40px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          border: none;
          font-family: inherit;
          transition: all .2s ease;
        }

        /* Ongoing primary style */
        .btn-ongoing {
          background: #0d6832;
          color: #ffffff;
        }

        .btn-ongoing:hover {
          background: #095428;
        }

        /* Completed secondary style */
        .btn-completed {
          background: #dcfce7;
          color: #006c35;
        }

        .btn-completed:hover {
          background: #bbf7d0;
        }

        .btn-arrow {
          font-size: 15px;
          line-height: 1;
          display: inline-block;
          transition: transform .2s ease;
        }

        .btn-open-class:hover .btn-arrow {
          transform: translateX(3px);
        }

        .btn-info-icon {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #f1f3f5;
          color: #465148;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .2s ease;
        }

        .btn-info-icon:hover {
          background: #e5e8eb;
          color: #202522;
        }

        .btn-info-icon svg {
          width: 18px;
          height: 18px;
        }
      </style>

      <article class="class-item-card">
        <!-- BANNER -->
        <div class="card-banner">
          <img class="banner-image" src="${image}" alt="${title}">
          <div class="badge-category">${category}</div>
          <div class="badge-status">
            ${isCompleted ? `
              <div class="badge-check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
            ` : `
              <span class="badge-dot"></span>
            `}
            <span>${statusLabel}</span>
          </div>
        </div>

        <!-- INFO -->
        <div class="card-info">
          <h3 class="class-title" title="${title}">${title}</h3>
          <p class="class-desc" title="${description}">${description}</p>
        </div>

        <!-- METADATA BOX -->
        <div class="meta-box">
          <div class="meta-row-top">
            <div class="instructor-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="7" r="4"/>
                <path d="M5 21v-2a7 7 0 0 1 14 0v2"/>
              </svg>
              <span class="instructor-name">${instructor}</span>
            </div>
            <div class="session-badge">${sessions}</div>
          </div>

          <div class="meta-row-bottom">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 7v5l3 2"/>
            </svg>
            <span>${schedule}</span>
          </div>
        </div>

        <!-- PROGRESS -->
        <div class="progress-section">
          <div class="progress-header">
            <span>Progres</span>
            <span class="progress-percentage">${progress}%</span>
          </div>
          <div class="progress-track" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-fill"></div>
          </div>
        </div>

        <!-- ACTIONS -->
        <div class="card-actions">
          <a href="#" class="btn-open-class ${isCompleted ? 'btn-completed' : 'btn-ongoing'}">
            <span>${actionLabel}</span>
            <span class="btn-arrow">&rarr;</span>
          </a>
          <button type="button" class="btn-info-icon" title="Informasi Kelas">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </button>
        </div>
      </article>
    `;
  }
}

customElements.define('card-class-item', CardClassItem);
