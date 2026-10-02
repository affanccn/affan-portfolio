---
title: "React 19 ile Server Actions: Form İşlemlerini Yeniden Düşünmek"
excerpt: "React 19'un getirdiği Server Actions ile form handling ve veri mutasyonlarını nasıl daha temiz yazabileceğinizi keşfedin."
category: "web"
tags: ["React 19", "Server Actions", "Next.js", "Full-Stack"]
date: "2026-10-01"
readTime: "8 dk"
featured: true
---

## React 19 ile Server Actions

React 19, form işlemleri ve sunucu tarafı veri mutasyonları için devrim niteliğinde bir API sunuyor: **Server Actions**.

### Neden Server Actions?

Geleneksel React uygulamalarında form verisi işlemek şu adımları gerektirirdi:

1. `useState` ile form state yönetimi
2. `onSubmit` handler'da `fetch` veya `axios` çağrısı
3. Loading ve error state'lerinin manuel yönetimi
4. Optimistic update'ler için ekstra kod

Server Actions ile tüm bunlar **tek bir fonksiyon** ile çözülür:

```jsx
async function createPost(formData) {
  'use server';
  const title = formData.get('title');
  const content = formData.get('content');
  
  await db.posts.create({ title, content });
  revalidatePath('/blog');
}

export default function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Yayınla</button>
    </form>
  );
}
```

### useActionState ile Gelişmiş Kontrol

`useActionState` hook'u ile loading durumu, hata mesajları ve optimistic update'ler kolayca yönetilir:

```jsx
import { useActionState } from 'react';

function ContactForm() {
  const [state, action, isPending] = useActionState(
    submitContact,
    { message: '' }
  );

  return (
    <form action={action}>
      <input name="email" disabled={isPending} />
      <button disabled={isPending}>
        {isPending ? 'Gönderiliyor...' : 'Gönder'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}
```

### Sonuç

Server Actions, full-stack React geliştirmeyi önemli ölçüde basitleştiriyor. Ayrı API route'ları yazmak, fetch wrapper'ları oluşturmak gibi boilerplate koddan kurtuluyorsunuz.

> **Dikkat:** Server Actions yalnızca React 19 ve üzeri sürümlerde desteklenmektedir.
