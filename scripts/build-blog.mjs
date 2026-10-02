#!/usr/bin/env node
// ─── Local Blog Builder ─────────────────────────────────────────────────────
// content/blog/ klasöründeki .md ve .docx dosyalarını okur → blogPosts.js'yi günceller.
// .docx dosyalarının içindeki düz metni okumak için mammoth kullanılır.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mammoth from 'mammoth';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, '../content/blog');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/blogPosts.js');

// ─── YAML Frontmatter & Markdown Meta Parse ──────────────────────────────────
function parseFrontmatter(content) {
  let meta = {};
  let body = content;

  // 1) Try standard YAML frontmatter
  const yamlMatch = content.match(/^(?:([\s\S]*?)\n)?---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (yamlMatch) {
    const preMatter = yamlMatch[1] ? yamlMatch[1].trim() + '\n\n' : '';
    const frontmatterStr = yamlMatch[2];
    const postMatter = yamlMatch[3];
    body = preMatter + postMatter;

    let currentKey = null;
    let arrayValues = [];
    let arrayMode = false;

    for (const line of frontmatterStr.split('\n')) {
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
    return { meta, body };
  }

  // 2) Try Markdown list format parsing (Spark fallback)
  // Example: - **URL Slug:** my-slug
  let titleMatch = content.match(/^#\s+(.+)/);
  if (titleMatch) meta.title = titleMatch[1].trim();

  const lines = content.split('\n');
  let newBodyLines = [];
  let inMetaBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line is a meta list item
    const metaItemMatch = line.match(/^-\s+\*\*([^\*]+):\*\*\s*(.*)$/);
    if (metaItemMatch) {
      inMetaBlock = true;
      const keyRaw = metaItemMatch[1].toLowerCase().trim();
      const val = metaItemMatch[2].trim();
      
      if (keyRaw.includes('slug')) meta.slug = val;
      else if (keyRaw.includes('açıklama') || keyRaw.includes('desc')) meta.excerpt = val;
      else if (keyRaw.includes('kategori')) meta.category = val;
      else if (keyRaw.includes('odak anahtar') || keyRaw.includes('focus')) meta.focusKeyword = val;
      else if (keyRaw.includes('ikincil anahtar') || keyRaw.includes('secondary')) meta.secondaryKeywords = val.split(',').map(k=>k.trim());
      else if (keyRaw.includes('etiket') || keyRaw.includes('tag')) meta.tags = val.split(',').map(k=>k.trim());
      else if (keyRaw.includes('okuma') || keyRaw.includes('read')) meta.readTime = val;
      continue;
    }

    if (inMetaBlock && line.trim() === '---') {
      inMetaBlock = false; // end of meta block
      continue;
    }

    if (inMetaBlock && (line.trim() === '' || line.toLowerCase().includes('meta bilgileri'))) {
      continue; // Skip empty lines or Meta headers in meta block
    }
    
    // If we've passed the meta block and title, add to body
    // We optionally remove the main title from the body if we want, but let's keep it or remove it.
    // Let's remove the first H1 if it's the title to avoid duplication
    if (line.startsWith('# ') && !inMetaBlock && newBodyLines.length < 3) {
      continue; // skip the title line from body
    }

    newBodyLines.push(line);
  }

  return { meta, body: newBodyLines.join('\n').trim() };
}

// ─── Slug oluştur ───────────────────────────────────────────────────────────
function createSlug(title) {
  return title.toLowerCase()
    .replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g').replace(/[ıİ]/g, 'i')
    .replace(/[öÖ]/g, 'o').replace(/[şŞ]/g, 's').replace(/[üÜ]/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
    .replace(/^-|-$/g, '').substring(0, 80);
}

// ─── Kategori Eşleştirici ───────────────────────────────────────────────────
function mapCategory(rawCat) {
  const c = rawCat.toLowerCase();
  if (c.includes('web') || c.includes('full-stack')) return 'web';
  if (c.includes('yapay') || c.includes('ai')) return 'ai';
  if (c.includes('oyun') || c.includes('game')) return 'gamedev';
  if (c.includes('devops')) return 'devops';
  if (c.includes('kariyer') || c.includes('career')) return 'career';
  return 'web'; // default
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
    seo: {
      focusKeyword: '${(p.focusKeyword || '').replace(/'/g, "\\'")}',
      secondaryKeywords: [${(p.secondaryKeywords || []).map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ')}]
    },
    content: \`${p.content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
  }`).join(',\n');

  return `// ─── Blog Posts Data Source ──────────────────────────────────────────────────
// Bu dosya otomatik üretilmiştir → npm run blog
// Kaynak: content/blog/ klasöründeki dosyalar
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
async function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    console.log(`📁 Klasör oluşturuldu: content/blog/`);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md') || f.endsWith('.docx'));
  console.log(`📄 ${files.length} adet dosya (.md / .docx) bulundu.\\n`);

  if (files.length === 0) {
    console.log('⚠️  content/blog/ klasörüne .md veya .docx dosyalarını atın, sonra tekrar çalıştırın.');
    return;
  }

  const posts = [];
  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    let raw = "";

    if (file.endsWith('.docx')) {
      const result = await mammoth.extractRawText({path: filePath});
      raw = result.value;
      // DOCX dosyalarından çıkarılan düz metinde yeni satırlar bazen bozulabilir,
      // Google Docs markdown içeriğini saf text olarak aldığımızda genelde sorunsuz gelir.
    } else {
      raw = fs.readFileSync(filePath, 'utf-8');
    }

    const { meta, body } = parseFrontmatter(raw);

    if (!meta.title) meta.title = file.replace(/\\.md(\\.docx)?$/, '').replace(/-/g, ' ');

    // description veya excerpt kullanıcının seçimine göre
    const excerpt = meta.description || meta.excerpt || body.substring(0, 160).replace(/[#*\`\\n]/g, '').trim() + '...';

    posts.push({
      slug: meta.slug || createSlug(meta.title),
      title: meta.title,
      excerpt: excerpt,
      category: mapCategory(meta.category || 'web'),
      tags: meta.tags || [],
      date: meta.date || new Date().toISOString().split('T')[0],
      readTime: meta.readingTime || meta.readTime || meta.readtime || `${Math.max(1, Math.ceil(body.split(/\s+/).length / 200))} dk`,
      featured: meta.featured === true || meta.featured === 'true',
      focusKeyword: meta.focusKeyword || '',
      secondaryKeywords: meta.secondaryKeywords || [],
      content: body.trim(),
    });

    console.log(`  ✅ ${meta.title}`);
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(OUTPUT_PATH, generate(posts), 'utf-8');
  console.log(`\n💾 blogPosts.js güncellendi (${posts.length} yazı)`);
  console.log('🚀 Artık npm run dev veya git push yapabilirsiniz!');
}

main().catch(err => {
  console.error("Hata oluştu:", err);
});
