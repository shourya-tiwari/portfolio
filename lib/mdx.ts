import 'server-only';

import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { mdxComponents } from '@/components/mdx-components';

/**
 * Shiki highlighting runs here, at build time. The output is plain styled markup —
 * no highlighter, no theme, and no MDX runtime is shipped to the browser.
 */
const prettyCodeOptions: PrettyCodeOptions = {
  theme: 'github-dark-dimmed',
  keepBackground: false,
  defaultLang: { block: 'text', inline: 'text' },
};

/**
 * Compile an MDX body into a React node.
 *
 * Every caller is a Server Component reached through generateStaticParams, so this
 * executes during `next build` and the result is baked into static HTML.
 */
export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false, // gray-matter already stripped it in lib/content.ts
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });

  return content;
}
