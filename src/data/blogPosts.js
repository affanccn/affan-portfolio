// ─── Blog Posts Data Source ──────────────────────────────────────────────────
// Bu dosya otomatik üretilmiştir → npm run blog
// Kaynak: content/blog/ klasöründeki dosyalar
// Son güncelleme: 26.10.2026 11:48:39

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
    date: '2026-10-26',
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
    date: '2026-10-26',
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
    date: '2026-10-26',
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
    date: '2026-10-26',
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
    date: '2026-10-26',
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
    slug: 'nextjs-route-handlers-webhook-guvenligi-idempotency',
    title: 'Next.js App Router\'da Route Handlers ile Webhook Güvenliği ve İdempotency Mimarisi',
    excerpt: 'Stripe veya harici ödeme servislerinden gelen webhook isteklerini Next.js App Router\'da imza doğrulaması ve Idempotency Key ile güvenli işleme rehberi.',
    category: 'web',
    tags: ['Next.js', 'API Design', 'Security', 'Webhooks', 'Backend', 'TypeScript'],
    date: '2026-10-08',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'Next.js webhook güvenliği',
      secondaryKeywords: ['Idempotency Key mimarisi', 'Stripe webhook doğrulama', 'Next.js Route Handlers', 'çift işlem önleme', 'API güvenlik mimarisi']
    },
    content: `Modern SaaS ve e-ticaret uygulamalarında ödeme bildirimleri, SMS sağlayıcıları veya e-posta gönderim durumları genellikle **Webhook** (Ters API) mekanizmaları üzerinden sisteme iletilir. Ancak webhook'lar standart API çağrılarından farklıdır: Sağlayıcılar ağ gecikmesi veya geçici sunucu hatalarında aynı olayı arka arkaya defalarca tekrar gönderebilir (retry). Eğer webhook uç noktanız **İdempotent (Tekrarlanamaz)** değilse, kullanıcıya iki kez bakiye yükleyebilir, mükerrer sipariş oluşturabilir veya çift fatura kesebilirsiniz.

## 1\\. Webhook Güvenliğinin İki Temel Ayağı

1. **İmza Doğrulaması (Signature Verification):** İsteğin gerçekten ilgili servis sağlayıcısından (örn. Stripe, LemonSqueezy) geldiğini ve yolda tahrif edilmediğini HMAC-SHA256 imzasıyla teyit etmek.  
2. **İdempotency (Tekrarlanamazlık):** Aynı olay kimliğine (\`event_id\`) sahip bir bildirim sisteme 5 kez gelse bile iş mantığının yalnızca 1 kez yürütülmesini garanti etmek.

## 2\\. Ham İstek Gövdesi (Raw Body) ve İmza Kontrolü

Next.js App Router'da \`req.json()\` çağrıldığında gövde parse edilir ve imza doğrulaması başarısız olur. İmza doğrulaması için gövdenin \`req.text()\` ile ham string olarak alınması şarttır:

// app/api/webhooks/stripe/route.ts

import { NextResponse } from "next/server";

import Stripe from "stripe";

import { prisma } from "@/lib/prisma";

import { redis } from "@/lib/redis";

const stripe \\= new Stripe(process.env.STRIPE\\_SECRET\\_KEY\\!, {

  apiVersion: "2024-06-20",

});

export async function POST(req: Request) {

  const body \\= await req.text(); // Ham string gövde zorunludur

  const signature \\= req.headers.get("stripe-signature");

  if (\\!signature) {

    return NextResponse.json({ error: "Eksik imza başlığı" }, { status: 400 });

  }

  let event: Stripe.Event;

  try {

    // 1\\. Kriptografik imza doğrulaması

    event \\= stripe.webhooks.constructEvent(

      body,

      signature,

      process.env.STRIPE\\_WEBHOOK\\_SECRET\\!

    );

  } catch (err: any) {

    console.error(\\\`Webhook imza hatası: \\\${err.message}\\\`);

    return NextResponse.json({ error: "Geçersiz imza" }, { status: 400 });

  }

  // 2\\. İdempotency Kilidi (Redis ile Yarış Durumu Önleme)

  const lockKey \\= \\\`webhook:lock:\\\${event.id}\\\`;

  // 120 saniyelik atomik kilit

  const acquired \\= await redis.set(lockKey, "processing", "EX", 120, "NX");

  if (\\!acquired) {

    // Zaten işleniyor veya tamamlandı, Stripe'a 200 dönerek tekrarı kes

    return NextResponse.json({ received: true, status: "duplicate\\_ignored" });

  }

  // 3\\. Veritabanı Seviyesinde Mükerrer Kontrolü

  const existingEvent \\= await prisma.processedWebhook.findUnique({

    where: { eventId: event.id },

  });

  if (existingEvent) {

    return NextResponse.json({ received: true, status: "already\\_processed" });

  }

  // 4\\. İş Mantığını Yürütme ve Kayıt

  try {

    if (event.type \\=== "checkout.session.completed") {

      const session \\= event.data.object as Stripe.Checkout.Session;

      await fulfillOrder(session);

    }

    await prisma.processedWebhook.create({

      data: {

        eventId: event.id,

        eventType: event.type,

      },

    });

    return NextResponse.json({ received: true });

  } catch (error) {

    // Kilit düşsün ki Stripe tekrar denediğinde işlenebilsin

    await redis.del(lockKey);

    return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });

  }

}

## 3\\. Üretim Mimarisi İçin Kritik Prensipler

1. **Hızlı Yanıt (Fast Acknowledgment):** Ağır işlemler içeren olaylarda HTTP isteğini 5 saniyeden uzun bekletmeyin; olayı doğrulayıp bir iş kuyruğuna (BullMQ) atarak sağlayıcıya hemen \`200 OK\` dönün.  
2. **Kusursuz Hata Yönetimi:** Kendi sunucu hatanızda (500) sağlayıcı yeniden deneme (retry) politikasını işletir; ancak kodunuzda mantık hatası varsa 200 dönüp olayı DLQ (Dead Letter Queue) tablosuna loglayın.`,
  },
  {
    id: 7,
    slug: 'postgresql-partitioning-tablo-bolumleme-olcekleme',
    title: 'PostgreSQL\'de Partitioning (Tablo Bölümleme) ile Milyarlarca Satırı Ölçekleme',
    excerpt: 'Büyük veri setlerinde PostgreSQL Declarative Partitioning kullanarak sorgu sürelerini düşürme, disk I/O optimizasyonu ve Partition Pruning rehberi.',
    category: 'web',
    tags: ['PostgreSQL', 'Database', 'SQL', 'Performance', 'Backend', 'System Architecture'],
    date: '2026-10-08',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'PostgreSQL tablo bölümleme',
      secondaryKeywords: ['PostgreSQL Partitioning', 'Partition Pruning optimizasyonu', 'büyük veri PostgreSQL', 'Range Partitioning SQL', 'veritabanı ölçekleme']
    },
    content: `Bir PostgreSQL tablosundaki satır sayısı yüz milyonlara veya milyarlara ulaştığında tek başına B-Tree indeksleri performansı korumak için yetersiz kalır. İndeks boyutları sunucunun fiziksel RAM kapasitesini aştığında her sorgu yoğun disk I/O işlemlerine neden olur; \`VACUUM\` ve bakım işlemleri saatler sürer. PostgreSQL'in yerel **Declarative Partitioning (Bildirimsel Tablo Bölümleme)** özelliği, devasa bir mantıksal tabloyu arka planda daha küçük fiziksel parçalara (parçacıklara) bölerek sorgu sürelerini saniyelerden milisaniyelere indirir.

## 1\\. Bölümleme Türleri ve Çalışma Mantığı

* **Range Partitioning (Aralık Tabanlı):** En yaygın modeldir; zaman serisi verileri (loglar, siparişler, finansal hareketler) için aya veya yıla göre bölünür.  
* **List Partitioning (Liste Tabanlı):** Belirli kategorilere veya coğrafi bölgelere göre (örn. \`country_code IN ('TR', 'DE', 'US')\`) bölünür.  
* **Hash Partitioning:** Veriyi belirli bir anahtarın hash değerine göre eşit parçalara dağıtır.

## 2\\. Partition Pruning (Bölüm Budama) Neden Süper Hızlıdır?

PostgreSQL sorgu planlayıcısı (Query Planner), \`WHERE created_at >= '2026-10-01'\` gibi bir filtre gördüğünde **Partition Pruning** mekanizmasını devreye sokar. Yıllara yayılan milyarlarca satırlık tablonun tamamını taramak yerine, yalnızca ilgili aya ait birkaç yüz bin satırlık fiziksel tabloyu okur; diğer tüm bölümleri tamamen yok sayar.

## 3\\. SQL ile Range Partitioning Uygulaması

\\-- 1\\. Ana mantıksal tabloyu (Partitioned Table) oluşturun

CREATE TABLE audit\\_logs (

  id UUID NOT NULL DEFAULT gen\\_random\\_uuid(),

  user\\_id UUID NOT NULL,

  action VARCHAR(50) NOT NULL,

  details JSONB,

  created\\_at TIMESTAMP WITH TIME ZONE NOT NULL

) PARTITION BY RANGE (created\\_at);

\\-- 2\\. Aylık alt bölümleri (Fiziksel Tablolar) oluşturun

CREATE TABLE audit\\_logs\\_2026\\_09 PARTITION OF audit\\_logs

  FOR VALUES FROM ('2026-09-01 00:00:00+00') TO ('2026-10-01 00:00:00+00');

CREATE TABLE audit\\_logs\\_2026\\_10 PARTITION OF audit\\_logs

  FOR VALUES FROM ('2026-10-01 00:00:00+00') TO ('2026-11-01 00:00:00+00');

CREATE TABLE audit\\_logs\\_2026\\_11 PARTITION OF audit\\_logs

  FOR VALUES FROM ('2026-11-01 00:00:00+00') TO ('2026-12-01 00:00:00+00');

\\-- 3\\. Ana tablo üzerine indeks ekleyin (Her alt tabloda otomatik oluşturulur)

CREATE INDEX idx\\_audit\\_logs\\_user\\_date ON audit\\_logs (user\\_id, created\\_at DESC);

## 4\\. Sorgu Analizi ve EXPLAIN İncelemesi

EXPLAIN ANALYZE

SELECT \\* FROM audit\\_logs

WHERE created\\_at \\>= '2026-10-05' AND created\\_at \\< '2026-10-08';

Çıktıda yalnızca \`audit_logs_2026_10\` tablosunun tarandığını (Seq Scan/Index Scan), diğer 2026\\_09 ve 2026\\_11 tablolarının sorgu planından tamamen elendiğini (Never Executed) görürsünüz.

## 5\\. Yaşam Döngüsü (Data Retention) Avantajı

Eski verileri silerken milyarlarca satır için ağır \`DELETE\` sorguları çalıştırmak yerine, ilgili eski bölümü anında bellekten ve diskten düşürebilirsiniz:

\\-- Saniyeler içinde sıfır I/O maliyetiyle terabaytlarca veriyi silme

DROP TABLE audit\\_logs\\_2024\\_01;`,
  },
  {
    id: 8,
    slug: 'flutter-bloc-freezed-tip-guvenli-state-management',
    title: 'Flutter\'da BLoC ve Freezed ile Tip Güvenli State Management ve Event Handling',
    excerpt: 'Flutter projelerinde BLoC pattern ve Freezed kod üretimi kullanarak immutability, pattern matching (map/when) ve hatasız durum yönetimi rehberi.',
    category: 'web',
    tags: ['Flutter', 'Dart', 'BLoC', 'Freezed', 'Mobile Development', 'Clean Architecture'],
    date: '2026-10-08',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'Flutter BLoC Freezed',
      secondaryKeywords: ['Flutter state management', 'Freezed union classes', 'pattern matching Dart', 'reaktif mobil mimari', 'Flutter test edilebilir kod']
    },
    content: `Flutter ekosisteminde ölçeklenebilir ve test edilebilir mimari kurarken **BLoC (Business Logic Component)** deseni en sağlam yaklaşımlardan biridir. Ancak saf BLoC kullanırken olaylar (Events) ve durumlar (States) için elle \`copyWith\`, \`==\`, \`hashCode\` ve \`toString\` metodları yazmak ciddi bir kod kalabalığına (boilerplate) neden olur. **Freezed** kod üreticisi (code generator), BLoC ile birleştiğinde **Union Types (Cebirsel Veri Tipleri)** ve **Pattern Matching** desteğiyle tamamen tip güvenli, değişmez (immutable) ve hatasız bir reaktif durum yönetimi sunar.

## 1\\. Neden Freezed \\+ BLoC?

* **Değişmezlik (Immutability):** Durumların kaza eseri doğrudan değiştirilmesini engeller; her güncelleme yeni bir kopya oluşturur.  
* **Tüm Durumların Kapsanması (Exhaustive Pattern Matching):** \`state.when(...)\` veya \`map(...)\` sayesinde geliştirici \`loading\`, \`success\`, \`error\` durumlarından herhangi birini arayüzde işlemeyi unutamaz; derleyici zorunlu kılar.  
* **Sıfır Boilerplate:** Onlarca satırlık sınıf tanımları 4-5 satırlık şablonlara iner.

## 2\\. Event ve State Tanımları

// features/auth/bloc/auth\\_state.dart

import 'package:freezed\\_annotation/freezed\\_annotation.dart';

part 'auth\\_state.freezed.dart';

@freezed

class AuthState with \\_\\\$AuthState {

  const factory AuthState.initial() \\= \\_Initial;

  const factory AuthState.loading() \\= \\_Loading;

  const factory AuthState.authenticated({required String token, required String userId}) \\= \\_Authenticated;

  const factory AuthState.failure({required String errorMessage}) \\= \\_Failure;

}

// features/auth/bloc/auth\\_event.dart

import 'package:freezed\\_annotation/freezed\\_annotation.dart';

part 'auth\\_event.freezed.dart';

@freezed

class AuthEvent with \\_\\\$AuthEvent {

  const factory AuthEvent.loginRequested({

    required String email,

    required String password,

  }) \\= \\_LoginRequested;

  const factory AuthEvent.logoutRequested() \\= \\_LogoutRequested;

}

## 3\\. BLoC Sınıfı Mantığı

// features/auth/bloc/auth\\_bloc.dart

import 'package:flutter\\_bloc/flutter\\_bloc.dart';

import 'auth\\_event.dart';

import 'auth\\_state.dart';

class AuthBloc extends Bloc\\<AuthEvent, AuthState\\> {

  final AuthRepository \\_authRepository;

  AuthBloc(this.\\_authRepository) : super(const AuthState.initial()) {

    on\\<AuthEvent\\>((event, emit) async {

      await event.map(

        loginRequested: (e) async {

          emit(const AuthState.loading());

          try {

            final user \\= await \\_authRepository.login(e.email, e.password);

            emit(AuthState.authenticated(token: user.token, userId: user.id));

          } catch (err) {

            emit(AuthState.failure(errorMessage: err.toString()));

          }

        },

        logoutRequested: (\\_) async {

          emit(const AuthState.loading());

          await \\_authRepository.logout();

          emit(const AuthState.initial());

        },

      );

    });

  }

}

## 4\\. UI Katmanında Reaktif Tüketim

// features/auth/views/login\\_view.dart

BlocConsumer\\<AuthBloc, AuthState\\>(

  listener: (context, state) {

    state.mapOrNull(

      failure: (s) \\=\\> ScaffoldMessenger.of(context).showSnackBar(

        SnackBar(content: Text(s.errorMessage)),

      ),

      authenticated: (s) \\=\\> Navigator.pushReplacementNamed(context, '/home'),

    );

  },

  builder: (context, state) {

    return state.maybeWhen(

      loading: () \\=\\> const Center(child: CircularProgressIndicator()),

      orElse: () \\=\\> const LoginFormWidget(),

    );

  },

);

## 5\\. Mimari Değerlendirme

* **Birim Test Kolaylığı:** Durumlar değişmez olduğu için \`blocTest\` kütüphanesiyle olay akışları ve durum geçişleri deterministik olarak doğrulanabilir.  
* **Ekip İçi Standartlaşma:** Tüm modüller aynı Union State yapısını kullandığında kodun okunabilirliği ve devir hızı maksimum düzeye çıkar.`,
  },
  {
    id: 9,
    slug: 'nodejs-postgresql-outbox-pattern-guvenilir-olay-iletimi',
    title: 'Node.js ve PostgreSQL ile Outbox Pattern: Dağıtık Sistemlerde Güvenilir Olay İletimi',
    excerpt: 'Mikroservislerde veritabanı yazma ve mesaj kuyruğu (Kafka/RabbitMQ) arasındaki Dual-Write problemini Transactional Outbox Pattern ile çözme rehberi.',
    category: 'web',
    tags: ['Node.js', 'PostgreSQL', 'System Architecture', 'Microservices', 'Backend', 'Database'],
    date: '2026-10-07',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'Transactional Outbox Pattern',
      secondaryKeywords: ['Dual-Write problemi', 'dağıtık veri tutarlılığı', 'PostgreSQL Debezium CDC', 'Node.js RabbitMQ olay iletimi']
    },
    content: `Mikroservis ve dağıtık sistem mimarilerinde en sık karşılaşılan tuzaklardan biri **Dual-Write (Çift Yazma)** problemidir. Bir servis kullanıcının siparişini veritabanına kaydeder ve ardından RabbitMQ veya Kafka'ya bir \`OrderCreated\` olayı fırlatmaya çalışır. Ancak tam veritabanına yazıldıktan sonra ağ koparsa veya mesaj kuyruğu yanıt vermezse ne olur? Veritabanında sipariş oluşmuş ama fatura, kargo veya e-posta servislerine haber verilmemiş olur. **Transactional Outbox Pattern**, bu senaryoda veri kaybını ve tutarsızlığı sıfıra indirir.

## 1\\. Dual-Write Problemi ve Outbox Çözümü

Çözüm, harici mesaj kuyruğuna doğrudan yazmak yerine, giden olayları veritabanı içinde özel bir \`outbox\` tablosuna **aynı yerel ACID veritabanı işlemi (transaction) içinde** kaydetmektir:

1. \`orders\` tablosuna sipariş eklenir.  
2. \`outbox\` tablosuna olay mesajı eklenir.  
3. Transaction başarıyla tamamlanır (Commit). Eğer bir hata olursa ikisi birden geri alınır (Rollback).

## 2\\. Veritabanı Şeması ve Prisma Uygulaması

\\-- Outbox tablosu

CREATE TABLE outbox\\_events (

  id UUID PRIMARY KEY DEFAULT gen\\_random\\_uuid(),

  aggregate\\_type VARCHAR(50) NOT NULL,

  aggregate\\_id VARCHAR(50) NOT NULL,

  event\\_type VARCHAR(50) NOT NULL,

  payload JSONB NOT NULL,

  status VARCHAR(20) DEFAULT 'PENDING',

  created\\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

);

CREATE INDEX idx\\_outbox\\_status\\_created ON outbox\\_events(status, created\\_at);

// services/orderService.ts

import { prisma } from "@/lib/prisma";

export async function createOrder(userId: string, totalAmount: number) {

  return await prisma.\\\$transaction(async (tx) \\=\\> {

    // 1\\. Ana varlığı kaydet

    const order \\= await tx.order.create({

      data: {

        userId,

        totalAmount,

        status: "CONFIRMED",

      },

    });

    // 2\\. Olayı outbox tablosuna yaz (Aynı transaction içinde\\!)

    await tx.outboxEvent.create({

      data: {

        aggregateType: "Order",

        aggregateId: order.id,

        eventType: "ORDER\\_CREATED",

        payload: {

          orderId: order.id,

          userId: order.userId,

          amount: order.totalAmount,

        },

        status: "PENDING",

      },

    });

    return order;

  });

}

## 3\\. Olayları Mesaj Kuyruğuna İletme (Outbox Relay)

Bağımsız bir arka plan servisi \`outbox_events\` tablosunu dinleyerek bekleyen olayları mesaj kuyruğuna aktarır ve durumunu günceller:

// workers/outboxRelay.ts

import { prisma } from "@/lib/prisma";

import { publishToRabbitMQ } from "@/lib/rabbitmq";

export async function processOutboxQueue() {

  // Yarış durumlarını önlemek için FOR UPDATE SKIP LOCKED

  const pendingEvents \\= await prisma.\\\$queryRaw\\<any\\[\\]\\>\\\`

    SELECT \\* FROM outbox\\_events

    WHERE status \\= 'PENDING'

    ORDER BY created\\_at ASC

    LIMIT 50

    FOR UPDATE SKIP LOCKED;

  \\\`;

  for (const event of pendingEvents) {

    try {

      await publishToRabbitMQ(event.event\\_type, event.payload);

      

      await prisma.outboxEvent.update({

        where: { id: event.id },

        data: { status: "PUBLISHED" },

      });

    } catch (err) {

      console.error(\\\`İletim hatası: \\\${event.id}\\\`, err);

    }

  }

}

## 4\\. İleri Düzey: Polling vs. Change Data Capture (CDC / Debezium)

* **Polling Publisher:** Küçük ve orta ölçekli projeler için idealdir; periyodik SQL sorgularıyla çalışır.  
* **CDC (Debezium):** Yüksek ölçekli sistemlerde veritabanını sorgulamak yerine doğrudan PostgreSQL Write-Ahead Log (WAL) kütüğünü dinleyerek sıfır sorgu maliyetiyle Kafka'ya olay aktarır.`,
  },
  {
    id: 10,
    slug: 'react-native-nitro-modules-jsi-native-modul-gelistirme',
    title: 'React Native\'de Nitro Modules ve JSI ile Yüksek Performanslı Native Modül Geliştirme',
    excerpt: 'Eski asenkron köprü (Bridge) yerine C++ JSI ve Nitro Modules kullanarak React Native uygulamalarında sıfır gecikmeli yerel modül yazma rehberi.',
    category: 'web',
    tags: ['React Native', 'JSI', 'C++', 'Mobile Development', 'Performance', 'TypeScript'],
    date: '2026-10-07',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'React Native Nitro Modules',
      secondaryKeywords: ['React Native JSI', 'C++ native modül', 'TurboModules alternatifi', 'React Native New Architecture performans']
    },
    content: `React Native'in klasik mimarisinde JavaScript iş parçacığı (thread) ile yerel platform (iOS/Android) arasındaki tüm veri akışı asenkron bir JSON köprüsü (Bridge) üzerinden yürütülüyordu. Kamera kareleri işleme, ses filtreleme, kriptografik hesaplamalar veya 120 FPS fizik motoru simülasyonlarında bu JSON serileştirme maliyeti ciddi performans darboğazları oluşturuyordu. Marc Rousavy tarafından geliştirilen **Nitro Modules**, **JSI (JavaScript Interface)** teknolojisini modern bir kod üretici (code generator) ile birleştirerek Swift, Kotlin ve C++ ile **doğrudan bellek paylaşımı** sağlayan hibrit nesneler (Hybrid Objects) sunar.

## 1\\. Köprüden JSI ve Nitro Modules'a Geçiş

* **Eski Köprü (Old Bridge):** Veri JSON string'e dönüştürülür \\-\\> Köprüden geçer \\-\\> Karşı tarafta parse edilir. (Yüksek bellek ve CPU maliyeti)  
* **TurboModules (Resmi Çözüm):** JSI kullanır ancak karmaşık C++ template yapılandırmaları ve Codegen boilerplate kodları gerektirir.  
* **Nitro Modules:** Yalnızca bir TypeScript arayüzü tanımlarsınız; Nitro sizin yerinize C++ JSI bağlayıcılarını, Swift ve Kotlin köprülerini otomatik üretir. Çalışma zamanında sıfır gecikmeli (senkron ve asenkron) doğrudan çağrı yapılır.

## 2\\. Adım Adım Nitro Modül Tanımlama

### 1\\. TypeScript Tanımı (\`src/MathUtils.nitro.ts\`)

import { type HybridObject } from "react-native-nitro-modules";

export interface MathUtils extends HybridObject {

  // Senkron C++ fonksiyonu (Doğrudan RAM üzerinden çağrılır)

  calculateFibonacci(n: number): number;

  // Asenkron ağır işlem

  hashData(data: string): Promise\\<string\\>;

}

### 2\\. C++ İmplementasyonu (\`cpp/HybridMathUtils.cpp\`)

Nitro arayüzü derlediğinde otomatik oluşturulan temel C++ sınıfını genişleterek yerel mantığı yazın:

\\#include "HybridMathUtils.hpp"

namespace margelo::nitro::mathutils {

double HybridMathUtils::calculateFibonacci(double n) {

  if (n \\<= 1\\) return n;

  double a \\= 0, b \\= 1;

  for (int i \\= 2; i \\<= n; \\++i) {

    double temp \\= a \\+ b;

    a \\= b;

    b \\= temp;

  }

  return b;

}

std::shared\\_ptr\\<Promise\\<std::string\\>\\> HybridMathUtils::hashData(const std::string& data) {

  // Arka plan thread'inde SHA-256 hesaplama simülasyonu

  return Promise\\<std::string\\>::async(\\[=\\]() {

    return "hashed\\_" \\+ data;

  });

}

} // namespace margelo::nitro::mathutils

## 3\\. React Native Tarafında Kullanım

// components/PerformanceBenchmark.tsx

import React, { useState } from "react";

import { View, Text, Button } from "react-native";

import { NitroModules } from "react-native-nitro-modules";

import type { MathUtils } from "./MathUtils.nitro";

const MathModule \\= NitroModules.createHybridObject\\<MathUtils\\>("MathUtils");

export function PerformanceBenchmark() {

  const \\[result, setResult\\] \\= useState\\<number | null\\>(null);

  const runCalculation \\= () \\=\\> {

    // Milisaniyenin altında senkron C++ çağrısı

    const fib \\= MathModule.calculateFibonacci(45);

    setResult(fib);

  };

  return (

    \\<View className="p-6 items-center"\\>

      \\<Text className="text-xl font-bold mb-4"\\>Nitro Modules JSI Testi\\</Text\\>

      \\<Button title="C++ Fibonacci Hesapla" onPress={runCalculation} /\\>

      {result \\!== null && (

        \\<Text className="mt-4 text-green-600 font-mono"\\>Sonuç: {result}\\</Text\\>

      )}

    \\</View\\>

  );

}

## 4\\. Gerçek Dünya Kullanım Alanları

1. **Sensör ve Bluetooth Veri Akışı:** Saniyede 100+ veri paketi üreten sensörleri arayüze taşırken köprü tıkanıklığı yaşanmaz.  
2. **Yerel Kripto & Güvenlik:** İstemci tarafında JWT imzalama veya uçtan uca şifreleme işlemlerini donanım seviyesinde optimize eder.`,
  },
  {
    id: 11,
    slug: 'nextjs-nodejs-bullmq-redis-is-kuyrugu',
    title: 'Next.js ve Node.js için Event-Driven Mimari: BullMQ ve Redis ile Arka Plan İş Kuyruğu',
    excerpt: 'Next.js ve Node.js uygulamalarında uzun süren görevleri BullMQ ve Redis ile asenkron kuyruğa alma, yeniden deneme (retry) ve hata yönetimi mimarisi.',
    category: 'web',
    tags: ['Next.js', 'Node.js', 'BullMQ', 'Redis', 'Backend', 'System Architecture'],
    date: '2026-10-05',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'BullMQ Redis iş kuyruğu',
      secondaryKeywords: ['Node.js asenkron kuyruk', 'Next.js background jobs', 'BullMQ retry mekanizması', 'Redis queue mimarisi']
    },
    content: `Modern web uygulamalarında e-posta gönderimi, PDF fatura oluşturma, yapay zeka API çağrıları veya büyük veri dışa aktarma gibi işlemler birkaç saniyeden dakikalara kadar sürebilir. Bu işlemleri doğrudan HTTP isteği (request-response lifecycle) içinde yürütmek sunucuyu kilitler, zaman aşımına (timeout) yol açar ve kullanıcı deneyimini zedeler. Çözüm, **BullMQ** ve **Redis** kullanarak olay güdümlü (Event-Driven) bir iş kuyruğu mimarisi kurmaktır.

## 1\\. Mimari Tasarım: Producer ve Worker Ayrımı

İş kuyruğu modeli iki ana bileşenden oluşur:

* **Producer (Üretici):** Next.js API rotası veya Server Action üzerinden işi (job) kuyruğa ekler ve kullanıcıya hemen \`202 Accepted\` ("İşleme alındı") yanıtı döner.  
* **Worker (İşçi):** Arka planda bağımsız bir süreç (process) olarak çalışır; Redis'teki kuyruğu dinleyerek sırayla işleri tüketir ve sonuçlandırır.

## 2\\. BullMQ ile Kuyruk ve İş Ekleme

// lib/queue.ts

import { Queue } from "bullmq";

import { Redis } from "ioredis";

const connection \\= new Redis(process.env.REDIS\\_URL || "redis://localhost:6379", {

  maxRetriesPerRequest: null,

});

export const reportQueue \\= new Queue("report-generation", { connection });

// app/api/export/route.ts (Next.js Producer)

import { NextResponse } from "next/server";

import { reportQueue } from "@/lib/queue";

export async function POST(req: Request) {

  const { userId, reportType } \\= await req.json();

  // İşi kuyruğa ekle ve anında yanıt dön

  const job \\= await reportQueue.add(

    "generate-pdf",

    { userId, reportType },

    {

      attempts: 3, // Hata durumunda 3 kez yeniden dene

      backoff: {

        type: "exponential",

        delay: 5000, // 5sn, 10sn, 20sn aralıklarla

      },

      removeOnComplete: true, // Bellek tasarrufu

    }

  );

  return NextResponse.json({ success: true, jobId: job.id }, { status: 202 });

}

## 3\\. Bağımsız Worker Süreci

// workers/reportWorker.ts

import { Worker } from "bullmq";

import { Redis } from "ioredis";

const connection \\= new Redis(process.env.REDIS\\_URL || "redis://localhost:6379", {

  maxRetriesPerRequest: null,

});

const worker \\= new Worker(

  "report-generation",

  async (job) \\=\\> {

    console.log(\\\`İş başladı: \\\${job.id} \\- \\\${job.data.reportType}\\\`);

    

    // Ağır işlem simülasyonu (Örn: PDF derleme ve S3'e yükleme)

    await generateComplexReport(job.data.userId, job.data.reportType);

    

    console.log(\\\`İş tamamlandı: \\\${job.id}\\\`);

  },

  { connection, concurrency: 5 } // Aynı anda 5 işi paralel yürütür

);

worker.on("failed", (job, err) \\=\\> {

  console.error(\\\`İş başarısız oldu: \\\${job?.id}. Hata: \\\${err.message}\\\`);

});

## 4\\. Üretim Ortamı ve Ölçekleme İpuçları

1. **Concurrency Ayarı:** Worker sunucusunun CPU çekirdek sayısına ve harici API sınırlarına göre eşzamanlılık (concurrency) değerini optimize edin.  
2. **Dead Letter Queue (DLQ):** Tüm yeniden denemelere rağmen tamamlanamayan işleri izole bir "failed" kuyruğuna aktararak inceleyin.  
3. **Graceful Shutdown:** Dağıtım (deployment) sırasında çalışan işlerin yarım kalmaması için \`await worker.close()\` ile süreci güvenle sonlandırın.`,
  },
  {
    id: 12,
    slug: 'react-native-expo-mmkv-hizli-yerel-depolama',
    title: 'React Native ve Expo\'da MMKV ile Ultra Hızlı Yerel Veri Depolama',
    excerpt: 'React Native projelerinde yavaş AsyncStorage yerine C++ tabanlı react-native-mmkv kullanarak anlık (senkron) ve şifrelenmiş veri depolama rehberi.',
    category: 'web',
    tags: ['React Native', 'Expo', 'MMKV', 'Mobile Development', 'Performance', 'TypeScript'],
    date: '2026-10-05',
    readTime: '4 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'React Native MMKV',
      secondaryKeywords: ['AsyncStorage vs MMKV', 'Expo yerel depolama', 'senkron depolama React Native', 'şifrelenmiş mobil veri']
    },
    content: `React Native uygulamalarında kullanıcı oturumları, tema tercihleri ve önbellek verileri geleneksel olarak \`@react-native-async-storage/async-storage\` ile saklanır. Ancak AsyncStorage asenkron çalışır, JavaScript-Native köprüsü (bridge) üzerinden veri serileştirme (JSON stringify/parse) maliyeti taşır ve büyük veri bloklarında belirgin gecikmelere yol açar. Tencent tarafından geliştirilen ve Marc Rousavy tarafından React Native'e taşınan **react-native-mmkv**, memory-mapped files (mmap) teknolojisiyle AsyncStorage'dan yaklaşık **30 kat daha hızlı** senkron veri erişimi sunar.

## 1\\. AsyncStorage vs. MMKV Mimari Karşılaştırması

* **AsyncStorage:** Her okuma/yazma işlemi asenkron bir Promise döndürür. Uygulama ilk açıldığında tema veya auth token okurken splash ekranında gecikmelere veya arayüzde titremelere (flicker) neden olur.  
* **MMKV:** C++ JSI (JavaScript Interface) üzerinden doğrudan işletim sistemi belleğine (RAM/Disk senkronizasyonu) erişir. Okuma ve yazma işlemleri tamamen senkron (\`storage.getString('token')\`) gerçekleşir.

## 2\\. Kurulum ve TypeScript ile Tip Güvenli Kullanım

npx expo install react-native-mmkv

// lib/storage.ts

import { MMKV } from "react-native-mmkv";

export const storage \\= new MMKV({

  id: "user-storage",

  encryptionKey: "super-secure-encryption-key", // Otomatik AES-256 şifreleme

});

// Tip güvenli yardımcı fonksiyonlar

export const storageHelper \\= {

  setToken: (token: string) \\=\\> storage.set("auth\\_token", token),

  getToken: (): string | undefined \\=\\> storage.getString("auth\\_token"),

  setIsDarkMode: (val: boolean) \\=\\> storage.set("is\\_dark\\_mode", val),

  getIsDarkMode: (): boolean \\=\\> storage.getBoolean("is\\_dark\\_mode") ?? false,

  clearAll: () \\=\\> storage.clearAll(),

};

## 3\\. Reaktif UI Güncellemeleri İçin Hook Desteği

MMKV, değer değiştiğinde bileşenlerin otomatik olarak yeniden render edilmesini sağlayan yerel hook'lar barındırır:

// components/ThemeToggle.tsx

import React from "react";

import { View, Text, Switch } from "react-native";

import { useMMKVBoolean } from "react-native-mmkv";

import { storage } from "@/lib/storage";

export function ThemeToggle() {

  const \\[isDarkMode, setIsDarkMode\\] \\= useMMKVBoolean("is\\_dark\\_mode", storage);

  return (

    \\<View className="flex-row items-center justify-between p-4"\\>

      \\<Text className="text-base font-medium"\\>Karanlık Mod\\</Text\\>

      \\<Switch

        value={isDarkMode ?? false}

        onValueChange={(val) \\=\\> setIsDarkMode(val)}

      /\\>

    \\</View\\>

  );

}

## 4\\. Güvenlik ve Performans İpuçları

1. **Şifreleme (Encryption):** \`encryptionKey\` tanımlandığında MMKV tüm verileri AES-256 ile şifreler. Anahtar yönetimini \`expo-secure-store\` veya Keychain ile birleştirmek maksimum güvenlik sağlar.  
2. **Startup Time (Uygulama Açılış Hızı):** Açılışta okunan kritik yapılandırmaların senkron çekilebilmesi, React Native'in ilk render süresini (Time to Interactive) doğrudan optimize eder.`,
  },
  {
    id: 13,
    slug: 'postgresql-full-text-search-trigram-arama-motoru',
    title: 'PostgreSQL\'de Full-Text Search (FTS) ve Trigram (pg\_trgm) ile Akıllı Arama Motoru',
    excerpt: 'Harici Elasticsearch maliyetine girmeden PostgreSQL üzerinde tsvector, GIN indeksleri ve pg\_trgm eklentisiyle yazım hatalarına duyarlı arama motoru kurulumu.',
    category: 'web',
    tags: ['PostgreSQL', 'SQL', 'Database', 'Search', 'Backend', 'Performance'],
    date: '2026-10-05',
    readTime: '5 Dakika',
    featured: false,
    seo: {
      focusKeyword: 'PostgreSQL Full-Text Search',
      secondaryKeywords: ['pg\_trgm arama', 'PostgreSQL tsvector GIN', 'yazım hatalarına duyarlı arama', 'SQL arama optimizasyonu']
    },
    content: `Birçok yazılım projesinde arama gereksinimi doğduğunda akla ilk gelen çözüm harici bir Elasticsearch veya Meilisearch kümesi kurmaktır. Ancak yüz binlerce kayıtlık orta ölçekli veri setleri için ayrı bir arama sunucusu barındırmak mimari karmaşıklık, senkronizasyon problemleri ve ekstra sunucu maliyeti getirir. PostgreSQL'in yerleşik **Full-Text Search (FTS)** yetenekleri ve **pg\\_trgm** (Trigram) uzantısı, harici hiçbir araca ihtiyaç duymadan milisaniyeler seviyesinde akıllı, morfolojik ve yazım hatalarına toleranslı arama motoru kurmayı mümkün kılar.

## 1\\. LIKE '%kelime%' Neden Üretimde Çöker?

Geleneksel SQL sorgularında kullanılan ILIKE '%terim%' ifadeleri, indekslerin kullanılmasını engeller ve tablodaki her satırın diskten okunmasına (Sequential Scan) neden olur. Tablo büyüdükçe sorgu süresi katlanarak artar. FTS ise metni kelime köklerine (lexemes) ayrıştırır ve **GIN (Generalized Inverted Index)** ile ters indeks oluşturur.

## 2\\. tsvector ve GIN İndeksi ile Morfolojik Arama

\\-- 1\\. Arama yapılacak tabloya otomatik güncellenen tsvector kolonu ekleme

ALTER TABLE articles ADD COLUMN search\\_vector tsvector;

\\-- Başlık (A ağırlığı) ve içeriği (B ağırlığı) birleştirerek vektör oluşturma

CREATE OR REPLACE FUNCTION articles\\_search\\_trigger() RETURNS trigger AS \\\$\\\$

BEGIN

  new.search\\_vector :=

    setweight(to\\_tsvector('turkish', coalesce(new.title, '')), 'A') ||

    setweight(to\\_tsvector('turkish', coalesce(new.content, '')), 'B');

  return new;

END

\\\$\\\$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE

ON articles FOR EACH ROW EXECUTE FUNCTION articles\\_search\\_trigger();

\\-- 2\\. Ultra hızlı arama için GIN indeksi

CREATE INDEX idx\\_articles\\_search ON articles USING gin(search\\_vector);

## 3\\. pg\\_trgm ile Yazım Hatalarına Duyarlı (Fuzzy) Arama

Kullanıcı "Nextjs" yerine "Nxtjs" yazdığında veya Türkçe karakterleri eksik girdiğinde FTS doğrudan eşleşme bulamayabilir. Trigram uzantısı metinleri 3 karakterlik parçalara bölerek benzerlik skoruna (similarity) göre sıralama yapar:

\\-- Trigram eklentisini aktif et

CREATE EXTENSION IF NOT EXISTS pg\\_trgm;

\\-- Başlık kolonu üzerine Trigram GIN indeksi

CREATE INDEX idx\\_articles\\_title\\_trgm ON articles USING gin(title gin\\_trgm\\_ops);

\\-- Hem anahtar kelime eşleşmesi hem de benzerlik skoruyla arama

SELECT id, title,

       ts\\_rank(search\\_vector, websearch\\_to\\_tsquery('turkish', 'yazılım')) AS rank,

       similarity(title, 'yazılım') AS sim

FROM articles

WHERE search\\_vector @@ websearch\\_to\\_tsquery('turkish', 'yazılım')

   OR title % 'yazılım'

ORDER BY rank DESC, sim DESC

LIMIT 10;

## 4\\. Performans ve Mimari Avantajları

1. **Sıfır Senkronizasyon Riski:** Veri PostgreSQL'e kaydedildiği anda arama indeksi güncellenir; harici veri tabanlarında yaşanan "gecikmeli indeksleme" veya "kayıt kayıpları" yaşanmaz.  
2. **Düşük Kaynak Tüketimi:** Ayrı bir JVM veya arama kümesi çalıştırmak yerine mevcut veritabanı belleği ve CPU gücü verimli şekilde kullanılır.`,
  },
  {
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
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
    id: 21,
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
    id: 22,
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
    id: 23,
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
