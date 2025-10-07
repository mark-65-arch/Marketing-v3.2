# 🚀 Final QA & Deployment Checklist

**Branch:** `qa/i18n-final-check`
**Date:** 2025-10-07
**Purpose:** Complete QA validation and deployment preparation for bilingual website

---

## 📋 Table of Contents

1. [Lighthouse Performance Audits](#1-lighthouse-performance-audits)
2. [Cookie Consent & Analytics Verification](#2-cookie-consent--analytics-verification)
3. [SEO Metadata Validation](#3-seo-metadata-validation)
4. [Sitemap & Robots.txt](#4-sitemap--robotstxt)
5. [Visual Regression Testing](#5-visual-regression-testing)
6. [Deployment Checklist](#6-deployment-checklist)
7. [Post-Deployment Verification](#7-post-deployment-verification)

---

## 1. Lighthouse Performance Audits

### 📊 Pages to Audit (Desktop + Mobile)

#### English Pages
- [ ] **Homepage** (`/`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **Contact Page** (`/contact`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **About Page** (`/about`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **Service: Business Profile Optimization** (`/business-profile-optimization`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **Service: Website Design That Converts** (`/website-design-that-converts`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **Service: Pro Website Growth Plan** (`/pro-website-growth-plan`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **Service: SEO Growth Strategy** (`/services/seo-growth-strategy`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **Pricing** (`/pricing`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

#### Spanish Pages
- [ ] **Homepage ES** (`/es/`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **Contact ES** (`/es/contact`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **About ES** (`/es/about`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **Service ES: Business Profile Optimization** (`/es/business-profile-optimization`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

#### Legal Pages (Sample)
- [ ] **Privacy Policy** (`/legal/privacy-policy`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **Cookie Policy** (`/legal/cookie-policy`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **Accessibility Statement** (`/legal/accessibility-statement`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

- [ ] **Terms of Service** (`/legal/terms-of-service`)
  - Desktop: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___
  - Mobile: Performance ___ | Accessibility ___ | Best Practices ___ | SEO ___

### 🎯 Target Scores
- **Performance:** ≥90
- **Accessibility:** 100
- **Best Practices:** ≥95
- **SEO:** 100

### 📝 Common Issues to Check
- [ ] Image optimization (WebP format, proper sizing)
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Proper heading hierarchy (no skipped levels)
- [ ] Alt text on all images
- [ ] ARIA labels on interactive elements
- [ ] Color contrast ratios (WCAG AA: 4.5:1 for text)

---

## 2. Cookie Consent & Analytics Verification

### 🍪 Cookie Banner Tests

#### English Version
- [ ] Cookie banner appears on first visit (`/`)
- [ ] Banner shows correct English text
- [ ] "Accept All" button works
- [ ] "Reject All" button works
- [ ] "Cookie Settings" link opens detailed preferences
- [ ] Preference persists across page navigation
- [ ] Preference persists after browser close/reopen
- [ ] Banner does NOT reappear after consent given

#### Spanish Version
- [ ] Cookie banner appears on first visit (`/es/`)
- [ ] Banner shows correct Spanish text
- [ ] "Aceptar Todo" button works
- [ ] "Rechazar Todo" button works
- [ ] "Configuración de Cookies" link opens detailed preferences
- [ ] Preference persists across page navigation
- [ ] Preference persists after browser close/reopen
- [ ] Banner does NOT reappear after consent given

### 📊 Analytics Enforcement

#### With Consent ("Accept All")
- [ ] GTM container loads (`GTM-XXXXXXX`)
- [ ] GA4 tracking code fires (`G-XXXXXXXXXX`)
- [ ] Page views recorded in GA4 real-time report
- [ ] Events fire correctly (button clicks, form submissions)
- [ ] Console shows no cookie consent errors

#### Without Consent ("Reject All")
- [ ] GTM container does NOT load
- [ ] GA4 tracking code does NOT fire
- [ ] No GA cookies set (`_ga`, `_gid`, etc.)
- [ ] No GTM cookies set
- [ ] Console shows analytics blocked (if logging enabled)

### 🔍 Developer Tools Verification
```bash
# Check cookies in browser DevTools (Application > Cookies)
# Should see:
# - cookie_consent_status (essential, always present)
# - _ga, _gid, _gat (only if accepted)
```

---

## 3. SEO Metadata Validation

### 🔍 Meta Tags to Verify (All Pages)

#### Title Tags
- [ ] Unique on every page
- [ ] 50-60 characters
- [ ] Includes brand name ("| Marketing AI Houston")
- [ ] Translated correctly in `/es/` pages
- [ ] No duplicate titles across site

#### Meta Descriptions
- [ ] Unique on every page
- [ ] 150-160 characters
- [ ] Compelling, includes CTA
- [ ] Translated correctly in `/es/` pages
- [ ] No duplicate descriptions across site

#### Canonical URLs
- [ ] Present on all pages
- [ ] Points to correct absolute URL
- [ ] English pages: `https://marketingaihouston.com/[BASE_URL][page]`
- [ ] Spanish pages: `https://marketingaihouston.com/[BASE_URL]es/[page]`
- [ ] No trailing slashes (except root)

#### Hreflang Tags
- [ ] All pages have 3 hreflang tags: `en`, `es`, `x-default`
- [ ] Uses absolute URLs
- [ ] English version: `<link rel="alternate" hreflang="en" href="..." />`
- [ ] Spanish version: `<link rel="alternate" hreflang="es" href="..." />`
- [ ] Default: `<link rel="alternate" hreflang="x-default" href="[EN_URL]" />`
- [ ] URLs match canonical structure
- [ ] No self-referential hreflang conflicts

### 📊 Structured Data (JSON-LD)

#### LocalBusiness Schema (All Pages)
- [ ] Present on all pages
- [ ] Includes: `@type`, `name`, `address`, `telephone`, `url`, `image`
- [ ] Valid JSON (no syntax errors)
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

#### WebPage Schema (All Pages)
- [ ] Present on all pages
- [ ] Includes: `@type`, `name`, `description`, `url`, `isPartOf`
- [ ] Valid JSON
- [ ] References LocalBusiness schema via `@id`

#### BreadcrumbList Schema (Service Pages)
- [ ] Present on service detail pages
- [ ] Correct hierarchy: Home > Service
- [ ] Translated labels in Spanish pages
- [ ] Valid JSON

#### FAQPage Schema (Service Pages)
- [ ] Present on pages with FAQ sections
- [ ] Each Q&A has `Question` and `Answer` types
- [ ] Translated content in Spanish pages
- [ ] Valid JSON

#### Service Schema (Service Pages)
- [ ] Present on service detail pages
- [ ] Includes: `@type`, `name`, `description`, `provider`, `areaServed`
- [ ] Valid JSON

### 🛠️ Validation Tools
```bash
# Validate structured data:
# 1. View page source, copy JSON-LD script content
# 2. Paste into: https://search.google.com/test/rich-results
# 3. Verify no errors or warnings

# Check hreflang:
# 1. View page source, search for 'hreflang'
# 2. Verify 3 tags present with correct URLs
```

---

## 4. Sitemap & Robots.txt

### 🗺️ Sitemap Generation

#### Sitemap.xml Requirements
- [x] **Created:** `/public/sitemap.xml`
- [x] **Includes all public pages:**
  - English: 16 pages (homepage, services, contact, about, pricing, legal pages)
  - Spanish: 13 pages (/es/ equivalents)
- [x] **Format:** XML with `<urlset>`, `<url>`, `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`
- [x] **Absolute URLs:** Use `https://marketingaihouston.com/[BASE_URL]...`
- [x] **Priority values:**
  - Homepage: 1.0
  - Service pages: 0.9
  - Contact/About: 0.8
  - Legal pages: 0.5
- [x] **Change frequency:**
  - Homepage: weekly
  - Service pages: monthly
  - Legal pages: yearly

#### Verification Steps
- [ ] Build site: `npm run build`
- [ ] Verify sitemap exists in `dist/sitemap.xml`
- [ ] Open in browser, check XML syntax
- [ ] Validate at: https://www.xml-sitemaps.com/validate-xml-sitemap.html
- [ ] Ensure no 404s in listed URLs

### 🤖 Robots.txt

#### Robots.txt Requirements
- [x] **Created:** `/public/robots.txt`
- [x] **Contents:**
  ```
  User-agent: *
  Allow: /

  Sitemap: https://marketingaihouston.com/Marketing-v3.2/sitemap.xml
  ```

#### Verification Steps
- [ ] Verify `robots.txt` exists in `public/` directory
- [ ] Check in `dist/robots.txt` after build
- [ ] Test at: https://www.google.com/robots.txt (after deployment)
- [ ] Validate sitemap URL is correct (includes BASE_URL)

---

## 5. Visual Regression Testing

### 📸 Screenshot Comparison

#### English vs Spanish (Same Page, Different Languages)
- [ ] Homepage: `/` vs `/es/`
- [ ] Contact: `/contact` vs `/es/contact`
- [ ] About: `/about` vs `/es/about`
- [ ] Service: `/business-profile-optimization` vs `/es/business-profile-optimization`

**Expected:** Same layout, spacing, colors, images. Only text differs.

#### Desktop vs Mobile (Same Page)
- [ ] Homepage (EN): Desktop vs Mobile
- [ ] Homepage (ES): Desktop vs Mobile
- [ ] Contact (EN): Desktop vs Mobile
- [ ] Service (EN): Desktop vs Mobile

**Expected:** Responsive layout changes, no broken elements.

### 🔍 Visual Checks

#### Layout Integrity
- [ ] No broken grids or flexbox layouts
- [ ] No text overflow or truncation
- [ ] No overlapping elements
- [ ] Proper spacing between sections
- [ ] Images load and display correctly
- [ ] Icons render properly (Font Awesome)

#### Typography
- [ ] Font families load (Poppins, Inter)
- [ ] Headings hierarchy consistent (H1 > H2 > H3)
- [ ] Line heights comfortable (1.5-1.75)
- [ ] Letter spacing appropriate
- [ ] Text color contrast meets WCAG AA (4.5:1)

#### Interactive Elements
- [ ] Buttons hover states work
- [ ] Links change color on hover
- [ ] Language switcher dropdown opens
- [ ] Mobile menu toggles correctly
- [ ] Forms display properly
- [ ] Focus indicators visible (Tab key)

#### Responsive Breakpoints
- [ ] Mobile: 320px, 375px, 425px
- [ ] Tablet: 768px, 1024px
- [ ] Desktop: 1280px, 1440px, 1920px

---

## 6. Deployment Checklist

### 🔐 Environment Variables

#### Required for Production
```bash
# Google Tag Manager (Analytics)
GTM_CONTAINER_ID=GTM-XXXXXXX

# Google Analytics 4
GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Site Configuration
SITE=https://marketingaihouston.com
BASE_URL=/Marketing-v3.2/

# Node Environment
NODE_ENV=production
```

#### Verification
- [ ] GTM container ID is correct (check GTM dashboard)
- [ ] GA4 measurement ID is correct (check GA4 property settings)
- [ ] SITE URL matches production domain
- [ ] BASE_URL matches GitHub Pages path

### 📦 Build Process

#### Pre-Build Checks
- [ ] All dependencies installed: `npm install`
- [ ] No TypeScript errors: `npm run astro check`
- [ ] Tailwind config valid
- [ ] No console errors in dev mode

#### Build Command
```bash
NODE_ENV=production npm run build
```

#### Post-Build Verification
- [ ] Build completes without errors
- [ ] Output directory: `dist/`
- [ ] Page count: 29 pages (16 EN + 13 ES)
- [ ] File sizes reasonable (HTML < 100KB, CSS < 50KB)
- [ ] Sitemap.xml present in `dist/`
- [ ] Robots.txt present in `dist/`
- [ ] Assets optimized (images, fonts)

### 🚀 Deployment Steps

#### Branch Merge Order
1. [ ] Ensure all changes committed on `qa/i18n-final-check`
2. [ ] Merge `qa/i18n-final-check` → `i18n/lang-switcher-hreflang`
3. [ ] Merge `i18n/lang-switcher-hreflang` → `i18n/translate-services-detail`
4. [ ] Merge `i18n/translate-services-detail` → `main`

**OR** (if branches already merged):
1. [ ] Merge `qa/i18n-final-check` → `main`

#### GitHub Actions Workflow
- [ ] Workflow file exists: `.github/workflows/deploy.yml`
- [ ] Workflow triggers on push to `main`
- [ ] Build step: `npm run build`
- [ ] Deploy step: GitHub Pages deployment action
- [ ] Environment variables set in GitHub repo settings

#### Manual Deployment (if needed)
```bash
# Build for production
NODE_ENV=production npm run build

# Deploy dist/ to gh-pages branch
# (GitHub Actions should handle this automatically)
```

### 🔄 Rollback Plan

#### If Deployment Fails
1. [ ] Check GitHub Actions logs for errors
2. [ ] Revert merge to `main`: `git revert [commit-hash]`
3. [ ] Push revert: `git push origin main`
4. [ ] Wait for re-deployment (previous version)

#### Emergency Rollback
```bash
# Revert to previous commit
git checkout main
git reset --hard HEAD~1
git push --force origin main

# WARNING: Only use if critical bug in production
```

---

## 7. Post-Deployment Verification

### 🌐 Live Site Checks

#### Homepage
- [ ] Loads without errors
- [ ] Language switcher visible and functional
- [ ] EN → ES switch preserves homepage
- [ ] Mobile menu works
- [ ] All images load
- [ ] Forms submit correctly

#### Spanish Pages
- [ ] `/es/` loads with Spanish content
- [ ] `/es/contact` loads correctly
- [ ] `/es/about` loads correctly
- [ ] Service pages load: `/es/business-profile-optimization`, etc.

#### Analytics
- [ ] GTM container loads (check Network tab)
- [ ] GA4 tracking fires (check real-time report)
- [ ] Cookie consent banner appears
- [ ] Opt-out blocks tracking

#### SEO Tools
- [ ] Submit sitemap to Google Search Console
- [ ] Verify hreflang tags in GSC
- [ ] Check mobile usability report
- [ ] Run PageSpeed Insights on key pages

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### 📊 Monitoring Setup

#### Google Search Console
- [ ] Add both `https://marketingaihouston.com` and `https://marketingaihouston.com/Marketing-v3.2/` properties
- [ ] Submit sitemap
- [ ] Verify ownership
- [ ] Monitor coverage report for errors

#### Google Analytics 4
- [ ] Verify real-time traffic
- [ ] Create custom events for language switching
- [ ] Set up conversion tracking (form submissions, calls)
- [ ] Create audience segments (EN vs ES users)

#### Uptime Monitoring
- [ ] Set up monitoring service (UptimeRobot, Pingdom, etc.)
- [ ] Monitor: `https://marketingaihouston.com/Marketing-v3.2/`
- [ ] Alert on downtime > 5 minutes

---

## ✅ Final Sign-Off

### Pre-Deployment
- [ ] All Lighthouse audits pass (≥90 performance, 100 accessibility)
- [ ] Cookie consent works in both languages
- [ ] All SEO metadata validated
- [ ] Sitemap generated and valid
- [ ] Visual regression tests pass
- [ ] Build succeeds without errors

### Post-Deployment
- [ ] Live site loads correctly
- [ ] Analytics tracking verified
- [ ] Google Search Console configured
- [ ] Monitoring set up
- [ ] Team notified of deployment

### Documentation
- [ ] TRANSLATION_QA_CHECKLIST.md updated
- [ ] LANG_SWITCHER_QA.md updated
- [ ] WEBSITE_STRUCTURE.md updated
- [ ] FINAL_QA_DEPLOYMENT_CHECKLIST.md (this file) completed

---

**Deployment Date:** ___________
**Deployed By:** ___________
**Build Number:** ___________
**Rollback Tested:** [ ] Yes [ ] No

---

## 📞 Emergency Contacts

**Developer:** [Your Name]
**Email:** team@marketingaihouston.com
**Phone:** (281) 544-0572

**Hosting:** GitHub Pages
**DNS Provider:** [Your DNS Provider]
**Analytics:** Google Analytics 4

---

_Last Updated: 2025-10-07_
