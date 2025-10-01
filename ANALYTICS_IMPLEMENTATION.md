# Analytics Implementation - Complete Documentation

## ✅ Status: FULLY IMPLEMENTED

All site-wide analytics instrumentation has been completed using a centralized, SSR-safe wrapper.

---

## Summary of Changes

### New Files Created

1. **`src/lib/analytics.js`** - Centralized analytics wrapper
   - SSR-safe tracking function
   - Auto-normalizes payloads with timestamp and page
   - Supports both Google Tag Manager (dataLayer) and GA4 (gtag)
   - Debug mode for development
   - Helper functions for common event types

2. **`src/lib/utm.js`** - UTM parameter helper
   - Safe URL parameter appending
   - Prevents duplicate parameters
   - Utilities for UTM storage and retrieval
   - Campaign link builder

### Files Updated

1. **`src/components/GlobalNav.astro`**
   - Replaced inline trackEvent with centralized wrapper
   - Updated nav_link_click events with proper label and href
   - Updated nav_cta_click events with location context
   - Menu open/close events now use centralized tracking

2. **`src/pages/pricing.astro`**
   - Added data attributes to all pricing CTAs (`data-plan-id`, `data-plan-name`, `data-plan-price`, `data-cta-label`)
   - Added data attributes to "Learn More" links (`data-learn-more`, `data-target-href`)
   - Added data attributes to custom inquiry links (`data-custom-inquiry`)
   - Implemented pricing_cta_click tracking
   - Implemented pricing_learn_more_click tracking
   - Implemented pricing_custom_inquiry_click tracking
   - Implemented FAQ accordion tracking (faq_toggle)
   - Updated all tracking to use centralized wrapper

3. **`src/pages/about.astro`**
   - Updated CTA tracking to use centralized wrapper
   - Standardized event names to nav_cta_click

4. **`src/pages/index.astro`**
   - Updated all pricing section tracking to use centralized wrapper
   - Standardized event names to link_navigation with context

---

## Event Names and Payloads

### 1. Navigation Events

#### `nav_link_click`
Triggered when any navigation link is clicked.

**Payload:**
```javascript
{
  label: "Pricing",              // Link text or identifier
  href: "/pricing",              // Destination URL
  link_type: "nav-link",         // Type identifier from data attribute
  service: "Business Profile",   // Service name (if applicable)
  timestamp: "2025-09-30T...",   // Auto-added
  page: "/about"                 // Auto-added (current page)
}
```

**Data Attributes:**
- `data-track-nav="nav-link"`
- `data-page="pricing"`
- `data-service="Business Profile"` (optional)

---

#### `nav_cta_click`
Triggered when CTA buttons are clicked.

**Payload:**
```javascript
{
  label: "Book a Discovery Call", // CTA text
  href: "/contact",               // Destination URL
  location: "nav-primary-cta",    // Where CTA appears
  timestamp: "2025-09-30T...",    // Auto-added
  page: "/"                       // Auto-added
}
```

**Data Attributes:**
- `data-track-cta="nav-primary-cta"`
- `data-cta-label="Book a Discovery Call"`

---

#### `nav_menu_open`
Triggered when mobile menu opens.

**Payload:**
```javascript
{
  timestamp: "2025-09-30T...",
  page: "/"
}
```

---

#### `nav_menu_close`
Triggered when mobile menu closes.

**Payload:**
```javascript
{
  timestamp: "2025-09-30T...",
  page: "/"
}
```

---

### 2. Pricing Events

#### `pricing_cta_click`
Triggered when pricing card CTA buttons are clicked.

**Payload:**
```javascript
{
  plan: "Growth",                     // Plan name
  planId: "growth",                   // Plan identifier
  price: "$1,497",                    // Plan price
  ctaLabel: "Book a FREE Discovery Call", // Button text
  timestamp: "2025-09-30T...",
  page: "/pricing"
}
```

**Data Attributes:**
- `data-plan-id="growth"`
- `data-plan-name="Growth"`
- `data-plan-price="$1,497"`
- `data-cta-label="Book a FREE Discovery Call"`

---

