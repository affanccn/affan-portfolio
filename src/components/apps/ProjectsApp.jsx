import { useState } from 'react';
import {
  ExternalLink,
  ArrowLeft,
  Code,
  MessageSquare,
  Database,
  Gamepad2,
  Monitor,
  Cpu,
  LayoutDashboard,
  Globe,
  Star,
  Lock,
  Layers,
  ShoppingBag,
  Terminal as TermIcon,
} from 'lucide-react';

const PROJECTS = [
  // ── AMİRAL GEMİSİ PROJELER (FLAGSHIP REPOSITORIES) ──────────────────────────
  {
    id: 1,
    name: 'RealTimeChat',
    tier: 'featured',
    category: 'web',
    title: 'RealTimeChat — Gerçek Zamanlı Mesajlaşma',
    subtitle: 'WebSocket & Socket.io Düşük Gecikmeli Sohbet Altyapısı',
    desc: 'Node.js ve Socket.io tabanlı, kanal ve oda multiplexing yeteneğine sahip, MongoDB oturum kalıcılığı sağlayan yüksek performanslı mesajlaşma altyapısı.',
    problem: 'Geleneksel HTTP polling mimarilerinin yol açtığı gecikme ve sunucu CPU darboğazlarını ortadan kaldırmak; binlerce eşzamanlı kullanıcının oda bazında hatasız iletişim kurmasını sağlamak.',
    solution: 'Event-driven WebSocket mimarisi kuruldu. Kullanıcılar dinamik odalara (rooms) abone edilerek ağ trafiği izole edildi. Bağlantı kesintilerinde otomatik yeniden bağlanma ve mesajlaşma kuyruğu modellendi.',
    highlights: [
      'Socket.io room multiplexing ile kanal bazlı izolasyon ve düşük gecikme (<50ms)',
      'MongoDB üzerinde indekslenmiş mesaj geçmişi ve optimize TTL koleksiyonları',
      'XSS saldırılarına karşı sanitize edilmiş payload ve oturum validasyonu',
      'Mobil uyumlu responsive arayüz ve Web Audio API bildirim tonları',
    ],
    tags: ['Node.js', 'Socket.io', 'WebSocket', 'MongoDB', 'Express', 'Tailwind CSS'],
    icon: MessageSquare,
    iconColor: '#00F5FF',
    image: '/images/proje1.webp',
    github: 'https://github.com/emrhnccn/RealTimeChat',
    repoStatus: 'Açık Kaynak (Public)',
    liveDemo: null,
  },
  {
    id: 2,
    name: 'GustoPos',
    tier: 'featured',
    category: 'web',
    title: 'GustoPos — Restoran & POS Yönetim Sistemi',
    subtitle: 'TypeScript Tabanlı Masa, Sipariş ve Ciro Otomasyonu',
    desc: 'Restoran ve kafe işletmeleri için geliştirilmiş modern POS sistemi. Masa bazlı sipariş takibi, dinamik rezervasyon haritası ve analitik ciro raporları sunar.',
    problem: 'Restoran operasyonlarında sipariş çakışmaları, masa doluluğunun manuel takibinden doğan servis gecikmeleri ve dağınık ciro kayıtları.',
    solution: 'TypeScript tip güvenliğiyle geliştirilen merkezi bir yönetim paneli. Masa durumu renk kodlarıyla dinamik izlenir; siparişler ve rezervasyonlar algoritmik olarak kuyruğa alınır.',
    highlights: [
      'TypeScript ile uçtan uca tip güvenliği ve modüler bileşen durum yönetimi',
      'Dinamik interaktif masa haritası ve gerçek zamanlı doluluk durumu takibi',
      'Rezervasyon çakışmalarını önleyen algoritmik zaman aralığı kontrolü',
      'Kapsamlı gelir, sipariş ve masa performansı dashboard analitikleri',
    ],
    tags: ['TypeScript', 'React', 'Node.js', 'POS Mimarisi', 'Dashboard', 'Tailwind'],
    icon: LayoutDashboard,
    iconColor: '#FF00C8',
    image: '/images/proje2.webp',
    github: 'https://github.com/emrhnccn/GustoPos',
    repoStatus: 'Açık Kaynak (Public)',
    liveDemo: 'https://gusto-pos-two.vercel.app',
  },
  {
    id: 3,
    name: 'salas-rezervasyon',
    tier: 'featured',
    category: 'web',
    title: 'Salaas Rezervasyon & Masa Yönetim Platformu',
    subtitle: 'Canlı İşletme Rezervasyon ve Kapasite Planlama Motoru',
    desc: 'Aktif kafe & restoran işletmesi için canlı üretim ortamına alınan, online masa rezervasyonu ve kapasite planlama platformu.',
    problem: 'İşletmede telefon ve manuel defterle tutulan rezervasyonların çakışması, no-show oranları ve masa verimsizliği.',
    solution: 'Müşterilerin doğrudan masa seçebildiği, rezervasyon zaman aralığını ve doluluk oranlarını anlık doğrulayan modern web servisi.',
    highlights: [
      'Canlı üretim ortamında (Production) aktif müşteri kullanımı',
      'Masa kapasitesi ve saat dilimlerine göre anlık çakışma kontrolü',
      'Mobil cihazlarda hızlı rezervasyon için optimize edilmiş responsive UI',
    ],
    tags: ['React', 'Node.js', 'Algoritmik Planlama', 'Express', 'Canlı Üretim'],
    icon: LayoutDashboard,
    iconColor: '#34d399',
    image: '/images/proje3.webp',
    github: 'https://github.com/emrhnccn/salas-rezervasyon',
    repoStatus: 'Açık Kaynak (Public)',
    liveDemo: 'https://salaascaferestaurant.com.tr',
  },
  {
    id: 4,
    name: 'ersa-ticaret',
    tier: 'featured',
    category: 'web',
    title: 'Ersa Ticaret — Modern B2B & E-Ticaret Platformu',
    subtitle: 'Ürün Kataloğu, Sipariş Yönetimi ve Sepet Mimarisi',
    desc: 'Geniş ürün gamına sahip ticari işletmeler için geliştirilmiş, kategori filtreleme, dinamik sepet ve sipariş akışına sahip e-ticaret platformu.',
    problem: 'Geniş ürün kataloglarında arama ve filtreleme gecikmeleri, karmaşık varyantlar ve mobil cihazlarda hantal kalan sepet deneyimi.',
    solution: 'React ve Node.js mimarisi üzerinde hafif, hızlı yüklenen, anlık istemci tarafı filtreleme ve güvenli sipariş oluşturma pipeline\'ı kuruldu.',
    highlights: [
      'Modüler ürün arama, çoklu filtreleme ve kategori hiyerarşisi',
      'Persistent sepet yönetimi ve hatasız sipariş özeti akışı',
      'Lighthouse performans standartlarına uygun hızlı sayfa yüklemesi',
    ],
    tags: ['React', 'Node.js', 'E-Ticaret', 'State Management', 'REST API'],
    icon: ShoppingBag,
    iconColor: '#facc15',
    image: '/images/proje6.webp',
    github: 'https://github.com/emrhnccn/ersa-ticaret',
    repoStatus: 'Açık Kaynak (Public)',
    liveDemo: null,
  },
  {
    id: 5,
    name: 'ersasogutma',
    tier: 'featured',
    category: 'web',
    title: 'Ersa Soğutma — Endüstriyel Soğutma Sistemleri',
    subtitle: 'Kurumsal Mühendislik Vitrini, Ürün Kataloğu ve Teknik SEO',
    desc: 'Endüstriyel soğutma sistemleri ve iklimlendirme teknolojileri alanında faaliyet gösteren kurumsal firma için geliştirilmiş yüksek performanslı web platformu.',
    problem: 'Endüstriyel ürün gruplarının ve teknik şartnamelerin arama motorlarında doğru indekslenememesi ve kurumsal güvenin zayıf temsil edilmesi.',
    solution: 'Temiz semantic HTML5, modern CSS ve teknik SEO mimarisiyle sıfır CLS ve yüksek PageSpeed skorlarına sahip kurumsal mühendislik vitrini.',
    highlights: [
      'Endüstriyel ürün grupları ve teknik spesifikasyon sunumu',
      'Teknik SEO optimizasyonu ve Schema.org kurumsal yapılandırılmış verisi',
      'Mobil acil servis ve teklif alma kanalları entegrasyonu',
    ],
    tags: ['HTML5', 'Modern CSS', 'JavaScript', 'Teknik SEO', 'Kurumsal Mimari'],
    icon: Globe,
    iconColor: '#38bdf8',
    image: '/images/proje4.webp',
    github: 'https://github.com/emrhnccn/ersasogutma',
    repoStatus: 'Açık Kaynak (Public)',
    liveDemo: null,
  },
  {
    id: 6,
    name: 'affan-portfolio',
    tier: 'featured',
    category: 'web',
    title: 'AffanOS — Developer Operating System Portfolio',
    subtitle: 'React 19, Pointer Events & Özel Pencere Yöneticisi',
    desc: 'Geliştiricinin tüm projelerini, yeteneklerini ve deneyimini yaşayan bir işletim sistemi metaforuyla sunan modern web mimarisi.',
    problem: 'Standart statik portföylerin geliştiricinin sistem tasarımı, durum yönetimi ve etkileşimli yazılım yetkinliğini yansıtamaması.',
    solution: 'Pointer Events ile dokunmatik/fare destekli pencere yöneticisi, dinamik tema motoru, Web Audio API ses sentezi, mobil-first shell ve %100 erişilebilirlik (WCAG).',
    highlights: [
      'React 19 ve Vite ile modern SPA mimarisi, 100/100 Lighthouse erişilebilirlik',
      'Pointer Events ve Viewport Boundary Clamping ile kusursuz pencere sürükleme',
      'Masaüstü ve mobil ekranlar için iki ayrı optimize edilmiş deneyim katmanı',
      'Web Audio API ile dosyasız gerçek zamanlı ses sentezi ve kişiselleştirme',
    ],
    tags: ['React 19', 'Pointer Events', 'Modern Web OS', 'Design Tokens', 'Web Audio'],
    icon: TermIcon,
    iconColor: '#00F5FF',
    image: '/images/og-preview.png',
    github: 'https://github.com/emrhnccn/affan-portfolio',
    repoStatus: 'Açık Kaynak (Public)',
    liveDemo: 'https://affanccn.com/',
  },

  // ── SELECTED & SPECIALIZED PROJECTS ─────────────────────────────────────────
  {
    id: 7,
    name: 'coop-puzzle',
    tier: 'selected',
    category: 'game',
    title: '3D Co-op Bulmaca Oyunu',
    subtitle: 'Unity 3D, C# Eşzamanlı Fizik ve Etkileşim Motoru',
    desc: 'Unity 3D ile geliştirilmiş iki oyunculu co-op bulmaca oyunu. Rigidbody fiziği, raycast etkileşimleri ve karakter senkronizasyonu içerir.',
    problem: 'İki karakterin eşzamanlı olarak aynı fiziksel objeler üzerinde kuvvet uygulaması ve senkronize bulmacaları çözmesi sırasında oluşan bellek darboğazları.',
    solution: 'C# Clean Code prensipleriyle nesne havuzu (Object Pooling) ve optimize edilmiş Raycast etkileşimleri geliştirildi. Garbage Collection yükü minimize edildi.',
    highlights: [
      'Custom Rigidbody fizik mekanikleri ve dinamik ağırlık dengesi',
      'Bellek optimizasyonu: Object Pooling ile sıfır frame-drop',
      'Modular Interaction System (Butonlar, lazerler, ağırlık tablaları)',
    ],
    tags: ['Unity 3D', 'C#', 'Fizik Motoru', 'Object Pooling', 'Level Design'],
    icon: Gamepad2,
    iconColor: '#c084fc',
    image: '/images/proje4.webp',
    github: null,
    repoStatus: 'Özel Mülkiyet (Private Repo)',
    liveDemo: null,
  },
  {
    id: 8,
    name: 'kyk-automation',
    tier: 'selected',
    category: 'web',
    title: 'KYK Yurt Otomasyonu & Kapasite Takibi',
    subtitle: 'İlişkisel Veritabanı (MySQL 3NF) & Algoritmik Oda Atama',
    desc: 'MySQL ve Node.js üzerine kurulu, öğrenci kayıt, oda atama, yemekhane hakkı ve kapasite takibini yöneten sistem.',
    problem: 'Yurtlarda manuel yapılan oda yerleşimleri, kapasite aşımları ve yemekhane haklarının takibindeki insan hataları.',
    solution: '3. Normal Form (3NF) kurallarına uygun ilişkisel MySQL şeması ve kontenjan bazlı algoritmik oda atama servisi geliştirildi.',
    highlights: [
      'Kompleks MySQL Foreign Key ve Indexleme optimizasyonu',
      'Öğrenci kontenjanı ve oda tiplerine göre otomatik yerleşim algoritması',
      'Role-based yetkilendirme (Yönetici, Personel, Öğrenci)',
    ],
    tags: ['Node.js', 'MySQL', 'RDBMS', 'Relational Schema', 'API'],
    icon: Database,
    iconColor: '#FF00C8',
    image: '/images/proje3.webp',
    github: null,
    repoStatus: 'Kurumsal Proje (Client Project)',
    liveDemo: null,
  },
  {
    id: 9,
    name: 'match3-game',
    tier: 'selected',
    category: 'game',
    title: 'Kampüs Temalı Match-3 Oyunu',
    subtitle: 'Üniversite Bitirme Projesi & Blender 3D Entegrasyonu',
    desc: 'Blender ile modellenen kampüs binalarının Unity\'ye dinamik harita olarak aktarıldığı, Match-3 algoritmalarına sahip oyun.',
    problem: 'Geleneksel 2D Match-3 oyunları yerine kampüs yaşamını tanıtan 3D interaktif harita ve oyun mekaniği üretmek.',
    solution: 'Blender 3D modelleri Unity içerisine low-poly olarak aktarıldı. Grid tabanlı eşleştirme algoritması ve backend leaderboard API entegre edildi.',
    highlights: [
      'Grid eşleştirme ve patlama kuyruğu algoritmaları',
      'Blender low-poly çevre modellemesi ve UV mapping',
      'REST API bağlantılı dinamik skor tablosu (Leaderboard)',
    ],
    tags: ['Unity', 'C#', 'Blender', 'Grid Algorithm', 'REST API'],
    icon: Monitor,
    iconColor: '#00F5FF',
    image: '/images/proje5.webp',
    github: null,
    repoStatus: 'Akademik Proje (University Project)',
    liveDemo: null,
  },
  {
    id: 10,
    name: 'ai-automation',
    tier: 'selected',
    category: 'ai',
    title: 'AI İçerik & Veri Otomasyonları',
    subtitle: 'LLM API Entegrasyonu & Web Scraping Pipeline',
    desc: 'LLM API entegrasyonu ile dinamik içerik üreten ve Web Scraping botlarıyla yapılandırılmış veri toplayan otomasyon araçları.',
    problem: 'Manuel veri toplama ve içerik üretim süreçlerinin çok zaman alması ve hataya açık olması.',
    solution: 'Node.js üzerinde zamanlanmış botlar ve LLM API pipeline\'ları kuruldu. Ham veriler yapılandırılmış JSON formatına dönüştürüldü.',
    highlights: [
      'Puppeteer ve Cheerio ile otomatik veri madenciliği',
      'LLM Prompt Engineering ile yapılandırılmış JSON çıktıları',
      'Rate-limiting ve proxy hata yönetimi altyapısı',
    ],
    tags: ['LLM API', 'Node.js', 'Puppeteer', 'Web Scraping', 'Veri Pipeline'],
    icon: Cpu,
    iconColor: '#FF00C8',
    image: '/images/proje6.webp',
    github: null,
    repoStatus: 'Ar-Ge Projesi (R&D)',
    liveDemo: null,
  },
];

