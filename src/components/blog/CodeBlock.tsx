// components/blog/CodeBlock.tsx
'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function Pre({ children, ...props }: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Çocuk elemanlardan saf metni al
    const codeText = typeof children?.props?.children === 'string' 
      ? children.props.children 
      : children?.props?.children?.toString() || '';

    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-xl border border-neutral-800 bg-[#0d1117] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#161b22] border-b border-neutral-800 text-xs text-neutral-400 font-mono">
        <span>{children?.props?.className?.replace('language-', '') || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 py-1 px-2.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition-all text-xs"
          aria-label="Kodu kopyala"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Kopyalandı</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Kopyala</span>
            </>
          )}
        </button>
      </div>
      <pre {...props} className="p-4 text-sm overflow-x-auto text-neutral-200">
        {children}
      </pre>
    </div>
  );
}