// ─── Blog Posts Data Source ──────────────────────────────────────────────────
// Bu dosya otomatik üretilmiştir → npm run blog
// Kaynak: content/blog/ klasöründeki dosyalar
// Son güncelleme: 04.10.2026 15:14:29

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
    slug: 'react-19-useactionstate-useoptimistic-server-actions',
    title: 'React 19 ile useActionState, useOptimistic ve Server Actions Entegrasyonu',
    excerpt: 'React 19 sürümündeki useActionState ve useOptimistic hook\'ları ile form yönetimi, iyimser UI güncellemeleri ve Server Actions entegrasyonu rehberi.',
    category: 'web',
    tags: ['React', 'React 19', 'Next.js', 'Frontend', 'JavaScript', 'Web Development'],
    date: '2026-10-04',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'React 19 useActionState',
      secondaryKeywords: ['useOptimistic hook', 'React 19 form yönetimi', 'Server Actions React 19', 'Optimistic UI React']
    },
    content: `React 19 ile birlikte asenkron form işlemleri, sunucu eylemleri ve durum yönetimi köklü bir dönüşüm geçirdi. Önceden \`useState\`, \`useEffect\` ve manuel try-catch bloklarıyla yönetilen karmaşık form yüklenme (pending) ve hata durumları, artık yerel hook'lar olan \`useActionState\` ve \`useOptimistic\` ile çok daha sade ve deklaratif bir biçimde çözülüyor.

## 1\\. Geleneksel Form Yönetiminin Sorunları

Klasik React formlarında istek başladığında bir \`isPending\` state'i tutmak, sunucu yanıtı geciktiğinde arayüzü dondurmamak ve olası hatalarda kullanıcıya geri bildirim sunmak fazladan boilerplate kod gerektiriyordu. React 19'daki eylem (Action) paradigması, asenkron geçişleri (transitions) otomatik olarak sarar.

## 2\\. \`useActionState\` ile Zahmetsiz Form Durumu

\`useActionState\`, bir form eyleminin (Action) sonucunu, form verilerini ve o andaki yüklenme durumunu tek bir yerde toplar:

// components/AddCommentForm.tsx

"use client";

import { useActionState } from "react";

import { addCommentAction } from "@/app/actions/comments";

export function AddCommentForm({ postId }: { postId: string }) {

  const \\[state, formAction, isPending\\] \\= useActionState(

    addCommentAction,

    { success: false, error: null }

  );

  return (

    \\<form action={formAction} className="space-y-4"\\>

      \\<input type="hidden" name="postId" value={postId} /\\>

      \\<textarea

        name="comment"

        placeholder="Yorumunuzu yazın..."

        required

        disabled={isPending}

        className="w-full p-3 border rounded-lg"

      /\\>

      

      {state.error && (

        \\<p className="text-red-500 text-sm"\\>{state.error}\\</p\\>

      )}

      \\<button

        type="submit"

        disabled={isPending}

        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"

      \\>

        {isPending ? "Gönderiliyor..." : "Yorum Yap"}

      \\</button\\>

    \\</form\\>

  );

}

## 3\\. \`useOptimistic\` ile Sıfır Gecikmeli Arayüzler (Optimistic UI)

Kullanıcı bir beğeni butonuna bastığında veya yeni bir mesaj gönderdiğinde sunucu yanıtını beklemek arayüzü hantal hissettirir. \`useOptimistic\`, sunucudan yanıt gelmeden arayüzü anında günceller; hata durumunda ise eski duruma otomatik döner.

// components/LikeButton.tsx

"use client";

import { useOptimistic, startTransition } from "react";

import { toggleLikeAction } from "@/app/actions/likes";

interface LikeButtonProps {

  initialLikes: number;

  postId: string;

}

export function LikeButton({ initialLikes, postId }: LikeButtonProps) {

  const \\[optimisticLikes, setOptimisticLikes\\] \\= useOptimistic(

    initialLikes,

    (current, update: number) \\=\\> current \\+ update

  );

  const handleLike \\= async () \\=\\> {

    startTransition(async () \\=\\> {

      // Arayüzü anında 1 artır

      setOptimisticLikes(1);

      // Sunucuya isteği gönder

      await toggleLikeAction(postId);

    });

  };

  return (

    \\<button

      onClick={handleLike}

      className="flex items-center gap-2 px-3 py-1.5 border rounded-md"

    \\>

      \\<span\\>❤️\\</span\\>

      \\<span\\>{optimisticLikes}\\</span\\>

    \\</button\\>

  );

}

## 4\\. Mimari Kazanımlar ve SEO Etkisi

1. **İlerici Geliştirme (Progressive Enhancement):** JavaScript henüz yüklenmemişken bile yerel \`<form action={...}>\` yapısı çalışmaya devam eder.  
2. **Core Web Vitals (INP İyileştirmesi):** İyimser güncellemeler sayesinde Interaction to Next Paint (INP) gecikmesi neredeyse sıfıra iner ve arama motorlarının arayüz akıcılık kriterlerini karşılar.`,
  },
  {
    id: 2,
    slug: 'redis-dagitik-rate-limiting-sliding-window-token-bucket',
    title: 'Redis ile Dağıtık Hız Sınırlama (Rate Limiting): Sliding Window Log ve Token Bucket Mimarisi',
    excerpt: 'Node.js ve Redis kullanarak API uç noktalarını DDoS ve aşırı yükten koruyan Sliding Window ve Token Bucket dağıtık hız sınırlama algoritmaları.',
    category: 'web',
    tags: ['Redis', 'Node.js', 'System Architecture', 'Backend', 'Security', 'API Design'],
    date: '2026-10-04',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'Redis rate limiting',
      secondaryKeywords: ['Sliding Window Counter', 'Token Bucket algoritması', 'dağıtık hız sınırlama', 'API güvenliği', 'Node.js Redis']
    },
    content: `Mikroservis ve sunucusuz (serverless) mimarilerde API uç noktalarını kötü niyetli botlardan, kaba kuvvet (brute-force) saldırılarından ve ani trafik patlamalarından korumak için hız sınırlama (rate limiting) uygulanması şarttır. Tekil bir sunucu belleğinde (in-memory) tutulan sayaçlar çoklu pod veya sunucu senaryolarında çalışmaz; bu nedenle **Redis** gibi merkezi, ultra hızlı ve atomik operasyonları destekleyen bir veri yapısı kullanılır.

## 1\\. Hız Sınırlama Algoritmaları Karşılaştırması

* **Fixed Window (Sabit Pencere):** En basit yöntemdir (örneğin dakikada 100 istek). Ancak iki pencere sınırında (dakikanın 59\\. saniyesi ve sonraki dakikanın 1\\. saniyesi) 200 istek geçmesine izin vererek ani yük patlamalarına yol açabilir.  
* **Sliding Window Log (Kayan Pencere Günlüğü):** İsteklerin zaman damgalarını (timestamp) Redis Sorted Set (ZSET) içinde tutarak tam zaman aralığını kesin olarak hesaplar.  
* **Token Bucket (Jeton Kovası):** Düzenli aralıklarla sepete jeton doldurulur. İstekler jeton harcar. Ani patlamalara belirli bir limite kadar esneklik tanır.

## 2\\. Sliding Window Counter ile Redis & Node.js Uygulaması

Sliding Window Log yöntemi, Redis'in \`ZADD\`, \`ZREMRANGEBYSCORE\` ve \`ZCARD\` komutlarını atomik bir işlem (Pipeline veya Lua Script) içinde çalıştırarak yarış durumlarını engeller:

// middleware/rateLimiter.ts

import { Redis } from "ioredis";

const redis \\= new Redis(process.env.REDIS\\_URL || "redis://localhost:6379");

interface RateLimitConfig {

  windowInSeconds: number;

  maxRequests: number;

}

export async function isRateLimited(

  identifier: string, // Kullanıcı ID veya IP adresi

  config: RateLimitConfig

): Promise\\<{ allowed: boolean; remaining: number }\\> {

  const now \\= Date.now();

  const clearBefore \\= now \\- config.windowInSeconds \\* 1000;

  const key \\= \\\`ratelimit:\\\${identifier}\\\`;

  // Atomik Lua Script veya Pipeline

  const multi \\= redis.multi();

  // 1\\. Pencere dışındaki eski istekleri temizle

  multi.zremrangebyscore(key, 0, clearBefore);

  // 2\\. Yeni isteğin zaman damgasını ekle

  multi.zadd(key, now, \\\`\\\${now}-\\\${Math.random()}\\\`);

  // 3\\. Pencere içindeki toplam istek sayısını al

  multi.zcard(key);

  // 4\\. Anahtarın yaşam süresini (TTL) yenile

  multi.expire(key, config.windowInSeconds);

  const results \\= await multi.exec();

  const requestCount \\= results ? (results\\[2\\]\\[1\\] as number) : 0;

  if (requestCount \\> config.maxRequests) {

    return { allowed: false, remaining: 0 };

  }

  return {

    allowed: true,

    remaining: config.maxRequests \\- requestCount,

  };

}

## 3\\. Dağıtık Sistemlerde Dikkat Edilmesi Gerekenler

1. **HTTP Başlıkları (Headers):** Standart IETF başlıklarını (\`RateLimit-Limit\`, \`RateLimit-Remaining\`, \`RateLimit-Reset\` ve \`Retry-After\`) döndürerek API tüketicilerine net geri bildirim sağlayın.  
2. **Bellek Optimizasyonu:** ZSET yaklaşımı her istek için bellek tüketir. Milyonlarca istek alan devasa sistemlerde Redis Sorted Set yerine *Sliding Window Counter* (önceki pencere ve mevcut pencere ortalaması alan matematiksel yaklaşım) tercih edilmelidir.  
3. **Fail-Open vs. Fail-Closed:** Redis bağlantısı geçici olarak koptuğunda sistemin tüm istekleri engellemesi mi (fail-closed) yoksa API'yi açık tutması mı (fail-open) gerektiğine uygulamanın kritiklik derecesine göre karar verilmelidir.`,
  },
  {
    id: 3,
    slug: 'flutter-offline-first-drift-sqlite-supabase-senkronizasyon',
    title: 'Flutter\'da Offline-First Mimari: Drift (SQLite) ve Supabase ile İki Yönlü Veri Senkronizasyonu',
    excerpt: 'Flutter projelerinde Drift (SQLite) ve Supabase kullanarak internet bağlantısı olmadan çalışan ve otomatik senkronize olan Offline-First mimari rehberi.',
    category: 'web',
    tags: ['Flutter', 'Drift', 'SQLite', 'Supabase', 'Mobile Development', 'Dart'],
    date: '2026-10-04',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'Flutter Offline-First mimari',
      secondaryKeywords: ['Drift SQLite Flutter', 'Supabase Flutter senkronizasyon', 'çevrimdışı veri yönetimi', 'conflict resolution mobil']
    },
    content: `Mobil uygulamalarda kullanıcıların metroda, uçakta veya zayıf sinyalli bölgelerde işlem yapmaya devam edebilmesi kritik bir rekabet avantajıdır. **Offline-First (Önce Çevrimdışı)** mimarisinde yerel veritabanı (Single Source of Truth) kabul edilir; arayüz doğrudan yerel veriyi dinler ve ağ bağlantısı sağlandığında arka planda iki yönlü senkronizasyon yürütülür.

## 1\\. Mimari Katman Düzeni

* **Arayüz Katmanı:** Yalnızca yerel SQLite (Drift) tablosunu reaktif stream (\`watch()\`) olarak dinler. Ağ durumundan bağımsız anında yanıt verir.  
* **Yerel Veritabanı (Drift):** Tüm verileri yerel diske yazar ve her kayıtta bir \`sync_status\` (\`synced\`, \`pending_insert\`, \`pending_update\`, \`pending_delete\`) bayrağı tutar.  
* **Senkronizasyon Yöneticisi (Sync Engine):** İnternet bağlantısını (Connectivity) izler, bekleyen yerel değişiklikleri Supabase'e gönderir ve sunucudaki güncel değişiklikleri yerel veritabanına yazar.

## 2\\. Drift ile Tablo Tanımı ve Senkronizasyon Bayrakları

// database/tables.dart

import 'package:drift/drift.dart';

enum SyncStatus { synced, pendingInsert, pendingUpdate, pendingDelete }

class Tasks extends Table {

  TextColumn get id \\=\\> text()(); // UUID

  TextColumn get title \\=\\> text().withLength(min: 1, max: 100)();

  BoolColumn get isCompleted \\=\\> boolean().withDefault(const Constant(false))();

  DateTimeColumn get updatedAt \\=\\> dateTime()();

  IntColumn get syncStatus \\=\\> intEnum\\<SyncStatus\\>()();

  @override

  Set\\<Column\\> get primaryKey \\=\\> {id};

}

## 3\\. Senkronizasyon Motoru Mantığı

// services/sync\\_engine.dart

class SyncEngine {

  final AppDatabase db;

  final SupabaseClient supabase;

  SyncEngine(this.db, this.supabase);

  Future\\<void\\> syncPendingTasks() async {

    // 1\\. Yerelde sunucuya iletilmemiş kayıtları çek

    final pendingTasks \\= await db.getPendingTasks();

    for (final task in pendingTasks) {

      try {

        if (task.syncStatus \\== SyncStatus.pendingInsert) {

          await supabase.from('tasks').upsert({

            'id': task.id,

            'title': task.title,

            'is\\_completed': task.isCompleted,

            'updated\\_at': task.updatedAt.toIso8601String(),

          });

          

          // Yerel durumu 'synced' olarak güncelle

          await db.markAsSynced(task.id);

        }

      } catch (e) {

        // Hata durumunda bir sonraki bağlantı denemesine bırak

        print('Senkronizasyon hatası: \\\$e');

      }

    }

  }

}

## 4\\. Çatışma Çözümü (Conflict Resolution) Stratejileri

1. **Last-Write-Wins (Son Yazan Kazanır):** Hem yerelde hem sunucuda \`updated_at\` zaman damgası karşılaştırılır; en güncel zaman damgasına sahip kayıt geçerli sayılır.  
2. **Kuyruk Tabanlı Güncelleme:** Silinen kayıtlar yerelden hemen silinmek yerine "soft-delete" mantığıyla \`pending_delete\` işaretlenmeli, sunucu onayı geldikten sonra diskten temizlenmelidir.`,
  },
  {
    id: 4,
    slug: 'nodejs-socketio-redis-adapter-olcekleme',
    title: 'Node.js ve Socket.io ile Gerçek Zamanlı Sistemleri Ölçekleme',
    excerpt: 'Çoklu Node.js sunucuları arasında Socket.io ile gerçek zamanlı veri akışını Redis Adapter kullanarak yatayda ölçekleme rehberi ve bağlantı yönetimi.',
    category: 'web',
    tags: ['Node.js', 'Socket.io', 'Redis', 'WebSocket', 'Backend', 'System Architecture'],
    date: '2026-10-04',
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
    id: 5,
    slug: 'flutter-riverpod-clean-architecture-rehberi',
    title: 'Flutter\'da Riverpod ile Clean Architecture Kurulumu',
    excerpt: 'Flutter projelerinde Riverpod 2.x kullanarak Clean Architecture katmanlarını (Domain, Data, Presentation) organize etme ve test edilebilir mimari kurma.',
    category: 'web',
    tags: ['Flutter', 'Dart', 'Riverpod', 'Clean Architecture', 'Mobile Development'],
    date: '2026-10-04',
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
    id: 6,
    slug: 'postgresql-prisma-indeksleme-sorgu-optimizasyonu',
    title: 'PostgreSQL ve Prisma ile Veritabanı İndeksleme ve Sorgu Optimizasyonu',
    excerpt: 'PostgreSQL ve Prisma ORM ile çalışan projelerde B-Tree/GIN indeksleme, EXPLAIN ANALYZE analizi ve N+1 sorgu optimizasyonu teknikleri.',
    category: 'web',
    tags: ['PostgreSQL', 'Prisma', 'Database', 'Backend', 'Node.js', 'Performance', 'SQL'],
    date: '2026-10-04',
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
    id: 7,
    slug: 'react-native-flashlist-new-architecture-performans',
    title: 'React Native\'de FlashList ve New Architecture ile 60/120 FPS Performans',
    excerpt: 'React Native ve Expo projelerinde FlatList yerine FlashList kullanarak bellek tüketimini düşürme, Fabric mimarisi ve akıcı listeleme teknikleri.',
    category: 'web',
    tags: ['React Native', 'Expo', 'FlashList', 'Mobile Development', 'Performance', 'TypeScript'],
    date: '2026-10-04',
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
    id: 8,
    slug: 'typescript-zod-uctan-uca-tip-guvenligi',
    title: 'TypeScript 5.x ve Zod ile Uçtan Uca Tip Güvenliği ve Doğrulama',
    excerpt: 'TypeScript 5.x ve Zod kütüphanesini birleştirerek API doğrulamalarında çalışma zamanı ve derleme zamanı tip güvenliği sağlama rehberi.',
    category: 'web',
    tags: ['TypeScript', 'Zod', 'JavaScript', 'Node.js', 'Web Development', 'API Security'],
    date: '2026-10-04',
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
    id: 9,
    slug: 'nextjs-parallel-intercepting-routes-modal-mimarisi',
    title: 'Next.js App Router\'da Parallel & Intercepting Routes ile Modal ve Pano Mimarisi',
    excerpt: 'Next.js App Router\'da (@modal ve (.)photo gibi) parallel ve intercepting route\'lar kullanarak URL paylaşılabilir modal ve gelişmiş dashboard mimarisi kurulumu.',
    category: 'web',
    tags: ['Next.js', 'React', 'App Router', 'Web Development', 'Frontend', 'UI/UX'],
    date: '2026-10-03',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'Next.js parallel intercepting routes',
      secondaryKeywords: ['Next.js modal routing', 'App Router slot mimarisi', 'URL paylaşılabilir modal', 'Next.js dashboard yapısı']
    },
    content: `Geleneksel React uygulamalarında modallar genellikle \`isOpen\` state'i ile kontrol edilir. Ancak bu yaklaşım iki büyük soruna yol açar: Kullanıcı modal açıkken sayfayı yenilediğinde veya bağlantıyı paylaştığında modal kaybolur ve tarayıcının "Geri" tuşu beklendiği gibi çalışmaz. Next.js App Router ile gelen **Parallel Routes** (\`@slot\`) ve **Intercepting Routes** (\`(.)\`), modalları bağımsız birer rota haline getirerek mükemmel bir kullanıcı deneyimi ve SEO uyumluluğu sağlar.

## 1\\. Mimari Kavramlar: Parallel ve Intercepting Routes

* **Parallel Routes (\`@slot\`):** Aynı layout içinde aynı anda birden fazla bağımsız sayfayı eşzamanlı render etmenizi sağlar.  
* **Intercepting Routes (\`(.)\`, \`(..)\`, \`(...)\`):** Mevcut sayfa bağlamını korurken hedef rotanın içeriğini araya girerek (intercept ederek) yakalar. Örneğin, bir galeri sayfasındayken görsele tıklandığında modal olarak açılır, ancak doğrudan o linke gidildiğinde bağımsız tam sayfa olarak yüklenir.

## 2\\. Klasör Yapısı ve Dosya Düzeni

app/

├── @modal/

│   ├── (.)photos/

│   │   └── \\[id\\]/

│   │       └── page.tsx      \\# Modal görünümü

│   └── default.tsx           \\# Slot aktif değilken boş render

├── photos/

│   └── \\[id\\]/

│       └── page.tsx          \\# Doğrudan erişimde açılan tam sayfa

├── layout.tsx                \\# Slot'u kabul eden ana düzen

└── page.tsx                  \\# Ana akış / Galeri listesi

## 3\\. Uygulama Kodu

### \`app/layout.tsx\`

import React from "react";

export default function RootLayout({

  children,

  modal,

}: {

  children: React.ReactNode;

  modal: React.ReactNode;

}) {

  return (

    \\<html lang="tr"\\>

      \\<body\\>

        \\<main\\>{children}\\</main\\>

        {/\\* Modal slot'u burada bağımsız render edilir \\*/}

        {modal}

      \\</body\\>

    \\</html\\>

  );

}

### \`app/@modal/default.tsx\`

// Modal açık değilken slot'un boş dönmesi için zorunludur

export default function Default() {

  return null;

}

### \`app/@modal/(.)photos/[id]/page.tsx\`

"use client";

import { useRouter } from "next/navigation";

export default function PhotoModal({ params }: { params: { id: string } }) {

  const router \\= useRouter();

  return (

    \\<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"\\>

      \\<div className="bg-white rounded-xl p-6 max-w-lg w-full relative"\\>

        \\<button

          onClick={() \\=\\> router.back()}

          className="absolute top-4 right-4 text-gray-500 hover:text-black"

        \\>

          ✕

        \\</button\\>

        \\<h2 className="text-xl font-bold mb-4"\\>Fotoğraf Detayı \\#{params.id}\\</h2\\>

        \\<p className="text-gray-600"\\>

          Bu modal URL ile eşleşir. Sayfayı yenilediğinizde bağımsız rota devreye girer.

        \\</p\\>

      \\</div\\>

    \\</div\\>

  );

}

## 4\\. SEO ve UX Açısından Kritik Avantajlar

1. **Paylaşılabilir URL:** Kullanıcı modal içindeki içeriğin linkini kopyalayıp paylaştığında, alıcı doğrudan tam sayfa deneyimiyle karşılaşır.  
2. **Kusursuz Geri/İleri Navigasyonu:** Tarayıcının geri tuşu modalı kapatır, kullanıcı sayfadan istemeden ayrılmaz.  
3. **Arama Motoru İndekslemesi:** Tüm modal içerikleri aslında bağımsız birer URL (\`/photos/[id]\`) olduğu için Google botları tarafından kolayca taranabilir.`,
  },
  {
    id: 10,
    slug: 'supabase-rls-postgresql-fonksiyonlari-guvenlik',
    title: 'Supabase Row Level Security (RLS) ve PostgreSQL Fonksiyonları ile Güvenli API Mimarisi',
    excerpt: 'Supabase projelerinde Row Level Security (RLS) politikaları, auth.uid() kontrolü ve saklı yordamlar (RPC) ile backend güvenliğini sağlama rehberi.',
    category: 'web',
    tags: ['Supabase', 'PostgreSQL', 'Security', 'Backend', 'Database', 'SQL'],
    date: '2026-10-03',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'Supabase Row Level Security',
      secondaryKeywords: ['Supabase RLS politikaları', 'PostgreSQL security definer', 'auth.uid()', 'veritabanı güvenliği', 'BaaS mimarisi']
    },
    content: `Backend-as-a-Service (BaaS) mimarilerinde istemcilerin doğrudan veritabanı istemcisiyle (Supabase JS Client) sorgu atabilmesi büyük hız kazandırır. Ancak bu modelde geleneksel middleware kontrolleri bulunmadığı için veritabanı katmanında **Row Level Security (RLS)** politikalarının kusursuz tanımlanması bir zorunluluktur.

## 1\\. Row Level Security (RLS) Temelleri

RLS etkinleştirildiğinde, veritabanı tablosundaki tüm satırlar varsayılan olarak okuma ve yazmaya kapatılır. Yalnızca açıkça izin verilen SQL politikaları (Policies) üzerinden veri akışına izin verilir.

\\-- Tabloda RLS'i zorunlu kılın

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

\\-- Kullanıcıların yalnızca kendi profillerini görmesini sağlayın

CREATE POLICY "Kullanıcılar kendi profillerini okuyabilir"

ON profiles

FOR SELECT

USING (auth.uid() \\= id);

\\-- Kullanıcıların yalnızca kendi profillerini güncellemesine izin verin

CREATE POLICY "Kullanıcılar kendi profillerini güncelleyebilir"

ON profiles

FOR UPDATE

USING (auth.uid() \\= id)

WITH CHECK (auth.uid() \\= id);

## 2\\. Karmaşık İş Mantığı İçin Saklı Yordamlar (PostgreSQL Functions / RPC)

Basit CRUD işlemleri RLS politikalarıyla korunabilirken, bakiye transferi, sayaç artırma veya çoklu tablo güncellemeleri için saklı yordamlar yazılmalıdır.

\\-- Atomik kredi harcama fonksiyonu

CREATE OR REPLACE FUNCTION deduct\\_credits(amount INT)

RETURNS INT

LANGUAGE plpgsql

SECURITY DEFINER \\-- Fonksiyon oluşturanın yetkisiyle çalışır

SET search\\_path \\= public \\-- Güvenlik açığı önleme

AS \\\$\\\$

DECLARE

  current\\_balance INT;

BEGIN

  SELECT credits INTO current\\_balance

  FROM profiles

  WHERE id \\= auth.uid()

  FOR UPDATE; \\-- Eşzamanlı yarış durumlarını (Race Condition) önler

  IF current\\_balance \\< amount THEN

    RAISE EXCEPTION 'Yetersiz bakiye\\!';

  END IF;

  UPDATE profiles

  SET credits \\= credits \\- amount

  WHERE id \\= auth.uid();

  RETURN current\\_balance \\- amount;

END;

\\\$\\\$;

## 3\\. Güvenlik ve Performans İpuçları

* **\`SECURITY DEFINER\` Tuzakları:** Fonksiyon içinde mutlaka \`SET search_path = public\` ekleyin; aksi takdirde kötü niyetli kullanıcılar arama yolu manipülasyonu yapabilir.  
* **RLS Sorgularında İndeksleme:** \`USING (auth.uid() = user_id)\` gibi sık filtrelenen foreign key kolonlarına indeks atayın. İndeks bulunmazsa PostgreSQL her satır için Sequential Scan yapar ve sorgu performansı çöker.  
* **İstemci Tarafında Service Role Key Kullanmayın:** \`service_role\` anahtarı RLS kontrollerini tamamen atlar. Bu anahtar kesinlikle istemciye (tarayıcıya/mobile) sızdırılmamalı, yalnızca güvenli sunucu ortamlarında (Next.js Server Actions) tutulmalıdır.`,
  },
  {
    id: 11,
    slug: 'flutter-isolate-background-worker-performans',
    title: 'Flutter\'da Isolate ve Background Worker ile CPU-Yoğun İşlemleri Optimize Etme',
    excerpt: 'Flutter uygulamalarında UI thread\'ini dondurmadan büyük JSON verilerini işleme, görsel filtreleme ve CPU-yoğun görevleri Isolate.run() ile yönetme rehberi.',
    category: 'web',
    tags: ['Flutter', 'Dart', 'Performance', 'Mobile Development', 'Concurrency'],
    date: '2026-10-03',
    readTime: '4 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'Flutter Isolate performansı',
      secondaryKeywords: ['Flutter Isolate.run', 'Dart multithreading', 'Flutter jank önleme', 'arka plan veri işleme', '120 FPS mobil']
    },
    content: `Flutter'da Dart kodu varsayılan olarak tek bir ana iş parçacığında (UI Thread / Event Loop) çalışır. Ağ çağrısı gibi asenkron I/O işlemleri arayüzü kilitlemezken; megabaytlarca JSON ayrıştırma, karmaşık matematiksel hesaplamalar veya görsel işleme gibi CPU-yoğun görevler event loop'u bloke eder. Bu durum kullanıcının arayüzde doğrudan hissettiği takılmalara (frame drop / jank) neden olur. Çözüm, bu görevleri bağımsız bir **Isolate** üzerinde çalıştırmaktır.

## 1\\. Event Loop ve Isolate Kavramı

Dart'ta iş parçacıkları bellek paylaşmaz; her Isolate kendi izole edilmiş bellek alanına ve bağımsız event loop döngüsüne sahiptir. İki Isolate birbiriyle yalnızca mesajlaşma (Port) yoluyla haberleşir. Bu sayede yarış durumları (Race Condition) ve bellek kilitleri (Deadlock) engellenir.

## 2\\. Modern Çözüm: \`Isolate.run()\`

Dart 2.19 ve üzeri sürümlerde, karmaşık port dinleyicileri kurmadan tek seferlik ağır işlemleri çalıştırmak için \`Isolate.run()\` kullanılır:

import 'dart:convert';

import 'dart:isolate';

// Ağır JSON ayrıştırma fonksiyonu (Top-level veya static olmalı)

List\\<Product\\> parseLargeJson(String jsonString) {

  final List\\<dynamic\\> decoded \\= jsonDecode(jsonString);

  return decoded.map((item) \\=\\> Product.fromJson(item)).toList();

}

class ProductRepository {

  Future\\<List\\<Product\\>\\> fetchAndParseProducts() async {

    final response \\= await http.get(Uri.parse('https\\://api.example.com/large-catalog'));

    

    // UI thread'i dondurmadan arka planda ayrıştırma

    final products \\= await Isolate.run(() \\=\\> parseLargeJson(response.body));

    

    return products;

  }

}

## 3\\. Uzun Ömürlü Arka Plan İşleri İçin Worker Isolate

Sürekli veri akışı olan (örneğin Bluetooth veri paketleri veya ses dalgası analizi) durumlarda her seferinde yeni isolate başlatmak ek yük getirir. Bunun yerine \`ReceivePort\` ve \`SendPort\` ile sürekli açık bir Worker Isolate yapılandırılmalıdır.

// İki yönlü haberleşme için port mimarisi

void backgroundWorker(SendPort mainSendPort) {

  final workerReceivePort \\= ReceivePort();

  mainSendPort.send(workerReceivePort.sendPort);

  workerReceivePort.listen((message) {

    if (message is List\\<int\\>) {

      // Veriyi analiz et ve ana hatta geri ilet

      final result \\= processBytes(message);

      mainSendPort.send(result);

    }

  });

}

## 4\\. Mobil Performans ve Batarya Yönetimi İpuçları

* **Hafif Görevlerde Isolate Kullanmayın:** Isolate başlatmanın ve veriyi bellekler arası kopyalamanın belirli bir maliyeti vardır. Birkaç milisaniye süren basit işlemler için Isolate açmak performansı artırmak yerine düşürür.  
* **Görsel ve Dosya Sıkıştırma:** Kamera çıktısı fotoğrafları sunucuya göndermeden önce Isolate içinde boyutlandırmak arayüzün 120 FPS akıcılığını korur.`,
  },
  {
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
