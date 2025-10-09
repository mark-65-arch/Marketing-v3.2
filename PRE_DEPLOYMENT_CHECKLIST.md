# Pre-Deployment Checklist

**Date**: October 9, 2025
**Status**: Ready for Final Review

---

## ✅ Optimizations Completed

### 1. Image Optimization
- [x] **og-image.png**: 249KB → 138KB (45% reduction)
- [x] **maih-logo-leaf.png**: 110KB → 22KB (80% reduction)
- [x] **favicon.svg**: Already optimized at 180KB
- [x] **Total savings**: ~199KB

### 2. Development Files Cleanup
- [x] Removed `cookie-consent-test.astro` (test page)
- [x] Removed `favicon.svg.backup` (212KB)
- [x] Removed `*.original` backup files
- [x] Console logs handled by terser (drop_console: true)

### 3. Domain References Updated
- [x] **sitemap.xml.ts**: Now uses `process.env.SITE` with production fallback
- [x] **seo.ts**: Updated BUSINESS_INFO URLs to `marketingaihouston.com`
- [x] **robots.txt**: Updated sitemap URL and domain references

### 4. Bundle Size Optimization
- [x] Production build successful: 28 pages in 5.07s
- [x] Total dist size: 3.2MB
- [x] CSS assets: ~76KB (minified and optimized)
- [x] Terser minification active (console statements removed)
- [x] CSS code splitting enabled

### 5. Caching Strategy
- [x] `public/_headers` configured for optimal caching
- [x] Static assets: 1 year cache with immutable flag
- [x] HTML pages: No cache, must-revalidate
- [x] Security headers in place

---

## ⚠️ Critical Item (Save for Last)

### **Enable SEO Indexing**
**Location**: [src/layouts/BaseLayout.astro:88](src/layouts/BaseLayout.astro#L88)

**Current state** (DEVELOPMENT):
```html
<meta name="robots" content="noindex, nofollow" />
```

**Change to** (PRODUCTION):
```html
{noindex && <meta name="robots" content="noindex, nofollow" />}
```

**When to do this**: Only after deploying to production domain and verifying everything works correctly.

---

## 📋 Pre-Deployment Testing Checklist

### Critical Functionality
- [ ] **Cookie consent banner** appears on first visit
- [ ] **Cookie consent** persists after acceptance
- [ ] **GTM tracking** fires after accepting cookies
- [ ] **All internal links** work correctly
- [ ] **Language switcher** (EN/ES) functions properly
- [ ] **Contact form** submits successfully
- [ ] **All 28 pages** load without errors

### SEO & Analytics
- [ ] **Meta tags** present on all pages
- [ ] **Structured data** validates (Google Rich Results Test)
- [ ] **Sitemap** accessible at `/sitemap-index.xml`
- [ ] **Robots.txt** accessible and correct
- [ ] **GTM** container loads (check with Tag Assistant)
- [ ] **Consent Mode v2** working (check dataLayer)

### Performance
- [ ] **Lighthouse** score (aim for 90+ on all metrics)
- [ ] **Core Web Vitals** pass
- [ ] **Images** load correctly
- [ ] **Mobile responsiveness** (test on actual devices)
- [ ] **Page load time** < 3 seconds

### Cross-Browser Testing
- [ ] **Chrome** (Desktop & Mobile)
- [ ] **Firefox**
- [ ] **Safari** (Desktop & Mobile)
- [ ] **Edge**

### Legal Pages
- [ ] **Privacy Policy** accurate and complete
- [ ] **Cookie Policy** matches implementation
- [ ] **Terms of Service** reviewed
- [ ] **Accessibility Statement** current
- [ ] **Copyright Notice** up to date

---

## 🚀 Deployment Steps

### 1. Final Build
```bash
# Set production environment
export NODE_ENV=production
export SITE=https://marketingaihouston.com

# Run production build
npm run build

# Verify build output
ls -lh dist/
```

### 2. Deploy to Production
- [ ] Deploy `dist/` folder to production hosting
- [ ] Verify DNS settings point to correct server
- [ ] Ensure SSL certificate is active (HTTPS)
- [ ] Test production URL loads correctly

### 3. Post-Deployment Verification
- [ ] Site loads at `https://marketingaihouston.com`
- [ ] No mixed content warnings
- [ ] All assets load (check browser console)
- [ ] Forms submit correctly
- [ ] GTM fires events
- [ ] Cookie banner functions

### 4. Search Engine Configuration
- [ ] Submit sitemap to **Google Search Console**
- [ ] Submit sitemap to **Bing Webmaster Tools**
- [ ] Verify domain ownership in both consoles
- [ ] Request indexing of homepage
- [ ] Monitor for crawl errors

### 5. **FINAL STEP: Enable Indexing**
Only after everything above is verified:
- [ ] Update [BaseLayout.astro:88](src/layouts/BaseLayout.astro#L88)
- [ ] Remove forced `noindex` directive
- [ ] Rebuild and redeploy
- [ ] Verify robots meta tag is conditional

---

## 📊 Performance Benchmarks

### Current Metrics
- **Build time**: 5.07 seconds
- **Total pages**: 28
- **Total bundle size**: 3.2MB
- **CSS assets**: 76KB
- **Largest image**: 180KB (favicon.svg)

### Target Lighthouse Scores
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

---

## 🔍 Monitoring & Maintenance

### Week 1 Post-Launch
- [ ] Monitor **Google Search Console** for indexing
- [ ] Check **Google Analytics** for traffic
- [ ] Review **GTM** tag firing
- [ ] Watch for **404 errors**
- [ ] Monitor **Core Web Vitals**

### Monthly
- [ ] Review **Analytics** reports
- [ ] Check for **broken links**
- [ ] Update **content** as needed
- [ ] Monitor **security** headers
- [ ] Review **performance** metrics

---

## 📝 Configuration Summary

### Environment Variables
```bash
# Production
SITE=https://marketingaihouston.com
NODE_ENV=production
PUBLIC_GTM_ID=GTM-KQS29VV6
```

### Key Configuration Files
- **Deployment**: `.github/workflows/deploy.yml`
- **SEO**: `src/utils/seo.ts`
- **Analytics**: GTM in `BaseLayout.astro`
- **Sitemap**: Astro sitemap integration
- **Robots**: `public/robots.txt`

---

## ✅ Sign-Off

**Optimizations Completed**: October 9, 2025
**Ready for Deployment**: Pending final testing
**Indexing Enabled**: **NOT YET** - Complete after production verification

---

## 🆘 Troubleshooting

### If GTM doesn't fire
1. Check browser console for errors
2. Use Google Tag Assistant
3. Verify cookie consent was accepted
4. Check GTM container ID

### If pages return 404
1. Verify BASE_URL configuration
2. Check `.htaccess` or hosting redirects
3. Ensure sitemap is correct

### If images don't load
1. Check BASE_URL in image paths
2. Verify images are in `public/` folder
3. Check browser console for errors

### If forms don't submit
1. Test UseBasin endpoint
2. Check browser console
3. Verify CORS settings
4. Test honeypot field

---

**Last Updated**: October 9, 2025
**Next Review**: After production deployment
