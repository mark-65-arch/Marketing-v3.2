# Hero Image Optimization - Quick Reference

## What Was Done

Optimized the Plumber.webp hero image for mobile performance by:

1. **Generated 6 responsive images** (400w, 600w, 780w × WebP/AVIF)
2. **Implemented responsive picture element** with srcset
3. **Removed heavy CSS filters** on mobile devices
4. **Disabled animations** on mobile for better performance
5. **Optimized image preloading** (now loads 400w AVIF)

## Performance Impact

- **Mobile image size**: 56KB → 25KB (56% reduction)
- **Expected LCP improvement**: -1.5s (40% faster)
- **Expected PageSpeed increase**: +15-20 points

## Files Changed

- `src/pages/index.astro` - Picture element + mobile CSS optimizations
- `src/layouts/BaseLayout.astro` - Enhanced image preload detection
- `scripts/generate-responsive-images.js` - New image generation tool
- `public/Plumber-*.{webp,avif}` - 6 new responsive images

## Testing Commands

```bash
# View generated images
ls -lh public/Plumber*.{webp,avif}

# Regenerate images if needed
node scripts/generate-responsive-images.js

# Build and test
npm run build
npm run preview
```

## Next Steps

1. Deploy to production
2. Test with PageSpeed Insights: https://pagespeed.web.dev/
3. Verify mobile performance improvements
4. Check Core Web Vitals in Search Console

## Documentation

See `HERO_IMAGE_OPTIMIZATION_REPORT.md` for complete technical details.