// ── Detail View Component ──────────────────────────────────────────────────
function ProjectDetail({ project, onBack }) {
  const IconComp = project.icon;

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '16px' }}>
      <button
        type="button"
        onClick={onBack}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '6px', color: '#cbd5e1', padding: '8px 14px',
          fontSize: '12px', fontWeight: 600, marginBottom: '18px',
          transition: 'all 0.15s', cursor: 'pointer',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.12)'; e.currentTarget.style.color = '#00F5FF'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#cbd5e1'; }}
      >
        <ArrowLeft size={14} aria-hidden="true" /> Projeler Listesine Dön
      </button>

      {/* Hero Header / Banner */}
      <div style={{
        height: '180px', borderRadius: '12px', overflow: 'hidden',
        marginBottom: '20px', position: 'relative',
        background: project.image ? '#0a0a14' : 'linear-gradient(135deg, #0d0d20 0%, #170d2e 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <div style={{
            width: '70px', height: '70px', borderRadius: '16px',
            background: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            border: `2px solid ${project.iconColor}55`,
            boxShadow: `0 0 30px ${project.iconColor}33`,
          }}>
            <IconComp size={36} color={project.iconColor} aria-hidden="true" />
          </div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(6,6,16,0.92) 0%, rgba(6,6,16,0.2) 60%, transparent 100%)',
        }} />

        {/* Floating tier badge */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '4px 10px', borderRadius: '20px',
          background: project.tier === 'featured' ? 'rgba(0,245,255,0.2)' : 'rgba(255,255,255,0.1)',
          border: project.tier === 'featured' ? '1px solid rgba(0,245,255,0.45)' : '1px solid rgba(255,255,255,0.15)',
          color: project.tier === 'featured' ? '#00F5FF' : '#cbd5e1',
          fontSize: '10.5px', fontFamily: 'monospace', fontWeight: 700,
          backdropFilter: 'blur(10px)',
        }}>
          {project.tier === 'featured' && <Star size={12} fill="#00F5FF" aria-hidden="true" />}
          {project.tier === 'featured' ? 'AMİRAL GEMİSİ PROJE' : 'SEÇİLİ MÜHENDİSLİK PROJESİ'}
        </div>
      </div>

      <div style={{ marginBottom: '6px', color: project.iconColor, fontFamily: 'monospace', fontSize: '12px', fontWeight: 700 }}>
        {project.subtitle}
      </div>

      <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
        {project.title}
      </h2>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            padding: '3px 10px', borderRadius: '6px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#e2e8f0', fontSize: '11px', fontFamily: 'monospace', fontWeight: 500,
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Engineering Problem & Solution Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', marginBottom: '20px' }}>
        <div style={{
          padding: '14px', borderRadius: '10px',
          background: 'rgba(248, 113, 113, 0.05)', border: '1px solid rgba(248, 113, 113, 0.2)',
        }}>
          <div style={{ color: '#f87171', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700, marginBottom: '6px' }}>
            // PROBLEM TANIMI
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '12.5px', lineHeight: 1.6, margin: 0 }}>
            {project.problem}
          </p>
        </div>

        <div style={{
          padding: '14px', borderRadius: '10px',
          background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.2)',
        }}>
          <div style={{ color: '#34d399', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700, marginBottom: '6px' }}>
            // MİMARİ VE ÇÖZÜM
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '12.5px', lineHeight: 1.6, margin: 0 }}>
            {project.solution}
          </p>
        </div>
      </div>

      {/* Technical Highlights */}
      {project.highlights && (
        <div style={{
          padding: '16px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '20px',
        }}>
          <div style={{ color: '#00F5FF', fontSize: '11.5px', fontFamily: 'monospace', fontWeight: 700, marginBottom: '10px' }}>
            TEKNİK ÖNE ÇIKANLAR
          </div>
          <ul style={{ margin: 0, paddingLeft: '16px', color: '#94a3b8', fontSize: '12.5px', lineHeight: 1.7 }}>
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 18px', borderRadius: '8px',
              background: 'rgba(255,0,200,0.15)', border: '1px solid rgba(255,0,200,0.4)',
              color: '#ff52d9', fontSize: '12.5px', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.15s',
            }}
          >
            <ExternalLink size={15} aria-hidden="true" /> Canlı Demoyu Ziyaret Et
          </a>
        )}

        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 18px', borderRadius: '8px',
              background: 'rgba(0,245,255,0.12)', border: '1px solid rgba(0,245,255,0.35)',
              color: '#00F5FF', fontSize: '12.5px', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.15s',
            }}
          >
            <Code size={15} aria-hidden="true" /> GitHub Kodlarını İncele
          </a>
        ) : (
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 16px', borderRadius: '8px',
              background: 'rgba(148,163,184,0.06)', border: '1px solid rgba(148,163,184,0.15)',
              color: '#94a3b8', fontSize: '12px', fontFamily: 'monospace',
            }}
          >
            <Lock size={13} aria-hidden="true" /> {project.repoStatus}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Projects App Component ───────────────────────────────────────────
