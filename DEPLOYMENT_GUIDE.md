# Hostinger Deployment Guide - CSP & GTM Fix

**Quick Reference for Deploying the Fixed Site**

---

## Pre-Deployment Checklist

✅ Build completed successfully
✅ All external scripts present in `dist/js/`:
  - `gtm-init.js`
  - `utilities.js`
  - `google-form-handler.js`
  - `contact-page.js`
✅ Security headers configured:
  - `dist/_headers` (Netlify/Vercel format)
  - `dist/.htaccess` (Apache format for Hostinger)

---

## Deployment Steps

### Step 1: Build the Site

```bash
npm run build
```

**Expected Output:**
```
✓ 28 page(s) built in ~6s
✓ Complete!
```

### Step 2: Upload to Hostinger

Upload the entire contents of `dist/` folder to your Hostinger `public_html/` directory.

**Files to verify are uploaded:**
```
public_html/
├── .htaccess              ← Security headers
├── _headers               ← Alternative headers file
├── index.html
├── js/
│   ├── gtm-init.js
│   ├── utilities.js
│   ├── google-form-handler.js
│   └── contact-page.js
├── fonts/
├── _assets/
└── ... (all other files)
```

**Important:** Make sure hidden files (`.htaccess`) are uploaded!

### Step 3: Verify Headers Configuration

Hostinger uses **Apache**, so the `.htaccess` file should work automatically.

**Test CSP Header:**
```bash
curl -I https://marketingaihouston.com/
```

**Expected Response:**
```
HTTP/2 200
content-security-policy: default-src 'self'; script-src 'self' https://calendly.com https://www.googletagmanager.com ...
x-frame-options: DENY
x-content-type-options: nosniff
...
```

If headers are not showing, check Hostinger's Apache configuration or contact support.

---

## Post-Deployment Testing

### 1. Browser Console Test

1. Open site in browser
2. Press `F12` → Console tab
3. **Check for errors:**
   - ❌ If you see CSP violations → Headers not configured correctly
   - ✅ No CSP violations → Configuration successful

### 2. GTM Loading Test

1. Open DevTools → Network tab
2. Filter by "gtm" or "google"
3. **Verify:**
   - ✅ `gtm.js` loads (GTM container)
   - ⚠️ If `gtag/js?id=G-YY74K7J5KY` returns 404 → See GTM Dashboard Fix below

### 3. Cookie Consent Test

1. Clear browser cookies and localStorage
2. Reload page → Cookie banner should appear
3. Click "Accept" → Banner should disappear
4. Check Console for: `"GTM consent updated: analytics_storage=granted"`

### 4. Form & Interactivity Test

**Contact Page:**
- [ ] Smooth scrolling works (click anchor links)
- [ ] FAQ accordion works on mobile
- [ ] Google Form iframe loads
- [ ] Form submits and resizes correctly

---

## GTM Dashboard Fix (GA4 404 Error)

### Problem
```
https://www.googletagmanager.com/gtag/js?id=G-YY74K7J5KY
404 Not Found
```

### Solution

1. **Log into Google Tag Manager:**
   - Go to https://tagmanager.google.com/
   - Select container **GTM-KQS29VV6**

2. **Find GA4 Configuration Tag:**
   - Navigate to **Tags** → Find "Google Analytics: GA4 Configuration"
   - Click on the tag

3. **Verify Measurement ID:**
   - Check the **Measurement ID** field
   - Should be: `G-YY74K7J5KY`
   - If incorrect or missing → Update with valid GA4 ID from Google Analytics

4. **Publish Changes:**
   - Click **Submit** → **Publish**

5. **Test:**
   - Use GTM Preview Mode to verify tag fires correctly
   - Check Network tab for successful `gtag/js` load

---

## Troubleshooting

### Issue: CSP Headers Not Working

**Symptom:** Console shows CSP violations

**Solutions:**
1. Verify `.htaccess` file is uploaded to root directory
2. Check file permissions (should be 644)
3. Contact Hostinger support to enable `mod_headers`
4. Alternative: Configure headers via Hostinger control panel

### Issue: Scripts Not Loading

**Symptom:** Console shows 404 for `/js/gtm-init.js`

**Solutions:**
1. Verify `js/` folder was uploaded
2. Check file paths match: `/js/gtm-init.js` (not `/Marketing-v3.2/js/...`)
3. Clear browser cache
4. Check Hostinger file permissions

### Issue: GTM Not Tracking

**Symptom:** No GTM events in console

**Solutions:**
1. Check GTM container ID: `GTM-KQS29VV6`
2. Verify `gtm-init.js` is loading (Network tab)
3. Check GTM account is active
4. Use GTM Preview Mode for debugging

### Issue: Cookie Banner Not Appearing

**Symptom:** Banner doesn't show on first visit

**Solutions:**
1. Clear all cookies and localStorage
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check Console for JavaScript errors
4. Verify CookieBanner component is rendering

---

## Rollback Instructions

If critical issues occur after deployment:

### Quick Rollback
1. Keep a backup of previous `public_html/` folder
2. Delete new deployment
3. Restore backup

### Git Rollback
```bash
# View commit history
git log --oneline

# Rollback to previous version
git revert HEAD

# Rebuild and redeploy
npm run build
```

---

## Files Reference

### External Scripts Created
| File | Purpose | Size |
|------|---------|------|
| `js/gtm-init.js` | GTM + Consent Mode v2 | ~1.2 KB |
| `js/utilities.js` | Lazy loading + Form security | ~3.5 KB |
| `js/google-form-handler.js` | Contact form iframe handler | ~1.4 KB |
| `js/contact-page.js` | Smooth scroll + Accordion | ~1.8 KB |

### Configuration Files
| File | Purpose | Format |
|------|---------|--------|
| `.htaccess` | Security headers (Apache) | Apache config |
| `_headers` | Security headers (Netlify/Vercel) | Text file |

---

## Performance Notes

### Before Fix
- Inline scripts required SHA-256 hashes
- Hash updates needed for every script change
- CSP via meta tag (less secure)

### After Fix
- ✅ External scripts cached separately
- ✅ No hash maintenance needed
- ✅ CSP via HTTP headers (more secure)
- ✅ Better browser optimization

**Total Additional Load:** ~7.9 KB (4 external scripts)
**Impact:** Minimal - scripts load async

---

## Support Resources

### Documentation
- Full implementation details: `CSP_GTM_FIX_IMPLEMENTATION_REPORT.md`
- Astro docs: https://docs.astro.build/
- GTM docs: https://support.google.com/tagmanager/

### Hostinger Support
- Control Panel → Support
- Live Chat available 24/7
- Common question: "How do I enable mod_headers for .htaccess?"

### GTM Resources
- GTM Container: **GTM-KQS29VV6**
- Preview Mode: https://tagmanager.google.com/
- GA4 Property: **G-YY74K7J5KY** (verify in GTM)

---

## Success Criteria

Deployment is successful when:

- ✅ Site loads without errors
- ✅ No CSP violations in console
- ✅ GTM container loads (`GTM-KQS29VV6`)
- ✅ Cookie banner appears and functions
- ✅ Form submission works
- ✅ All interactive features functional
- ✅ Security headers present (verify with curl)

---

**Last Updated:** October 10, 2025
**Deployment Target:** Hostinger Static Site
**Build Version:** Post-CSP/GTM Fix
