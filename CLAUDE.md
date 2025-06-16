# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is an Astro blog project using pnpm as the package manager:

- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server at localhost:4321
- `pnpm build` - Build production site to ./dist/
- `pnpm preview` - Preview production build locally
- `pnpm astro check` - Type-check the project
- `pnpm astro add [integration]` - Add Astro integrations

## Architecture Overview

This is an Astro static site generator blog with:

**Content Management:**
- Blog posts are managed through Astro's Content Collections API
- Posts live in `src/content/blog/` as Markdown/MDX files
- Content schema defined in `src/content.config.ts` validates frontmatter (title, description, pubDate, updatedDate, heroImage)
- Blog collection loader uses glob pattern to load all `.md` and `.mdx` files

**Site Structure:**
- `src/pages/` - File-based routing (index.astro, about.astro, blog routes)
- `src/layouts/` - Reusable layout components
- `src/components/` - Astro components for UI elements
- `src/consts.ts` - Global site constants (SITE_TITLE, SITE_DESCRIPTION)
- Dynamic blog routes handled by `src/pages/blog/[...slug].astro`

**Build Output:**
- Site configured for GitHub Pages deployment
- Base path: `/gloriousoblivion.org`
- Site URL: `https://garyp.github.io`
- Automatic deployment via GitHub Actions on main branch pushes

**Key Features:**
- RSS feed generation at `/rss.xml`
- Sitemap generation
- MDX support for enhanced Markdown
- TypeScript with strict configuration
- Sharp for image optimization
- Dark mode toggle with localStorage persistence and system preference detection

When working with blog content, use the `getCollection('blog')` API to retrieve posts programmatically.