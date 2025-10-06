# Security Headers & Form Hardening Implementation

This document describes the security enhancements implemented for the Marketing AI Houston website.

## Overview

Security headers and form validation have been added to protect against common web vulnerabilities including XSS, clickjacking, SQL injection, and CSRF attacks.

## Implementation Details

### 1. HTTP Security Headers (via Middleware)

**File**: `src/middleware.ts`

All responses include the following security headers:

#### Strict-Transport-Security (HSTS)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```
- Forces HTTPS for 1 year
- Includes all subdomains
- Eligible for browser preload lists

#### X-Frame-Options
```
X-Frame-Options: SAMEORIGIN
```
- Prevents clickjacking attacks
- Only allows iframe embedding from same origin

#### X-Content-Type-Options
```
X-Content-Type-Options: nosniff
```
- Prevents MIME type sniffing
- Forces browser to respect declared Content-Type

#### Referrer-Policy
```
Referrer-Policy: strict-origin-when-cross-origin
```
- Sends full URL for same-origin requests
- Sends origin only for cross-origin HTTPS requests
- Protects user privacy

#### Permissions-Policy
```
Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()
```
- Restricts browser features and APIs
- Disables sensitive features by default

#### X-XSS-Protection
```
X-XSS-Protection: 1; mode=block
```
- Legacy header for older browsers
- Modern browsers rely on CSP

### 2. Content Security Policy (CSP)

**File**: `src/layouts/BaseLayout.astro` (lines 146-157)

#### CSP Configuration

The CSP uses SHA-256 hashes for inline scripts instead of `'unsafe-inline'`:

**Script Hashes:**
- GTM script: `sha256-t6JZZvLwY8ccCw4UkWjvdn+lofNJCgKzPhuegvg/69Y=`
- Lazy load/security script: `sha256-k8Ko4YMZ/6Dklcy0pZe7nIzQlgtSH/FK+/A4nDfxOQw=`
- Contact page iframe script: `sha256-yJmBxiBN4AeSn7iBlg4OWHPT0EsUF6nCxNGCkynYDTI=`
- Contact page accordion script: `sha256-jQ9jE2f/RdmljlEiEL5/wzUpriXsUrG9h9ByoESgO5w=`

**Why hashes instead of 'unsafe-inline'?**
- Much stronger security posture
- Prevents injection of unauthorized inline scripts
- Only specifically whitelisted scripts can execute

**Note on style-src:**
- Uses `'unsafe-inline'` for Tailwind and dynamic styles
- This is low risk as CSS cannot execute JavaScript
- Future improvement: Generate style hashes or use style-src nonces

#### CSP Directives Explained

```
default-src 'self'
```
Default policy: Only load resources from same origin

```
script-src 'self' [hashes] https://cdnjs.cloudflare.com https://calendly.com https://www.googletagmanager.com ...
```
Scripts allowed from:
- Same origin
- Inline scripts matching whitelisted hashes
- Trusted third-party domains (GTM, Calendly, etc.)

```
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://www.google.com
```
Styles allowed from same origin, inline (for Tailwind), Google Fonts, and CDNs

```
frame-src https://calendly.com https://docs.google.com
```
Only allow iframes from Calendly and Google Docs (for contact form)

```
frame-ancestors 'self'
```
Prevents clickjacking - site can only be iframed by itself

### 3. Client-Side Form Validation

**File**: `src/layouts/BaseLayout.astro` (lines 316-379)

Enhanced form validation automatically runs on all forms (except those with `data-skip-validation` attribute):

#### Honeypot Field Detection
```javascript
const honeypot = formData.get('website');
if (honeypot && String(honeypot).trim().length > 0) {
  e.preventDefault(); // Block bot submission
}
```
- Looks for hidden field named "website"
- Legitimate users won't fill this field
- Bots typically fill all fields automatically

#### XSS Pattern Detection
Blocks submissions containing:
- `<script>` tags
- `<iframe>` tags
- `javascript:` protocol
- Event handlers (`onclick=`, etc.)
- `eval()` calls
- `vbscript:` protocol

#### SQL Injection Pattern Detection
Blocks submissions containing:
- SQL keywords (SELECT, INSERT, UPDATE, DELETE, DROP, UNION)
- SQL comments (`--`)
- Common injection patterns (`' OR '1'='1`)

**Note**: Current form is Google Forms iframe (externally managed), so Google handles backend validation. Client-side validation provides defense-in-depth.

### 4. Server-Side Form Validation Utilities

**File**: `src/utils/formSecurity.ts`

Comprehensive TypeScript utilities for form validation and sanitization:

#### Functions Available:

