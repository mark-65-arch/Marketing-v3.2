# Lighthouse Testing Instructions

## Running Lighthouse Locally

### Prerequisites

```bash
# Install Lighthouse CLI globally
npm install -g lighthouse

# Or use npx (no install needed)
npx lighthouse --version
```

### Testing the Production Build

1. **Build the production version:**
   ```bash
   npm run build
   ```

2. **Start the preview server:**
   ```bash
   npm run preview
   ```
   This will start a local server at `http://localhost:4321`

3. **Run Lighthouse audit:**
   ```bash
   # Using installed Lighthouse
   lighthouse http://localhost:4321/Marketing-v3.2/ \
     --output=html \
     --output=json \
     --output-path=./lighthouse-report \
     --only-categories=performance,accessibility,best-practices,seo \
     --chrome-flags="--headless --no-sandbox"

   # Or using npx
   npx lighthouse http://localhost:4321/Marketing-v3.2/ \
     --output=html \
     --output=json \
     --output-path=./lighthouse-report \
     --only-categories=performance,accessibility,best-practices,seo \
     --chrome-flags="--headless --no-sandbox"
   ```

4. **View the report:**
   ```bash
   # Open HTML report in browser
   open lighthouse-report.report.html

   # Or on Linux
   xdg-open lighthouse-report.report.html
   ```

### Testing Multiple Pages

Create a script to test all important pages:

```bash
#!/bin/bash

# Start preview server in background
npm run preview &
SERVER_PID=$!

# Wait for server to start
sleep 3

BASE_URL="http://localhost:4321/Marketing-v3.2"

# Test pages
pages=(
  "/"
  "/legal/privacy-policy"
  "/legal/cookie-policy"
  "/legal/accessibility-statement"
  "/legal/terms-of-service"
  "/pricing"
  "/contact"
)

for page in "${pages[@]}"; do
  echo "Testing: $page"
  lighthouse "$BASE_URL$page" \
    --output=html \
    --output-path="./lighthouse-$(echo $page | tr '/' '-').report.html" \
    --only-categories=performance,accessibility,best-practices,seo \
    --quiet
done

# Kill preview server
kill $SERVER_PID
```

## Testing on GitHub Pages (Live Site)

```bash
# Test the live deployed site
lighthouse https://mark-65-arch.github.io/Marketing-v3.2/ \
  --output=html \
  --output=json \
  --output-path=./lighthouse-production \
  --only-categories=performance,accessibility,best-practices,seo
```

## Using Chrome DevTools

Alternative to CLI - use built-in Lighthouse in Chrome:

1. Open the site in Chrome
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Select categories: Performance, Accessibility, Best Practices, SEO
5. Choose "Desktop" or "Mobile"
6. Click "Analyze page load"

## Using PageSpeed Insights

Online tool (no installation needed):

1. Visit https://pagespeed.web.dev/
2. Enter URL: `https://mark-65-arch.github.io/Marketing-v3.2/`
3. Click "Analyze"
4. Review both Mobile and Desktop scores

## Target Scores

### Desktop

| Category | Target | Critical for |
|----------|--------|--------------|
| Performance | 90-100 | Core Web Vitals, ranking |
| Accessibility | 95-100 | WCAG compliance, usability |
| Best Practices | 95-100 | Security, browser compatibility |
| SEO | 100 | Search rankings, discoverability |

### Mobile

| Category | Target | Critical for |
|----------|--------|--------------|
| Performance | 85-100 | Mobile-first indexing |
| Accessibility | 95-100 | Mobile users, touch targets |
| Best Practices | 95-100 | Mobile-specific security |
| SEO | 100 | Mobile search visibility |

## Key Metrics to Monitor

### Core Web Vitals

1. **LCP (Largest Contentful Paint)**: < 2.5s
   - Measures loading performance
   - Should occur within first 2.5 seconds

2. **FID (First Input Delay)**: < 100ms
   - Measures interactivity
   - Time from user interaction to browser response

