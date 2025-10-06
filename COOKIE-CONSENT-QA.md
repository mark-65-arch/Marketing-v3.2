# Cookie Consent & Analytics QA Checklist

## Overview
This checklist verifies that the cookie consent system correctly manages user preferences and controls analytics tracking.

---

## ✅ Pre-Testing Setup

- [ ] Clear all site data (Chrome DevTools → Application → Storage → Clear site data)
- [ ] Open DevTools Network tab
- [ ] Filter Network requests by "google" or "gtm"
- [ ] Open DevTools Console to see logs
- [ ] Navigate to test page: `/cookie-consent-test`

---

## 🍪 Banner & Modal Display

### Cookie Banner

- [ ] **Initial Load**: Banner appears at bottom of page on first visit
- [ ] **Banner Copy**: Message says "We use cookies to improve your experience, analyze site traffic, and show relevant ads."
- [ ] **Three Buttons Present**:
  - [ ] "Accept all cookies" (blue/teal gradient)
  - [ ] "Reject non-essential cookies" (gray)
  - [ ] "Cookie settings" (dark gray)
- [ ] **Subtext Present**: "Manage your choices anytime in Cookie settings..."
- [ ] **Links Work**: Cookie Policy and Privacy Policy links navigate correctly
- [ ] **Accessibility**: Banner has `role="dialog"` and appropriate ARIA attributes
- [ ] **Mobile Responsive**: Banner displays correctly on mobile viewport (< 640px)

### Cookie Settings Modal

- [ ] **Opens**: Clicking "Cookie settings" button opens modal
- [ ] **Modal Copy**: Contains "We use analytics to understand how visitors use our site. These cookies are enabled by default to help us improve performance. You can opt out anytime."
- [ ] **Four Cookie Categories**:
  - [ ] Strictly Necessary (checkbox disabled, always checked)
  - [ ] Analytics (checkbox enabled, checked by default)
  - [ ] Marketing (checkbox enabled, unchecked by default)
  - [ ] Functional (checkbox enabled, unchecked by default)
- [ ] **Close Button**: X button in top-right closes modal
- [ ] **Backdrop Click**: Clicking outside modal closes it
- [ ] **ESC Key**: Pressing Escape closes modal
- [ ] **Save Button**: "Save Preferences" button saves choices
- [ ] **Reject Button**: "Reject All" button disables all non-essential cookies
- [ ] **Focus Management**: Modal focuses close button on open
- [ ] **Focus Restoration**: Focus returns to trigger button on close

---

## 🎯 Default Behavior (No Consent Given)

- [ ] **Banner Shows**: Banner appears on first visit
- [ ] **Analytics Enabled by Default**:
  - [ ] GTM requests visible in Network tab (`googletagmanager.com`)
  - [ ] GA cookies created in Application → Cookies (`_ga`, `_gid`)
- [ ] **Test Page Status**: Shows "No (Using Defaults)" for consent, Analytics = Enabled
- [ ] **Test Event Works**: Clicking "Send Test Analytics Event" succeeds
- [ ] **Console Logs**: `GTM initialized: GTM-KQS29VV6` appears in console

---

## ✅ Accept All Cookies

- [ ] **Button Click**: Click "Accept all cookies"
- [ ] **Banner Hides**: Banner slides down and disappears
- [ ] **Consent Saved**: Reload page → banner does NOT reappear
- [ ] **localStorage Check**:
  - [ ] Open DevTools → Application → Local Storage
  - [ ] Find `mah_cookie_consent` key
  - [ ] Value contains: `analytics: true`, `marketing: true`, `functional: true`
- [ ] **Analytics Active**: GTM/GA requests continue in Network tab
- [ ] **Test Page Status**: All categories show "✓ Enabled"
- [ ] **Persistence**: Close and reopen browser → consent still saved

---

## ❌ Reject Non-Essential Cookies

### Rejecting from Banner

- [ ] **Clear Consent**: Use test page "Clear All Consent" button
- [ ] **Reload Page**: Banner reappears
- [ ] **Click Reject**: Click "Reject non-essential cookies"
- [ ] **Banner Hides**: Banner disappears
- [ ] **Consent Saved**: `analytics: false`, `marketing: false`, `functional: false`
- [ ] **Analytics Stopped**:
  - [ ] No new GTM requests in Network tab
  - [ ] GA cookies removed (`_ga`, `_gid` deleted from Cookies)
