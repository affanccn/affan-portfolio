// app/blog/rss.xml/route.ts
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = 'https://affanccn.com';

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`
    )
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Affan Emirhan Çüçen - Blog</title>
      <link>${siteUrl}/blog</link>
      <description>Yazılım, mimari ve web teknolojileri notları</description>
      <language>tr</language>
      ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}