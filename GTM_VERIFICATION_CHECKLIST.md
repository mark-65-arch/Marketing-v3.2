# GTM Verification Checklist - Post-Publication

**Date:** October 10, 2025
**GTM Container:** GTM-KQS29VV6
**GA4 Property:** G-YY74K7J5KY

---

## Quick Verification Steps

### 1. Check GTM Container Loading ✅

**Open your site and check:**

1. Open Browser DevTools (F12)
2. Go to **Console** tab
3. Type: `window.dataLayer`
4. Press Enter

**Expected Result:**
```javascript
Array(2) [
  {gtm.start: 1234567890, event: "gtm.js"},
  {...}
]
```

✅ If you see an array → GTM is loaded
❌ If `undefined` → GTM script not loading

---

### 2. Check Network Requests 🌐

**In DevTools:**

1. Go to **Network** tab
2. Reload the page (F5)
3. Filter by "gtm" or "google"

**Expected Requests:**

| Request | Status | Description |
|---------|--------|-------------|
| `gtm.js?id=GTM-KQS29VV6` | 200 ✅ | GTM container loads |
| `gtag/js?id=G-YY74K7J5KY` | 200 ✅ or 404 ❌ | GA4 tracking script |
| `collect?v=2` | 200 ✅ | GA4 data collection |

**If you see 404 for `gtag/js?id=G-YY74K7J5KY`:**
- The GA4 Measurement ID in GTM is incorrect
- Or the GA4 property was deleted
- See "Troubleshooting" below

---

### 3. Check GTM Preview Mode 🔍

**Best way to debug GTM:**

1. Go to https://tagmanager.google.com/
2. Open container **GTM-KQS29VV6**
3. Click **Preview** button (top right)
4. Enter your website URL: `http://localhost:4321/` (for dev) or your live URL
5. Click **Connect**

**Expected Result:**
- GTM debugger opens in new window
- Shows "Tag Assistant Connected"
- Lists all tags, triggers, and variables
- Shows which tags fired on page load

**Check for:**
- ✅ "Google Analytics: GA4 Configuration" tag fires
- ✅ No errors in debug console
- ❌ If tag doesn't fire → Check trigger configuration

---

### 4. Check Cookie Consent Integration 🍪

**Test the consent flow:**

1. Clear cookies and localStorage:
   - DevTools → Application → Storage → Clear site data
2. Reload page
3. Cookie banner should appear at bottom
4. **Before accepting cookies:**
   - Check Console for: `gtag('consent', 'default', { analytics_storage: 'denied', ... })`
   - Check Network: Should see minimal GTM requests (consent pings only)
5. **Click "Accept" button**
6. Check Console for: `"GTM consent updated: analytics_storage=granted"`
7. Check Network: Should see full GA4 tracking requests now

---

### 5. Verify GA4 Data in Google Analytics 📊

**Real-time verification:**

1. Go to https://analytics.google.com/
2. Select your GA4 property (G-YY74K7J5KY)
3. Go to **Reports** → **Realtime**
4. Open your website in another tab
5. Navigate through a few pages

**Expected Result:**
- See yourself appear in "Users by page title and screen name"
- Page views increment
- Events show up in real-time

