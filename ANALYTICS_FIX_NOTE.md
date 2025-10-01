# Analytics Implementation Fix

## Issue Fixed

The initial implementation used dynamic ES module imports (`import('../lib/analytics.js')`) in inline `<script>` tags. This caused browser errors in Astro:

```
Failed to fetch dynamically imported module: /src/lib/analytics.js
```

## Solution

Changed from **centralized external module** to **inline function pattern**. Each component now has a local `trackEvent()` function with the same implementation. This is the recommended pattern for Astro inline scripts.

## Current Implementation

### Pattern Used

Each page/component includes:

```javascript
<script>
  function trackEvent(eventName, props = {}) {
    try {
      if (typeof window === 'undefined') return;

      const payload = {
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        ...props
      };

      console.log('📊 Analytics Event:', eventName, payload);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...payload
      });

      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, payload);
      }
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  }

  // Then use trackEvent() in event listeners...
</script>
```

### Files with Inline trackEvent

- `src/components/GlobalNav.astro`
- `src/pages/pricing.astro`
- `src/pages/about.astro`
- `src/pages/index.astro`

## External Library Status

The files `src/lib/analytics.js` and `src/lib/utm.js` are still available and documented for:

1. **Future use** in client-side components (React, Vue, etc.)
2. **Server-side** analytics needs
3. **Reference** implementation

They are NOT currently imported by any page due to Astro's module resolution limitations with inline scripts.

## Benefits of Current Approach

1. ✅ No module loading errors
2. ✅ Works perfectly with Astro's build system
3. ✅ Consistent implementation across all components
4. ✅ Easy to maintain (copy-paste the trackEvent function)
5. ✅ SSR-safe
6. ✅ No external dependencies

## Tradeoffs

- **Code duplication**: trackEvent function appears in 4 files (~25 lines each)
- **Maintenance**: Changes require updating 4 locations

However, this is a small price to pay for reliability and is the recommended pattern for Astro.

## If You Need the External Module

For framework components (React, Vue, Svelte), you CAN use the external module:

```jsx
// In a React component
import trackEvent from '../../lib/analytics';

function MyComponent() {
  return (
    <button onClick={() => trackEvent('button_click', { label: 'Test' })}>
      Click me
    </button>
  );
}
```

This works because framework components are processed differently than Astro inline scripts.

## Recommendation

**Keep the current inline pattern** for all Astro components and pages. It's simple, works reliably, and is the Astro-recommended approach for inline scripts.

---

**Date:** 2025-09-30
**Status:** ✅ Fixed and Working
