# Edukasi Terbuka (Portal Siswa)

Aplikasi web portal siswa **Edukasi Terbuka** yang dibangun menggunakan arsitektur **Vanilla JavaScript (ES Modules)** dan **Native Web Components (Custom Elements & Shadow DOM)** tanpa dependensi framework eksternal. Aplikasi ini dirancang modular, responsif, dan menerapkan pemisahan tugas yang jelas antara komponen antarmuka yang dapat digunakan kembali (*reusable components*) dan halaman orkestrasi (*pages*).

---

## 📌 Deskripsi Proyek

Proyek ini menyediakan antarmuka pengguna untuk portal pembelajaran mandiri siswa dengan fitur utama:
- **Dashboard**: Menampilkan ringkasan progres belajar, kartu kelas aktif, agenda tatap muka terdekat (Zoom meeting), serta alur dan aktivitas harian.
- **Kelas Saya**: Halaman manajemen kelas yang dilengkapi metrik statistik ringkas (total terdaftar, sedang berlangsung, dan selesai), legenda status, pencarian dinamis berbasis teks, penyaringan status (*Semua Kelas*, *Sedang Berjalan*, *Selesai*, *Mendatang*), serta daftar kartu kelas interaktif lengkap dengan bilah progres.
- **Navigasi Single Page Application (SPA) Sederhana**: Menggunakan bus event `sidebar-navigated` untuk merender halaman secara dinamis dan menyinkronkan label breadcrumb navbar secara otomatis.

---

## 📂 Struktur Proyek

```text
llc/
├── index.html                     # Entry point HTML dan layout dasar (sidebar, navbar, content-area)
├── app.js                         # Router aplikasi & registrasi modul utama
├── planning.md                    # Dokumen teknis perencanaan implementasi
├── README.md                      # Dokumentasi proyek
├── components/                    # Komponen UI modular & reusable (Shadow DOM)
│   ├── sidebar.js                 # Komponen <sidebar-custom> (navigasi & info semester)
│   ├── top-navbar.js              # Komponen <top-navbar> (breadcrumb reaktif & profil user)
│   ├── card-summary.js            # Komponen <card-summary> (kartu metrik di Dashboard)
│   ├── card-class.js              # Komponen <card-class> (kartu kelas utama di Dashboard)
│   ├── card-upcoming-class.js     # Komponen <card-upcoming-class> (jadwal kelas terdekat & live zoom)
│   ├── card-activity.js           # Komponen <card-activity> (daftar aktivitas hari ini)
│   ├── card-class-filter.js       # Komponen <card-class-filter> (panel statistik, pencarian, & tab filter)
│   └── card-class-item.js         # Komponen <card-class-item> (kartu satuan kelas di halaman Kelas Saya)
├── pages/                         # Halaman orkestrasi (Container Components)
│   ├── dashboard.js               # Komponen <page-dashboard>
│   └── kelas-saya.js              # Komponen <page-kelas-saya>
└── styles/                        # Direktori aset gaya tambahan (opsional)
```

---

## 🚀 Cara Menjalankan

Karena proyek ini menggunakan fitur **ES Modules** (`import` / `export` di JavaScript), aplikasi harus dijalankan melalui server lokal HTTP (*Local Web Server*) dan tidak disarankan dibuka langsung melalui protokol file (`file:///`) di peramban.

Pilih salah satu metode berikut untuk menjalankan aplikasi:

### Opsi 1: Menggunakan VS Code Live Server (Direkomendasikan)
1. Buka folder proyek ini di **Visual Studio Code**.
2. Pasang ekstensi **Live Server** (oleh Ritwick Dey) jika belum terpasang.
3. Klik kanan pada berkas `index.html` lalu pilih **"Open with Live Server"**, atau klik tombol **"Go Live"** di bilah status kanan bawah VS Code.
4. Browser akan otomatis terbuka pada alamat `http://127.0.0.1:5500`.

### Opsi 2: Menggunakan Node.js (`npx serve`)
Jalankan perintah berikut di terminal pada direktori proyek:
```bash
npx serve .
```
Buka URL lokal yang muncul di terminal (biasanya `http://localhost:3000`).

### Opsi 3: Menggunakan Python
Jika memiliki Python terpasang di sistem:

- **Python 3**:
  ```bash
  python -m http.server 8000
  ```
- **Python 2**:
  ```bash
  python -m SimpleHTTPServer 8000
  ```

Buka peramban dan akses alamat:
```
http://localhost:8000
```

---

## 🛠️ Teknologi yang Digunakan

- **HTML5 & CSS3** (Flexbox, CSS Grid, CSS Variables, Scoped Shadow DOM)
- **Vanilla JavaScript (ES6+)**
  - Web Components: `customElements.define` & `attachShadow({ mode: 'open' })`
  - Lifecycle Callbacks: `connectedCallback`, `attributeChangedCallback`, `disconnectedCallback`
  - Custom Events: `CustomEvent` dengan opsi `bubbles: true` dan `composed: true`
- **Inline SVG** untuk seluruh kebutuhan ikon (ringan dan tanpa pustaka ikon eksternal)
