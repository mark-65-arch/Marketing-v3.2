# ASSETS NEEDED FOR PRODUCTION LAUNCH

This document lists all image and icon assets that need to be created and added to the `public/` directory before production launch.

---

## 🔴 CRITICAL - Must Have Before Launch

### 1. Open Graph Image
**File:** `public/og-image.jpg`
**Dimensions:** 1200 x 630 pixels
**Format:** JPG (optimized, <200KB)
**Purpose:** Social media sharing preview (Facebook, LinkedIn, Twitter)

**Design Requirements:**
- Include company name "Marketing AI Houston"
- Include tagline or key value proposition
- Professional design with good contrast
- Readable text even when thumbnail-sized
- Should represent brand identity

**Tools:**
- Canva (template: Facebook Post 1200x630)
- Figma
- Photoshop

---

### 2. Favicon Package
**Location:** `public/`
**Purpose:** Browser tabs, bookmarks, mobile home screen icons

**Required Files:**
```
public/
├── favicon.ico (32x32, 16x16 multi-size)
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png (180x180)
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── site.webmanifest (generated automatically)
```

**Generation Tool:**
🔗 **https://realfavicongenerator.net/**

**Steps:**
1. Create a square logo/icon (512x512px minimum, transparent background)
2. Upload to RealFaviconGenerator
3. Configure settings:
   - iOS: Use solid background color (your brand blue: #3B82F6)
   - Android Chrome: Use transparent or colored background
   - Windows Metro: Choose tile color
4. Download package
5. Extract all files to `public/` directory
6. Add meta tags to `src/layouts/BaseLayout.astro` (tool provides code)

---

## 🟡 MEDIUM PRIORITY - Should Have

### 3. Logo Image
**File:** `public/logo.png`
**Dimensions:** 500 x 500 pixels (square) or appropriate aspect ratio
**Format:** PNG with transparent background
**Purpose:** Structured data, potential header use

**Current Status:** Referenced in seo.ts but doesn't exist

---

### 4. Hero Section Images (Optional)
**Location:** `public/images/`
**Purpose:** Homepage hero, service page headers

**Recommended:**
- Convert to WebP format for better compression
- Optimize with tools like Squoosh.app or Sharp
- Include width/height attributes in code to prevent CLS

**Naming Convention:**
```
public/images/
├── hero-homepage.webp
├── hero-business-profile.webp
├── hero-website-design.webp
├── hero-pro-plan.webp
└── hero-seo-growth.webp
```

---

## 📋 CHECKLIST

### Pre-Production Asset Checklist
- [ ] Create og-image.jpg (1200x630)
- [ ] Test og-image with Facebook Sharing Debugger
- [ ] Test og-image with LinkedIn Post Inspector
- [ ] Generate favicon package with RealFaviconGenerator
- [ ] Add all favicon files to public/
- [ ] Add favicon meta tags to BaseLayout.astro
- [ ] Test favicons in Chrome, Firefox, Safari
- [ ] Test apple-touch-icon on iOS device
- [ ] Create logo.png (500x500)
- [ ] Update logo path in src/utils/seo.ts if needed
- [ ] (Optional) Add hero images as WebP

### Testing Tools
- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **Favicon Checker:** https://realfavicongenerator.net/favicon_checker

---

## 🎨 DESIGN GUIDELINES

### Brand Colors (from codebase)
```css
Primary Blue: #3B82F6
Secondary Teal: #14B8A6
Ocean Deep: #0A2540
Light Blue: #60A5FA
Sky Blue: #BFDBFE
```

### Font Stack
- **Headers:** Poppins (weights: 400, 500, 600, 700, 800, 900)
- **Body:** Inter (weights: 300, 400, 500, 600)

### Style Notes
- Use organic, rounded shapes (matches site design)
- Professional but approachable aesthetic
- Clear, readable text
- Houston/Texas theme optional but recommended
- AI/technology visual elements appropriate

---

## 📐 IMAGE SPECIFICATIONS REFERENCE

| Asset Type | Dimensions | Format | Max Size | Purpose |
|------------|------------|--------|----------|---------|
| OG Image | 1200x630 | JPG | 200KB | Social sharing |
| Favicon ICO | 32x32, 16x16 | ICO | 50KB | Browser icon |
| Favicon PNG | 16x16, 32x32 | PNG | 10KB each | Modern browsers |
| Apple Touch | 180x180 | PNG | 30KB | iOS home screen |
| Android Chrome | 192x192, 512x512 | PNG | 50KB, 100KB | Android |
| Logo | 500x500 | PNG | 100KB | Structured data |
| Hero Images | 1920x1080 | WebP | 150KB | Page headers |

---

## 🚀 AFTER ASSETS ARE ADDED

### Update These Files

**1. src/layouts/BaseLayout.astro**
Add favicon links (RealFaviconGenerator provides exact code):
```html
<link rel="icon" type="image/x-icon" href="/Marketing-v3.2/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/Marketing-v3.2/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/Marketing-v3.2/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/Marketing-v3.2/apple-touch-icon.png">
<link rel="manifest" href="/Marketing-v3.2/site.webmanifest">
```

**2. Verify OG Image Path**
Check that these files reference the correct path:
- src/layouts/MainLayout.astro (default ogImage prop)
- All page files using MainLayout

**3. Test Build**
```bash
npm run build
# Check dist/ folder contains all assets
```

---

## 💡 TIPS

### OG Image Best Practices
- Keep important content in the center (sides may be cropped)
- Test at thumbnail size - text should still be readable
- Avoid small text or thin lines
- Use high contrast colors
- Consider dark mode preview

### Favicon Best Practices
- Keep design simple - favicons are tiny
- Use strong shapes, avoid fine details
- Test on white AND dark backgrounds
- Make sure it's recognizable even at 16x16

### Performance Tips
- Compress all images before uploading
- Use WebP for photos, PNG for logos/icons
- Include width/height attributes to prevent layout shift
- Consider lazy loading for below-fold images

---

## 📞 NEED HELP?

If you need design assistance:
1. Check Canva for templates (search "Open Graph" or "Favicon")
2. Use Figma Community templates
3. Hire designer on Fiverr (budget: $20-50 for full package)
4. Use AI tools (Midjourney, DALL-E) for inspiration

**Current Status:** ❌ Assets not yet created
**Next Step:** Create og-image.jpg and favicon package using tools listed above

---

*Last Updated: October 1, 2025*
