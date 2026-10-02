import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  formatBlogDate,
  getCategoryInfo,
} from '../../data/blogPosts';
import {
  ArrowLeft,
  Clock,
  Tag,
  Search,
  BookOpen,
  Calendar,
  ChevronRight,
  Sparkles,
  X,
} from 'lucide-react';

// ─── Blog App (Full Window) ─────────────────────────────────────────────────
// Pencere içinde açılan tam blog uygulaması.
// Yazı listesi, kategori filtreleme, arama ve yazı detay görüntüleme içerir.

export default function BlogApp({ initialPostId = null }) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(
    initialPostId ? BLOG_POSTS.find(p => p.id === initialPostId) : null
  );
  const contentRef = useRef(null);

  // initialPostId değiştiğinde yazıyı seç
  useEffect(() => {
    if (initialPostId) {
      const post = BLOG_POSTS.find(p => p.id === initialPostId);
      if (post) setSelectedPost(post);
    }
  }, [initialPostId]);

  // Scroll to top on post change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [selectedPost]);

  // Filtreleme
  const filteredPosts = BLOG_POSTS
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p =>
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const featuredPosts = filteredPosts.filter(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  // ─── Post Detail View ─────────────────────────────────────────────────
  if (selectedPost) {
    const cat = getCategoryInfo(selectedPost.category);
    return (
      <div ref={contentRef} style={{
        height: '100%',
        overflowY: 'auto',
        background: 'linear-gradient(180deg, rgba(8,8,20,1) 0%, rgba(6,6,16,1) 100%)',
      }}>
        {/* Back Button Bar */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          padding: '12px 20px',
          background: 'rgba(8,8,20,0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <button
            type="button"
            onClick={() => setSelectedPost(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#e2e8f0',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${theme.primary}15`;
              e.currentTarget.style.borderColor = `${theme.primary}35`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <ArrowLeft size={14} />
            <span>Tüm Yazılar</span>
          </button>
          <span style={{
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: '#475569',
          }}>
            {formatBlogDate(selectedPost.date)}
          </span>
        </div>

        {/* Post Content */}
        <article style={{ padding: '28px 28px 40px', maxWidth: '700px' }}>
          {/* Meta */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 10px',
              borderRadius: '20px',
              background: `${theme.primary}12`,
              border: `1px solid ${theme.primary}30`,
              fontSize: '11px',
              fontWeight: 600,
              color: theme.primary,
            }}>
              <span>{cat.icon}</span>
              {cat.label}
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              color: '#64748b',
              fontFamily: 'var(--font-mono)',
            }}>
              <Clock size={11} />
              {selectedPost.readTime}
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              color: '#64748b',
              fontFamily: 'var(--font-mono)',
            }}>
              <Calendar size={11} />
              {formatBlogDate(selectedPost.date)}
            </span>
          </div>

          {/* Title */}
          <h2 style={{
            margin: '0 0 12px',
            fontSize: '24px',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
          }}>
            {selectedPost.title}
          </h2>

          {/* Excerpt */}
          <p style={{
            margin: '0 0 24px',
            color: '#94a3b8',
            fontSize: '14px',
            lineHeight: 1.6,
            fontStyle: 'italic',
            paddingLeft: '14px',
            borderLeft: `3px solid ${theme.primary}40`,
          }}>
            {selectedPost.excerpt}
          </p>

          {/* Tags */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '28px',
          }}>
            {selectedPost.tags.map(tag => (
              <span key={tag} style={{
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '10.5px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                color: '#94a3b8',
              }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* SEO Info (if exists) */}
          {selectedPost.seo && (selectedPost.seo.focusKeyword || (selectedPost.seo.secondaryKeywords && selectedPost.seo.secondaryKeywords.length > 0)) && (
            <div style={{
              marginTop: '-16px',
              marginBottom: '28px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '11px', color: '#64748b', marginRight: '4px', fontWeight: 600 }}>SEO:</span>
              {selectedPost.seo.focusKeyword && (
                <span style={{
                  padding: '2px 6px', borderRadius: '4px', background: `${theme.primary}15`, 
                  border: `1px solid ${theme.primary}40`, fontSize: '10px', color: theme.primary,
                  display: 'flex', alignItems: 'center', gap: '3px'
                }}>
                  <Sparkles size={10} /> {selectedPost.seo.focusKeyword}
                </span>
              )}
              {selectedPost.seo.secondaryKeywords && selectedPost.seo.secondaryKeywords.map(k => (
                <span key={k} style={{
                  padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', 
                  border: '1px dashed rgba(255,255,255,0.1)', fontSize: '10px', color: '#94a3b8'
                }}>
                  {k}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div style={{
            height: '1px',
            background: `linear-gradient(90deg, ${theme.primary}30, transparent)`,
            marginBottom: '28px',
          }} />

          {/* Markdown Content Rendering */}
          <div className="blog-content" style={{
            color: '#cbd5e1',
            fontSize: '14px',
            lineHeight: 1.75,
          }}>
            {renderMarkdown(selectedPost.content, theme)}
          </div>
        </article>
      </div>
    );
  }

  // ─── Post List View ───────────────────────────────────────────────────
  return (
    <div ref={contentRef} style={{
      height: '100%',
      overflowY: 'auto',
      background: 'linear-gradient(180deg, rgba(8,8,20,1) 0%, rgba(6,6,16,1) 100%)',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(8,8,20,0.6)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '4px',
        }}>
          <BookOpen size={18} style={{ color: theme.primary }} />
          <h2 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}>
            Blog
          </h2>
          <span style={{
            padding: '2px 8px',
            borderRadius: '12px',
            background: `${theme.primary}12`,
            border: `1px solid ${theme.primary}25`,
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: theme.primary,
          }}>
            {BLOG_POSTS.length} yazı
          </span>
        </div>
        <p style={{
          margin: 0,
          color: '#64748b',
          fontSize: '12.5px',
          lineHeight: 1.4,
        }}>
          Yazılım geliştirme, yapay zekâ ve kariyer üzerine yazılar
        </p>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          marginTop: '14px',
        }}>
          <Search size={14} style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#475569',
          }} />
          <input
            type="text"
            placeholder="Yazı, etiket veya konu ara..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Blog yazısı ara"
            style={{
              width: '100%',
              padding: '8px 32px 8px 32px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#e2e8f0',
              fontSize: '12.5px',
              outline: 'none',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              transition: 'all 0.15s',
            }}
            onFocus={e => {
              e.target.style.borderColor = `${theme.primary}40`;
              e.target.style.background = 'rgba(255,255,255,0.06)';
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.08)';
              e.target.style.background = 'rgba(255,255,255,0.04)';
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Aramayı temizle"
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#475569',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
              }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          gap: '6px',
          marginTop: '12px',
          flexWrap: 'wrap',
        }}>
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '20px',
                background: activeCategory === cat.id
                  ? `${theme.primary}18`
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeCategory === cat.id
                  ? `${theme.primary}40`
                  : 'rgba(255,255,255,0.06)'}`,
                color: activeCategory === cat.id ? theme.primary : '#64748b',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = '#94a3b8';
                }
              }}
              onMouseLeave={e => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.color = '#64748b';
                }
              }}
            >
              <span style={{ fontSize: '12px' }}>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Post List */}
      <div style={{ padding: '16px 16px 24px' }}>
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '10px',
              padding: '0 4px',
            }}>
              <Sparkles size={12} style={{ color: theme.primary }} />
              <span style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: '#64748b',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                Öne Çıkan Yazılar
              </span>
            </div>
            {featuredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                theme={theme}
                featured
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <>
            {featuredPosts.length > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                margin: '18px 0 10px',
                padding: '0 4px',
              }}>
                <BookOpen size={12} style={{ color: '#64748b' }} />
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: '#64748b',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  Tüm Yazılar
                </span>
              </div>
            )}
            {regularPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                theme={theme}
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#475569',
          }}>
            <Search size={32} style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p style={{ fontSize: '13px', margin: 0 }}>
              Aramanızla eşleşen yazı bulunamadı.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Post Card Component ────────────────────────────────────────────────────
function PostCard({ post, theme, featured = false, onClick }) {
  const [hovered, setHovered] = useState(false);
  const cat = getCategoryInfo(post.category);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`"${post.title}" yazısını oku`}
      style={{
        display: 'block',
        width: '100%',
        padding: '14px 14px',
        marginBottom: '8px',
        borderRadius: '12px',
        background: hovered
          ? `${theme.primary}08`
          : featured
            ? 'rgba(255,255,255,0.02)'
            : 'transparent',
        border: `1px solid ${hovered
          ? `${theme.primary}25`
          : featured
            ? 'rgba(255,255,255,0.06)'
            : 'rgba(255,255,255,0.04)'}`,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
        fontFamily: 'inherit',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Featured badge glow */}
      {featured && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${theme.primary}60, ${theme.secondary || '#ff00c8'}60, transparent)`,
        }} />
      )}

      {/* Top Row: Category + Read Time */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: '6px',
            background: `${theme.primary}10`,
            fontSize: '10px',
            fontWeight: 600,
            color: theme.primary,
          }}>
            <span>{cat.icon}</span>
            {cat.label}
          </span>
          {featured && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              padding: '2px 7px',
              borderRadius: '6px',
              background: 'rgba(250,204,21,0.08)',
              border: '1px solid rgba(250,204,21,0.2)',
              fontSize: '9px',
              fontWeight: 700,
              color: '#facc15',
              fontFamily: 'var(--font-mono)',
            }}>
              <Sparkles size={8} />
              ÖNE ÇIKAN
            </span>
          )}
        </div>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '10px',
          color: '#475569',
          fontFamily: 'var(--font-mono)',
        }}>
          <Clock size={10} />
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        margin: '0 0 6px',
        fontSize: '14px',
        fontWeight: 700,
        color: hovered ? '#ffffff' : '#e2e8f0',
        lineHeight: 1.35,
        transition: 'color 0.15s',
      }}>
        {post.title}
      </h3>

      {/* Excerpt */}
      <p style={{
        margin: '0 0 10px',
        fontSize: '12px',
        color: '#64748b',
        lineHeight: 1.5,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {post.excerpt}
      </p>

      {/* Footer: Date + Tags + Arrow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '10px',
            color: '#475569',
            fontFamily: 'var(--font-mono)',
          }}>
            {formatBlogDate(post.date)}
          </span>
          <span style={{ color: '#1e293b' }}>·</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{
                padding: '1px 6px',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                fontSize: '9px',
                color: '#64748b',
                fontFamily: 'var(--font-mono)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ChevronRight
          size={14}
          style={{
            color: hovered ? theme.primary : '#334155',
            transition: 'all 0.15s',
            transform: hovered ? 'translateX(2px)' : 'none',
          }}
        />
      </div>
    </button>
  );
}

// ─── Simple Markdown Renderer ───────────────────────────────────────────────
// Basit markdown → JSX dönüştürücü (h2, h3, p, code blocks, inline code,
// blockquotes, lists, bold, links)
function renderMarkdown(content, theme) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().replace(/^```/, '').trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={key++} style={{
          margin: '18px 0',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {lang && (
            <div style={{
              padding: '6px 14px',
              background: 'rgba(255,255,255,0.04)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: theme.primary,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {lang}
            </div>
          )}
          <pre style={{
            margin: 0,
            padding: '16px',
            background: 'rgba(0,0,0,0.4)',
            overflowX: 'auto',
            fontSize: '12.5px',
            fontFamily: 'var(--font-mono)',
            lineHeight: 1.65,
            color: '#e2e8f0',
          }}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    // Heading 2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} style={{
          margin: '28px 0 12px',
          fontSize: '20px',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          paddingBottom: '8px',
          borderBottom: `1px solid ${theme.primary}20`,
        }}>
          {line.replace('## ', '')}
        </h2>
      );
      i++;
      continue;
    }

    // Heading 3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} style={{
          margin: '22px 0 8px',
          fontSize: '16px',
          fontWeight: 700,
          color: '#f1f5f9',
          letterSpacing: '-0.01em',
        }}>
          {line.replace('### ', '')}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={key++} style={{
          margin: '16px 0',
          padding: '12px 16px',
          borderLeft: `3px solid ${theme.primary}60`,
          background: `${theme.primary}06`,
          borderRadius: '0 8px 8px 0',
          color: '#94a3b8',
          fontSize: '13px',
          fontStyle: 'italic',
          lineHeight: 1.6,
        }}>
          {renderInlineMarkdown(line.replace(/^>\s*\**/, '').replace(/\**$/, ''), theme)}
        </blockquote>
      );
      i++;
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={key++} style={{
          margin: '12px 0',
          paddingLeft: '20px',
          color: '#cbd5e1',
          fontSize: '13.5px',
          lineHeight: 1.7,
        }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '6px' }}>
              {renderInlineMarkdown(item, theme)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Unordered list
    if (line.trim().startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().replace(/^-\s/, ''));
        i++;
      }
      elements.push(
        <ul key={key++} style={{
          margin: '12px 0',
          paddingLeft: '20px',
          color: '#cbd5e1',
          fontSize: '13.5px',
          lineHeight: 1.7,
        }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '6px' }}>
              {renderInlineMarkdown(item, theme)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} style={{
        margin: '10px 0',
        color: '#cbd5e1',
        fontSize: '14px',
        lineHeight: 1.75,
      }}>
        {renderInlineMarkdown(line, theme)}
      </p>
    );
    i++;
  }

  return elements;
}

