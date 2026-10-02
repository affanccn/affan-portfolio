Modern web geliştirmede API katmanını ayrı bir route olarak yazmak yerine doğrudan sunucu eylemlerini (Server Actions) kullanmak, hem geliştirme sürecini hızlandırır hem de veri akışını sadeleştirir. Next.js App Router ile birlikte gelen bu yaklaşım, doğru önbellekleme stratejileriyle birleştiğinde Core Web Vitals ve SEO performansını doğrudan yukarı taşır.
---
title: "Next.js App Router ile Server Actions ve Cache Stratejileri"
slug: "nextjs-app-router-server-actions-cache-optimizasyonu"
description: "Next.js App Router üzerinde Server Actions kullanımı, revalidateTag/revalidatePath ile veri önbellekleme ve sayfa hızlandırma yöntemlerini inceleyin."
category: "Web Geliştirme / Full-Stack"
focusKeyword: "Next.js Server Actions"
secondaryKeywords:
  - "Next.js caching"
  - "revalidateTag"
  - "App Router veri yönetimi"
  - "React Server Components"
tags:
  - "Next.js"
  - "React"
  - "Full-Stack"
  - "Web Development"
  - "SEO"
  - "Performance"
readingTime: "4 Dakika"
date: "2026-09-30"
---

## Server Actions Temel Yapısı ve Çalışma Prensibi
Server Actions, istemci bileşenlerinden doğrudan tetiklenebilen asenkron fonksiyonlardır. "use server" direktifi ile işaretlenen bu fonksiyonlar, arka planda güvenli POST istekleri oluşturur ve istemciye gereksiz JavaScript paketlerinin indirilmesini engeller.

## Cache Yönetimi: revalidateTag ve revalidatePath Karşılaştırması

```typescript
// app/actions/update-profile.ts
"use server";

import { revalidateTag } from "next/cache";

export async function updateBio(userId: string, bio: string) {
  try {
    await db.user.update({
      where: { id: userId },
      data: { bio },
    });

    // İlgili etikete sahip önbellek verilerini anında yenile
    revalidateTag("user-profile");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Güncelleme işlemi başarısız oldu." };
  }
}
```

**revalidatePath**: Belirtilen URL yolundaki tüm önbelleği geçersiz kılar. Sayfa düzeyinde genel ve toplu güncellemeler için uygundur.

**revalidateTag**: Yalnızca belirli etiketle işaretlenmiş fetch isteklerini geçersiz kılar. Çok daha hassas (granular) bir veri kontrolü sağlayarak gereksiz sunucu maliyetini ve gecikmeyi önler.

## SEO ve Performans İçin Kritik İpuçları
- **Küçük Bundle Boyutu**: Ağır veritabanı kütüphaneleri ve gizli anahtarlar istemci tarafına sızmaz, sayfa açılış hızı (LCP) maksimum seviyede kalır.
- **İyimser Güncellemeler (Optimistic UI)**: `useOptimistic` kancası kullanarak ağ gecikmesi sırasında arayüzün anında güncellenmesini sağlayın.
