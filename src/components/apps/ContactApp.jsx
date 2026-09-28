import { useState } from 'react';
import { Mail, Send, Copy, Check, ExternalLink } from 'lucide-react';

const CONTACT_EMAIL = 'emrhn.ccn@gmail.com';
const EMPTY_FORM = { name: '', email: '', subject: '', body: '' };

const QUICK_PRESETS = [
  {
    label: '💼 İş / Pozisyon Teklifi',
    subject: 'İş Fırsatı / Pozisyon Görüşmesi',
    template: 'Merhaba Affan Emirhan,\n\nŞirketimizdeki yazılım geliştirici pozisyonumuz için profilinizi inceledik ve sizinle tanışmak istiyoruz.\n\nPozisyon detayları:\n',
  },
  {
    label: '🤝 Freelance Proje',
    subject: 'Freelance Proje Geliştirme',
    template: 'Merhaba Affan,\n\nYeni bir web / oyun projemiz için yazılım mimarisi ve geliştirme desteği arıyoruz. Proje kapsamı ve zaman planı hakkında görüşebilir miyiz?\n',
  },
  {
    label: '💬 Genel Soru & İletişim',
    subject: 'Portföy Hakkında / Tanışma',
    template: 'Merhaba Affan,\n\nPortföyünüzü ve AffanOS deneyimini inceledim. Şu konu hakkında sizinle iletişim kurmak istedim:\n',
  },
];

export default function ContactApp() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [copied, setCopied] = useState(false);
  const [sentNotice, setSentNotice] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const applyPreset = (preset) => {
    setForm(prev => ({
      ...prev,
      subject: preset.subject,
      body: preset.template,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailBody = [
      `Merhaba Affan Emirhan,`,
      '',
      form.body.trim(),
      '',
      '----------------------------------------',
      `Gönderen: ${form.name.trim()}`,
      `E-posta: ${form.email.trim()}`,
      'Gönderim: AffanOS Portföy İletişim Formu',
    ].join('\n');

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject.trim())}&body=${encodeURIComponent(mailBody)}`;
    setSentNotice(true);
    window.location.href = mailtoUrl;
  };

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: '#070712', overflowY: 'auto',
    }}>
      {/* Top Banner */}
      <div style={{
        padding: '16px 24px',
        background: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <div>
          <div style={{ color: '#00F5FF', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, marginBottom: '2px' }}>
            &gt; contact --direct-channels
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '17px', fontWeight: 800, margin: 0 }}>
            İletişim & İş Birliği Merkezi
          </h1>
        </div>

        {/* Direct Email Pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '6px 12px', borderRadius: '8px',
          background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.25)',
        }}>
          <Mail size={14} color="#00F5FF" />
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            style={{ color: '#00F5FF', fontSize: '12.5px', fontFamily: 'monospace', textDecoration: 'none', fontWeight: 600 }}
          >
            {CONTACT_EMAIL}
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label="E-posta adresini panoya kopyala"
            style={{
              padding: '3px 8px', borderRadius: '4px',
              background: copied ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.08)',
              border: copied ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.1)',
              color: copied ? '#34d399' : '#e2e8f0',
              fontSize: '11px', fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              transition: 'all 0.15s',
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Channels on Left, Composer on Right */}
      <div style={{
        flex: 1, padding: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {/* Left Column: Direct Channels & Fast Presets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Channel Cards */}
          <div style={{
            padding: '18px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ color: '#00F5FF', fontSize: '12px', fontFamily: 'monospace', fontWeight: 700, marginBottom: '14px' }}>
              // RESMİ KANALLAR
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="https://linkedin.com/in/affanccn"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', borderRadius: '8px',
                  background: 'rgba(255,0,200,0.06)', border: '1px solid rgba(255,0,200,0.25)',
                  color: '#f8fafc', textDecoration: 'none', transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>💼</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>LinkedIn</div>
                    <div style={{ color: '#ff52d9', fontSize: '11px', fontFamily: 'monospace' }}>linkedin.com/in/affanccn</div>
                  </div>
                </div>
                <ExternalLink size={14} color="#ff52d9" />
              </a>

              <a
                href="https://github.com/affanccn"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', borderRadius: '8px',
                  background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.25)',
                  color: '#f8fafc', textDecoration: 'none', transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>🐙</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>GitHub</div>
                    <div style={{ color: '#00F5FF', fontSize: '11px', fontFamily: 'monospace' }}>github.com/emrhnccn</div>
                  </div>
                </div>
                <ExternalLink size={14} color="#00F5FF" />
              </a>
            </div>
          </div>

          {/* Quick Presets */}
          <div style={{
            padding: '18px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ color: '#facc15', fontSize: '12px', fontFamily: 'monospace', fontWeight: 700, marginBottom: '12px' }}>
              // HIZLI ŞABLON SEÇİMİ
            </div>
            <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 12px', lineHeight: 1.5 }}>
              Aşağıdaki şablonlardan birine tıklayarak mesaj formunu hazır taslakla doldurabilirsiniz:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {QUICK_PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyPreset(p)}
                  style={{
                    padding: '10px 12px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#e2e8f0', fontSize: '12.5px', fontWeight: 600,
                    textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,245,255,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Email Composer */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '24px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', gap: '14px',
          }}
        >
          <div style={{ color: '#00F5FF', fontSize: '12px', fontFamily: 'monospace', fontWeight: 700 }}>
            // MESAJ FORMU
          </div>

          <div>
            <label htmlFor="contact-name" style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '6px' }}>
              Adınız & Soyadınız
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="Örn: Mehmet Yılmaz"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#ffffff', fontSize: '13px', outline: 'none',
              }}
            />
          </div>

          <div>
            <label htmlFor="contact-email" style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '6px' }}>
              E-posta Adresiniz (Yanıt için)
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="ornek@sirketiniz.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#ffffff', fontSize: '13px', outline: 'none',
              }}
            />
          </div>

          <div>
            <label htmlFor="contact-subject" style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '6px' }}>
              Konu
            </label>
            <input
              id="contact-subject"
              type="text"
              required
              placeholder="İş birliği, pozisyon veya proje teklifi"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#ffffff', fontSize: '13px', outline: 'none',
              }}
            />
          </div>

          <div style={{ flex: 1, minHeight: '130px', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="contact-body" style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '6px' }}>
              Mesajınız
            </label>
            <textarea
              id="contact-body"
              required
              rows={5}
              placeholder="Mesajınızı buraya yazın..."
              value={form.body}
              onChange={e => setForm({ ...form, body: e.target.value })}
              style={{
                width: '100%', flex: 1, padding: '10px 12px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#ffffff', fontSize: '13px', outline: 'none', resize: 'vertical',
                lineHeight: 1.6,
              }}
            />
          </div>

          {sentNotice && (
            <div style={{
              padding: '10px 12px', borderRadius: '8px',
              background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)',
              color: '#34d399', fontSize: '12px', lineHeight: 1.5,
            }}>
              ✓ E-posta uygulamanızda taslak oluşturuldu. Gönderimi tamamlayabilirsiniz.
            </div>
          )}

          <button
            type="submit"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '12px 20px', borderRadius: '8px',
              background: 'rgba(0,245,255,0.15)', border: '1px solid rgba(0,245,255,0.4)',
              color: '#00F5FF', fontSize: '13px', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <Send size={15} />
            <span>E-posta Taslağını Başlat (Send via Mail Client)</span>
          </button>
        </form>
      </div>
    </div>
  );
}
