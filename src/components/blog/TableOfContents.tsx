// components/blog/TableOfContents.tsx
export default function TableOfContents({ content }: { content: string }) {
  const headings = content
    .split('\n')
    .filter((line) => line.startsWith('## ') || line.startsWith('### '))
    .map((line) => {
      const level = line.startsWith('### ') ? 3 : 2;
      const title = line.replace(/^#{2,3}\s/, '').trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9ğüşıöç -]/g, '')
        .replace(/\s+/g, '-');
      return { id, title, level };
    });

  if (headings.length === 0) return null;

  return (
    <aside className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">İçindekiler</p>
      <ul className="space-y-2 text-sm">
        {headings.map((h, i) => (
          <li key={i} style={{ paddingLeft: `${(h.level - 2) * 16}px` }}>
            <a
              href={`#${h.id}`}
              className="text-neutral-400 hover:text-blue-400 transition-colors block py-0.5"
            >
              {h.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}