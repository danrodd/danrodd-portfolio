# dannrodd-portfolio

Bilingual (ES/EN) personal portfolio for Daniel Andrés Rodríguez — Software Development · Architecture · AI led by judgment. Built with Nuxt 4 and deployed as a static site on Netlify.

## Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 4 (Vue 3, `<script setup>`) |
| Styling | Tailwind CSS v4 (Vite plugin, no Nuxt module) |
| i18n | `@nuxtjs/i18n` — `es` (default) / `en` with `prefix_except_default` |
| Content | `@nuxt/content` v3 — ADRs and case studies as Markdown |
| UI components | `shadcn-nuxt` |
| Icons | `lucide-vue-next` |
| Linter / formatter | Biome |
| Git hooks | lefthook (`pre-commit` → Biome, `pre-push` → typecheck, `commit-msg` → Conventional Commits) |
| Package manager | pnpm |
| Deployment | Netlify — `nuxt generate` → `.output/public` |

## Setup

```bash
pnpm install
```

This also runs `nuxt prepare` and installs the lefthook git hooks automatically.

## Development

```bash
pnpm dev        # http://localhost:3000
```

## Build

```bash
pnpm generate   # static output → .output/public  (used by Netlify)
pnpm build      # Nitro server build (SSR mode, not used in production)
pnpm preview    # preview the generated static output locally
```

## Lint & format

```bash
pnpm check      # biome check --write (lint + format, auto-fixes)
pnpm lint       # biome lint only
pnpm format     # biome format --write only
pnpm typecheck  # vue-tsc type check
```

## Git hooks (lefthook)

| Hook | What it does |
|---|---|
| `pre-commit` | Runs Biome on staged files only; auto-fixes and re-stages. |
| `pre-push` | Full `nuxt typecheck` — fails the push if types are broken. |
| `commit-msg` | Validates the message follows [Conventional Commits](https://www.conventionalcommits.org/). |

## Deploy

Netlify reads `netlify.toml`. The build command is `pnpm generate` and the publish directory is `.output/public`. `NODE_VERSION` is pinned to 22 and `NITRO_PRESET=static` is set in the environment.

Canonical domain: **danrodd.dev**

## i18n

Default locale is Spanish (`/`). English lives under `/en`. Locale files are in `i18n/locales/es.json` and `i18n/locales/en.json` — both files must have identical key sets.