#### `pricing_learn_more_click`
Triggered when "Learn more" links are clicked.

**Payload:**
```javascript
{
  plan: "Growth",                         // Plan name
  planId: "growth",                       // Plan identifier
  targetHref: "/website-design-that-converts", // Destination
  timestamp: "2025-09-30T...",
  page: "/pricing"
}
```

**Data Attributes:**
- `data-learn-more`
- `data-plan-id="growth"`
- `data-plan-name="Growth"`
- `data-target-href="/website-design-that-converts"`

---

#### `pricing_custom_inquiry_click`
Triggered when custom pricing or monthly packages links are clicked.

**Payload:**
```javascript
{
  option: "custom",  // or "monthly"
  timestamp: "2025-09-30T...",
  page: "/pricing"
}
```

**Data Attributes:**
- `data-custom-inquiry="custom"` or `data-custom-inquiry="monthly"`

---

### 3. FAQ Events

#### `faq_toggle`
Triggered when FAQ accordion is opened or closed.

**Payload:**
```javascript
{
  questionId: "need-website",           // Unique question ID
  questionText: "Do I need a website first?", // Full question
  action: "open",                       // or "close"
  timestamp: "2025-09-30T...",
  page: "/pricing"
}
```

**Data Attributes:**
- `data-track-faq="need-website"`

---

### 4. Generic Link Events

#### `link_navigation`
Triggered for notable in-content links.

**Payload:**
```javascript
{
  label: "Custom pricing",             // Link text
  href: "/contact",                    // Destination
  context: "homepage_pricing_section", // Origin context
  timestamp: "2025-09-30T...",
  page: "/"
}
```

**Context values:**
- `homepage_pricing_card`
- `homepage_pricing_section`
- `homepage_commitments`
- `about_hero`
- etc.

---

## Analytics Wrapper API

### Core Function

```javascript
import trackEvent from './lib/analytics';

trackEvent('event_name', {
  // your custom properties
});
```

### Helper Functions

```javascript
import {
  trackNavigation,
  trackCTA,
  trackMenu,
  trackFAQ,
  trackPricingCTA,
  trackLearnMore,
  trackCustomInquiry
} from './lib/analytics';

// Navigation link
trackNavigation('Pricing', '/pricing', 'header');

// CTA button
trackCTA('Book a Call', '/contact', 'pricing_card');

// Menu toggle
trackMenu('open', 'mobile');

// FAQ accordion
trackFAQ('need-website', 'Do I need a website?', 'open');

// Pricing CTA
trackPricingCTA('Growth', 'growth', '$1,497', 'Book a Call');

// Learn More link
trackLearnMore('Growth', 'growth', '/service-page');

// Custom inquiry
trackCustomInquiry('custom');
```

### Debug Mode

```javascript
import { enableDebug } from './lib/analytics';

// Enable console logging
enableDebug(true);

// Disable console logging
enableDebug(false);
```

Debug mode is automatically enabled when `process.env.NODE_ENV === 'development'`.

---

## UTM Helper API

### Add UTM Parameters

```javascript
import { addUtm } from './lib/utm';

const url = addUtm('/pricing', {
  utm_source: 'newsletter',
  utm_medium: 'email',
  utm_campaign: 'spring_promo'
});
// Returns: /pricing?utm_source=newsletter&utm_medium=email&utm_campaign=spring_promo
```

### Campaign Link Builder

```javascript
import { addCampaignUtm } from './lib/utm';

const link = addCampaignUtm(
  '/pricing',
  'facebook',  // source
  'social',    // medium
  'launch'     // campaign
);
```

### UTM Storage

```javascript
import { storeUtmParams, getStoredUtmParams } from './lib/utm';

// Store UTM params from URL (30 min expiry default)
storeUtmParams();

// Retrieve stored params
const params = getStoredUtmParams();
// Returns: { utm_source: 'google', utm_campaign: 'cpc' }
```

---

## QA Checklist

### Core Functionality
- [x] Analytics wrapper created and SSR-safe
- [x] Debug mode works in development
- [x] All events push to dataLayer
- [x] All events include timestamp and page
- [x] No navigation blocking
- [x] No unhandled exceptions

