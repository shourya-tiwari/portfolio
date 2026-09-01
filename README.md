# Portfolio

Personal portfolio for an ML/AI engineer. Next.js 14 (App Router), TypeScript, Tailwind, MDX.
Every page is statically generated at build time.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export of every content page
npm run start    # serve the production build
```

---

## The one thing to understand

**All content lives in `/content` as `.mdx` files. Nothing about a project is registered in code.**

The loader (`lib/content.ts`) enumerates the filesystem at build time, so adding, removing, or
reordering a project is a file operation — there is no imports list, no array, and no component to
update. The homepage badge cards, the social icon row, and the `/projects` filter pills are all *derived*
from the files, so they change on their own.

### Add a project

```bash
cp content/projects/_TEMPLATE.mdx content/projects/my-project.mdx
```

Edit it. `slug` must equal the filename without `.mdx` (the build fails loudly if it does not).
Set `status: "shipped"` when it is ready. That is the whole workflow.

### Remove a project

Delete the file. Or set `status: "in-progress"` to keep the write-up in the repo while hiding it —
in-progress projects are excluded from `generateStaticParams`, so their pages are never built and
their URLs 404.

### Reorder projects

Change the `order` number. Lower comes first; ties break alphabetically by title.

### Feature a project on the homepage

`featured: true`. The homepage grid shows featured projects sorted by `order`.

---

## Content files

| File | What it drives |
|---|---|
| `content/projects/*.mdx` | One file per project. Body sections: Problem, Why It Was Hard, Approach, Results, What Broke, Stack |
| `content/profile.mdx` | Name, tagline, bio, hero badges, social URLs, skills, experience, resume path. Body = the long bio on `/about` |
| `content/other-work.mdx` | The one-liner list of smaller projects on `/about` |
| `content/projects/_TEMPLATE.mdx` | Starting point for a new project. Ignored by the loader (leading `_`) |

Frontmatter is validated by Zod (`lib/schema.ts`). A typo fails `next build` with the filename and
the specific field, rather than rendering a broken card.

---

## Before you deploy

Content is real (sourced from `material_to_input/`). Remaining items:

1. **`NEXT_PUBLIC_SITE_URL`** — still falls back to `https://example.com` (`lib/site.ts`). It drives
   canonical URLs, OG tags, and `sitemap.xml`. Set it to your real domain.
2. **`year:`** — no project sets one, because the source material didn't date them. Add
   `year: 2026` to any project's frontmatter and it appears on the card and case study.
3. **RegimeHMM link** — `content/other-work.mdx` points at the GitHub profile, not the repo; the
   resume had no direct link for it. Swap in the real URL.
4. **AI Commerce Intelligence** — has no `repo:`/`demo:` for the same reason. Add them if they exist.

### Hero badges and social links

The two badge cards under the hero CTAs come from `badges` in `profile.mdx`:

```yaml
badges:
  - { label: "3rd-Year AIML Student", detail: "SIT Pune" }
  - { label: "Research & Project Intern", detail: "SCAAI (Symbiosis Centre for Applied AI)" }
```

The social icon row is driven by the `email`, `linkedin`, `github`, `x`, and `medium` fields.
Delete a field and its icon disappears from both the hero row and the footer — no component edit.
Links with no dedicated icon (Google Scholar, a blog) go in the `socials` array instead and render
as text in the footer.

**On icons:** these are inline SVGs, not `lucide-react`. lucide 1.x removed every brand icon (no
Github, Linkedin, Twitter/X, or Medium — its `X` export is the generic close-cross), and its one
usable icon here, `Mail`, is a `'use client'` module that added a ~1.5 KB client chunk to a homepage
that otherwise ships no route JS. `Mail` is redrawn on lucide's geometry in
`components/social-icons.tsx`, so the row keeps that look with nothing shipped to the browser.
To add a sixth social, add the field to `profileFrontmatter` in `lib/schema.ts`, add its key to
`SOCIAL_KEYS`, and add a glyph to `SOCIAL_ICONS`.

### Project cover images (optional)

Cards and case studies render a `cover` through `next/image` when the frontmatter sets one. Drop a
PNG/JPG in `public/projects/` and point `cover: "/projects/name.png"` at it. Use a raster format —
SVG covers would require enabling `dangerouslyAllowSVG` in `next.config.mjs`, which is not worth it.

---

## Architecture notes

- **`gray-matter` + `next-mdx-remote/rsc`**, not Contentlayer (unmaintained, Next 14 peer-dep
  friction). MDX compiles inside Server Components during `next build`; no MDX runtime ships to the
  browser.
- **Two client components only**: `components/nav.tsx` (mobile menu) and
  `components/project-filter.tsx` (tech filter). Everything else is a Server Component.
- The filter receives **already-rendered** `<ProjectCard />` nodes as props, so project bodies never
  enter the client bundle, and `/projects` renders every card server-side — the page works with
  JavaScript disabled.
- **Shiki** highlights code at build time via `rehype-pretty-code`. Zero client-side cost.
- **Fonts** are self-hosted by `next/font/google` at build time — no runtime request to a font CDN.
- MDX elements are hand-styled in `components/mdx-components.tsx` rather than using
  `@tailwindcss/typography`.

## Design tokens

Defined once in `app/globals.css` and exposed to Tailwind in `tailwind.config.ts`.
Accent (`--accent`, warm amber `#e9a23b`) is deliberately restricted to CTAs, links, key numbers,
the active filter pill, and focus rings.