// Inline markdown (bold, inline code, links)
function renderInlineMarkdown(text, theme) {
  if (!text) return text;

  const parts = [];
  let remaining = text;
  let partKey = 0;

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Bold
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

    let firstMatch = null;
    let matchType = null;

    if (codeMatch && (!firstMatch || codeMatch.index < firstMatch.index)) {
      firstMatch = codeMatch;
      matchType = 'code';
    }
    if (boldMatch && (!firstMatch || boldMatch.index < firstMatch.index)) {
      firstMatch = boldMatch;
      matchType = 'bold';
    }

    if (!firstMatch) {
      parts.push(remaining);
      break;
    }

    // Text before match
    if (firstMatch.index > 0) {
      parts.push(remaining.substring(0, firstMatch.index));
    }

    if (matchType === 'code') {
      parts.push(
        <code key={partKey++} style={{
          padding: '2px 6px',
          borderRadius: '4px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.1)',
          fontSize: '12px',
          fontFamily: 'var(--font-mono)',
          color: theme.primary,
        }}>
          {firstMatch[1]}
        </code>
      );
    } else if (matchType === 'bold') {
      parts.push(
        <strong key={partKey++} style={{ color: '#f1f5f9', fontWeight: 700 }}>
          {firstMatch[1]}
        </strong>
      );
    }

    remaining = remaining.substring(firstMatch.index + firstMatch[0].length);
  }

  return parts;
}