### GlobalNav
- [x] nav_link_click events fire for all nav links
- [x] nav_cta_click events fire for CTA buttons
- [x] nav_menu_open fires when hamburger opens
- [x] nav_menu_close fires when hamburger closes
- [x] All data attributes present

### Pricing Page
- [x] pricing_cta_click fires for all plan CTAs
- [x] pricing_learn_more_click fires for "Learn more" links
- [x] pricing_custom_inquiry_click fires for custom/monthly links
- [x] faq_toggle fires with correct action (open/close)
- [x] All data attributes present
- [x] Payloads include plan metadata

### About Page
- [x] nav_cta_click fires for all CTAs
- [x] Events include proper location context

### Home Page
- [x] link_navigation fires for pricing section links
- [x] Events include proper context

---

## Testing Instructions

### 1. Start Dev Server

```bash
npm run dev
```

Server runs at: http://localhost:4321/

### 2. Open Browser Console

Press F12 and go to Console tab.

### 3. Test Navigation Events

**Test nav_link_click:**
1. Click any navigation link (Home, Pricing, About, etc.)
2. Check console for: `📊 Analytics Event: nav_link_click`
3. Verify payload includes: label, href, timestamp, page

**Test nav_cta_click:**
1. Click "Book a Discovery Call" button in header
2. Check console for: `📊 Analytics Event: nav_cta_click`
3. Verify payload includes: label, href, location

**Test nav_menu_open/close:**
1. Click hamburger menu on mobile
2. Check console for: `📊 Analytics Event: nav_menu_open`
3. Close menu
4. Check console for: `📊 Analytics Event: nav_menu_close`

### 4. Test Pricing Events

Navigate to `/pricing` page.

**Test pricing_cta_click:**
1. Click "Book a FREE Discovery Call" on any pricing card
2. Check console for: `📊 Analytics Event: pricing_cta_click`
3. Verify payload includes: plan, planId, price, ctaLabel

**Test pricing_learn_more_click:**
1. Click "Learn more: ..." link on any pricing card
2. Check console for: `📊 Analytics Event: pricing_learn_more_click`
3. Verify payload includes: plan, planId, targetHref

**Test pricing_custom_inquiry_click:**
1. Click "Custom pricing" or "monthly packages" link
2. Check console for: `📊 Analytics Event: pricing_custom_inquiry_click`
3. Verify payload includes: option ("custom" or "monthly")

**Test faq_toggle:**
1. Click any FAQ question to expand
2. Check console for: `📊 Analytics Event: faq_toggle` with action: "open"
3. Click again to collapse
4. Check console for: `📊 Analytics Event: faq_toggle` with action: "close"
5. Verify payload includes: questionId, questionText, action

### 5. Verify Data Attributes

**Inspect elements in DevTools:**

Pricing card CTA:
```html
<a data-plan-id="growth" data-plan-name="Growth"
   data-plan-price="$1,497" data-cta-label="Book a FREE Discovery Call">
```

Learn more link:
```html
<a data-learn-more data-plan-id="growth" data-plan-name="Growth"
   data-target-href="/website-design-that-converts">
```

FAQ button:
```html
<button data-track-faq="need-website" aria-expanded="false">
```

### 6. Test dataLayer Integration

In browser console, check dataLayer:

```javascript
console.log(window.dataLayer);
```

You should see array of events with structure:
```javascript
[
  {
    event: "pricing_cta_click",
    plan: "Growth",
    planId: "growth",
    price: "$1,497",
    ctaLabel: "Book a FREE Discovery Call",
    timestamp: "2025-09-30T21:15:30.123Z",
    page: "/pricing"
  },
  // ...more events
]
```

---

## Screenshots & Console Output

### Example Console Output

