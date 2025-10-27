# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

### Core Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### Image Optimization Commands

| Command                 | Action                                                      |
| :---------------------- | :---------------------------------------------------------- |
| `npm run optimize:images` | Run all image optimizations (hero images + OG image)      |
| `npm run optimize:hero`   | Generate responsive images (400px, 600px, 840px AVIF/WebP) |
| `npm run optimize:og`     | Convert OG image to optimized WebP format                 |
| `npm run prebuild`        | Auto-runs optimization before production build             |

#### Image Optimization Details

The project includes automated image optimization for:

- **Hero Images**: Creates responsive variants in modern formats
  - WebP and AVIF formats for maximum compression
  - Multiple sizes: 400px, 600px, 840px for different devices
  - Input: `public/Plumber.webp` → Output: `public/Plumber-{size}.{format}`

- **OG Images**: Optimizes social media sharing images
  - Converts PNG to WebP format (~80% size reduction)
  - Standard 1200x630px dimensions for social platforms
  - Input: `public/og-image.png` → Output: `public/og-image.webp`

**Workflow:**
1. Place source images in `public/` directory
2. Run `npm run optimize:images` to generate optimized versions
3. Images are automatically used in production builds
4. The `prebuild` script ensures images are optimized before deployment

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
