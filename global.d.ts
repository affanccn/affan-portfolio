declare module '@/lib/blog' {
  export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
    readingTime: string;
    content: string;
    coverImage?: string | null;
  }

  export function getAllPosts(): BlogPost[];
  export function getPostBySlug(slug: string): BlogPost | null;
}

declare module '../../../lib/blog' {
  export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
    readingTime: string;
    content: string;
    coverImage?: string | null;
  }

  export function getAllPosts(): BlogPost[];
  export function getPostBySlug(slug: string): BlogPost | null;
}

declare module '@/components/blog/CodeBlock' {
  const Pre: (props: any) => any;
  export default Pre;
}

declare module '../../../src/components/blog/CodeBlock' {
  const Pre: (props: any) => any;
  export default Pre;
}

declare module '@/components/blog/TableOfContents' {
  const TableOfContents: (props: any) => any;
  export default TableOfContents;
}

declare module '../../../src/components/blog/TableOfContents' {
  const TableOfContents: (props: any) => any;
  export default TableOfContents;
}

declare module 'highlight.js/styles/github-dark.css' {
  const styles: Record<string, string>;
  export default styles;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
