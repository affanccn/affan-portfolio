// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import Pre from '@/components/blog/CodeBlock';
import TableOfContents from '@/components/blog/TableOfContents';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import 'highlight.js/styles/github-dark.css';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const ogUrl = `https://affanccn.com/api/og?title=${encodeURIComponent(post.title)}`;

  return {
    title: `${post.title} | Affan Emirhan Çüçen`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://affanccn.com/blog/${post.slug}`,
      images: [{ url: post.coverImage || ogUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage || ogUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-5xl mx-auto px-4 py-14">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Blog'a Geri Dön
      </Link>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-neutral-400 leading-relaxed">{post.description}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3 prose prose-invert prose-neutral max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-a:text-blue-400 hover:prose-a:underline">
          <MDXRemote
            source={post.content}
            components={{
              pre: Pre,
            }}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                  rehypeHighlight,
                ],
              },
            }}
          />
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <TableOfContents content={post.content} />
          </div>
        </div>
      </div>
    </article>
  );
}