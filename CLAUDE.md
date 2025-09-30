# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based marketing website for "Marketing AI Houston", a small business web design and SEO service. The site is deployed to GitHub Pages at `https://mark-65-arch.github.io/Marketing-v3.2/`.

## Commands

```bash
# Development server (localhost:4321)
npm run dev

# Production build (outputs to ./dist/)
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro [command]
```

## Architecture

### Layout System

The project uses a **two-tier layout architecture**:

1. **`BaseLayout.astro`** (`src/layouts/BaseLayout.astro`)
   - Minimal HTML wrapper with core SEO meta tags
   - Provides basic structure: `<html>`, `<head>`, `<body>`
   - Includes global CSS, fonts, and base structured data (LocalBusiness schema)
   - Use when you need full control over page layout (e.g., standalone pages)

2. **`MainLayout.astro`** (`src/layouts/MainLayout.astro`)
   - Wraps `BaseLayout` and adds Header, Footer, and breadcrumbs
   - Includes enhanced SEO configuration via `src/utils/seo.ts`
   - Provides breadcrumb navigation and page-specific structured data
   - Use for standard pages that need site navigation

**Pattern**: Service pages and most content pages use `MainLayout`. Only use `BaseLayout` directly when building custom layouts.

### SEO System

All SEO utilities are centralized in **`src/utils/seo.ts`**:
- `generateLocalBusinessSchema()` - Schema.org business markup
- `generateBreadcrumbSchema()` - Breadcrumb navigation
- `generateFAQSchema()` - FAQ structured data
- `generateServiceSchema()` - Service offering markup
- `generateOpenGraphTags()` / `generateTwitterCardTags()` - Social meta tags

**Usage Pattern**: Import utilities in `MainLayout.astro`, pass configuration via props.

### GitHub Pages Deployment

**Critical**: This site uses a base path in production (`/Marketing-v3.2/`).

- `astro.config.mjs` sets: `base: process.env.NODE_ENV === 'production' ? '/Marketing-v3.2/' : '/'`
- **Always use** `import.meta.env.BASE_URL` for internal links and assets
- Example: `<a href={\`\${import.meta.env.BASE_URL}contact\`}>Contact</a>`
- **Never hardcode** paths like `/contact` or `href="contact"` - they will break on GitHub Pages

### Component Structure

- **UI Components** (`src/components/ui/`): Reusable `Button.astro`, `Card.astro`, `FormField.astro`
- **Layout Components** (`src/components/`): `Header.astro`, `Footer.astro`
- **Pages** (`src/pages/`): File-based routing, `.astro` files become routes

### Service Pages Pattern

Service pages (e.g., `business-profile-optimization.astro`) follow this structure:
1. Use `MainLayout` with full SEO config
2. Include breadcrumbs: `[{ name: 'Home', url: BASE_URL }, { name: 'Service Name', url: currentURL }]`
3. Add service-specific structured data via `generateServiceSchema()`
4. Use consistent sections: Hero → Features → Pricing → CTA

### Styling

- **TailwindCSS v4** via `@tailwindcss/vite`
- Custom design tokens in `tailwind.config.js` (ocean/teal palette)
- Global CSS in `src/styles/global.css`
- Custom CSS variables in `BaseLayout.astro` for organic shapes and animations

## Important Notes

1. **BASE_URL is critical**: All navigation must use `import.meta.env.BASE_URL` prefix
2. **Layout choice matters**: Use `MainLayout` for standard pages, `BaseLayout` only for custom layouts
3. **SEO is centralized**: Import from `src/utils/seo.ts`, don't duplicate schema generation
4. **Deployment**: GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys on push to `main`
5. **Mobile-first**: All pages must be responsive and pass mobile-friendly tests

## File Structure

```
/
├── src/
│   ├── pages/          # File-based routes
│   ├── layouts/        # BaseLayout, MainLayout
│   ├── components/     # Header, Footer, ui/
│   ├── utils/          # seo.ts (SEO helpers)
│   └── styles/         # global.css
├── public/             # Static assets (favicon, etc.)
├── astro.config.mjs    # Astro config (BASE_URL setup)
└── tailwind.config.js  # Tailwind design tokens
```

## Adding New Pages

When creating new pages:

1. Create `.astro` file in `src/pages/`
2. Import and use `MainLayout` from `../layouts/MainLayout.astro`
3. Pass SEO config props: `title`, `description`, `canonicalURL`
4. Add breadcrumbs if appropriate
5. Use `import.meta.env.BASE_URL` for all internal links
6. Consider adding structured data via `seo.ts` utilities