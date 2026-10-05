import { useState, useEffect } from 'react';
import { ExternalLink, Download, ArrowUpRight, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function MobileShell({ apps, onOpenApp, onMuteToggle, muted }) {
  const { theme } = useTheme();
  const [activeApp, setActiveApp] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setCurrentTime(
        now.toLocaleTimeString('tr-TR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle hardware back or Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeApp) {
        setActiveApp(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeApp]);

  const getAppTitle = (app) => {
    switch (app.id) {
      case 'projects':
        return '🚀 Projeler & Teknolojiler';

      case 'about':
        return '👤 Geliştirici Profili & FIFA';

      case 'cv':
        return '📄 Özgeçmiş (CV)';

      case 'contact':
        return '✉️ İletişim Hub';

      case 'terminal':
        return '⬛ Terminal Shell';

      case 'browser':
        return '🌐 Web Tarayıcı';

      case 'blog':
        return '📰 Blog Yazıları';

      default:
        return app.title;
    }
  };

  return (
    <div
      className="mobile-shell"
      style={{
        background: theme.bgGradient || '#060610',
      }}
    >
      {/* =========================
          TOP STATUS BAR
      ========================== */}
      <header className="mobile-shell__status-bar">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              color: theme.primary,
              fontWeight: 700,
            }}
          >
            AffanOS
          </span>

          <span>·</span>

          <span>{currentTime}</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Availability */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#34d399',
                boxShadow: '0 0 6px #34d399',
              }}
            />

            <span
              style={{
                fontSize: '10px',
                color: '#34d399',
                fontWeight: 600,
              }}
              title="Available for Opportunities"
            >
              YENİ FIRSATLARA AÇIK
            </span>
          </div>

          {/* Sound */}
          <button
            type="button"
            onClick={onMuteToggle}
            aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '2px',
            }}
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
      </header>

      {/* =========================
          DEVELOPER HERO
      ========================== */}
      <section className="mobile-shell__hero">
        <div className="mobile-shell__avatar-row">
          {/* Avatar */}
          <div className="mobile-shell__avatar">
            <img
              src="/images/memoji.png"
              alt="Affan Emirhan Çüçen"
              width="54"
              height="54"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Identity */}
          <div>
            <h1 className="mobile-shell__name">
              Affan Emirhan Çüçen
            </h1>

            <p className="mobile-shell__role">
              Bilgisayar Mühendisi · Full-Stack & Mobile Developer
            </p>

            {/* Tech badges */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                marginTop: '7px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(0,245,255,0.08)',
                  color: '#00F5FF',
                  border: '1px solid rgba(0,245,255,0.2)',
                }}
              >
                Flutter · Dart
              </span>

              <span
                style={{
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#94a3b8',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                Web + Mobile
              </span>
            </div>
          </div>
        </div>

        {/* =========================
            QUICK LINKS
        ========================== */}
        <div className="mobile-shell__quick-links">
          {/* CV */}
          <a
            href="/Afvan_Emirhan_Cucen_CV.pdf"
            download="Afvan_Emirhan_Cucen_CV.pdf"
            className="mobile-shell__quick-link"
            style={{
              color: '#00F5FF',
              borderColor: 'rgba(0,245,255,0.3)',
            }}
          >
            <Download size={15} />
            <span>CV İndir</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/affanccn"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-shell__quick-link"
          >
            <ExternalLink size={15} />
            <span>GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/affanccn"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-shell__quick-link"
            style={{
              color: '#ff52d9',
              borderColor: 'rgba(255,0,200,0.3)',
            }}
          >
            <ArrowUpRight size={15} />
            <span>LinkedIn</span>
          </a>
        </div>
      </section>

      {/* =========================
          APP LAUNCHER
      ========================== */}
      <main
        className="mobile-shell__apps-grid"
        aria-label="Mobil portföy modülleri"
      >
        <div
          style={{
            color: '#64748b',
            fontSize: '11px',
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
            marginBottom: '4px',
          }}
        >
          UYGULAMALAR & İÇERİK
        </div>

        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            className="mobile-app-card"
            onClick={() => {
              setActiveApp(app);

              if (onOpenApp) {
                onOpenApp(app);
              }
            }}
          >
            {/* App Icon */}
            <div
              className="mobile-app-card__icon"
              aria-hidden="true"
            >
              {app.icon}
            </div>

            {/* App Info */}
            <div style={{ flex: 1 }}>
              <div className="mobile-app-card__title">
                {getAppTitle(app)}
              </div>

              <div className="mobile-app-card__desc">
                {app.subtitle}
              </div>
            </div>

            <span
              style={{
                color: '#475569',
                fontSize: '16px',
              }}
              aria-hidden="true"
            >
              ›
            </span>
          </button>
        ))}

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            padding: '20px 0',
            color: '#475569',
            fontSize: '11px',
            fontFamily: 'monospace',
          }}
        >
          AffanOS Mobile Shell · 2026
        </div>
      </main>

      {/* =========================
          ACTIVE APP MODAL
      ========================== */}
      {activeApp && (
        <div
          className="mobile-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeApp.title}
        >
          {/* Modal Header */}
          <div className="mobile-modal__header">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              <span>{activeApp.icon}</span>

              <span>
                {getAppTitle(activeApp)}
              </span>
            </div>

            <button
              type="button"
              className="mobile-modal__close"
              onClick={() => setActiveApp(null)}
              aria-label="Kapat"
            >
              <X size={14} />
              <span>Kapat</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="mobile-modal__body">
            {activeApp.component}
          </div>
        </div>
      )}
    </div>
  );
}
