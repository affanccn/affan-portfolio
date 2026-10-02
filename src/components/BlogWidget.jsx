import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BLOG_POSTS, formatBlogDate, getCategoryInfo } from '../data/blogPosts';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

// ─── Blog Widget ────────────────────────────────────────────────────────────
// Windows 11 widget'larından ilham alan, masaüstünde her zaman görünür blog paneli.
// Son yazıların önizlemesini gösterir. Tıklanınca tam blog penceresini açar.

export default function BlogWidget({ onOpenBlog, theme: themeOverride }) {
  const { theme: contextTheme } = useTheme();
  const theme = themeOverride || contextTheme;
  const [hoveredId, setHoveredId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Son 3 yazıyı tarihe göre sırala
  const recentPosts = [...BLOG_POSTS]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (!isExpanded) {
    return (
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        aria-label="Blog widget'ını genişlet"
        title="Blog widget'ını aç"
        className="blog-widget-collapsed"
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '20px',
          zIndex: 40,
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'rgba(8, 8, 20, 0.85)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${theme.primary}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 12px ${theme.primary}10`,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${theme.primary}60`;
          e.currentTarget.style.transform = 'scale(1.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = `${theme.primary}30`;
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        📰
      </button>
    );
  }

  return (
    <aside
      className="blog-widget"
      aria-label="Son blog yazıları widget'ı"
      style={{
        position: 'absolute',
        bottom: '60px',
        right: '20px',
        width: '280px',
        zIndex: 40,
        background: 'rgba(8, 8, 20, 0.82)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${theme.primary}20`,
        borderRadius: '16px',
        boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 25px ${theme.primary}08`,
        overflow: 'hidden',
        animation: 'fadeInScale 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Widget Header */}
      <div style={{
        padding: '14px 16px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={14} style={{ color: theme.primary, opacity: 0.8 }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: theme.primary,
            textTransform: 'uppercase',
          }}>
            Son Yazılar
          </span>
          <span style={{
            padding: '1px 6px',
            borderRadius: '10px',
            background: `${theme.primary}15`,
            border: `1px solid ${theme.primary}30`,
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: theme.primary,
          }}>
            {BLOG_POSTS.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          aria-label="Widget'ı küçült"
          title="Küçült"
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: '#64748b',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = '#e2e8f0';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.color = '#64748b';
          }}
        >
          ─
        </button>
      </div>

      {/* Post Previews */}
      <div style={{ padding: '6px 8px' }}>
        {recentPosts.map((post, index) => {
          const cat = getCategoryInfo(post.category);
          const isHovered = hoveredId === post.id;
          return (
            <button
              key={post.id}
              type="button"
              onClick={() => onOpenBlog && onOpenBlog(post.id)}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              aria-label={`"${post.title}" yazısını oku`}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 10px',
                marginBottom: index < recentPosts.length - 1 ? '2px' : 0,
                background: isHovered ? `${theme.primary}10` : 'transparent',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
              }}
            >
              {/* Category + Date Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '5px',
              }}>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  color: theme.primary,
                  opacity: 0.7,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <span>{cat.icon}</span>
                  {cat.label}
                </span>
                <span style={{
                  fontSize: '9.5px',
                  fontFamily: 'var(--font-mono)',
                  color: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}>
                  <Clock size={9} />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <div style={{
                fontSize: '12.5px',
                fontWeight: 600,
                color: isHovered ? '#ffffff' : '#e2e8f0',
                lineHeight: 1.35,
                transition: 'color 0.15s',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {post.title}
              </div>

              {/* Date */}
              <div style={{
                fontSize: '10px',
                color: '#475569',
                marginTop: '4px',
                fontFamily: 'var(--font-mono)',
              }}>
                {formatBlogDate(post.date)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer — View All */}
      <div style={{
        padding: '8px 12px 12px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <button
          type="button"
          onClick={() => onOpenBlog && onOpenBlog(null)}
          className="blog-widget__view-all"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            width: '100%',
            padding: '8px',
            borderRadius: '8px',
            background: `${theme.primary}08`,
            border: `1px solid ${theme.primary}20`,
            color: theme.primary,
            fontSize: '11.5px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${theme.primary}18`;
            e.currentTarget.style.borderColor = `${theme.primary}40`;
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `${theme.primary}08`;
            e.currentTarget.style.borderColor = `${theme.primary}20`;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>Tüm Yazıları Gör</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </aside>
  );
}
