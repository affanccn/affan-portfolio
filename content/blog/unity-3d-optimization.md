---
title: "Unity 3D: Performans Optimizasyon Rehberi"
excerpt: "Unity projelerinde FPS düşüşlerini önlemek için Object Pooling, LOD, Occlusion Culling ve GC.Alloc azaltma teknikleri."
category: "gamedev"
tags: ["Unity 3D", "C#", "Performans", "Object Pooling", "GPU"]
date: "2026-09-20"
readTime: "10 dk"
featured: false
---

## Unity 3D Performans Optimizasyonu

Mobil ve PC oyunlarında 60 FPS hedefine ulaşmak için kritik optimizasyon teknikleri.

### 1. Object Pooling

`Instantiate()` ve `Destroy()` çağrıları Garbage Collector (GC) baskısı yaratır. Pool sistemi ile nesneler yeniden kullanılır:

```csharp
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
```

### 2. LOD (Level of Detail)

Kameradan uzak nesneler için düşük poligonlu modeller kullanarak GPU yükünü azaltın.

### 3. GC.Alloc Azaltma

```csharp
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
```

### Sonuç

Bu tekniklerle Unity projelerinizde ciddi FPS artışı sağlayabilirsiniz. Profiler aracını düzenli kullanarak bottleneck'ları tespit edin.
