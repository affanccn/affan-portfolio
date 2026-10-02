// ─── Blog Posts Data Source ──────────────────────────────────────────────────
// Bu dosya otomatik üretilmiştir → npm run blog
// Kaynak: content/blog/ klasöründeki dosyalar
// Son güncelleme: 02.10.2026 10:24:03

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
    slug: 'nodejs-socketio-redis-adapter-olcekleme',
    title: 'Node.js ve Socket.io ile Gerçek Zamanlı Sistemleri Ölçekleme',
    excerpt: 'Çoklu Node.js sunucuları arasında Socket.io ile gerçek zamanlı veri akışını Redis Adapter kullanarak yatayda ölçekleme rehberi ve bağlantı yönetimi.',
    category: 'web',
    tags: ['Node.js', 'Socket.io', 'Redis', 'WebSocket', 'Backend', 'System Architecture'],
    date: '2026-10-02',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'Socket.io ölçekleme',
      secondaryKeywords: []
    },
    content: `## Meta Bilgileri


Gerçek zamanlı uygulamalarda (canlı sohbet, anlık sipariş takibi, pano güncellemeleri) tek bir Node.js örneği belirli bir eşzamanlı bağlantı sınırına kadar yeterlidir. Ancak trafik arttığında ve yatay ölçeklemeye (horizontal scaling) geçildiğinde, istemciler farklı sunuculara dağılır ve sunucular arası mesaj iletimi aksayabilir.

### Redis Adapter Neden Zorunludur?

İki farklı kullanıcı farklı Node.js sunucularına (Sunucu A ve Sunucu B) bağlandığında, Sunucu A üzerinde yayınlanan bir \`socket.emit\` olayı doğrudan Sunucu B üzerindeki istemciye ulaşamaz. Çözüm, tüm sunucuları merkezi bir mesaj kuyruğunda birleştiren \`@socket.io/redis-adapter\` mekanizmasıdır.

// server.js

import { createServer } from "http";

import { Server } from "socket.io";

import { createClient } from "redis";

import { createAdapter } from "@socket.io/redis-adapter";

const httpServer \\= createServer();

const io \\= new Server(httpServer, {

  cors: { origin: "\\*" },

  transports: \\["websocket", "polling"\\],

});

const pubClient \\= createClient({ url: process.env.REDIS\\_URL });

const subClient \\= pubClient.duplicate();

await Promise.all(\\[pubClient.connect(), subClient.connect()\\]);

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", (socket) \\=\\> {

  socket.on("join-room", (roomId) \\=\\> {

    socket.join(roomId);

  });

  socket.on("send-message", ({ roomId, message }) \\=\\> {

    // Redis aracılığıyla tüm kümedeki ilgili odaya dağıtılır

    io.to(roomId).emit("new-message", message);

  });

});

httpServer.listen(3000);

### Üretim Ortamı İçin Hayati Yapılandırmalar

1. **Sticky Sessions (Oturum Sabitleme):** WebSocket bağlantısı kurulamayıp HTTP Long-Polling devreye girdiğinde, yük dengeleyicide (NGINX/HAProxy) IP hash veya çerez tabanlı yönlendirme şarttır.  
2. **Bağlantı ve Kalp Atışı (Heartbeat):** Kararsız mobil ağlarda soketlerin sunucuda askıda kalmaması için \`pingInterval\` ve \`pingTimeout\` değerleri optimize edilmelidir.`,
  },
  {
    id: 2,
    slug: 'flutter-riverpod-clean-architecture-rehberi',
    title: 'Flutter\'da Riverpod ile Clean Architecture Kurulumu',
    excerpt: 'Flutter projelerinde Riverpod 2.x kullanarak Clean Architecture katmanlarını (Domain, Data, Presentation) organize etme ve test edilebilir mimari kurma.',
    category: 'web',
    tags: ['Flutter', 'Dart', 'Riverpod', 'Clean Architecture', 'Mobile Development'],
    date: '2026-10-02',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'Flutter Riverpod Clean Architecture',
      secondaryKeywords: []
    },
    content: `## Meta Bilgileri


Büyüyen mobil projelerde kullanıcı arayüzü, iş mantığı ve ağ katmanlarının iç içe geçmesi spagetti koda yol açar. Clean Architecture prensiplerini Riverpod 2.x kütüphanesinin sağladığı derleme zamanı güvenliğiyle birleştirmek, hem test edilebilirliği hem de ekip içi geliştirme hızını katlar.

### Mimari Katman Düzeni

* **Domain Katmanı:** Saf Dart nesneleri (Entities) ve Repository arayüzleri. Dış paketlerden tamamen bağımsızdır.  
* **Data Katmanı:** API servisleri, yerel veritabanı (SQLite/Hive) modelleri ve repository uygulamaları.  
* **Presentation Katmanı:** UI Widget'ları ve ekran durumlarını yöneten StateNotifier / AsyncNotifier sınıfları.

### Repository ve Provider Örneği

// domain/repositories/order\\_repository.dart

abstract class OrderRepository {

  Future\\<List\\<Order\\>\\> getActiveOrders();

}

// data/repositories/order\\_repository\\_impl.dart

class OrderRepositoryImpl implements OrderRepository {

  final ApiClient apiClient;

  OrderRepositoryImpl(this.apiClient);

  @override

  Future\\<List\\<Order\\>\\> getActiveOrders() async {

    final response \\= await apiClient.get('/orders/active');

    return (response.data as List).map((j) \\=\\> Order.fromJson(j)).toList();

  }

}

// presentation/controllers/order\\_controller.dart

import 'package:flutter\\_riverpod/flutter\\_riverpod.dart';

final orderRepositoryProvider \\= Provider\\<OrderRepository\\>((ref) {

  return OrderRepositoryImpl(ref.watch(apiClientProvider));

});

final activeOrdersProvider \\= FutureProvider.autoDispose\\<List\\<Order\\>\\>((ref) async {

  return ref.watch(orderRepositoryProvider).getActiveOrders();

});

### Clean Architecture ve Riverpod Avantajları

1. **Kolay Mocking & Test:** Arayüz doğrudan somut API çağrısına bağlı olmadığı için sahte verilerle hızlıca test edilebilir.  
2. **Otomatik Kaynak Temizliği:** \`autoDispose\` sayesinde kullanılmayan ekranların verileri bellekten anında düşürülür.`,
  },
  {
    id: 3,
    slug: 'postgresql-prisma-indeksleme-sorgu-optimizasyonu',
    title: 'PostgreSQL ve Prisma ile Veritabanı İndeksleme ve Sorgu Optimizasyonu',
    excerpt: 'PostgreSQL ve Prisma ORM ile çalışan projelerde B-Tree/GIN indeksleme, EXPLAIN ANALYZE analizi ve N+1 sorgu optimizasyonu teknikleri.',
    category: 'web',
    tags: ['PostgreSQL', 'Prisma', 'Database', 'Backend', 'Node.js', 'Performance', 'SQL'],
    date: '2026-10-02',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'PostgreSQL Prisma optimizasyon',
      secondaryKeywords: []
    },
    content: `## Meta Bilgileri


Uygulamaların kullanıcı sayısı arttıkça veritabanı yanıt süreleri doğrudan Core Web Vitals ve kullanıcı deneyimini etkiler. Prisma ORM geliştirici ergonomisi sunsa da soyutlama katmanının arkasında oluşturulan SQL sorgularının analiz edilmesi ve doğru indeksleme stratejilerinin kurulması kritik önem taşır.

### 1\\. Doğru İndeksleme Stratejileri: B-Tree ve GIN

PostgreSQL varsayılan olarak B-Tree indeksi kullanır. Eşitlik (\`=\`) ve aralık (\`<\`, \`>\`, \`BETWEEN\`) sorguları için B-Tree oldukça etkilidir. Ancak JSONB alanları veya tam metin aramaları (full-text search) için GIN (Generalized Inverted Index) tercih edilmelidir.

// prisma/schema.prisma

model User {

  id        String   @id @default(uuid())

  email     String   @unique

  role      String

  createdAt DateTime @default(now())

  metadata  Json?

  posts     Post\\[\\]

  // Filtreleme ve sıralama kombinasyonları için bileşik indeks

  @@index(\\[role, createdAt(sort: Desc)\\])

}

### 2\\. Prisma ile N+1 Sorgu Problemini Önleme

İlişkili verileri çekerken döngü içinde ek sorgular çalıştırmak N+1 problemine yol açar. Prisma bu sorunu \`include\` veya \`select\` kullanarak tekil JOIN ya da optimize edilmiş IN cümleleriyle çözer.

// Kötü Yaklaşım: Döngü içinde her yazarın yazılarını tek tek çekmek (N+1)

// İyi Yaklaşım: İlişkiyi tek seferde dahil etmek

const usersWithPosts \\= await prisma.user.findMany({

  where: { role: "ADMIN" },

  include: {

    posts: {

      select: { id: true, title: true, createdAt: true },

      take: 5,

    },

  },

});

### 3\\. Connection Pooling ve PgBouncer Yapılandırması

Serverless ortamlarda (Vercel, AWS Lambda) her fonksiyon çağrısı yeni bir veritabanı bağlantısı açabilir. Supabase Connection Pooler veya PgBouncer kullanarak işlem (transaction) modunda bağlantı havuzu oluşturmak, "too many clients" hatasını önler.`,
  },
  {
    id: 4,
    slug: 'react-native-flashlist-new-architecture-performans',
    title: 'React Native\'de FlashList ve New Architecture ile 60/120 FPS Performans',
    excerpt: 'React Native ve Expo projelerinde FlatList yerine FlashList kullanarak bellek tüketimini düşürme, Fabric mimarisi ve akıcı listeleme teknikleri.',
    category: 'web',
    tags: ['React Native', 'Expo', 'FlashList', 'Mobile Development', 'Performance', 'TypeScript'],
    date: '2026-10-02',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'React Native FlashList performansı',
      secondaryKeywords: []
    },
    content: `## Meta Bilgileri


React Native uygulamalarında binlerce satırlık listeler görüntülenirken standart \`FlatList\` bileşeni bellek tüketimini hızla artırabilir ve kaydırma sırasında beyaz ekran (blank space) gecikmelerine neden olabilir. Shopify tarafından geliştirilen FlashList, görünüm geri dönüşümü (view recycling) yaklaşımıyla bu sorunu ortadan kaldırır.

### 1\\. FlatList vs. FlashList: Mimari Fark Nedir?

FlatList kaydırma sırasında ekran dışına çıkan elemanları bellekten düşürür (unmount) ve yenilerini oluşturur. FlashList ise hücreleri yok etmek yerine aynı yerel görünümleri yeni verilerle yeniden kullanır (recycle). Bu sayede CPU ve bellek yükü belirgin oranda azalır.

// components/OptimizedFeed.tsx

import React from "react";

import { FlashList } from "@shopify/flashlist";

import { View, Text, StyleSheet } from "react-native";

interface FeedItem {

  id: string;

  title: string;

}

export const OptimizedFeed \\= ({ data }: { data: FeedItem\\[\\] }) \\=\\> {

  return (

    \\<FlashList

      data={data}

      renderItem={({ item }) \\=\\> (

        \\<View style={styles.card}\\>

          \\<Text style={styles.title}\\>{item.title}\\</Text\\>

        \\</View\\>

      )}

      // Optimum geri dönüşüm için tahmini hücre boyutu

      estimatedItemSize={84}

      keyExtractor={(item) \\=\\> item.id}

    /\\>

  );

};

### 2\\. React Native New Architecture (Fabric & TurboModules)

Yeni mimaride JavaScript köprüsü (bridge) kaldırılarak C++ tabanlı doğrudan JSI (JavaScript Interface) iletişimi devreye girmiştir. Fabric oluşturucusu (renderer), UI hesaplamalarını eşzamanlı yürüterek kaydırma esnasındaki takılmaları (jank) minimuma indirir.

### 3\\. Kritik Mobil Performans Kontrol Listesi

* **Hafif Hücreler:** \`renderItem\` içinde anonim fonksiyon veya inline stil objeleri tanımlamaktan kaçının.  
* **Görsel Önbellekleme:** Standart Image yerine \`expo-image\` veya \`FastImage\` kullanarak disk/bellek önbelleğini etkinleştirin.`,
  },
  {
    id: 5,
    slug: 'typescript-zod-uctan-uca-tip-guvenligi',
    title: 'TypeScript 5.x ve Zod ile Uçtan Uca Tip Güvenliği ve Doğrulama',
    excerpt: 'TypeScript 5.x ve Zod kütüphanesini birleştirerek API doğrulamalarında çalışma zamanı ve derleme zamanı tip güvenliği sağlama rehberi.',
    category: 'web',
    tags: ['TypeScript', 'Zod', 'JavaScript', 'Node.js', 'Web Development', 'API Security'],
    date: '2026-10-02',
    readTime: '4 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'TypeScript Zod tip güvenliği',
      secondaryKeywords: []
    },
    content: `## Meta Bilgileri


TypeScript derleme zamanında güçlü bir güvenlik sağlasa da harici bir API'den veya kullanıcı formundan gelen veriler çalışma zamanında (runtime) tip garantisi taşımaz. Zod, derleme zamanı tipleri ile çalışma zamanı doğrulamalarını tek bir kaynakta (Single Source of Truth) birleştirir.

### 1\\. Şema Tabanlı Tip Tanımlama ve Çıkarsama (Type Inference)

Ayrı ayrı interface ve doğrulama fonksiyonları yazmak yerine Zod şemasından otomatik tip türetebilirsiniz (\`z.infer\`). Bu sayede şemada yapılan bir değişiklik doğrudan TypeScript tipine yansır.

// schemas/auth.schema.ts

import { z } from "zod";

export const CreateUserSchema \\= z.object({

  username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),

  email: z.string().email("Geçerli bir e-posta adresi giriniz"),

  role: z.enum(\\["ADMIN", "DEVELOPER", "GUEST"\\]),

  age: z.number().int().positive().optional(),

});

// Zod şemasından TypeScript tipini otomatik türetin

export type CreateUserInput \\= z.infer\\<typeof CreateUserSchema\\>;

### 2\\. API Katmanında SafeParse ile Güvenli Hata Yönetimi

\`parse\` yerine \`safeParse\` kullanmak, doğrulama hatalarında uygulamanın istisna fırlatmasını önler ve yapılandırılmış hata nesneleri üretir.

// app/api/users/route.ts

import { NextResponse } from "next/server";

import { CreateUserSchema } from "@/schemas/auth.schema";

export async function POST(req: Request) {

  const body \\= await req.json();

  const validation \\= CreateUserSchema.safeParse(body);

  if (\\!validation.success) {

    return NextResponse.json(

      { error: "Validasyon hatası", details: validation.error.flatten() },

      { status: 400 }

    );

  }

  // validation.data artık doğrudan CreateUserInput tipindedir

  const newUser \\= await db.user.create({ data: validation.data });

  return NextResponse.json(newUser, { status: 201 });

}

### 3\\. Discriminated Unions (Ayırt Edilebilir Birlikler)

Farklı API yanıtlarını ortak bir \`status\` veya \`type\` alanı üzerinden ayırt ederek, TypeScript derleyicisinin ilgili blok içinde veriyi otomatik daraltmasını (type narrowing) sağlayabilirsiniz.`,
  },
  {
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
