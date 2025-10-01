# Pull Request: Site-Wide Analytics Instrumentation

## Summary

Implemented comprehensive analytics tracking across the entire site using a centralized, SSR-safe wrapper. Replaced 4 duplicate `trackEvent` implementations with a single source of truth. Added proper data attributes for QA testing and standardized all event payloads.

---

## Changes Made

### New Files

1. **`src/lib/analytics.js`** (+200 lines)
   - Centralized analytics wrapper with SSR safety
   - Auto-enriches payloads with timestamp and page
   - Supports both GTM (dataLayer) and GA4 (gtag)
   - Helper functions for common event types
   - Debug mode for development

2. **`src/lib/utm.js`** (+200 lines)
   - UTM parameter utilities
   - Safe URL manipulation
   - Campaign link builder
   - UTM storage/retrieval

3. **`ANALYTICS_IMPLEMENTATION.md`**
   - Complete documentation
   - Event catalog with payload schemas
   - Testing instructions
   - Integration guide

### Modified Files

1. **`src/components/GlobalNav.astro`**
   - Replaced inline `trackEvent` with centralized wrapper
   - Improved payload structure for `nav_link_click` and `nav_cta_click`
   - Added proper href tracking

2. **`src/pages/pricing.astro`**
   - Added data attributes: `data-plan-id`, `data-plan-name`, `data-plan-price`, `data-cta-label`
   - Added `data-learn-more` and `data-custom-inquiry` attributes
   - Implemented `pricing_cta_click`, `pricing_learn_more_click`, `pricing_custom_inquiry_click`
   - Improved `faq_toggle` tracking with open/close actions

3. **`src/pages/about.astro`**
   - Replaced inline `trackEvent` with centralized wrapper
   - Standardized event names

4. **`src/pages/index.astro`**
   - Replaced inline `trackEvent` with centralized wrapper
   - Standardized event names to `link_navigation` with context

---

## Event Catalog

### Navigation Events
- `nav_link_click` - Any nav link clicked
- `nav_cta_click` - Any CTA button clicked
- `nav_menu_open` - Mobile menu opened
- `nav_menu_close` - Mobile menu closed

### Pricing Events
- `pricing_cta_click` - Plan CTA clicked (includes plan, price, label)
- `pricing_learn_more_click` - "Learn more" link clicked
- `pricing_custom_inquiry_click` - Custom/monthly inquiry link clicked
- `faq_toggle` - FAQ accordion opened/closed (includes question ID, text, action)

### Generic Events
- `link_navigation` - Notable in-content links (includes context)

---

## Example Payloads

### pricing_cta_click
```javascript
{
  plan: "Growth",
  planId: "growth",
  price: "$1,497",
  ctaLabel: "Book a FREE Discovery Call",
  timestamp: "2025-09-30T21:15:45.456Z",
  page: "/pricing"
}
```

### faq_toggle
```javascript
{
  questionId: "need-website",
  questionText: "Do I need a website first?",
  action: "open",  // or "close"
  timestamp: "2025-09-30T21:16:12.789Z",
  page: "/pricing"
}
```

### nav_link_click
```javascript
{
  label: "Pricing",
  href: "/pricing",
  link_type: "nav-link",
  timestamp: "2025-09-30T21:15:30.123Z",
  page: "/"
}
```

---

## QA Checklist

### Functional Testing
- [x] Analytics wrapper works in browser (no SSR errors)
- [x] Debug logs appear in console during development
- [x] All events push to `window.dataLayer`
- [x] No navigation blocking or UI freezes
- [x] No unhandled exceptions

### GlobalNav
- [x] Navigation link clicks generate `nav_link_click`
- [x] CTA buttons generate `nav_cta_click`
- [x] Mobile menu generates `nav_menu_open` and `nav_menu_close`
- [x] Payloads include correct label and href

### Pricing Page
- [x] Plan CTAs generate `pricing_cta_click` with plan metadata
- [x] "Learn more" links generate `pricing_learn_more_click`
- [x] Custom/monthly links generate `pricing_custom_inquiry_click`
- [x] FAQ toggles generate `faq_toggle` with correct action

### Data Attributes
- [x] All instrumented elements have proper `data-*` attributes
- [x] Attributes are accessible for automated testing

---

## Testing Locally

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Open Browser Console
Navigate to http://localhost:4321/ and open DevTools Console (F12).

### 3. Test Events

**Navigation:**
- Click any nav link → Check for `nav_link_click` event
- Click "Book a Discovery Call" → Check for `nav_cta_click` event
- Open mobile menu → Check for `nav_menu_open` event

**Pricing Page:**
- Navigate to `/pricing`
- Click plan CTA → Check for `pricing_cta_click` with plan details
- Click "Learn more" → Check for `pricing_learn_more_click`
- Click "Custom pricing" → Check for `pricing_custom_inquiry_click`
- Open FAQ → Check for `faq_toggle` with action: "open"
- Close FAQ → Check for `faq_toggle` with action: "close"

### 4. Verify dataLayer

In console:
```javascript
console.log(window.dataLayer);
```

Should show array of event objects with proper structure.

---

## Console Output Examples

```
📊 Analytics Event: nav_link_click {label: "Pricing", href: "/pricing", ...}
📊 Analytics Event: pricing_cta_click {plan: "Growth", price: "$1,497", ...}
📊 Analytics Event: faq_toggle {questionId: "need-website", action: "open", ...}
```

---

## Code Quality

### Before (Duplicate Implementations)
- 4 separate `trackEvent` functions (~80 lines duplicated)
- Inconsistent payload structures
- No centralized debug control
- Missing data attributes for QA

### After (Centralized)
- 1 analytics wrapper (~200 lines, reusable)
- Consistent payload structures across all events
- Centralized debug control
- Complete data attributes for automated testing
- SSR-safe with proper error handling

---

## Migration Notes

### Replaced Implementations
- `GlobalNav.astro` - Removed inline `trackEvent` (lines 558-575)
- `pricing.astro` - Removed inline `trackEvent` (lines 582-595)
- `about.astro` - Removed inline `trackEvent` (lines 418-433)
- `index.astro` - Removed inline `trackEvent` (lines 1329-1346)

### Breaking Changes
None. All existing analytics continue to work, but with improved payload structures.

---

## Next Steps (Optional)

1. Add GTM container ID to `BaseLayout.astro`
2. Configure GTM triggers for each event name
3. Set up GA4 event forwarding
4. Add conversion tracking for form submissions
5. Consider adding scroll depth tracking
6. Consider adding external link tracking

---

## Documentation

See `ANALYTICS_IMPLEMENTATION.md` for:
- Complete event catalog
- Payload schemas
- API documentation
- Integration guides
- Maintenance instructions

---

**Status:** ✅ Ready for Review
**Testing:** ✅ All manual tests passed
**Documentation:** ✅ Complete
**Breaking Changes:** ❌ None
