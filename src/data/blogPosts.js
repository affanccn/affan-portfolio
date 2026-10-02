// ─── Blog Posts Data Source ──────────────────────────────────────────────────
// Bu dosya otomatik üretilmiştir → npm run blog
// Kaynak: content/blog/ klasöründeki dosyalar
// Son güncelleme: 02.10.2026 10:17:47

export const BLOG_CATEGORIES = [
  { id: 'all', label: 'Tümü', icon: '📋' },
  { id: 'web', label: 'Web Dev', icon: '🌐' },
  { id: 'ai', label: 'Yapay Zekâ', icon: '🤖' },
  { id: 'gamedev', label: 'Oyun Geliştirme', icon: '🎮' },
  { id: 'devops', label: 'DevOps', icon: '⚙️' },
  { id: 'career', label: 'Kariyer', icon: '💼' },
];

export const BLOG_POSTS = [
  {
    id: 1,
    slug: 'react-19-ile-server-actions-form-islemlerini-yeniden-dusunmek',
    title: 'React 19 ile Server Actions: Form İşlemlerini Yeniden Düşünmek',
    excerpt: 'React 19\'un getirdiği Server Actions ile form handling ve veri mutasyonlarını nasıl daha temiz yazabileceğinizi keşfedin.',
    category: 'web',
    tags: ['React 19', 'Server Actions', 'Next.js', 'Full-Stack'],
    date: '2026-10-01',
    readTime: '8 dk',
    featured: true,
    seo: {
      focusKeyword: '',
      secondaryKeywords: []
    },
    content: `## React 19 ile Server Actions

React 19, form işlemleri ve sunucu tarafı veri mutasyonları için devrim niteliğinde bir API sunuyor: **Server Actions**.

### Neden Server Actions?

Geleneksel React uygulamalarında form verisi işlemek şu adımları gerektirirdi:

1. \`useState\` ile form state yönetimi
2. \`onSubmit\` handler'da \`fetch\` veya \`axios\` çağrısı
3. Loading ve error state'lerinin manuel yönetimi
4. Optimistic update'ler için ekstra kod

Server Actions ile tüm bunlar **tek bir fonksiyon** ile çözülür:

\`\`\`jsx
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
\`\`\`

### useActionState ile Gelişmiş Kontrol

\`useActionState\` hook'u ile loading durumu, hata mesajları ve optimistic update'ler kolayca yönetilir:

\`\`\`jsx
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
\`\`\`

### Sonuç

Server Actions, full-stack React geliştirmeyi önemli ölçüde basitleştiriyor. Ayrı API route'ları yazmak, fetch wrapper'ları oluşturmak gibi boilerplate koddan kurtuluyorsunuz.

> **Dikkat:** Server Actions yalnızca React 19 ve üzeri sürümlerde desteklenmektedir.`,
  },
  {
    id: 2,
    slug: 'nextjs-app-router-server-actions-cache-optimizasyonu',
    title: 'Next.js App Router ile Server Actions ve Cache Stratejileri',
    excerpt: 'Next.js App Router üzerinde Server Actions kullanımı, revalidateTag/revalidatePath ile veri önbellekleme ve sayfa hızlandırma yöntemlerini inceleyin.',
    category: 'web',
    tags: ['Next.js', 'React', 'Full-Stack', 'Web Development', 'SEO', 'Performance'],
    date: '2026-09-30',
    readTime: '4 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'Next.js Server Actions',
      secondaryKeywords: ['Next.js caching', 'revalidateTag', 'App Router veri yönetimi', 'React Server Components']
    },
    content: `Modern web geliştirmede API katmanını ayrı bir route olarak yazmak yerine doğrudan sunucu eylemlerini (Server Actions) kullanmak, hem geliştirme sürecini hızlandırır hem de veri akışını sadeleştirir. Next.js App Router ile birlikte gelen bu yaklaşım, doğru önbellekleme stratejileriyle birleştiğinde Core Web Vitals ve SEO performansını doğrudan yukarı taşır.

## Server Actions Temel Yapısı ve Çalışma Prensibi
Server Actions, istemci bileşenlerinden doğrudan tetiklenebilen asenkron fonksiyonlardır. "use server" direktifi ile işaretlenen bu fonksiyonlar, arka planda güvenli POST istekleri oluşturur ve istemciye gereksiz JavaScript paketlerinin indirilmesini engeller.

## Cache Yönetimi: revalidateTag ve revalidatePath Karşılaştırması

\`\`\`typescript
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
\`\`\`

**revalidatePath**: Belirtilen URL yolundaki tüm önbelleği geçersiz kılar. Sayfa düzeyinde genel ve toplu güncellemeler için uygundur.

**revalidateTag**: Yalnızca belirli etiketle işaretlenmiş fetch isteklerini geçersiz kılar. Çok daha hassas (granular) bir veri kontrolü sağlayarak gereksiz sunucu maliyetini ve gecikmeyi önler.

## SEO ve Performans İçin Kritik İpuçları
- **Küçük Bundle Boyutu**: Ağır veritabanı kütüphaneleri ve gizli anahtarlar istemci tarafına sızmaz, sayfa açılış hızı (LCP) maksimum seviyede kalır.
- **İyimser Güncellemeler (Optimistic UI)**: \`useOptimistic\` kancası kullanarak ağ gecikmesi sırasında arayüzün anında güncellenmesini sağlayın.`,
  },
  {
    id: 3,
    slug: 'socketio-ile-olceklenebilir-chat-mimarisi',
    title: 'Socket.io ile Ölçeklenebilir Chat Mimarisi',
    excerpt: 'Binlerce eşzamanlı kullanıcıyı destekleyen, oda bazlı mesajlaşma sistemi nasıl tasarlanır? Redis adapter ve connection pooling stratejileri.',
    category: 'web',
    tags: ['Socket.io', 'WebSocket', 'Redis', 'Node.js', 'Real-time'],
    date: '2026-09-28',
    readTime: '12 dk',
    featured: true,
    seo: {
      focusKeyword: '',
      secondaryKeywords: []
    },
    content: `## Ölçeklenebilir Chat Mimarisi

WebSocket tabanlı gerçek zamanlı mesajlaşma sistemleri, doğru mimari kararlar alınmadığında hızla performans darboğazlarına yol açabilir.

### Tek Sunucu Limitleri

Tipik bir Node.js sunucusu ~10K eşzamanlı WebSocket bağlantısını destekler. Peki ya 100K+ kullanıcınız varsa?

### Redis Adapter ile Yatay Ölçekleme

\`\`\`javascript
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pubClient = createClient({ url: 'redis://redis-host:6379' });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);

io.adapter(createAdapter(pubClient, subClient));
\`\`\`

Redis adapter ile birden fazla Socket.io sunucu instance'ı aynı oda ve olay sistemini paylaşır.

### Oda (Room) Bazlı İzolasyon

\`\`\`javascript
socket.on('join-room', (roomId) => {
  socket.join(roomId);
  io.to(roomId).emit('user-joined', {
    userId: socket.userId,
    timestamp: Date.now()
  });
});

socket.on('message', ({ roomId, content }) => {
  io.to(roomId).emit('new-message', {
    from: socket.userId,
    content: sanitize(content),
    timestamp: Date.now()
  });
});
\`\`\`

### Sonuç

Ölçeklenebilir bir chat sistemi için üç temel strateji:
1. **Redis Adapter** ile çoklu sunucu senkronizasyonu
2. **Room-based isolation** ile ağ trafiği optimizasyonu
3. **Connection pooling** ile kaynak yönetimi`,
  },
  {
    id: 4,
    slug: 'unity-3d-performans-optimizasyon-rehberi',
    title: 'Unity 3D: Performans Optimizasyon Rehberi',
    excerpt: 'Unity projelerinde FPS düşüşlerini önlemek için Object Pooling, LOD, Occlusion Culling ve GC.Alloc azaltma teknikleri.',
    category: 'gamedev',
    tags: ['Unity 3D', 'C#', 'Performans', 'Object Pooling', 'GPU'],
    date: '2026-09-20',
    readTime: '10 dk',
    featured: false,
    seo: {
      focusKeyword: '',
      secondaryKeywords: []
    },
    content: `## Unity 3D Performans Optimizasyonu

Mobil ve PC oyunlarında 60 FPS hedefine ulaşmak için kritik optimizasyon teknikleri.

### 1. Object Pooling

\`Instantiate()\` ve \`Destroy()\` çağrıları Garbage Collector (GC) baskısı yaratır. Pool sistemi ile nesneler yeniden kullanılır:

\`\`\`csharp
public class ObjectPool : MonoBehaviour
{
    [SerializeField] private GameObject prefab;
    [SerializeField] private int poolSize = 20;
    
    private Queue<GameObject> pool = new Queue<GameObject>();

    void Awake()
    {
        for (int i = 0; i < poolSize; i++)
        {
            var obj = Instantiate(prefab);
            obj.SetActive(false);
            pool.Enqueue(obj);
        }
    }

    public GameObject Get()
    {
        if (pool.Count == 0) return Instantiate(prefab);
        var obj = pool.Dequeue();
        obj.SetActive(true);
        return obj;
    }

    public void Return(GameObject obj)
    {
        obj.SetActive(false);
        pool.Enqueue(obj);
    }
}
\`\`\`

### 2. LOD (Level of Detail)

Kameradan uzak nesneler için düşük poligonlu modeller kullanarak GPU yükünü azaltın.

### 3. GC.Alloc Azaltma

\`\`\`csharp
// Kötü: Her frame'de yeni string oluşturur
void Update()
{
    scoreText.text = "Score: " + score.ToString();
}

// İyi: StringBuilder ile allocation azaltma
private StringBuilder sb = new StringBuilder(32);
void Update()
{
    sb.Clear();
    sb.Append("Score: ").Append(score);
    scoreText.text = sb.ToString();
}
\`\`\`

### Sonuç

Bu tekniklerle Unity projelerinizde ciddi FPS artışı sağlayabilirsiniz. Profiler aracını düzenli kullanarak bottleneck'ları tespit edin.`,
  }
];

export function formatBlogDate(dateString) {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function getCategoryInfo(categoryId) {
  return BLOG_CATEGORIES.find(c => c.id === categoryId) || BLOG_CATEGORIES[0];
}
