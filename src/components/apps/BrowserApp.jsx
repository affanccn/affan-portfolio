import { useState, useRef, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ArrowLeft, ArrowRight, RefreshCw, Home, X, Plus, Globe, Star, Shield, Lock, ExternalLink, AlertTriangle } from 'lucide-react';

// Sites that block iframe embedding (X-Frame-Options: DENY or SAMEORIGIN)
const BLOCKED_DOMAINS = [
  'github.com', 'linkedin.com', 'google.com', 'twitter.com', 'x.com',
  'facebook.com', 'instagram.com', 'youtube.com', 'reddit.com',
  'stackoverflow.com', 'npmjs.com', 'vercel.com', 'netlify.com',
];

function isBlockedDomain(url) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    return BLOCKED_DOMAINS.some(d => host === d || host.endsWith('.' + d));
  } catch { return false; }
}

const BOOKMARKS = [
  { label: 'GustoPos',     url: 'https://gusto-pos-two.vercel.app',         icon: '🖥️' },
  { label: 'Salaas',       url: 'https://salaascaferestaurant.com.tr',      icon: '🍽️' },
  { label: 'RealTimeChat', url: 'https://github.com/emrhnccn/RealTimeChat',  icon: '💬' },
  { label: 'Ersa Ticaret', url: 'https://github.com/emrhnccn/ersa-ticaret',  icon: '🛍️' },
  { label: 'Ersa Soğutma', url: 'https://github.com/emrhnccn/ersasogutma',   icon: '❄️' },
  { label: 'AffanOS',      url: 'https://affanccn.com/', icon: '💻' },
  { label: 'GitHub',       url: 'https://github.com/affanccn',              icon: '🐙' },
  { label: 'LinkedIn',     url: 'https://linkedin.com/in/affanccn',          icon: '💼' },
];

const HOME_URL = 'affanos://homepage';

// ── Blocked page ──────────────────────────────────────────────────────────────
function BlockedPage({ url, theme }) {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '16px',
      background: 'linear-gradient(135deg, #060610, #0c0c1e)',
      padding: '40px',
    }}>
      <div style={{
        width: '64px', height: '64px', borderRadius: '50%',
        background: 'rgba(251,191,36,0.1)', border: '2px solid rgba(251,191,36,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '28px',
      }}>
        🔒
      </div>

      <div style={{ textAlign: 'center', maxWidth: '420px' }}>
        <h2 style={{ color: '#e2e8f0', fontSize: '18px', fontWeight: 700, margin: '0 0 8px' }}>
          Bu site burada açılamıyor
        </h2>
        <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, margin: '0 0 6px' }}>
          <strong style={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '12px' }}>{url}</strong>
        </p>
        <p style={{ color: '#475569', fontSize: '12px', margin: 0 }}>
          Bu site güvenlik politikası (X-Frame-Options) nedeniyle iframe içinde yüklenemiyor.
          Gerçek bir tarayıcıda açmak için aşağıdaki butonu kullan.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px', borderRadius: '8px',
            background: `${theme.primary}18`,
            border: `1px solid ${theme.primary}44`,
            color: theme.primary, fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = `${theme.primary}28`}
          onMouseLeave={e => e.currentTarget.style.background = `${theme.primary}18`}
        >
          <ExternalLink size={15} />
          Yeni Sekmede Aç
        </a>
      </div>

      <div style={{
        padding: '10px 16px', borderRadius: '8px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', gap: '8px',
        maxWidth: '420px',
      }}>
        <AlertTriangle size={13} color="#64748b" />
        <span style={{ color: '#475569', fontSize: '11px', fontFamily: 'monospace' }}>
          GitHub, LinkedIn, Google gibi büyük siteler iframe gömülmesine izin vermez.
          Vercel/Netlify üzerindeki kişisel projeleri burada görüntüleyebilirsin.
        </span>
      </div>
    </div>
  );
}

