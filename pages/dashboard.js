class Dashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = /*html*/`
            <style>
                .summary {
                    margin-top:24px;
                    margin-bottom:24px;
                    width:100%;
                    display:flex;
                    gap:12px;
                }

                .my-class {
                    margin-top:24px;
                    display: flex;
                    width:100%;
                }

                .activity-container {
                    margin-top:24px;
                    width:100%;
                    display:flex;
                }

                .upcoming-class {
                    flex:2;
                }

                .activity {
                    flex:1;    
                }

                .activity-panel {
                    margin:0, auto;
                    padding: 16px;
                    background: #fff;
                    border: 1px solid #e1e5e8;
                    border-radius: 12px;
                }

                .activity-panel-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    margin-bottom: 20px;
                }

                .activity-panel-header h3 {
                    font-size: 17px;
                    margin: 0;
                }

                .activity-panel-header span {
                    font-size: 12px;
                    color: #59635c;
                }

                .activity-list {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .learning-info {
                    margin-top: 24px;
                    padding: 16px;
                    background: #dcfce9;
                    border-radius: 12px;
                    color: #006b32;
                    font-size: 12px;
                }

                .learning-info p {
                    color: #465047;
                    line-height: 1.5;
                    margin: 5px 0 0 24px;
                }
            </style>
            <h1>Selamat Datang</h1>
            <div class="summary">
                <card-summary
                    label="KELAS AKTIF"
                >
                </card-summary>
                <card-summary
                    label="SESI TATAP MUKA"
                >
                </card-summary>
                <card-summary
                    label="RATA-RATA PROGRESS"
                >
                </card-summary>
                <card-summary
                    label="RUNTUTAN BELAJAR"
                >
                </card-summary>
            </div>
            <h1>Kelas Saya</h1>
            <div class="my-class">
                <card-class></card-class>
            </div>
            <div class="activity-container">
                <div class="upcoming-class">
                    <h1>Jadwal Kelas Terdekat</h1>
                    <card-upcoming-class is-start-today='true'></card-upcoming-class>
                    <card-upcoming-class is-start-today='false'></card-upcoming-class>
                </div>
                <div class="activity">
                    <h1>Aktivitas</h1>
                    <div class="activity-panel">
                        <div class="activity-panel-header">
                            <h3>Aktivitas Kelas Hari Ini</h3>
                            <span>Agenda Terhubung</span>
                        </div>

                        <div class="activity-list">
                            <card-activity></card-activity>
                        </div>

                        <div class="learning-info">
                            <strong>ⓘ &nbsp; Alur Pembelajaran</strong>
                            <p>
                                Masuk ke kelas pilihan Anda untuk mengakses
                                silabus materi, ruang diskusi, dan kuis
                                evaluasi terpadu.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('page-dashboard', Dashboard);