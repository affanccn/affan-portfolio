/**
 * SEO & Meta & Structured Data Yardımcı Modülü
 * affanccn.com - Dinamik Canonical, Meta ve JSON-LD Yönetimi
 */

import { siteConfig } from '../config/site';

/**
 * Sayfa Canonical URL'ini günceller
 * @param {string} canonicalHref - Tam mutlak URL (Örn: 'https://affanccn.com/' veya 'https://affanccn.com/blog/slug')
 */
export function setCanonicalUrl(canonicalHref) {
  if (typeof document === 'undefined') return;

  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', canonicalHref || siteConfig.canonicalUrl);
}

/**
 * Sayfa Başlığı ve Meta Açıklamasını günceller
 */
export function setMetaTags({ title, description }) {
  if (typeof document === 'undefined') return;

  if (title) {
    document.title = title;
  }

  if (description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }
}

/**
 * Blog Yazısı için Dinamik BlogPosting / Article JSON-LD Şeması ve Meta Etiketlerini Uygular
 */
export function setBlogPostSEO(post) {
  if (typeof document === 'undefined' || !post) return;

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const fullTitle = `${post.title} | Affan Emirhan Çüçen`;
  const description = post.excerpt || post.description || siteConfig.description;

  setMetaTags({
    title: fullTitle,
    description: description,
  });

  setCanonicalUrl(postUrl);

  // Dinamik BlogPosting JSON-LD Şeması Ekle / Güncelle
  const schemaId = 'seo-schema-blogpost';
  let script = document.getElementById(schemaId);
  if (!script) {
    script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: description,
    datePublished: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    dateModified: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    inLanguage: siteConfig.inLanguage,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/icon.png`,
      },
    },
    image: `${siteConfig.url}/images/og-preview.png`,
    keywords: (post.tags || []).join(', '),
  };

  script.textContent = JSON.stringify(schemaData);
}

/**
 * Sayfa SEO'sunu Varsayılan Ana Sayfa Durumuna Döndürür
 */
export function resetDefaultSEO() {
  if (typeof document === 'undefined') return;

  setMetaTags({
    title: siteConfig.title,
    description: siteConfig.description,
  });

  setCanonicalUrl(siteConfig.canonicalUrl);

  const script = document.getElementById('seo-schema-blogpost');
  if (script) {
    script.remove();
  }
}
