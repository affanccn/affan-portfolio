/**
 * Global Site & SEO & Analytics Konfigürasyonu
 * affanccn.com - Affan Emirhan Çüçen
 */

export const siteConfig = {
  name: 'Affan Emirhan Çüçen',
  legalName: 'Affan Emirhan Çüçen',
  brandName: 'AffanOS · affanccn',
  title: 'Affan Emirhan Çüçen | Full-Stack, Unity ve AI Geliştirici',
  description:
    "Affan Emirhan Çüçen'in full-stack web geliştirme (React, Next.js, Node.js), mobil uygulama (Flutter), Unity 3D oyun programlama ve AI entegrasyonu projelerini keşfedin.",
  url: 'https://affanccn.com',
  canonicalUrl: 'https://affanccn.com/',
  locale: 'tr_TR',
  inLanguage: 'tr-TR',

  // Google Araçları Entegrasyonu
  gaMeasurementId:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GA_MEASUREMENT_ID) ||
    'G-LKY1EH1EMZ',
  googleSiteVerification:
    (typeof import.meta !== 'undefined' &&
      import.meta.env?.VITE_GOOGLE_SITE_VERIFICATION) ||
    'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN',

  // İletişim & Sosyal Kanallar
  contact: {
    email: 'emrhn.ccn@gmail.com',
    phone: '', // İsteğe bağlı tel linki için
    whatsapp: '', // İsteğe bağlı wa.me linki için
    city: 'Kocaeli / İstanbul',
    country: 'Türkiye',
    addressCountry: 'TR',
  },

  social: {
    github: 'https://github.com/affanccn',
    linkedin: 'https://www.linkedin.com/in/affanccn',
  },

  // Mesleki Nitelikler & Hizmet Kataloğu
  professional: {
    jobTitle: 'Bilgisayar Mühendisi & Full-Stack Yazılım Geliştirici',
    skills: [
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'Flutter',
      'Unity 3D',
      'C#',
      'PostgreSQL',
      'Redis',
      'MongoDB',
      'Socket.io',
      'Docker',
      'REST API',
      'Teknik SEO & Web Vitals',
    ],
    services: [
      {
        name: 'Full-Stack Web & SaaS Platform Geliştirme',
        description:
          'React, Next.js, Node.js ve modern veritabanlarıyla kurumsal düzeyde ölçeklenebilir web uygulamaları.',
      },
      {
        name: 'Cross-Platform Mobil Uygulama Geliştirme',
        description:
          'Flutter ve Dart ile iOS ve Android için tek kod tabanından yüksek performanslı mobil çözümler.',
      },
      {
        name: 'Unity 3D Oyun Geliştirme & Optimizasyon',
        description:
          'C# ile 2D/3D oyun mekanikleri, fizik sistemleri ve mobil/desktop platform performans optimizasyonları.',
      },
      {
        name: 'Gerçek Zamanlı Sistemler & API Mimarisi',
        description:
          'Socket.io, Redis ve Event-Driven mimariler ile düşük gecikmeli, yüksek eşzamanlılıklı arka uç sistemleri.',
      },
    ],
  },
};

export default siteConfig;