⚠️ **If no data appears:**
- Verify GA4 Measurement ID is correct in GTM
- Check if GA4 property is active (not deleted)
- Wait 5-10 minutes (sometimes there's delay)

---

## Troubleshooting Common Issues

### Issue: `window.dataLayer` is undefined

**Cause:** GTM script not loading

**Solutions:**
1. Check if `gtm-init.js` file exists in `dist/js/` or `public/js/`
2. View page source (Ctrl+U) and search for "gtm-init.js"
3. Check browser Console for 404 errors
4. Verify the script path is correct: `<script src="/js/gtm-init.js"></script>`

**Quick Test:**
```javascript
// Paste in Console:
fetch('/js/gtm-init.js').then(r => console.log('GTM script:', r.status));
```

Expected: `GTM script: 200`

---

### Issue: 404 for `gtag/js?id=G-YY74K7J5KY`

**Cause:** GA4 Measurement ID is incorrect or property was deleted

**Solutions:**

1. **Verify GA4 Property Exists:**
   - Go to https://analytics.google.com/
   - Check if property "G-YY74K7J5KY" is listed
   - If not found → Property was deleted or you don't have access

2. **Get Correct Measurement ID:**
   - In GA4 → Admin (gear icon) → Data Streams
   - Click your web data stream
   - Copy the **Measurement ID** (format: G-XXXXXXXXXX)

3. **Update GTM Tag:**
   - Go to GTM → Tags → "Google Analytics: GA4 Configuration"
   - Update **Measurement ID** field with correct ID
   - Click **Submit** → **Publish**

4. **Alternative - Create New GA4 Property:**
   - If property was deleted, create a new one
   - Get new Measurement ID
   - Update GTM tag

---

### Issue: Tags Not Firing in GTM Preview

**Cause:** Trigger configuration issue

**Solutions:**

1. **Check Trigger:**
   - In GTM → Tags → Click your GA4 tag
   - Look at **Triggering** section
   - Should be: "All Pages" or "Initialization - All Pages"

2. **Check Exceptions:**
   - Make sure no firing exceptions are blocking the tag

3. **Test in Preview Mode:**
   - Use GTM Preview to see why tag isn't firing
   - Debug console shows detailed firing conditions

---

### Issue: No Data in Google Analytics

**Causes and Solutions:**

1. **Consent Not Granted:**
   - Make sure you clicked "Accept" on cookie banner
   - Check Console for: `analytics_storage: granted`

2. **Ad Blocker Active:**
   - Disable browser extensions (uBlock, AdBlock, etc.)
   - Try in Incognito mode without extensions

3. **Tag Not Published:**
   - Go to GTM → Versions
   - Make sure latest version is "Published"

4. **GA4 Property Configuration:**
   - Check GA4 → Admin → Data Settings → Data Collection
   - Make sure "Data collection" is enabled

---

## Command-Line Verification

### Check GTM Script Loading

```bash
# From project root, check if GTM script exists
cat public/js/gtm-init.js

# Should show GTM initialization code with:
# - Container ID: GTM-KQS29VV6
# - Consent Mode v2 configuration
```

### Check Built Files

```bash
# Verify scripts are in dist/ after build
ls -la dist/js/

# Expected output:
# gtm-init.js
# utilities.js
# contact-page.js
# google-form-handler.js
```

### Test CSP Headers

```bash
# If deployed, test headers
curl -I https://marketingaihouston.com/

# Should include:
# Content-Security-Policy: ... https://www.googletagmanager.com ...
```

---

## Manual Testing Checklist

### Basic GTM Functionality
- [ ] Page loads without errors
- [ ] `window.dataLayer` exists in Console
- [ ] GTM container loads (Network tab)
- [ ] No CSP violations in Console

### Cookie Consent Flow
- [ ] Cookie banner appears on first visit
- [ ] Consent defaults to "denied"
- [ ] Click "Accept" → Consent updates to "granted"
- [ ] Banner disappears after accepting
- [ ] Consent persists on page reload

### GA4 Tracking
- [ ] GA4 script loads (check Network tab)
- [ ] No 404 errors for GA4 scripts
- [ ] Real-time data appears in GA4 dashboard
- [ ] Page views tracked correctly
- [ ] Events tracked (if configured)

### GTM Preview Mode
- [ ] Preview mode connects successfully
- [ ] All expected tags show in debugger
- [ ] Tags fire on correct triggers
- [ ] No errors in tag firing
- [ ] Variables populate correctly

---

## Success Indicators

✅ **GTM is working correctly when you see:**

1. **In Browser Console:**
   ```javascript
   window.dataLayer
   // Returns: Array with GTM events
   ```

2. **In Network Tab:**
   - `gtm.js?id=GTM-KQS29VV6` → Status 200
   - `gtag/js?id=G-YY74K7J5KY` → Status 200 (no 404)
   - `collect?v=2` → Status 200 (GA4 hits)

3. **In Google Analytics:**
   - Real-time users appear
   - Page views increment
   - No configuration errors

4. **In GTM Preview:**
   - Tags fire correctly
   - No errors or warnings
   - Variables populate

---

## Next Steps After Verification

### If Everything Works ✅
1. Monitor GA4 for 24-48 hours
2. Verify conversion tracking (if applicable)
3. Set up custom events (if needed)
4. Configure audiences and segments

### If Issues Persist ❌
1. Review [CSP_GTM_FIX_IMPLEMENTATION_REPORT.md](CSP_GTM_FIX_IMPLEMENTATION_REPORT.md)
2. Check GTM debug console for specific errors
3. Verify GA4 property configuration
4. Contact GTM/GA4 support with error details

---

## Quick Reference

| What | Value |
|------|-------|
| GTM Container ID | `GTM-KQS29VV6` |
| GA4 Measurement ID | `G-YY74K7J5KY` (verify in GTM) |
| GTM Script | `/js/gtm-init.js` |
| Consent Default | All DENIED |
| Consent Update | Via cookie banner |
| GTM Dashboard | https://tagmanager.google.com/ |
| GA4 Dashboard | https://analytics.google.com/ |

---

**Last Updated:** October 10, 2025
**Status:** Ready for verification
**Dev Server:** http://localhost:4321/ (running)
