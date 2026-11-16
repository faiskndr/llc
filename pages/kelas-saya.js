class PageKelasSaya extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.classesData = [
      {
        id: 1,
        category: 'Kelas Utama',
        status: 'berjalan',
        statusLabel: 'Berjalan',
        title: 'Kelas Percakapan Bahasa Inggris',
        description: 'Latihan interaktif percakapan kontekstual...',
        instructor: 'Dr. Hendra Wijaya, M.Hum.',
        sessions: '12 Sesi',
        schedule: 'Selasa & Kamis • 19.00 WIB (90m)',
        progress: '65',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 2,
        category: 'Kelas Eksekutif',
        status: 'berjalan',
        statusLabel: 'Berjalan',
        title: 'Kelas Komunikasi Profesional & Bisnis',
        description: 'Tata cara presentasi bisnis, korespondensi',
        instructor: 'Anita Prameswari, MBA',
        sessions: '10 Sesi',
        schedule: 'Senin & Rabu • 19.30 WIB (90m)',
        progress: '40',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 3,
        category: 'Kelas Dasar',
        status: 'selesai',
        statusLabel: 'Selesai',
        title: 'Kelas Tata Bahasa & Penulisan Akademik',
        description: 'Pemahaman tenses, struktur kalimat...',
        instructor: 'Budi Santoso, S.Pd., M.A.',
        sessions: '8 Sesi',
        schedule: 'Setiap Jumat • 16.00 WIB (120m)',
        progress: '100',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80'
      }
    ];

    this.filterQuery = '';
    this.filterStatus = 'semua';
  }

  connectedCallback() {
    this.render();
    this.setupFilterListener();
  }

  render() {
    const totalCount = this.classesData.length;
    const ongoingCount = this.classesData.filter(c => c.status === 'berjalan').length;
    const completedCount = this.classesData.filter(c => c.status === 'selesai').length;

    this.shadowRoot.innerHTML = /*html*/`
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .page-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        .classes-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          width: 100%;
        }

        .empty-state {
          grid-column: 1 / -1;
          background: #ffffff;
          border: 1px dashed #d1d5db;
          border-radius: 16px;
          padding: 48px 24px;
          text-align: center;
          color: #59635c;
        }

        .empty-state h4 {
          margin: 0 0 8px 0;
          font-size: 16px;
          color: #202522;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
        }

        /* Tablet Responsive */
        @media (max-width: 1100px) {
          .classes-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        /* Mobile Responsive */
        @media (max-width: 767px) {
          .classes-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="page-container">
        <!-- FILTER COMPONENT -->
        <card-class-filter
          total="${totalCount}"
          ongoing="${ongoingCount}"
          completed="${completedCount}"
        ></card-class-filter>

        <!-- CLASSES GRID -->
        <div class="classes-grid" id="classes-grid">
          ${this.renderClassItems()}
        </div>
      </div>
    `;
  }

  renderClassItems() {
    const filtered = this.classesData.filter(item => {
      // Filter status
      const matchesStatus = this.filterStatus === 'semua' || item.status === this.filterStatus;

      // Filter query
      const query = this.filterQuery.toLowerCase();
      const matchesQuery = !query ||
        item.title.toLowerCase().includes(query) ||
        item.instructor.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesStatus && matchesQuery;
    });

    if (filtered.length === 0) {
      return `
        <div class="empty-state">
          <h4>Tidak ada kelas yang ditemukan</h4>
          <p>Coba ubah kata kunci pencarian atau ganti filter status kelas Anda.</p>
        </div>
      `;
    }

    return filtered.map(item => `
      <card-class-item
        category="${item.category}"
        status="${item.status}"
        status-label="${item.statusLabel}"
        title="${item.title}"
        description="${item.description}"
        instructor="${item.instructor}"
        sessions="${item.sessions}"
        schedule="${item.schedule}"
        progress="${item.progress}"
        image="${item.image}"
      ></card-class-item>
    `).join('');
  }

  setupFilterListener() {
    this.shadowRoot.addEventListener('class-filter-changed', (e) => {
      this.filterQuery = e.detail.query || '';
      this.filterStatus = e.detail.status || 'semua';

      const grid = this.shadowRoot.getElementById('classes-grid');
      if (grid) {
        grid.innerHTML = this.renderClassItems();
      }
    });
  }
}

customElements.define('page-kelas-saya', PageKelasSaya);