3. **CLS (Cumulative Layout Shift)**: < 0.1
   - Measures visual stability
   - No unexpected layout shifts

### Additional Metrics

4. **FCP (First Contentful Paint)**: < 1.8s
   - Time to first visible content

5. **SI (Speed Index)**: < 3.4s
   - How quickly content is visually displayed

6. **TBT (Total Blocking Time)**: < 200ms
   - Sum of all time between FCP and TTI

7. **TTI (Time to Interactive)**: < 3.8s
   - When page becomes fully interactive

## Interpreting Results

### Performance Opportunities

Common issues and solutions:

- **Render-blocking resources**: Check if fonts are preloaded
- **Unused CSS/JS**: Verify Tailwind purge is working
- **Image optimization**: Confirm Sharp is processing images
- **Cache policy**: Verify `_headers` file is deployed

### Accessibility Checks

- **Color contrast**: All text must meet WCAG AA standards
- **Alt text**: All images must have descriptive alt attributes
- **ARIA labels**: Interactive elements properly labeled
- **Keyboard navigation**: All functionality accessible via keyboard

### Best Practices

- **HTTPS**: Site served over secure connection
- **Console errors**: No JavaScript errors in console
- **Deprecated APIs**: No deprecated browser features used
- **Security headers**: CSP, X-Frame-Options properly set

## Troubleshooting

### Lighthouse Won't Run

```bash
# Check if Chrome is installed
which google-chrome

# Set CHROME_PATH if needed
export CHROME_PATH=/usr/bin/google-chrome
lighthouse <url>

# Use Chromium instead
export CHROME_PATH=/usr/bin/chromium-browser
```

### Server Not Starting

```bash
# Check if port 4321 is already in use
lsof -i :4321

# Kill existing process
kill -9 <PID>

# Or use different port
astro preview --port 4322
```

### Low Performance Scores Locally

- Local builds don't have CDN acceleration
- Disable browser extensions during testing
- Use incognito mode to avoid cached resources
- Test on production (GitHub Pages) for accurate CDN results

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:4321/Marketing-v3.2/
          uploadArtifacts: true
```

## Visual Regression Testing

### Manual Screenshots

Test pages at these viewport sizes:

**Mobile:**
- 375 x 667 (iPhone SE)
- 390 x 844 (iPhone 12/13)
- 360 x 800 (Android)

**Tablet:**
- 768 x 1024 (iPad)
- 820 x 1180 (iPad Air)

**Desktop:**
- 1920 x 1080 (Full HD)
- 1366 x 768 (Common laptop)
- 2560 x 1440 (2K)

### Automated Screenshots (Percy, Chromatic)

Consider using visual regression services:
- Percy.io
- Chromatic
- BackstopJS
- Playwright visual testing

## Continuous Monitoring

### Post-Deployment Checks

1. Run Lighthouse on production URL immediately after deployment
2. Compare scores with baseline
3. Monitor Core Web Vitals in Search Console
4. Set up alerts for performance degradation

### Tools for Monitoring

- **Google Search Console**: Real User Metrics (RUM)
- **PageSpeed Insights API**: Automated testing
- **WebPageTest**: Detailed waterfall analysis
- **Cloudflare Analytics**: CDN-level metrics (if using Cloudflare)

## Documentation

All Lighthouse reports should be committed to the repository:

```
/lighthouse-reports/
  ├── baseline/
  │   ├── home.report.html
  │   ├── privacy.report.html
  │   └── ...
  └── optimized/
      ├── home.report.html
      ├── privacy.report.html
      └── ...
```

## Notes

- Lighthouse scores can vary ±5 points between runs (normal)
- Test 3 times and take median score for accuracy
- Mobile scores are typically 10-20 points lower than desktop (expected)
- GitHub Pages has CDN built-in (Fastly) for optimal performance
- Cache headers work on GitHub Pages via `_headers` file
