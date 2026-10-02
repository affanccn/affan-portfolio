// app/blog/page.tsx
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Calendar, Clock, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Affan Emirhan Çüçen',
  description: 'Yazılım mimarisi, web teknolojileri ve mühendislik notları.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-12 border-b border-neutral-800 pb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Yazılar & Notlar</h1>
        <p className="text-neutral-400">Yazılım mimarisi, full-stack sistemler ve teknik deneyimler.</p>
      </header>

      {posts.length === 0 ? (
        <div className="text-neutral-500 py-12 text-center border border-dashed border-neutral-800 rounded-2xl">
          Henüz bir blog yazısı eklenmedi.
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group p-6 rounded-2xl border border-neutral-800/80 bg-neutral-900/20 hover:bg-neutral-900/60 hover:border-neutral-700 transition-all duration-300"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium border border-blue-500/20">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-neutral-400 text-sm mb-4 leading-relaxed line-clamp-2">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-[11px] text-neutral-500 bg-neutral-800/50 px-2 py-0.5 rounded"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}