// ── Homepage ──────────────────────────────────────────────────────────────────
function HomeDashboard({ theme, onNavigate }) {
  const quickLinks = [
    { label: 'GustoPos POS',      url: 'https://gusto-pos-two.vercel.app',        icon: '🖥️' },
    { label: 'Salaas Rezervasyon',url: 'https://salaascaferestaurant.com.tr',     icon: '🍽️' },
    { label: 'RealTimeChat',      url: 'https://github.com/emrhnccn/RealTimeChat', icon: '💬' },
    { label: 'Ersa Ticaret',      url: 'https://github.com/emrhnccn/ersa-ticaret', icon: '🛍️' },
    { label: 'Ersa Soğutma',      url: 'https://github.com/emrhnccn/ersasogutma',  icon: '❄️' },
    { label: 'AffanOS Portföy',   url: 'https://affanccn.com/',icon: '💻' },
    { label: 'GitHub Profili',    url: 'https://github.com/affanccn',             icon: '🐙' },
    { label: 'LinkedIn Profili',  url: 'https://linkedin.com/in/affanccn',         icon: '💼' },
  ];

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      background: 'linear-gradient(135deg, #060610, #0c0c1e)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '32px 24px', gap: '24px',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '36px', marginBottom: '8px',
          filter: `drop-shadow(0 0 16px ${theme.primary}88)`,
        }}>🌐</div>
        <div style={{ color: theme.primary, fontFamily: 'monospace', fontSize: '18px', fontWeight: 700 }}>
          AffanOS Browser
        </div>
        <div style={{ color: '#475569', fontSize: '12px', marginTop: '4px', fontFamily: 'monospace' }}>
          emrhnccn / portfolyo
        </div>
      </div>

      <div style={{
        width: '100%', maxWidth: '520px',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px',
      }}>
        {quickLinks.map(link => {
          const blocked = isBlockedDomain(link.url);
          return (
            <button
              key={link.url}
              onClick={() => onNavigate(link.url)}
              style={{
                padding: '14px 10px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid rgba(255,255,255,0.07)`,
                cursor: 'pointer', textAlign: 'center',
                transition: 'all 0.15s', color: '#e2e8f0',
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = `1px solid ${theme.primary}44`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>{link.icon}</div>
              <div style={{ fontSize: '11px', fontWeight: 500 }}>{link.label}</div>
              {blocked && (
                <div style={{
                  position: 'absolute', top: '4px', right: '4px',
                  fontSize: '10px', opacity: 0.5, title: 'Yeni sekmede açılır',
                }}>🔗</div>
              )}
            </button>
          );
        })}
      </div>

      <div style={{
        maxWidth: '520px', width: '100%',
        padding: '12px 16px', borderRadius: '8px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}>
        <p style={{ color: '#334155', fontSize: '11px', margin: 0, fontFamily: 'monospace', lineHeight: 1.6 }}>
          💡 GitHub ve LinkedIn gibi siteler güvenlik kısıtlaması nedeniyle burada açılamaz — yeni sekmede açılırlar.
          Kişisel Vercel projeleri ise doğrudan burada görüntülenebilir.
        </p>
      </div>
    </div>
  );
}

// ── Main Browser ──────────────────────────────────────────────────────────────
export default function BrowserApp({ initialUrl = HOME_URL }) {
  const { theme } = useTheme();
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl === HOME_URL ? '' : initialUrl);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [tabs, setTabs] = useState([{ id: 1, title: initialUrl === HOME_URL ? 'Yeni Sekme' : initialUrl, url: initialUrl }]);
  const [activeTab, setActiveTab] = useState(1);
  const iframeRef = useRef(null);

  const navigate = useCallback((targetUrl) => {
    if (!targetUrl || targetUrl === HOME_URL) {
      setUrl(HOME_URL); setInputUrl('');
      setHistory(h => { const n = [...h.slice(0, historyIndex + 1), HOME_URL]; setHistoryIndex(n.length - 1); return n; });
      setTabs(t => t.map(tab => tab.id === activeTab ? { ...tab, url: HOME_URL, title: 'Yeni Sekme' } : tab));
      return;
    }

    let full = targetUrl.trim();
    if (!full.startsWith('http://') && !full.startsWith('https://')) full = 'https://' + full;

    // If blocked domain, open in new tab directly
    if (isBlockedDomain(full)) {
      // Still set URL in bar to show where we are
      setUrl(full);
      setInputUrl(full);
      setHistory(h => { const n = [...h.slice(0, historyIndex + 1), full]; setHistoryIndex(n.length - 1); return n; });
      try {
        setTabs(t => t.map(tab => tab.id === activeTab ? { ...tab, url: full, title: new URL(full).hostname } : tab));
      } catch {
        // Keep the current tab title when the address cannot be parsed.
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    setUrl(full);
    setInputUrl(full);
    setHistory(h => { const n = [...h.slice(0, historyIndex + 1), full]; setHistoryIndex(n.length - 1); return n; });
    try {
      setTabs(t => t.map(tab => tab.id === activeTab ? { ...tab, url: full, title: new URL(full).hostname } : tab));
    } catch {
      // Keep the current tab title when the address cannot be parsed.
    }
    setTimeout(() => setLoading(false), 2000);
  }, [historyIndex, activeTab]);

  const goBack = () => {
    if (historyIndex <= 0) return;
    const ni = historyIndex - 1;
    setHistoryIndex(ni); setUrl(history[ni]); setInputUrl(history[ni] === HOME_URL ? '' : history[ni]);
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;
    const ni = historyIndex + 1;
    setHistoryIndex(ni); setUrl(history[ni]); setInputUrl(history[ni] === HOME_URL ? '' : history[ni]);
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') navigate(inputUrl || HOME_URL); };

  const addTab = () => {
    const newId = Date.now();
    setTabs(t => [...t, { id: newId, title: 'Yeni Sekme', url: HOME_URL }]);
    setActiveTab(newId); setUrl(HOME_URL); setInputUrl('');
    setHistory([HOME_URL]); setHistoryIndex(0);
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTab === id) {
      const newActive = newTabs[newTabs.length - 1];
      setActiveTab(newActive.id); setUrl(newActive.url);
      setInputUrl(newActive.url === HOME_URL ? '' : newActive.url);
    }
  };

  const isSecure = url.startsWith('https://');
  const isHome = url === HOME_URL;
  const isBlocked = !isHome && isBlockedDomain(url);
  const canBack = historyIndex > 0;
  const canForward = historyIndex < history.length - 1;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0a0a16' }}>

      {/* Tab bar */}
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        padding: '6px 8px 0', background: 'rgba(0,0,0,0.4)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        gap: '2px', minHeight: '36px',
      }}>
        {tabs.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <div
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setUrl(tab.url); setInputUrl(tab.url === HOME_URL ? '' : tab.url); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '5px 10px 6px', borderRadius: '6px 6px 0 0',
                background: isActive ? '#0d0d1e' : 'rgba(255,255,255,0.03)',
                border: isActive ? `1px solid ${theme.primary}33` : '1px solid transparent',
                borderBottom: isActive ? '1px solid #0d0d1e' : '1px solid transparent',
                cursor: 'pointer', fontSize: '11px',
                color: isActive ? '#e2e8f0' : '#475569',
                maxWidth: '160px', transition: 'all 0.1s',
                position: 'relative', bottom: '-1px',
              }}
            >
              <Globe size={11} />
              <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                {tab.title}
              </span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: '0', display: 'flex', transition: 'color 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                  onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                >
                  <X size={10} />
                </button>
              )}
            </div>
          );
        })}
        <button
          onClick={addTab}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '26px', height: '26px', borderRadius: '6px',
            background: 'transparent', border: 'none', color: '#475569',
            cursor: 'pointer', transition: 'all 0.1s', marginLeft: '2px', marginBottom: '4px',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#e2e8f0'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '6px 10px', background: '#0d0d1e',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        {[
          { icon: ArrowLeft,  action: goBack,    enabled: canBack,    title: 'Geri' },
          { icon: ArrowRight, action: goForward, enabled: canForward, title: 'İleri' },
          { icon: RefreshCw,  action: () => { if (!isHome && !isBlocked) { setLoading(true); setTimeout(() => setLoading(false), 1200); }}, enabled: true, title: 'Yenile', spin: loading },
          { icon: Home,       action: () => navigate(HOME_URL), enabled: true, title: 'Ana Sayfa' },
        ].map(({ icon: Icon, action, enabled, title, spin }) => (
          <button key={title} onClick={action} title={title} style={{
            width: '28px', height: '28px', borderRadius: '6px',
            background: 'transparent', border: 'none',
            color: enabled ? '#94a3b8' : '#2d3748', cursor: enabled ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.1s', flexShrink: 0,
          }}
            onMouseEnter={e => { if (enabled) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Icon size={15} style={spin ? { animation: 'spin 0.8s linear infinite' } : {}} />
          </button>
        ))}

        {/* Address bar */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: '6px',
          background: isBlocked ? 'rgba(251,191,36,0.05)' : 'rgba(255,255,255,0.05)',
          border: isBlocked ? '1px solid rgba(251,191,36,0.2)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px', padding: '4px 12px', fontSize: '12px',
        }}>
          {!isHome && (isBlocked
            ? <AlertTriangle size={11} color="#fbbf24" style={{ flexShrink: 0 }} />
            : isSecure
              ? <Lock size={11} color="#4ade80" style={{ flexShrink: 0 }} />
              : <Shield size={11} color="#f87171" style={{ flexShrink: 0 }} />)}
          {isHome && <Globe size={11} color="#64748b" style={{ flexShrink: 0 }} />}
          <input
            type="text"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="URL gir veya ara... (örn: gusto-pos-two.vercel.app)"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: '12px', cursor: 'text' }}
          />
          {loading && (
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%',
              border: `2px solid ${theme.primary}44`, borderTopColor: theme.primary,
              animation: 'spin 0.8s linear infinite', flexShrink: 0,
            }} />
          )}
        </div>

        {/* Open in new tab if blocked */}
        {isBlocked && url !== HOME_URL && (
          <a
            href={url} target="_blank" rel="noreferrer"
            title="Yeni sekmede aç"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '28px', height: '28px', borderRadius: '6px',
              background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)',
              color: '#fbbf24', textDecoration: 'none', transition: 'all 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(251,191,36,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(251,191,36,0.1)'}
          >
            <ExternalLink size={14} />
          </a>
        )}

        <button style={{
          width: '28px', height: '28px', borderRadius: '6px',
          background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.1s', flexShrink: 0,
        }}
          onMouseEnter={e => { e.currentTarget.style.color = '#facc15'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; }}
        >
          <Star size={15} />
        </button>
      </div>

      {/* Bookmarks bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '2px',
        padding: '4px 10px', background: '#0a0a18',
        borderBottom: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden',
      }}>
        {BOOKMARKS.map(bm => (
          <button
            key={bm.url}
            onClick={() => navigate(bm.url)}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '3px 8px', borderRadius: '4px', background: 'transparent', border: 'none',
              color: '#64748b', fontSize: '11px', cursor: 'pointer', transition: 'all 0.1s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#e2e8f0'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; }}
          >
            <span>{bm.icon}</span> {bm.label}
            {isBlockedDomain(bm.url) && <span style={{ fontSize: '9px', opacity: 0.5 }}>↗</span>}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {loading && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', zIndex: 10, overflow: 'hidden' }}>
            <div style={{
              height: '100%', background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
              animation: 'loadingBar 1.2s ease-in-out infinite', boxShadow: `0 0 8px ${theme.primary}`,
            }} />
          </div>
        )}

        {isHome ? (
          <HomeDashboard theme={theme} onNavigate={navigate} />
        ) : isBlocked ? (
          <BlockedPage url={url} theme={theme} />
        ) : (
          <iframe
            ref={iframeRef}
            src={url}
            title="Browser"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
            style={{ width: '100%', height: '100%', border: 'none' }}
            onLoad={() => setLoading(false)}
          />
        )}
      </div>
    </div>
  );
}
