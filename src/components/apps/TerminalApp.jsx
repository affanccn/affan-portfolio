import { useState, useEffect, useRef } from 'react';

const simulateAIResponse = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
  const q = query.toLowerCase();
  if (q.includes('merhaba') || q.includes('selam')) return "Merhaba! Ben Affan'ın asistanıyım. Portföyü gezmene yardımcı olabilirim.";
  if (q.includes('nasılsın') || q.includes('naber')) return "Harikayım! Affan'ın projelerini tanıtmaya hazırım. Sen nasılsın?";
  if (q.includes('kimsin') || q.includes('adın ne')) return "Ben kural tabanlı, API gerektirmeyen (bedava çalışan 😁) bir yapay zeka asistanıyım.";
  if (q.includes('iletişim') || q.includes('mail')) return "Affan ile 'emrhn.ccn@gmail.com' veya LinkedIn'den (/in/affanccn) iletişime geçebilirsin.";
  if (q.includes('proje') || q.includes('yaptın')) return "Gerçek zamanlı mesajlaşma, KYK yurt otomasyonu ve 3D Unity oyunları gibi projeler var. 'projeler' yaz!";
  if (q.includes('yetenek') || q.includes('biliyorsun')) return "React, Node.js, Unity(C#), MySQL, MongoDB ve LLM API'lerine hakimdir.";
  if (q.includes('teşekkür')) return "Rica ederim, her zaman buradayım!";
  if (q.includes('help') || q.includes('yardim') || q.includes('yardım')) return "Komutlar: kimimben, projeler, yetenekler, egitim, iletisim, temizle, ai [soru]";
  return "Bunu anladığımdan emin değilim. Affan'ın projeleri veya yetenekleri hakkında bir şey sorabilirsin.";
};

export default function TerminalApp() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'AffanOS Terminal v1.0.0 — Hoş geldiniz.' },
    { type: 'system', text: 'Yardım için "yardim" veya "help" yazın. AI için: "ai [soru]"' },
  ]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = async (e) => {
    if (e.key !== 'Enter' || !input.trim()) return;
    const cmdRaw = input.trim();
    const cmd = cmdRaw.toLowerCase();
    const newHistory = [...history, { type: 'user', text: `misafir@affanos:~$ ${cmdRaw}` }];

    if (cmd.startsWith('ai ')) {
      const query = cmdRaw.substring(3);
      setHistory([...newHistory, { type: 'system', text: '✨ AI düşünüyor...' }]);
      setInput('');
      const response = await simulateAIResponse(query);
      setHistory(prev => {
        const filtered = prev.filter(h => h.text !== '✨ AI düşünüyor...');
        return [...filtered, { type: 'output', text: `✨ AI: ${response}` }];
      });
      return;
    }

    switch (cmd) {
      case 'yardim': case 'help':
        newHistory.push({ type: 'output', text: 'Komutlar: kimimben, projeler, yetenekler, egitim, cv, iletisim, ls, whoami, uname -a, temizle, ai [soru]' });
        break;
      case 'kimimben':
        newHistory.push({ type: 'output', text: 'Affan Emirhan Çüçen — Bilgisayar Mühendisi, Full-Stack web ve Unity oyun geliştirici.' });
        break;
      case 'projeler':
        newHistory.push({ type: 'output', text: 'Öne Çıkanlar:\n1. Gerçek Zamanlı Mesajlaşma (Node.js + Socket.io + MongoDB)\n2. GustoPos (TypeScript + React POS Sistemi)\n3. 3D Co-op Bulmaca Oyunu (Unity 3D + C#)\n+ 7 seçili proje daha... (Detaylar için Projeler uygulamasını açın)' });
        break;
      case 'yetenekler':
        newHistory.push({ type: 'output', text: 'Frontend : React 19, TypeScript, JavaScript (ES6+), Tailwind CSS\nBackend  : Node.js, Express.js, Socket.io (WebSocket)\nVeritabanı: MySQL (RDBMS, 3NF), MongoDB\nOyun     : Unity 3D/2D, C#, Rigidbody Fizik, Blender\nDiğer    : LLM API, Web Scraping, Teknik SEO' });
        break;
      case 'cv':
        newHistory.push({ type: 'output', text: '📄 CV indirilebilir durumda: /Afvan_Emirhan_Cucen_CV.pdf\nDoğrudan görüntülemek için masaüstündeki CV.exe uygulamasını açabilirsiniz.' });
        break;
      case 'egitim':
        newHistory.push({ type: 'output', text: '🎓 Bartın Üniversitesi — Bilgisayar Mühendisliği (2022 - Devam)\n🎓 Fırat Üniversitesi — Bilgisayar Mühendisliği (2019 - 2022)' });
        break;
      case 'iletisim':
        newHistory.push({ type: 'output', text: 'E-posta  : emrhn.ccn@gmail.com\nLinkedIn : /in/affanccn\nGitHub   : /affanccn' });
        break;
      case 'temizle': case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'whoami':
        newHistory.push({ type: 'output', text: 'misafir' });
        break;
      case 'ls':
        newHistory.push({ type: 'output', text: 'Hakkımda.exe   Projeler/   CV.exe   İletişim.app   README.md' });
        break;
      case 'cat readme.md':
        newHistory.push({ type: 'output', text: '# Affan Emirhan Çüçen\nBilgisayar Mühendisi & Full-Stack Developer\nBartın Üniversitesi, Bilgisayar Mühendisliği\nBu portföy AffanOS v1.0 üzerinde çalışmaktadır.' });
        break;
      case 'uname -a':
        newHistory.push({ type: 'output', text: 'AffanOS 1.0 DeveloperOS-Kernel #1 SMP React19 x86_64 JavaScript/Node.js' });
        break;
      default:
        newHistory.push({ type: 'error', text: `Komut bulunamadı: '${cmd}'. "yardim" yazarak komut listesini görebilirsin.` });
    }

    setHistory(newHistory.slice(-80));
    setInput('');
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#050505' }}>
      {/* CRT scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.15) 50%)',
        backgroundSize: '100% 4px', opacity: 0.4,
      }} />

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        style={{
          flex: 1, overflowY: 'auto', padding: '16px',
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '13px', lineHeight: 1.8,
          cursor: 'text', position: 'relative', zIndex: 2,
        }}
      >
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: '2px', whiteSpace: 'pre-wrap' }}>
            {line.type === 'user' && <span style={{ color: '#00F5FF', fontWeight: 'bold', textShadow: '0 0 8px rgba(0,245,255,0.6)' }}>{line.text}</span>}
            {line.type === 'system' && <span style={{ color: '#FF00C8', textShadow: '0 0 8px rgba(255,0,200,0.5)' }}>{line.text}</span>}
            {line.type === 'output' && <span style={{ color: '#4ade80', textShadow: '0 0 5px rgba(74,222,128,0.4)' }}>{line.text}</span>}
            {line.type === 'error' && <span style={{ color: '#f87171' }}>{line.text}</span>}
          </div>
        ))}

        {/* Input line */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px', color: '#00F5FF', fontWeight: 'bold' }}>
          <span style={{ marginRight: '8px', animation: 'pulse 2s infinite', textShadow: '0 0 8px rgba(0,245,255,0.6)' }}>➜</span>
          <span>misafir@affanos:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoComplete="off"
            spellCheck="false"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#4ade80', fontFamily: 'inherit', fontSize: 'inherit',
              marginLeft: '8px', textShadow: '0 0 5px rgba(74,222,128,0.4)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
