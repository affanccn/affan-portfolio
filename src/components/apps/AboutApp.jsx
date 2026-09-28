import { useState, useRef } from 'react';

// Numeric stats used strictly for the interactive FIFA easter egg card
const FIFA_STATS = [
  { label: 'Frontend', abbr: 'FRO', value: 88, color: '#00F5FF' },
  { label: 'Backend', abbr: 'BCK', value: 85, color: '#34d399' },
  { label: 'Databases', abbr: 'DBS', value: 86, color: '#facc15' },
  { label: 'Unity / C#', abbr: 'UNT', value: 80, color: '#c084fc' },
  { label: 'Problem Solv.', abbr: 'PRB', value: 90, color: '#fb923c' },
];

const OVR = Math.round(FIFA_STATS.reduce((a, s) => a + s.value, 0) / FIFA_STATS.length);

// Credible Professional Competencies for the main portfolio
const COMPETENCIES = [
  {
    domain: 'Frontend Mimarisi',
    level: 'Güçlü / Uzmanlaşmış',
    badgeColor: '#00F5FF',
    skills: ['React 19', 'JavaScript (ES6+)', 'TypeScript', 'Responsive Design', 'Tailwind CSS', 'Web Vitals Optimization'],
    desc: 'Bileşen tabanlı temiz mimari, erişilebilirlik (WCAG) ve yüksek sayfa yükleme performansı.'
  },
  {
    domain: 'Backend & Gerçek Zamanlı Sistemler',
    level: 'Güçlü / Üretim Deneyimi',
    badgeColor: '#34d399',
    skills: ['Node.js', 'Express.js', 'Socket.io (WebSockets)', 'RESTful APIs', 'Event-Driven Mimariler'],
    desc: 'Düşük gecikmeli iki yönlü veri akışı, oda yönetimi ve ölçeklenebilir API servisleri.'
  },
  {
    domain: 'Veritabanı Yönetimi (RDBMS & NoSQL)',
    level: 'Güçlü / İlişkisel Tasarım',
    badgeColor: '#facc15',
    skills: ['MySQL (İlişkisel Şemalar, 3NF)', 'MongoDB', 'Indexing', 'Query Optimization'],
    desc: 'Normalizasyon prensiplerine uygun veri modelleme ve performans odaklı indeksleme.'
  },
  {
    domain: 'Oyun Programlama & 3D',
    level: 'Yetkin / Pratik Deneyim',
    badgeColor: '#c084fc',
    skills: ['Unity 3D/2D', 'C#', 'Rigidbody Fizik Motoru', 'Object Pooling', 'Blender Low-Poly'],
    desc: 'Co-op mekanikler, raycast etkileşimleri ve bellek/GC optimizasyonlu oyun döngüleri.'
  },
  {
    domain: 'Yapay Zekâ & Süreç Otomasyonu',
    level: 'Yetkin / Uygulamalı',
    badgeColor: '#fb923c',
    skills: ['LLM API Entegrasyonları', 'Prompt Engineering', 'Puppeteer', 'Web Scraping Pipelines'],
    desc: 'Otomatik veri madenciliği ve LLM destekli iş akış otomasyonları.'
  },
];

function FifaCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = -(e.clientY - cy) / (rect.height / 2) * 12;
    const ry = (e.clientX - cx) / (rect.width / 2) * 12;
    setTilt({ x: rx, y: ry });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        perspective: '900px',
        display: 'inline-block',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: '230px',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #c8a84b 0%, #f5e17a 30%, #d4a843 60%, #b8862a 100%)',
          boxShadow: '0 20px 50px rgba(200,168,75,0.45), inset 0 1px 0 rgba(255,255,255,0.5)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`,
          transition: 'transform 0.15s ease-out',
          position: 'relative',
        }}
      >
        {/* Holographic Sheen */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%, rgba(255,255,255,0.15) 100%)',
          pointerEvents: 'none', zIndex: 10,
        }} />

        {/* Top Header */}
        <div style={{
          padding: '14px 16px 6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div>
            <div style={{
              fontSize: '38px', fontWeight: '900', color: '#1a0a00',
              lineHeight: 1, textShadow: '0 1px 2px rgba(255,255,255,0.3)',
              fontFamily: 'Arial Black, sans-serif',
            }}>
              {OVR}
            </div>
            <div style={{
              fontSize: '11px', fontWeight: '900', color: '#1a0a00',
              letterSpacing: '0.12em', marginTop: '2px',
              fontFamily: 'Arial Black, sans-serif',
            }}>
              DEV
            </div>
            <div style={{ fontSize: '18px', marginTop: '4px' }}>🇹🇷</div>
          </div>

          <div style={{ textAlign: 'right', paddingTop: '4px' }}>
            <div style={{
              fontSize: '11px', fontWeight: '800',
              color: '#1a0a00', letterSpacing: '0.05em',
              fontFamily: 'Arial, sans-serif',
            }}>
              FC 25
            </div>
          </div>
        </div>

        {/* Player Image Area */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          padding: '0 20px',
          marginTop: '-4px',
        }}>
          <img
            src="/images/memoji.png"
            alt="Affan"
            width="120"
            height="120"
            decoding="async"
            style={{
              width: '120px', height: '120px', objectFit: 'contain',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Name Banner */}
        <div style={{
          textAlign: 'center',
          padding: '4px 12px 8px',
          fontSize: '15px', fontWeight: '900',
          color: '#1a0a00', letterSpacing: '0.08em',
          fontFamily: 'Arial Black, sans-serif',
          textTransform: 'uppercase',
        }}>
          Affan Emirhan
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(0,0,0,0.25)', margin: '0 14px' }} />

        {/* Stats Grid */}
        <div style={{
          padding: '10px 18px 14px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px 14px',
        }}>
          {FIFA_STATS.map(stat => (
            <div key={stat.abbr} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '14px', fontWeight: '900', color: '#1a0a00',
                fontFamily: 'Arial Black, sans-serif', minWidth: '24px',
              }}>
                {stat.value}
              </span>
              <span style={{
                fontSize: '10px', fontWeight: '700',
                color: 'rgba(0,0,0,0.65)', letterSpacing: '0.05em',
                fontFamily: 'Arial, sans-serif',
              }}>
                {stat.abbr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutApp() {
  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      background: '#070712',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '0',
        minHeight: '100%',
      }}>
        {/* Left Column: Bio & Engineering Competency */}
        <div style={{
          padding: '32px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: '24px',
        }}>
          {/* Header */}
          <div>
            <div style={{ color: '#00F5FF', fontFamily: 'monospace', fontSize: '12px', marginBottom: '8px', opacity: 0.8 }}>
              &gt; whoami --engineering-profile
            </div>
            <h1 style={{
              fontSize: '28px', fontWeight: '800',
              color: '#ffffff', letterSpacing: '-0.02em',
              margin: '0 0 6px',
            }}>
              Affan Emirhan Çüçen
            </h1>
            <div style={{ color: '#00F5FF', fontSize: '13.5px', fontFamily: 'monospace', fontWeight: 600 }}>
              Bilgisayar Mühendisi · Full-Stack Developer
            </div>
          </div>

          {/* Professional Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ color: '#cbd5e1', fontSize: '13.5px', lineHeight: 1.7, margin: 0 }}>
              Kullanıcı deneyimini modern web standartlarıyla birleştiren, gerçek zamanlı sistem mimarileri (WebSocket/Socket.io) ve ilişkisel/NoSQL veritabanı çözümleri üzerine odaklanan bir bilgisayar mühendisiyim.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.65, margin: 0 }}>
              Unity 3D ile oyun motoru fiziği ve C# bellek optimizasyonu süreçlerinde doğrudan pratik deneyim sahibiyim. Yazılım süreçlerimde Clean Architecture, tip güvenliği (TypeScript) ve teknik SEO prensiplerini temel alırım.
            </p>
          </div>

          {/* Engineering Competency Matrix */}
          <div>
            <div style={{
              color: '#00F5FF', fontFamily: 'monospace', fontSize: '12px',
              fontWeight: 700, marginBottom: '14px', letterSpacing: '0.08em',
            }}>
              // MÜHENDİSLİK YETKİNLİK MATRİSİ
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {COMPETENCIES.map((comp) => (
                <div
                  key={comp.domain}
                  style={{
                    padding: '14px 16px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#ffffff', fontSize: '13.5px', fontWeight: 700 }}>
                      {comp.domain}
                    </span>
                    <span style={{
                      color: comp.badgeColor, fontSize: '11px', fontFamily: 'monospace',
                      fontWeight: 700, background: `${comp.badgeColor}18`, padding: '2px 8px', borderRadius: '4px',
                      border: `1px solid ${comp.badgeColor}33`,
                    }}>
                      {comp.level}
                    </span>
                  </div>

                  <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: 1.5, margin: '0 0 10px' }}>
                    {comp.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {comp.skills.map(s => (
                      <span key={s} style={{
                        padding: '2px 8px', borderRadius: '4px',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                        color: '#cbd5e1', fontSize: '10.5px', fontFamily: 'monospace',
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div style={{ color: '#FF00C8', fontFamily: 'monospace', fontSize: '12px', marginBottom: '12px', fontWeight: 700 }}>
              // EĞİTİM GEÇMİŞİ
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                padding: '12px 16px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ color: '#ffffff', fontSize: '13.5px', fontWeight: 700 }}>Bartın Üniversitesi</div>
                <div style={{ color: '#00F5FF', fontSize: '12px', fontFamily: 'monospace', marginTop: '2px' }}>
                  Bilgisayar Mühendisliği (Lisans) · 2022 – Devam
                </div>
              </div>
              <div style={{
                padding: '12px 16px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ color: '#ffffff', fontSize: '13.5px', fontWeight: 700 }}>Fırat Üniversitesi</div>
                <div style={{ color: '#94a3b8', fontSize: '12px', fontFamily: 'monospace', marginTop: '2px' }}>
                  Bilgisayar Mühendisliği · 2019 – 2022
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: FIFA Card Easter Egg & Quick Social Channels */}
        <div style={{
          padding: '32px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '24px',
        }}>
          <div style={{ color: '#facc15', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.08em', alignSelf: 'flex-start' }}>
            &gt; easter_egg --fifa_card.json (3D Hover Aktif)
          </div>

          <FifaCard />

          <div style={{
            padding: '16px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            width: '100%', maxWidth: '280px',
          }}>
            <div style={{ color: '#64748b', fontFamily: 'monospace', fontSize: '11px', marginBottom: '10px' }}>
              // easter_egg_rating
            </div>
            {FIFA_STATS.map(s => (
              <div key={s.abbr} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>{s.label}</span>
                <span style={{ color: s.color, fontSize: '12px', fontWeight: 700, fontFamily: 'monospace' }}>{s.value}</span>
              </div>
            ))}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 0 0', marginTop: '4px',
            }}>
              <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: 700 }}>GENEL (OVR)</span>
              <span style={{
                color: '#facc15', fontSize: '14px', fontWeight: 800,
                fontFamily: 'monospace', textShadow: '0 0 8px rgba(250,204,21,0.5)',
              }}>{OVR}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', width: '100%', maxWidth: '280px' }}>
            <a
              href="https://github.com/affanccn"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '11px', borderRadius: '8px',
                background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.3)',
                color: '#00F5FF', fontSize: '13px', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.15s',
              }}
            >
              🐙 GitHub Profilini Aç
            </a>
            <a
              href="https://linkedin.com/in/affanccn"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '11px', borderRadius: '8px',
                background: 'rgba(255,0,200,0.08)', border: '1px solid rgba(255,0,200,0.3)',
                color: '#ff52d9', fontSize: '13px', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.15s',
              }}
            >
              💼 LinkedIn Profilini Aç
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
