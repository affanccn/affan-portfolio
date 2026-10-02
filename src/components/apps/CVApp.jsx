import { useState } from 'react';
import { FileText, Download, ExternalLink, GraduationCap, Code } from 'lucide-react';

export default function CVApp() {
  const [activeTab, setActiveTab] = useState('pdf'); // 'pdf' | 'summary'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0a0a14' }}>
      {/* CV Toolbar */}
      <div style={{
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '10px',
      }}>
        {/* Left info & View Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f8fafc', fontSize: '12.5px', fontWeight: 600 }}>
            <FileText size={16} color="#00F5FF" />
            <span>Afvan Emirhan Çüçen — CV.pdf</span>
          </div>

          <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '2px', borderRadius: '6px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('pdf')}
              style={{
                padding: '4px 10px', borderRadius: '4px',
                border: 'none', cursor: 'pointer',
                background: activeTab === 'pdf' ? 'rgba(0,245,255,0.2)' : 'transparent',
                color: activeTab === 'pdf' ? '#00F5FF' : '#94a3b8',
                fontSize: '11px', fontWeight: 600,
              }}
            >
              PDF Önizleme
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('summary')}
              style={{
                padding: '4px 10px', borderRadius: '4px',
                border: 'none', cursor: 'pointer',
                background: activeTab === 'summary' ? 'rgba(0,245,255,0.2)' : 'transparent',
                color: activeTab === 'summary' ? '#00F5FF' : '#94a3b8',
                fontSize: '11px', fontWeight: 600,
              }}
            >
              Hızlı Özet
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Direct Download Button */}
          <a
            href="/Afvan_Emirhan_Cucen_CV.pdf"
            download="Afvan_Emirhan_Cucen_CV.pdf"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '6px',
              background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.35)',
              color: '#34d399', fontSize: '12px', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.15s',
            }}
          >
            <Download size={14} /> PDF İndir
          </a>

          {/* Open Fullscreen Tab */}
          <a
            href="/Afvan_Emirhan_Cucen_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '6px',
              background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.25)',
              color: '#00F5FF', fontSize: '12px', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.15s',
            }}
          >
            <ExternalLink size={14} /> Tam Ekran
          </a>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'pdf' ? (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#0e0e18' }}>
          <iframe
            src="/Afvan_Emirhan_Cucen_CV.pdf#toolbar=1&navpanes=0"
            title="Afvan Emirhan Çüçen CV"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      ) : (
        /* Fast HTML Resume Summary View (ideal for mobile / iframe blockers) */
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px', color: '#e2e8f0', maxWidth: '780px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: '#ffffff' }}>
              AFVAN EMİRHAN ÇÜÇEN
            </h2>
            <div style={{ color: '#00F5FF', fontSize: '14px', fontFamily: 'monospace', fontWeight: 600 }}>
              Bilgisayar Mühendisi · Full-Stack Web Geliştirici
            </div>
            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <span>📍 Kocaeli, Türkiye</span>
              <span>📞 0539 235 60 04</span>
              <span>✉️ emrhn.ccn@gmail.com</span>
              <a href="https://linkedin.com/in/affanccn" target="_blank" rel="noopener noreferrer" style={{ color: '#00F5FF', textDecoration: 'none' }}>
                🔗 linkedin.com/in/affanccn
              </a>
              <a href="https://github.com/affanccn" target="_blank" rel="noopener noreferrer" style={{ color: '#00F5FF', textDecoration: 'none' }}>
                🐙 github.com/affanccn
              </a>
            </div>
          </div>

          {/* Profesyonel Özet */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ color: '#00F5FF', fontSize: '13px', fontWeight: 700, marginBottom: '8px', letterSpacing: '0.05em' }}>
              PROFESYONEL ÖZET
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.65, margin: 0, background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              Modern web teknolojileri ve ilişkisel/NoSQL veritabanı mimarileri üzerine çalışan Bilgisayar Mühendisliği son sınıf öğrencisi. React, Next.js, Node.js, Express ve MongoDB/PostgreSQL teknolojileriyle ticari yönetim panelleri, B2B sipariş akışları ve gerçek zamanlı web uygulamaları geliştirdi. İşletmelerin operasyonel ihtiyaçlarına yönelik masa/sipariş takip sistemleri, veri kazıma scriptleri ve üçüncü parti API entegrasyonlarında pratik geliştirme deneyimine sahip.
            </p>
          </div>

          {/* Technical Skills */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF00C8', fontSize: '13px', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.05em' }}>
              <Code size={16} />
              <span>TEKNİK YETKİNLİKLER</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#00F5FF', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Programlama</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5 }}>JavaScript (ES6+), TypeScript, C#, SQL, HTML5, CSS3</div>
              </div>
              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#34d399', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Frontend</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5 }}>React.js, Next.js, Tailwind CSS, Responsive Web Mimarisi</div>
              </div>
              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#facc15', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Backend & Real-Time</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5 }}>Node.js, Express.js, RESTful API Geliştirme, Socket.io (WebSockets)</div>
              </div>
              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#c084fc', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Veritabanı</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5 }}>MongoDB, PostgreSQL, MySQL, Firebase Firestore</div>
              </div>
              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#fb923c', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Araçlar & Ortam</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5 }}>Git, GitHub, Vercel, Render, Postman, Blender</div>
              </div>
              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#38bdf8', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Temel Beceriler</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: 1.5 }}>İlişkisel Veri Modelleme, Web Scraping, Harici API, Core Web Vitals</div>
              </div>
            </div>
          </div>

          {/* Technical Projects Highlights */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ color: '#00F5FF', fontSize: '13px', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.05em' }}>
              TEKNİK PROJELER
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#ffffff' }}>Ersa Ticaret – B2B E-Ticaret ve Bayi Sipariş Sistemi</span>
                  <span style={{ color: '#00F5FF', fontSize: '11px', fontFamily: 'monospace' }}>Next.js, React, Node.js, PostgreSQL/MongoDB, Tailwind</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: '6px 0 0', lineHeight: 1.5 }}>
                  Endüstriyel soğutma ekipmanları için B2B web platformu, dinamik bayi iskonto/fiyatlandırma, WhatsApp sipariş akışı ve veri kazıma scriptleri.
                </p>
              </div>

              <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#ffffff' }}>Gusto POS – Kafe & Restoran Masa ve Sipariş Takip Sistemi</span>
                  <span style={{ color: '#34d399', fontSize: '11px', fontFamily: 'monospace' }}>Next.js, React, Node.js, Express, MongoDB, Tailwind</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: '6px 0 0', lineHeight: 1.5 }}>
                  Adisyon süreçleri, interaktif masa yerleşimi, parçalı hesap (split bill), termal fiş çıktısı ve admin raporlama paneli.
                </p>
              </div>

              <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#ffffff' }}>Gerçek Zamanlı Mesajlaşma Uygulaması</span>
                  <span style={{ color: '#facc15', fontSize: '11px', fontFamily: 'monospace' }}>Node.js, Express.js, Socket.io, MongoDB, Tailwind</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: '6px 0 0', lineHeight: 1.5 }}>
                  İstemciler arası çift yönlü ve anlık mesaj iletimi sağlayan web tabanlı sohbet ve oda altyapısı.
                </p>
              </div>

              <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#ffffff' }}>AiFlix – Film ve İçerik Keşif Platformu</span>
                  <span style={{ color: '#c084fc', fontSize: '11px', fontFamily: 'monospace' }}>React.js, Tailwind CSS, Firebase, TMDB API, OpenAI API</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: '6px 0 0', lineHeight: 1.5 }}>
                  TMDB RESTful API ile güncel film/dizi verileri, LLM tabanlı yapay zeka içerik önerileri ve çok dilli arayüz.
                </p>
              </div>

              <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#ffffff' }}>Kampüs Temalı Match-3 Oyunu (Bitirme Projesi)</span>
                  <span style={{ color: '#fb923c', fontSize: '11px', fontFamily: 'monospace' }}>Unity 3D, C#, REST API, Blender</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: '6px 0 0', lineHeight: 1.5 }}>
                  3D modellenmiş üniversite kampüsü seviye haritası, taş eşleme algoritmaları ve REST API ile çevrim içi skor tablosu.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00F5FF', fontSize: '13px', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.05em' }}>
              <GraduationCap size={16} />
              <span>EĞİTİM</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#ffffff' }}>Bartın Üniversitesi — Bilgisayar Mühendisliği (Lisans)</span>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>2022 – Devam Ediyor | Bartın</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
                  Son sınıf öğrencisi (2022 yılında yatay geçiş yapıldı); Veritabanı Yönetimi, Web Programlama ve Yazılım Mühendisliği müfredatı.
                </div>
              </div>
              <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#ffffff' }}>Fırat Üniversitesi — Bilgisayar Mühendisliği (Lisans)</span>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>2019 – 2022 | Elazığ</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
                  Temel mühendislik müfredatı; Nesneye Yönelik Programlama, Veri Yapıları ve Algoritmalar, Bilgisayar Ağları derslerini tamamladı.
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <a
              href="/Afvan_Emirhan_Cucen_CV.pdf"
              download="Afvan_Emirhan_Cucen_CV.pdf"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '8px',
                background: 'rgba(0,245,255,0.12)', border: '1px solid rgba(0,245,255,0.35)',
                color: '#00F5FF', fontSize: '13px', fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <Download size={16} /> Tam PDF Özgeçmişi İndir
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
