import { useState, useEffect, useRef, useCallback } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import MobileShell from './MobileShell';
import BlogWidget from './BlogWidget';
import { useTheme } from '../contexts/ThemeContext';
import { useSounds } from '../hooks/useSounds';
import AboutApp from './apps/AboutApp';
import ProjectsApp from './apps/ProjectsApp';
import CVApp from './apps/CVApp';
import ContactApp from './apps/ContactApp';
import TerminalApp from './apps/TerminalApp';
import SettingsApp from './apps/SettingsApp';
import BrowserApp from './apps/BrowserApp';
import BlogApp from './apps/BlogApp';
import { ExternalLink, FolderGit2, FileText, Mail } from 'lucide-react';

const APP_COMPONENTS = {
  about: <AboutApp />,
  projects: <ProjectsApp />,
  cv: <CVApp />,
  contact: <ContactApp />,
  terminal: <TerminalApp />,
  browser: <BrowserApp />,
  settings: <SettingsApp />,
  blog: <BlogApp />,
};

// ─── Wallpaper Layer ─────────────────────────────────────────────────────────
function WallpaperLayer({ wallpaper, theme }) {
  const { gridColor } = theme;

  if (wallpaper === 'grid') {
    return (
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 80%)',
      }} />
    );
  }

  if (wallpaper === 'dots') {
    return (
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, ${gridColor.replace('0.03', '0.35')} 1.5px, transparent 1.5px)`,
        backgroundSize: '24px 24px',
        maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 80%)',
      }} />
    );
  }

  if (wallpaper === 'circuit') {
    return (
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(${gridColor.replace('0.035','0.07')} 1px, transparent 1px),
          linear-gradient(90deg, ${gridColor.replace('0.035','0.07')} 1px, transparent 1px),
          linear-gradient(${gridColor} 1px, transparent 1px),
          linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px, 60px 60px, 12px 12px, 12px 12px',
        maskImage: 'radial-gradient(ellipse at center, black 15%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 15%, transparent 75%)',
      }} />
    );
  }

  if (wallpaper === 'stars') {
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(60)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 4 === 0 ? '3px' : '1.5px',
            height: i % 4 === 0 ? '3px' : '1.5px',
            background: theme.primary,
            borderRadius: '50%',
            left: `${(i * 173 + 7) % 100}%`,
            top: `${(i * 97 + 13) % 100}%`,
            boxShadow: `0 0 ${i % 4 === 0 ? 5 : 2}px ${theme.primary}`,
            opacity: 0.25 + (i % 4) * 0.15,
            animation: `pulse ${2.5 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${(i % 6) * 0.4}s`,
          }} />
        ))}
      </div>
    );
  }

  return null;
}

// ─── Desktop Icon Component with High-Contrast Accessibility ─────────────────
function DesktopIcon({ app, onClick, theme }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      className="desktop-icon"
      onClick={() => onClick(app)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`${app.title} uygulamasını aç`}
      title={`${app.title} — ${app.subtitle}`}
      style={{
        background: hovered ? `${theme.primary}15` : 'transparent',
        borderColor: hovered ? `${theme.primary}40` : 'transparent',
      }}
    >
      <span className="desktop-icon__icon" aria-hidden="true" style={{
        filter: hovered ? `drop-shadow(0 4px 12px ${theme.primary}88)` : 'none',
      }}>
        {app.icon}
      </span>
      <span className="desktop-icon__label">
        {app.title}
      </span>
    </button>
  );
}

// ─── Desktop Context Menu ────────────────────────────────────────────────────
function ContextMenu({ x, y, onClose, onOpenApp, APP_LIST, theme }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const items = [
    { label: '🚀 Projeler Mimarisi', action: () => onOpenApp(APP_LIST.find(a => a.id === 'projects')) },
    { label: '📄 Özgeçmiş (CV)', action: () => onOpenApp(APP_LIST.find(a => a.id === 'cv')) },
    { label: '👤 Geliştirici Profili & FIFA', action: () => onOpenApp(APP_LIST.find(a => a.id === 'about')) },
    { label: '📰 Blog Yazıları', action: () => onOpenApp(APP_LIST.find(a => a.id === 'blog')) },
    { label: '⬛ Terminal Aç', action: () => onOpenApp(APP_LIST.find(a => a.id === 'terminal')) },
    { label: '🌐 Web Tarayıcı', action: () => onOpenApp(APP_LIST.find(a => a.id === 'browser')) },
    { divider: true },
    { label: '⚙️ Kişiselleştirme & Ayarlar', action: () => onOpenApp(APP_LIST.find(a => a.id === 'settings')) },
    { label: '✉️ İletişime Geç', action: () => onOpenApp(APP_LIST.find(a => a.id === 'contact')) },
  ];

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 888 }} />
      <div
        ref={menuRef}
        role="menu"
        aria-label="Masaüstü içerik menüsü"
        style={{
          position: 'fixed', left: Math.min(x, window.innerWidth - 220), top: Math.min(y, window.innerHeight - 300), zIndex: 889,
          background: 'rgba(8, 8, 20, 0.96)', backdropFilter: 'blur(24px)',
          border: `1px solid ${theme.primary}30`, borderRadius: '10px',
          padding: '6px', minWidth: '220px',
          boxShadow: `0 15px 45px rgba(0,0,0,0.8), 0 0 20px ${theme.primary}15`,
          animation: 'fadeInScale 0.15s ease',
        }}
      >
        {items.map((item, i) => item.divider ? (
          <div key={i} style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
        ) : (
          <button
            key={i}
            type="button"
            role="menuitem"
            onClick={() => { item.action(); onClose(); }}
            style={{
              display: 'block', width: '100%', padding: '8px 12px',
              background: 'transparent', border: 'none',
              color: '#e2e8f0', fontSize: '13px', cursor: 'pointer',
              textAlign: 'left', borderRadius: '6px', transition: 'all 0.12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${theme.primary}18`; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e2e8f0'; }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}

// ─── Main Desktop Component ──────────────────────────────────────────────────
export default function Desktop() {
  const { theme, wallpaper, crtEffect } = useTheme();
  const [muted, setMuted] = useState(false);
  const { play } = useSounds(muted);

  const [windows, setWindows] = useState([]);
  const [topZ, setTopZ] = useState(100);
  const [contextMenu, setContextMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const startupPlayedRef = useRef(false);

  // App configurations
  const APP_LIST = [
    { id: 'projects', title: 'Projeler/',     icon: '📁', subtitle: '10 seçili proje mimarisi',        size: { w: 820, h: 560 }, defaultPos: () => ({ x: 100, y: 50 }) },
    { id: 'about',    title: 'Hakkımda.exe', icon: '👤', subtitle: 'Geliştirici profili & FIFA kartı', size: { w: 860, h: 590 }, defaultPos: () => ({ x: 140, y: 70 }) },
    { id: 'cv',       title: 'CV.exe',        icon: '📄', subtitle: 'Özgeçmiş görüntüleyici',          size: { w: 780, h: 580 }, defaultPos: () => ({ x: 180, y: 90 }) },
    { id: 'contact',  title: 'İletişim.app',  icon: '✉️', subtitle: 'Email client & kanallar',         size: { w: 780, h: 540 }, defaultPos: () => ({ x: 220, y: 80 }) },
    { id: 'terminal', title: 'Terminal',      icon: '⬛', subtitle: 'AffanOS Shell',                   size: { w: 680, h: 440 }, defaultPos: () => ({ x: 260, y: 110 }) },
    { id: 'browser',  title: 'Tarayıcı',      icon: '🌐', subtitle: 'AffanOS Browser & demolar',        size: { w: 880, h: 600 }, defaultPos: () => ({ x: 160, y: 60 }) },
    { id: 'settings', title: 'Ayarlar',       icon: '⚙️', subtitle: 'Tema ve kişiselleştirme',        size: { w: 580, h: 600 }, defaultPos: () => ({ x: 320, y: 70 }) },
    { id: 'blog',     title: 'Blog/',         icon: '📰', subtitle: 'Yazılar & Makaleler',             size: { w: 720, h: 560 }, defaultPos: () => ({ x: 200, y: 55 }) },
  ];

  // Mobile detection & responsive viewport observer
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Play startup sound on first interaction
  useEffect(() => {
    const handleFirst = () => {
      if (!startupPlayedRef.current) {
        startupPlayedRef.current = true;
        play('startup');
      }
      document.removeEventListener('click', handleFirst);
    };
    document.addEventListener('click', handleFirst);
    return () => document.removeEventListener('click', handleFirst);
  }, [play]);

  // Window resize clamp: keeps all open windows inside bounds if viewport resizes
  useEffect(() => {
    const handleResize = () => {
      setWindows(prev => prev.map(win => {
        const maxX = Math.max(0, window.innerWidth - 100);
        const maxY = Math.max(0, window.innerHeight - 86);
        return {
          ...win,
          position: {
            x: Math.min(win.position.x, maxX),
            y: Math.min(win.position.y, maxY),
          },
        };
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Window Management Actions
  const openApp = useCallback((appConfig) => {
    if (!appConfig) return;
    play('click');
    setWindows(prev => {
      const exists = prev.find(w => w.appId === appConfig.id);
      if (exists) {
        const newZ = topZ + 1;
        setTopZ(newZ);
        return prev.map(w =>
          w.appId === appConfig.id ? { ...w, isMinimized: false, zIndex: newZ } : w
        );
      }
      const newZ = topZ + 1;
      setTopZ(newZ);
      const pos = appConfig.defaultPos();
      const offset = (prev.length % 6) * 26;
      const safeX = Math.max(20, Math.min(pos.x + offset, window.innerWidth - (appConfig.size.w || 600) - 20));
      const safeY = Math.max(20, Math.min(pos.y + offset, window.innerHeight - (appConfig.size.h || 480) - 70));
      play('windowOpen');
      return [...prev, {
        id: Date.now(),
        appId: appConfig.id,
        title: appConfig.title,
        icon: appConfig.icon,
        isMinimized: false,
        isMaximized: false,
        position: { x: safeX, y: safeY },
        size: appConfig.size,
        zIndex: newZ,
        component: APP_COMPONENTS[appConfig.id],
      }];
    });
  }, [topZ, play]);

  const closeWindow = useCallback((id) => {
    play('windowClose');
    setWindows(prev => prev.filter(w => w.id !== id));
  }, [play]);

  const minimizeWindow = useCallback((id) => {
    play('click');
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  }, [play]);

  const maximizeWindow = useCallback((id) => {
    play('click');
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, [play]);

  const focusWindow = useCallback((id) => {
    const newZ = topZ + 1;
    setTopZ(newZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w));
  }, [topZ]);

  const moveWindow = useCallback((id, pos) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: pos } : w));
  }, []);

  const toggleMinimize = useCallback((id) => {
    play('click');
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w;
      if (w.isMinimized) {
        const newZ = topZ + 1;
        setTopZ(newZ);
        return { ...w, isMinimized: false, zIndex: newZ };
      }
      return { ...w, isMinimized: true };
    }));
  }, [topZ, play]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    play('click');
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Blog widget → pencere açma handler'ı
  const openBlogFromWidget = useCallback((postId) => {
    const blogConfig = APP_LIST.find(a => a.id === 'blog');
    if (!blogConfig) return;
    play('click');
    setWindows(prev => {
      const exists = prev.find(w => w.appId === 'blog');
      if (exists) {
        const newZ = topZ + 1;
        setTopZ(newZ);
        return prev.map(w =>
          w.appId === 'blog'
            ? { ...w, isMinimized: false, zIndex: newZ, component: <BlogApp initialPostId={postId} /> }
            : w
        );
      }
      const newZ = topZ + 1;
      setTopZ(newZ);
      const pos = blogConfig.defaultPos();
      const offset = (prev.length % 6) * 26;
      const safeX = Math.max(20, Math.min(pos.x + offset, window.innerWidth - (blogConfig.size.w || 600) - 20));
      const safeY = Math.max(20, Math.min(pos.y + offset, window.innerHeight - (blogConfig.size.h || 480) - 70));
      play('windowOpen');
      return [...prev, {
        id: Date.now(),
        appId: blogConfig.id,
        title: blogConfig.title,
        icon: blogConfig.icon,
        isMinimized: false,
        isMaximized: false,
        position: { x: safeX, y: safeY },
        size: blogConfig.size,
        zIndex: newZ,
        component: <BlogApp initialPostId={postId} />,
      }];
    });
  }, [topZ, play]);

  // If mobile, render dedicated Mobile-First Shell
  if (isMobile) {
    const mobileApps = APP_LIST.map(app => ({
      ...app,
      component: APP_COMPONENTS[app.id],
    }));
    return (
      <MobileShell
        apps={mobileApps}
        onOpenApp={() => play('click')}
        muted={muted}
        onMuteToggle={() => setMuted(m => !m)}
      />
    );
  }

  // Desktop Viewport
  return (
    <main
      className="portfolio-desktop"
      aria-label="Affan Emirhan Çüçen Portföy Masaüstü"
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
      style={{
        position: 'fixed', inset: 0,
        background: theme.bgGradient || '#060610',
        overflow: 'hidden', paddingBottom: '48px',
      }}
    >
      {/* Dynamic Wallpaper Layer */}
      <WallpaperLayer wallpaper={wallpaper} theme={theme} />

      {/* Retro CRT Scanline Overlay */}
      {crtEffect && <div className="crt-overlay" aria-hidden="true" />}

      {/* Desktop Watermark */}
      <div style={{
        position: 'absolute', bottom: '60px', right: '316px',
        color: 'rgba(255,255,255,0.06)', fontSize: '11px',
        fontFamily: 'var(--font-mono)', letterSpacing: '0.12em',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        AffanOS v1.0 · Computer Engineer & Full-Stack Developer
      </div>

      {/* Blog Widget */}
      <BlogWidget onOpenBlog={openBlogFromWidget} />

      {/* Desktop Icons Dock */}
      <nav className="desktop-icon-dock" aria-label="Masaüstü uygulamaları" style={{
        position: 'absolute', top: '24px', left: '24px',
        display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10,
      }}>
        {APP_LIST.map(app => (
          <DesktopIcon key={app.id} app={app} onClick={openApp} theme={theme} />
        ))}
      </nav>

      {/* Recruiter Command Center (Above-the-fold Hero) */}
      <section className="command-center" aria-labelledby="portfolio-title">
        <div className="command-center__top">
          <span className="command-center__eyebrow">PORTFOLYO · 2026</span>
          <div className="command-center__status-badge" title="Available for Opportunities">
            <span className="command-center__pulse" />
            <span>YENİ FIRSATLARA AÇIK</span>
          </div>
        </div>

        <h1 id="portfolio-title">Affan Emirhan Çüçen</h1>
        <div className="command-center__role">
          Bilgisayar Mühendisi & Full-Stack Yazılım Geliştirici
        </div>

        <p>
          Yüksek performanslı web uygulamaları, gerçek zamanlı sistemler (Socket.io), Unity 3D oyun mimarisi ve yapay zekâ entegrasyonu odaklı modern yazılım çözümleri üretiyorum.
        </p>

        {/* Competency tags */}
        <div className="command-center__skills">
          <span className="command-center__skill-tag command-center__skill-tag--highlight">React 19</span>
          <span className="command-center__skill-tag">Node.js</span>
          <span className="command-center__skill-tag">Socket.io</span>
          <span className="command-center__skill-tag command-center__skill-tag--highlight">Unity 3D / C#</span>
          <span className="command-center__skill-tag">MySQL & MongoDB</span>
          <span className="command-center__skill-tag">Teknik SEO</span>
        </div>

        {/* Action buttons */}
        <div className="command-center__actions">
          <button
            type="button"
            className="command-center__btn command-center__btn--primary"
            onClick={() => openApp(APP_LIST.find(a => a.id === 'projects'))}
          >
            <FolderGit2 size={15} aria-hidden="true" />
            <span>Projeleri İncele</span>
          </button>

          <button
            type="button"
            className="command-center__btn command-center__btn--secondary"
            onClick={() => openApp(APP_LIST.find(a => a.id === 'cv'))}
          >
            <FileText size={15} aria-hidden="true" />
            <span>Özgeçmiş (CV)</span>
          </button>

          <button
            type="button"
            className="command-center__btn command-center__btn--ghost"
            onClick={() => openApp(APP_LIST.find(a => a.id === 'contact'))}
          >
            <Mail size={15} aria-hidden="true" />
            <span>İletişim</span>
          </button>

          <a
            href="https://github.com/emrhnccn"
            target="_blank"
            rel="noopener noreferrer"
            className="command-center__btn command-center__btn--ghost"
          >
            <span>🐙 GitHub</span>
            <ExternalLink size={12} aria-hidden="true" />
          </a>

          <a
            href="https://linkedin.com/in/affanccn"
            target="_blank"
            rel="noopener noreferrer"
            className="command-center__btn command-center__btn--ghost"
          >
            <span>💼 LinkedIn</span>
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Active Windows */}
      {windows.map(win => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          icon={win.icon}
          position={win.position}
          size={win.size}
          zIndex={win.zIndex}
          isMinimized={win.isMinimized}
          isMaximized={win.isMaximized}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onMove={moveWindow}
        >
          {win.component}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        apps={APP_LIST}
        onOpenApp={openApp}
        onToggleMinimize={toggleMinimize}
        muted={muted}
        onToggleMute={() => setMuted(m => !m)}
      />

      {/* Right Click Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onOpenApp={openApp}
          APP_LIST={APP_LIST}
          theme={theme}
        />
      )}
    </main>
  );
}
