import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Hand-styled element map for MDX bodies.
 *
 * Deliberately not @tailwindcss/typography: the case studies use a fixed set of
 * elements, and styling them directly avoids fighting `prose-invert` for the dark
 * palette and keeps one dependency out of the tree.
 */

function isInternal(href: string) {
  return href.startsWith('/') || href.startsWith('#');
}

export const mdxComponents: MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="mb-4 mt-12 text-3xl font-bold tracking-tight text-fg" {...props} />
  ),

  /* The case-study section headers: Problem, Why It Was Hard, Approach, ... */
  h2: ({ className, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="mb-4 mt-14 scroll-mt-24 border-t border-line pt-8 text-xl font-bold tracking-tight text-fg first:mt-0 first:border-0 first:pt-0"
      {...props}
    />
  ),

  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="mb-3 mt-9 scroll-mt-24 text-base font-semibold tracking-tight text-fg" {...props} />
  ),

  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-5 leading-[1.75] text-muted" {...props} />
  ),

  a: ({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) =>
    isInternal(href) ? (
      <Link
        href={href}
        className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        {...props}
      >
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        {...props}
      >
        {children}
      </a>
    ),

  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mb-5 space-y-2 pl-1 marker:text-faint" {...props} />
  ),

  /* pl-6 rather than pl-5 so numbered text lands on the same 1.5rem edge as the
     bulleted text below (ul's pl-1 plus the li's pl-5). */
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 marker:text-faint" {...props} />
  ),

  li: ({ className, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li
      className="leading-[1.7] text-muted [ul>&]:relative [ul>&]:pl-5 [ul>&]:before:absolute [ul>&]:before:left-0 [ul>&]:before:top-[0.7em] [ul>&]:before:h-1 [ul>&]:before:w-1 [ul>&]:before:rounded-full [ul>&]:before:bg-faint"
      {...props}
    />
  ),

  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-fg" {...props} />
  ),

  em: (props: ComponentPropsWithoutRef<'em'>) => <em className="italic text-fg/90" {...props} />,

  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="mb-5 border-l-2 border-accent/50 pl-5 text-muted [&>p:last-child]:mb-0"
      {...props}
    />
  ),

  hr: () => <hr className="my-12 border-line" />,

  /* Inline code only — rehype-pretty-code replaces fenced blocks with its own figure. */
  code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const isBlock = className?.includes('language-') || 'data-language' in props;
    if (isBlock) return <code className={className} {...props} />;
    return (
      <code
        className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-fg"
        {...props}
      />
    );
  },

  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="mb-6 overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),

  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="border-b border-line bg-surface px-4 py-3 font-semibold text-fg"
      {...props}
    />
  ),

  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="border-b border-line px-4 py-3 align-top text-muted" {...props} />
  ),

  img: ({ src = '', alt = '', ...props }: ComponentPropsWithoutRef<'img'>) => (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={675}
      sizes="(max-width: 768px) 100vw, 736px"
      className="mb-6 h-auto w-full rounded-lg border border-line"
      {...(props as Record<string, unknown>)}
    />
  ),
};
