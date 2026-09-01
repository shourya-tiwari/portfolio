# Vendored fonts

Latin-subset variable `.woff2` files, self-hosted so `next build` makes no network
request. Both are SIL Open Font License 1.1, which permits redistribution.

| File | Family | Axes | Source |
| --- | --- | --- | --- |
| `Inter-latin.woff2` | Inter | `wght 100..900` | https://fonts.google.com/specimen/Inter |
| `JetBrainsMono-latin.woff2` | JetBrains Mono | `wght 100..800` | https://fonts.google.com/specimen/JetBrains+Mono |

Only the `latin` subset is vendored — the same subset `next/font/google` was
preloading. The two glyphs the site uses outside it (`→` U+2192, `─` U+2500) are
absent from every Google subset of these families and already fell back to a
system face before this change.
