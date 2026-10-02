// lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
  content: string;
  coverImage?: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((file) => file.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const readStats = readingTime(content);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
        category: data.category || 'Genel',
        tags: data.tags || [],
        readingTime: readStats.text.replace('read', 'okuma'),
        content,
        coverImage: data.coverImage || null,
      } as BlogPost;
    });

  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const readStats = readingTime(content);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
      category: data.category || 'Genel',
      tags: data.tags || [],
      readingTime: readStats.text.replace('read', 'okuma'),
      content,
      coverImage: data.coverImage || null,
    };
  } catch {
    return null;
  }
}