```
📊 Analytics Event: nav_link_click {
  label: "Pricing",
  href: "/pricing",
  link_type: "nav-link",
  timestamp: "2025-09-30T21:15:30.123Z",
  page: "/"
}

📊 Analytics Event: pricing_cta_click {
  plan: "Growth",
  planId: "growth",
  price: "$1,497",
  ctaLabel: "Book a FREE Discovery Call",
  timestamp: "2025-09-30T21:15:45.456Z",
  page: "/pricing"
}

📊 Analytics Event: faq_toggle {
  questionId: "need-website",
  questionText: "Do I need a website first?",
  action: "open",
  timestamp: "2025-09-30T21:16:12.789Z",
  page: "/pricing"
}
```

---

## Migration Summary

### Preexisting Analytics Code

**Found and replaced:**
- `src/components/GlobalNav.astro` - Had inline trackEvent function (replaced)
- `src/pages/pricing.astro` - Had inline trackEvent function (replaced)
- `src/pages/about.astro` - Had inline trackEvent function (replaced)
- `src/pages/index.astro` - Had inline trackEvent function (replaced)

**Changes made:**
- Removed 4 duplicate trackEvent implementations (~80 lines of code)
- Replaced with dynamic imports of centralized wrapper
- Standardized event names and payload structures
- Added missing data attributes for QA
- Improved payload consistency (all include timestamp and page)

---

## Event Summary Table

| Event Name | Trigger | Pages | Data Attributes Required |
|-----------|---------|-------|-------------------------|
| `nav_link_click` | Nav link click | All | `data-track-nav`, `data-page` |
| `nav_cta_click` | CTA button click | All | `data-track-cta`, `data-cta-label` |
| `nav_menu_open` | Mobile menu open | All | (automatic) |
| `nav_menu_close` | Mobile menu close | All | (automatic) |
| `pricing_cta_click` | Plan CTA click | Pricing | `data-plan-id`, `data-plan-name`, `data-plan-price`, `data-cta-label` |
| `pricing_learn_more_click` | Learn more click | Pricing | `data-learn-more`, `data-plan-id`, `data-target-href` |
| `pricing_custom_inquiry_click` | Custom/monthly click | Pricing | `data-custom-inquiry` |
| `faq_toggle` | FAQ accordion toggle | Pricing | `data-track-faq` |
| `link_navigation` | In-content link click | Home, etc. | (context in code) |

---

## Notes

### SSR Safety
All analytics calls are wrapped in dynamic imports that execute only after hydration. The centralized wrapper checks `typeof window === 'undefined'` and returns early during SSR.

### Performance
Analytics tracking is non-blocking. Events are fired asynchronously and will not prevent navigation or UI interactions.

### Privacy
No PII (Personally Identifiable Information) is collected. All payloads contain only:
- Page paths
- Link labels/text
- Plan names and prices (public information)
- Timestamps

### Areas Not Instrumented
- Contact form submissions (recommend tracking via form handler)
- External link clicks (can add if needed)
- Scroll depth tracking (can add if needed)
- Video plays (N/A - no videos on site)
- File downloads (N/A - no downloads on site)

---

## Integration with Google Analytics

### Google Tag Manager Setup

1. Create a Container in GTM
2. Add GTM snippet to `BaseLayout.astro` `<head>`
3. In GTM, create triggers for each event name
4. Forward events to GA4

**Example GTM Trigger:**
- Trigger Type: Custom Event
- Event name: `pricing_cta_click`
- This trigger fires on: All Custom Events

**Example GA4 Tag:**
- Tag Type: Google Analytics: GA4 Event
- Event Name: `pricing_cta_click`
- Event Parameters:
  - `plan`: `{{dlv - plan}}`
  - `price`: `{{dlv - price}}`
  - etc.

### Direct GA4 Setup (gtag.js)

If using gtag.js directly, events automatically forward via the wrapper's `window.gtag()` fallback.

---

## Maintenance

### Adding New Events

1. Add data attributes to HTML elements
2. Add event listener in component/page script
3. Call `trackEvent()` with standard payload structure
4. Update this documentation with new event details

### Modifying Event Payloads

Edit `src/lib/analytics.js` helper functions to change payload structures. All components using helpers will automatically get updates.

---

**Implementation Date:** 2025-09-30
**Status:** ✅ Production Ready
**Dev Server:** Running at http://localhost:4321/
