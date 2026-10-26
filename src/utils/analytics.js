/**
 * Google Analytics 4 (GA4) & B2B Dönüşüm Takip Modülü
 * affanccn.com - Standard GTAG & Auto Lead Conversion Tracking
 */

import { siteConfig } from '../config/site';

/**
 * GA4 Event Gönderim Yardımcısı
 * @param {string} eventName - Örn: 'generate_lead', 'click_to_call', 'select_content'
 * @param {Record<string, any>} params - Özel parametreler
 */
export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        send_to: siteConfig.gaMeasurementId,
        ...params,
      });
    }

    if (import.meta.env?.DEV) {
      console.debug(`[GA4 Event] ${eventName}:`, params);
    }
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn('[GA4] Event dispatch failed:', err);
    }
  }
}

/**
 * Sayfa Görüntüleme (Page View) Takipçisi
 * SPA route geçişleri veya pencere açılışları için
 */
export function trackPageView(pagePath, pageTitle) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pagePath || window.location.pathname,
        page_title: pageTitle || document.title,
        page_location: window.location.href,
        send_to: siteConfig.gaMeasurementId,
      });
    }
  } catch {
    // Silent fail
  }
}

/**
 * Otomatik B2B Dönüşüm ve Etkileşim Takipçisi (Event Delegation)
 * 1) Telefon aramaları (`a[href^="tel:"]`) -> generate_lead & click_to_call
 * 2) WhatsApp tıklamaları (`a[href*="wa.me"]`) -> generate_lead & click_to_whatsapp
 * 3) Form gönderimleri (`form`) -> generate_lead & submit_contact_form
 * 4) CV İndirme & Portfolyo İnceleme -> select_content & view_portfolio
 */
export function initAutoTracking() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Çift dinleyici eklenmesini önle
  if (window.__GA4_TRACKING_INITIALIZED__) return;
  window.__GA4_TRACKING_INITIALIZED__ = true;

  // 1) Global Click Delegasyonu
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // ─── Telefon Tıklamaları ───
      const telLink = target.closest('a[href^="tel:"]');
      if (telLink) {
        const phone = telLink.getAttribute('href')?.replace('tel:', '').trim();
        trackEvent('generate_lead', {
          method: 'phone',
          phone_number: phone,
          channel: 'tel_link',
          element_text: telLink.textContent?.trim() || 'Call Button',
        });
        trackEvent('click_to_call', {
          phone_number: phone,
        });
        return;
      }

      // ─── WhatsApp Tıklamaları ───
      const waLink = target.closest('a[href*="wa.me"], a[href*="whatsapp.com"], a[href^="whatsapp:"]');
      if (waLink) {
        const href = waLink.getAttribute('href') || '';
        trackEvent('generate_lead', {
          method: 'whatsapp',
          target_url: href,
          channel: 'whatsapp_button',
          element_text: waLink.textContent?.trim() || 'WhatsApp Button',
        });
        trackEvent('click_to_whatsapp', {
          target_url: href,
        });
        return;
      }

      // ─── E-Posta (Mailto) Tıklamaları ───
      const mailtoLink = target.closest('a[href^="mailto:"]');
      if (mailtoLink) {
        const email = mailtoLink.getAttribute('href')?.replace('mailto:', '').split('?')[0].trim();
        trackEvent('generate_lead', {
          method: 'email_link',
          email_address: email,
          channel: 'mailto_button',
        });
        return;
      }

      // ─── CV / Dosya İndirme Tıklamaları ───
      const downloadLink = target.closest('a[download], a[href$=".pdf"]');
      if (downloadLink) {
        const fileName =
          downloadLink.getAttribute('download') ||
          downloadLink.getAttribute('href')?.split('/').pop() ||
          'resume.pdf';
        trackEvent('select_content', {
          content_type: 'cv_download',
          item_id: fileName,
        });
        trackEvent('view_portfolio', {
          action: 'download_cv',
          file_name: fileName,
        });
        return;
      }

      // ─── Harici Portfolyo & Demo Linkleri ───
      const portfolioLink = target.closest('[data-track="portfolio_demo"], a[data-project-link]');
      if (portfolioLink) {
        const projectTitle =
          portfolioLink.getAttribute('data-project-title') ||
          portfolioLink.textContent?.trim() ||
          'Portfolio Item';
        trackEvent('select_content', {
          content_type: 'portfolio_item',
          item_id: projectTitle,
        });
        trackEvent('view_portfolio', {
          action: 'view_live_demo',
          project_title: projectTitle,
          link_url: portfolioLink.getAttribute('href') || '',
        });
      }
    },
    { capture: true, passive: true }
  );

  // 2) Global Form Submit Delegasyonu (İletişim & Teklif Formları)
  document.addEventListener(
    'submit',
    (e) => {
      const form = e.target;
      if (!form || !(form instanceof HTMLFormElement)) return;

      const formId = form.id || form.getAttribute('name') || 'contact_form';
      trackEvent('generate_lead', {
        method: 'contact_form',
        form_id: formId,
        form_action: form.getAttribute('action') || 'mailto/direct',
      });
      trackEvent('submit_contact_form', {
        form_id: formId,
      });
    },
    { capture: true, passive: true }
  );

  if (import.meta.env?.DEV) {
    console.info('[GA4] Auto conversion tracking initialized successfully.');
  }
}