export default function ProjectsApp() {
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = PROJECTS.filter(p => {
    if (activeFilter === 'featured') return p.tier === 'featured';
    if (activeFilter === 'web') return p.category === 'web';
    if (activeFilter === 'game') return p.category === 'game';
    if (activeFilter === 'ai') return p.category === 'ai';
    return true;
  });

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#070712', minHeight: 0 }}>
      {/* Top Header Bar */}
      <div style={{
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        gap: '10px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={16} color="#00F5FF" />
          <span style={{ color: '#f8fafc', fontSize: '13px', fontWeight: 600 }}>
            Projeler Mimarisi ({PROJECTS.length})
          </span>
        </div>

        {/* Filter Pills - Yatay Kaydırma Desteği */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '2px',
        }}>
          {[
            { id: 'all', label: 'Tümü (10)' },
            { id: 'featured', label: '⭐ Amiral Gemisi (6)' },
            { id: 'web', label: 'Web & Full-Stack' },
            { id: 'game', label: 'Unity & Oyun' },
            { id: 'ai', label: 'AI & Veri' },
          ].map(filter => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              style={{
                padding: '5px 12px', borderRadius: '6px',
                border: activeFilter === filter.id ? '1px solid rgba(0,245,255,0.45)' : '1px solid rgba(255,255,255,0.08)',
                background: activeFilter === filter.id ? 'rgba(0,245,255,0.15)' : 'rgba(255,255,255,0.03)',
                color: activeFilter === filter.id ? '#00F5FF' : '#94a3b8',
                fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid / Flex Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 310px), 1fr))',
        gridAutoRows: 'auto',
        gap: '14px',
        alignContent: 'start',
      }}>
        {filteredProjects.map(project => {
          const IconComp = project.icon;
          const isFeatured = project.tier === 'featured';

          return (
            <button
              key={`${activeFilter}-${project.id}`}
              type="button"
              onClick={() => setSelected(project)}
              aria-label={`${project.title} ayrıntılarını aç`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '100%',
                height: 'auto',
                minHeight: '190px',
                padding: '16px',
                borderRadius: '12px',
                background: isFeatured ? 'rgba(0, 245, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                border: isFeatured ? '1px solid rgba(0, 245, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, background 0.15s ease',
                position: 'relative',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isFeatured ? 'rgba(0, 245, 255, 0.09)' : 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = isFeatured ? 'rgba(0, 245, 255, 0.5)' : 'rgba(255, 255, 255, 0.18)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isFeatured ? 'rgba(0, 245, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = isFeatured ? 'rgba(0, 245, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)';
              }}
            >
              {/* Header: İkon ve Rozet */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '12px',
                flexShrink: 0,
              }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '10px',
                  background: `${project.iconColor}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${project.iconColor}40`,
                  flexShrink: 0,
                }}>
                  <IconComp size={18} color={project.iconColor} aria-hidden="true" />
                </div>

                {isFeatured ? (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    padding: '3px 8px', borderRadius: '20px',
                    background: 'rgba(0,245,255,0.15)', border: '1px solid rgba(0,245,255,0.35)',
                    color: '#00F5FF', fontSize: '10px', fontFamily: 'monospace', fontWeight: 700,
                  }}>
                    <Star size={10} fill="#00F5FF" aria-hidden="true" /> AMİRAL GEMİSİ
                  </span>
                ) : (
                  <span style={{
                    color: '#64748b', fontSize: '10px', fontFamily: 'monospace', fontWeight: 600,
                  }}>
                    {project.category.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '6px' }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.35,
                  wordBreak: 'break-word',
                  display: 'block',
                }}>
                  {project.title}
                </span>
                <span style={{
                  fontSize: '11px',
                  color: project.iconColor,
                  fontFamily: 'monospace',
                  lineHeight: 1.4,
                  wordBreak: 'break-word',
                  display: 'block',
                }}>
                  {project.subtitle}
                </span>
              </div>

              {/* Short desc */}
              <p style={{
                color: '#94a3b8',
                fontSize: '12px',
                lineHeight: 1.5,
                margin: '0 0 12px',
                wordBreak: 'break-word',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {project.desc}
              </p>

              {/* Tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                marginTop: 'auto',
                width: '100%',
                paddingTop: '6px',
              }}>
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} style={{
                    padding: '2px 7px', borderRadius: '4px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#cbd5e1', fontSize: '10px', fontFamily: 'monospace',
                  }}>
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span style={{ color: '#64748b', fontSize: '10px', padding: '2px 4px', fontFamily: 'monospace' }}>
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer bar */}
      <div style={{
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        color: '#64748b', fontSize: '11px', fontFamily: 'monospace',
        flexShrink: 0,
      }}>
        <span>{filteredProjects.length} proje gösteriliyor</span>
        <span style={{ display: 'none', smDisplay: 'inline' }}>Ayrıntılı teknik analiz için kartları tıklayın</span>
      </div>
    </div>
  );
}