- [ ] **Test Event Blocked**: "Send Test Analytics Event" logs "Cannot send event: Analytics is disabled"
- [ ] **Console Log**: `Analytics disabled and cookies removed`

### Rejecting from Modal

- [ ] **Open Settings**: Click "Cookie settings" from banner
- [ ] **Uncheck All**: Uncheck Analytics, Marketing, Functional
- [ ] **Save**: Click "Save Preferences"
- [ ] **Same Behavior**: Analytics stops, cookies removed

---

## 🎛️ Custom Preferences

- [ ] **Open Modal**: Click "Cookie settings"
- [ ] **Partial Selection**: Check only "Analytics", uncheck others
- [ ] **Save**: Click "Save Preferences"
- [ ] **Consent Saved**: localStorage shows `analytics: true`, `marketing: false`, `functional: false`
- [ ] **Analytics Only**: GTM loads, but marketing scripts don't
- [ ] **Change Preferences**:
  - [ ] Reopen modal
  - [ ] Checkboxes reflect saved state
  - [ ] Toggle Analytics off
  - [ ] Save → Analytics stops immediately

---

## 🔄 Opt-Out After Opt-In

This tests the critical "immediate opt-out" requirement.

- [ ] **Start Fresh**: Clear consent, reload
- [ ] **Accept All**: Click "Accept all cookies"
- [ ] **Verify Active**: Check Network tab for GA requests
- [ ] **Open Settings**: Use test page or banner to open modal
- [ ] **Disable Analytics**: Uncheck "Analytics" checkbox
- [ ] **Save**: Click "Save Preferences"
- [ ] **Immediate Effect**:
  - [ ] No new GA requests appear in Network tab
  - [ ] GA cookies deleted immediately
  - [ ] Console shows "Analytics disabled and cookies removed"
- [ ] **Test Event Blocked**: Cannot send test events
- [ ] **Persistence**: Reload page → Analytics stays disabled

---

## ⏰ Consent Expiry (12 Months)

Note: This is difficult to test in real-time. Verify code logic instead.

- [ ] **Code Check**: Verify `CONSENT_EXPIRY_DAYS = 365` in `consent.ts`
- [ ] **Expiry Logic**: Check `getConsentPreferences()` validates timestamp
- [ ] **Manual Test** (optional):
  - [ ] Edit localStorage `timestamp` to 13 months ago
  - [ ] Reload page
  - [ ] Banner should reappear (consent expired)

---

## 🧪 Test Event Tracking

- [ ] **Analytics Enabled**: Ensure analytics is on
- [ ] **Send Test Event**: Click "Send Test Analytics Event"
- [ ] **Network Verification**:
  - [ ] `collect` request appears in Network tab
  - [ ] Request contains `event=test_event`
- [ ] **Disable Analytics**: Turn off analytics
- [ ] **Event Blocked**: Test event button logs error, no network request

---

## ♿ Accessibility Tests

### Keyboard Navigation

- [ ] **Tab Through Banner**: Can tab to all three buttons
- [ ] **Enter/Space**: Activating button works
- [ ] **Focus Visible**: Clear focus indicators on buttons
- [ ] **Modal Tab Trap**: Focus stays within modal when open
- [ ] **ESC Close**: Escape key closes modal

### Screen Reader

- [ ] **Banner Announced**: `role="dialog"` and `aria-labelledby` present
- [ ] **Button Labels**: All buttons have `aria-label`
- [ ] **Modal Announced**: `aria-modal="true"` on modal
- [ ] **Checkbox Labels**: All checkboxes have labels

### ARIA Attributes

- [ ] Banner: `role="dialog"`, `aria-labelledby`, `aria-describedby`, `aria-hidden`
- [ ] Modal: `role="dialog"`, `aria-labelledby`, `aria-modal="true"`
- [ ] Buttons: `aria-label` where needed
- [ ] Checkboxes: `aria-label` attributes

---

## 📱 Mobile & Responsive

- [ ] **Mobile Banner**:
  - [ ] Buttons stack vertically on small screens
  - [ ] Touch targets are 44px minimum
  - [ ] Text readable without zoom
