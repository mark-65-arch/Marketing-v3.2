// 🛡️ Security Middleware - HTTP Security Headers
// Purpose: Add comprehensive security headers to all responses
// Reference: OWASP Secure Headers Project

import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();

  // Clone response to add headers (Response objects are immutable)
  const headers = new Headers(response.headers);

  // 🔒 Strict-Transport-Security (HSTS)
  // Forces HTTPS for 1 year, includes subdomains, allows preloading
  headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // 🛡️ X-Frame-Options
  // Prevents clickjacking attacks by disallowing iframe embedding
  headers.set('X-Frame-Options', 'SAMEORIGIN');

  // 🔐 X-Content-Type-Options
  // Prevents MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');

  // 🔍 Referrer-Policy
  // Controls referrer information sent with requests
  // strict-origin-when-cross-origin: Send full URL for same-origin, origin only for cross-origin HTTPS
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 🎯 Permissions-Policy
  // Restricts browser features and APIs
  // Disable sensitive features by default, allow only what's needed
  headers.set(
    'Permissions-Policy',
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
  );

  // 🔒 X-XSS-Protection
  // Legacy header for older browsers (modern browsers use CSP)
  headers.set('X-XSS-Protection', '1; mode=block');

  // ⚠️ Note: Content-Security-Policy is handled in BaseLayout.astro
  // This allows for dynamic nonce generation per page

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
