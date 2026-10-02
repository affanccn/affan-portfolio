#!/usr/bin/env node
// ─── Local Blog Builder ─────────────────────────────────────────────────────
// content/blog/ klasöründeki .md dosyalarını okur → blogPosts.js'yi günceller.
//
// Kullanım:  npm run blog
//
// .md dosyaları YAML frontmatter formatında olmalı:
// ---
// title: "Yazı Başlığı"
// excerpt: "Kısa açıklama"
// category: "web"
// tags: ["React", "Node.js"]
// date: "2026-10-02"
// readTime: "8 dk"
// featured: false
// ---
// ## İçerik...

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, '../content/blog');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/blogPosts.js');

// ─── YAML Frontmatter Parse ─────────────────────────────────────────────────
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const meta = {};
  let currentKey = null;
  let arrayValues = [];
  let arrayMode = false;

  for (const line of match[1].split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (arrayMode && trimmed.startsWith('- ')) {
      arrayValues.push(trimmed.replace(/^-\s*/, '').replace(/^["']|["']$/g, ''));
      continue;
    }
    if (arrayMode && currentKey) {
      meta[currentKey] = arrayValues;
      arrayMode = false;
      arrayValues = [];
    }

    const kv = trimmed.match(/^(\w+)\s*:\s*(.*)$/);
    if (kv) {
      const [, key, raw] = kv;
      let value = raw.trim();

      if (value.startsWith('[') && value.endsWith(']')) {
        meta[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
        continue;
      }
      if (value === '' || value === '[]') { currentKey = key; arrayMode = true; arrayValues = []; continue; }
      if (value === 'true') { meta[key] = true; continue; }
      if (value === 'false') { meta[key] = false; continue; }
      meta[key] = value.replace(/^["']|["']$/g, '');
    }
  }
  if (arrayMode && currentKey) meta[currentKey] = arrayValues;

  return { meta, body: match[2] };
}

// ─── Slug oluştur ───────────────────────────────────────────────────────────
function createSlug(title) {
  return title.toLowerCase()
    .replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g').replace(/[ıİ]/g, 'i')
    .replace(/[öÖ]/g, 'o').replace(/[şŞ]/g, 's').replace(/[üÜ]/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
    .replace(/^-|-$/g, '').substring(0, 80);
}

// ─── blogPosts.js üret ──────────────────────────────────────────────────────
function generate(posts) {
  const code = posts.map((p, i) => `  {
    id: ${i + 1},
    slug: '${p.slug}',
    title: '${p.title.replace(/'/g, "\\'")}',
    excerpt: '${p.excerpt.replace(/'/g, "\\'")}',
    category: '${p.category}',
    tags: [${p.tags.map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ')}],
    date: '${p.date}',
    readTime: '${p.readTime}',
    featured: ${p.featured},
    content: \`${p.content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
  }`).join(',\n');

  return `// ─── Blog Posts Data Source ──────────────────────────────────────────────────
// Bu dosya otomatik üretilmiştir → npm run blog
// Kaynak: content/blog/*.md
// Son güncelleme: ${new Date().toLocaleString('tr-TR')}

export const BLOG_CATEGORIES = [
  { id: 'all', label: 'Tümü', icon: '📋' },
  { id: 'web', label: 'Web Dev', icon: '🌐' },
  { id: 'ai', label: 'Yapay Zekâ', icon: '🤖' },
  { id: 'gamedev', label: 'Oyun Geliştirme', icon: '🎮' },
  { id: 'devops', label: 'DevOps', icon: '⚙️' },
  { id: 'career', label: 'Kariyer', icon: '💼' },
];

export const BLOG_POSTS = [
${code}
];

export function formatBlogDate(dateString) {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function getCategoryInfo(categoryId) {
  return BLOG_CATEGORIES.find(c => c.id === categoryId) || BLOG_CATEGORIES[0];
}
`;
}

// ─── Ana akış ───────────────────────────────────────────────────────────────
function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    console.log(`📁 Klasör oluşturuldu: content/blog/`);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  console.log(`📄 ${files.length} adet .md dosyası bulundu.\n`);

  if (files.length === 0) {
    console.log('⚠️  content/blog/ klasörüne .md dosyalarını atın, sonra tekrar çalıştırın.');
    return;
  }

  const posts = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { meta, body } = parseFrontmatter(raw);

    if (!meta.title) meta.title = file.replace(/\.md$/, '').replace(/-/g, ' ');

    posts.push({
      slug: meta.slug || createSlug(meta.title),
      title: meta.title,
      excerpt: meta.excerpt || body.substring(0, 160).replace(/[#*`\n]/g, '').trim() + '...',
      category: meta.category || 'web',
      tags: meta.tags || [],
      date: meta.date || new Date().toISOString().split('T')[0],
      readTime: meta.readTime || meta.readtime || `${Math.max(1, Math.ceil(body.split(/\s+/).length / 200))} dk`,
      featured: meta.featured === true || meta.featured === 'true',
      content: body.trim(),
    });

    console.log(`  ✅ ${meta.title}`);
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(OUTPUT_PATH, generate(posts), 'utf-8');
  console.log(`\n💾 blogPosts.js güncellendi (${posts.length} yazı)`);
  console.log('🚀 Artık npm run dev veya git push yapabilirsiniz!');
}

main();
