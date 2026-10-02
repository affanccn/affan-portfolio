---
title: "Socket.io ile Ölçeklenebilir Chat Mimarisi"
excerpt: "Binlerce eşzamanlı kullanıcıyı destekleyen, oda bazlı mesajlaşma sistemi nasıl tasarlanır? Redis adapter ve connection pooling stratejileri."
category: "web"
tags: ["Socket.io", "WebSocket", "Redis", "Node.js", "Real-time"]
date: "2026-09-28"
readTime: "12 dk"
featured: true
---

## Ölçeklenebilir Chat Mimarisi

WebSocket tabanlı gerçek zamanlı mesajlaşma sistemleri, doğru mimari kararlar alınmadığında hızla performans darboğazlarına yol açabilir.

### Tek Sunucu Limitleri

Tipik bir Node.js sunucusu ~10K eşzamanlı WebSocket bağlantısını destekler. Peki ya 100K+ kullanıcınız varsa?

### Redis Adapter ile Yatay Ölçekleme

```javascript
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pubClient = createClient({ url: 'redis://redis-host:6379' });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);

io.adapter(createAdapter(pubClient, subClient));
```

Redis adapter ile birden fazla Socket.io sunucu instance'ı aynı oda ve olay sistemini paylaşır.

### Oda (Room) Bazlı İzolasyon

```javascript
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
```

### Sonuç

Ölçeklenebilir bir chat sistemi için üç temel strateji:
1. **Redis Adapter** ile çoklu sunucu senkronizasyonu
2. **Room-based isolation** ile ağ trafiği optimizasyonu
3. **Connection pooling** ile kaynak yönetimi