- [ ] **Mobile Modal**:
  - [ ] Modal is scrollable if content overflows
  - [ ] Close button easily tappable
  - [ ] Checkboxes large enough for touch
- [ ] **Tablet**: Test at 768px viewport
- [ ] **Desktop**: Test at 1920px viewport

---

## 🔒 Security & Privacy

- [ ] **First-Party Cookies**: Consent stored in first-party localStorage/cookie
- [ ] **SameSite**: Cookie has `SameSite=Strict` flag
- [ ] **No Tracking Before Consent**: When rejected, no GA cookies exist
- [ ] **Cookie Deletion**: Opt-out removes all GA cookies (`_ga`, `_gid`)
- [ ] **No Console Errors**: No JavaScript errors in console
- [ ] **CSP Compliant**: No CSP violations (check Console)

---

## 🌐 Cross-Page Behavior

- [ ] **Set Preference**: Accept all on homepage
- [ ] **Navigate**: Go to another page (e.g., /about)
- [ ] **Banner Hidden**: Banner does not reappear
- [ ] **Analytics Active**: GTM continues loading
- [ ] **Open Settings**: Can still access cookie settings
- [ ] **Change Preferences**: Changes apply site-wide

---

## 🔄 Consent Changed Events

- [ ] **Open DevTools Console**
- [ ] **Accept Cookies**: Should see `consentChanged` event fired
- [ ] **Test Page Logs**: Event log shows consent changes
- [ ] **Status Updates**: Test page auto-updates status badges

---

## 📊 GTM/GA4 Integration

### GTM Container

- [ ] **GTM Loads**: `gtm.js` script in Network tab
- [ ] **dataLayer Exists**: Check `window.dataLayer` in console
- [ ] **Consent State**: dataLayer includes `consent_initialized` event
- [ ] **Analytics Granted**: `analytics_storage: 'granted'` when enabled
- [ ] **Analytics Denied**: `analytics_storage: 'denied'` when disabled

### GA4 (if configured)

- [ ] **GA4 Loads**: `gtag/js` script in Network tab
- [ ] **Config Event**: `config` call with measurement ID
- [ ] **Page Views**: `page_view` events sent
- [ ] **Opt-Out Flag**: `ga-disable-{measurementId}` set when disabled

---

## 🐛 Edge Cases

- [ ] **localStorage Disabled**: Test with localStorage disabled in browser
  - [ ] System falls back to cookie storage
  - [ ] Consent still works
- [ ] **Cookie Blocked**: Test with third-party cookies blocked
  - [ ] First-party consent cookie still works
- [ ] **Ad Blocker**: Test with ad blocker enabled
  - [ ] Consent UI still displays
  - [ ] No JavaScript errors
- [ ] **Slow Connection**: Test on throttled connection (Network tab → Slow 3G)
  - [ ] Banner appears quickly
  - [ ] No layout shift
- [ ] **Old Consent Version**: Change version in localStorage to "0.9"
  - [ ] Reload page
  - [ ] Banner should reappear (version mismatch)

---

## 📝 Summary Checklist

### Critical Requirements

- [x] Banner copy matches exact requirements
- [x] "Manage your choices anytime in Cookie settings" in subtext
- [x] Modal copy includes analytics default notice
- [x] Analytics enabled by default (before consent)
- [x] Immediate opt-out removes cookies and stops tracking
- [x] 12-month persistence
- [x] GTM/GA4 respect consent state
- [x] ARIA attributes present
- [x] Focus management works

### Test Page Verification

- [ ] Visit `/cookie-consent-test`
- [ ] All status badges update correctly
- [ ] Test event works when enabled, blocked when disabled
- [ ] Event log shows consent changes
- [ ] Clear consent button resets everything

---

## ✅ Sign-Off

**Tester Name**: ________________
**Date**: ________________
**Browser Tested**: ________________
**All Tests Passed**: [ ] Yes [ ] No

**Notes/Issues**:
_______________________________________
_______________________________________
_______________________________________

---

## 🚀 Ready for Production

Once all tests pass:

- [ ] Remove test page from public site (or add `noindex`)
- [ ] Update `.env` with real GTM/GA4 IDs
- [ ] Verify CSP allows GTM/GA domains
- [ ] Test on production domain
- [ ] Verify robots.txt allows crawling
- [ ] Final smoke test on live site