**Input Sanitization:**
```typescript
sanitizeInput(input: string): string
```
- HTML encodes dangerous characters (&, <, >, ", ', /)
- Removes null bytes
- Safe for display and processing

**Email Validation:**
```typescript
isValidEmail(email: string): boolean
```
- RFC 5322 compliant regex
- Length checks (5-254 characters)
- Single @ symbol validation

**Phone Validation:**
```typescript
isValidPhone(phone: string): boolean
```
- US phone number format support
- Accepts various formatting (spaces, dashes, parentheses)
- Validates 10-11 digit numbers

**Attack Pattern Detection:**
```typescript
containsXSS(input: string): boolean
containsSQLInjection(input: string): boolean
```
- Comprehensive pattern matching
- Returns true if malicious patterns detected

**Rate Limiting:**
```typescript
isRateLimited(identifier: string, maxAttempts: number, windowMs: number): boolean
```
- In-memory rate limiting (session-based)
- Default: 5 attempts per 60 seconds
- **Production Note**: Use Redis or database for distributed systems

**Form Validation:**
```typescript
validateContactForm(formData: FormData): FormValidationResult
```
- Comprehensive validation for contact forms
- Returns validation status, errors, and sanitized data
- Honeypot checking included

#### Usage Example:

```typescript
import { validateContactForm } from '@/utils/formSecurity';

const result = validateContactForm(formData);
if (!result.isValid) {
  return { error: result.errors.join(', ') };
}

// Use result.sanitizedData safely
```

### 5. Environment Variable Security

**Files**: `.gitignore`, `.env.example`

#### .gitignore Protection
Updated to prevent committing sensitive files:
```gitignore
.env
.env.local
.env.development
.env.production
.env.test
.env*.local
*.key
*.pem
*.crt
*.p12
secrets.json
credentials.json
*.sqlite
*.db
```

#### .env.example Documentation
Enhanced with security guidelines:
- Clear distinction between PUBLIC_ (client-side) and private variables
- Examples of proper API key storage
- Warning against committing .env files
- Instructions for credential rotation

## Testing

### Verify Security Headers

**Using curl:**
```bash
curl -I https://mark-65-arch.github.io/Marketing-v3.2/
```

**Expected headers:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-XSS-Protection: 1; mode=block
```

**Note**: CSP header is set via meta tag in HTML, not HTTP header (GitHub Pages limitation)

### Verify CSP

1. Open browser DevTools (F12)
2. Navigate to any page
3. Check Console tab for CSP violations
4. Verify no "unsafe-inline" warnings

### Test Form Validation

1. Navigate to contact page
2. Open browser DevTools Console
3. Try submitting form with:
   - `<script>alert('xss')</script>` in name field
   - `' OR '1'='1` in any field
   - Expected: Submission blocked with alert message

### Test Honeypot

Programmatically:
```javascript
// In browser console
const form = document.querySelector('form');
const honeypot = document.createElement('input');
honeypot.name = 'website';
honeypot.value = 'bot-filled-this';
form.appendChild(honeypot);
form.submit(); // Should be blocked
```

## Maintenance

### Updating Inline Scripts

If you modify inline scripts in BaseLayout.astro or contact.astro:

1. Compute new SHA-256 hash:
```bash
echo -n "your script content here" | openssl dgst -sha256 -binary | openssl base64
```

2. Update CSP meta tag with new hash

3. Test that scripts still execute

### Adding New External Domains

To allow new third-party resources:

1. Identify domain and resource type (script, style, img, frame, etc.)
2. Add domain to appropriate CSP directive in BaseLayout.astro
3. Test thoroughly
4. Document change

## Security Considerations

### Current Limitations

1. **CSP in meta tag vs HTTP header**: GitHub Pages doesn't allow custom HTTP headers, so CSP is set via meta tag. This is less secure (can be removed by injection before meta tag) but still provides significant protection.

2. **Static site**: No server-side form processing currently. Google Forms handles submissions. If adding custom form backend, use formSecurity.ts utilities.

3. **Rate limiting**: In-memory only (resets on server restart). For production with custom backend, use Redis or database.

4. **style-src 'unsafe-inline'**: Required for Tailwind. Consider migrating to style-src hashes or nonces for stricter policy.

### Best Practices

1. **Never commit secrets**: Use .env files, keep them in .gitignore
2. **Rotate credentials**: If accidentally committed, rotate immediately
3. **Use PUBLIC_ prefix wisely**: Only for truly public data
4. **Update dependencies**: Keep npm packages updated for security patches
5. **Monitor CSP violations**: In production, use CSP report-uri directive
6. **Test regularly**: Run security audits and penetration tests

## Additional Resources

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN CSP Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

## Future Improvements

1. Migrate to server-side rendering (SSR) for custom HTTP headers
2. Implement CSP reporting endpoint
3. Add Subresource Integrity (SRI) for all external scripts
4. Implement CSRF tokens for custom forms
5. Add Content-Security-Policy-Report-Only for testing
6. Use nonces instead of hashes for more flexible CSP
7. Implement style-src hashes for stricter CSS policy
8. Add real-time security monitoring and alerting
