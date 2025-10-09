// 🛡️ Security Utilities
// Purpose: Client-side security enhancements and form protection
// Features: XSS prevention, CSRF protection, input sanitization, honeypot

// 🧹 Input Sanitization
export function sanitizeInput(input: string): string {
  // Remove HTML tags and dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>?/gm, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/data:/gi, '')
    .trim();
}

// 🧹 Advanced XSS Prevention
export function preventXSS(content: string): string {
  const entityMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  return content.replace(/[&<>"'`=\/]/g, (s) => entityMap[s]);
}

// 🍯 Honeypot Field Generator
export function createHoneypot(formId: string): HTMLInputElement {
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = '_gotcha';
  honeypot.style.display = 'none !important';
  honeypot.style.position = 'absolute';
  honeypot.style.left = '-9999px';
  honeypot.tabIndex = -1;
  honeypot.autoComplete = 'off';
  honeypot.setAttribute('aria-hidden', 'true');

  // Add additional bot detection
  honeypot.addEventListener('focus', () => {
    honeypot.setAttribute('data-bot-detected', 'true');
  });

  return honeypot;
}

// 🔍 Spam Detection Utilities
export interface SpamCheckResult {
  isSpam: boolean;
  score: number;
  reasons: string[];
}

export class SpamDetector {
  private spamKeywords = [
    'casino', 'viagra', 'cialis', 'lottery', 'winner', 'congratulations',
    'inheritance', 'million dollars', 'click here', 'limited time',
    'act now', 'make money fast', 'work from home', 'free money'
  ];

  private suspiciousPatterns = [
    /\b\d{10,}\b/g, // Long sequences of numbers
    /[A-Z]{10,}/g, // Long sequences of capitals
    /(.)\1{5,}/g, // Character repetition
    /https?:\/\/bit\.ly|tinyurl|t\.co/gi, // Suspicious shorteners
    /@\w+\.(tk|ml|ga|cf)$/gi // Suspicious domains
  ];

  public checkContent(content: string): SpamCheckResult {
    const normalizedContent = content.toLowerCase();
    let spamScore = 0;
    const reasons: string[] = [];

    // Check for spam keywords
    this.spamKeywords.forEach(keyword => {
      if (normalizedContent.includes(keyword)) {
        spamScore += 20;
        reasons.push(`Contains spam keyword: ${keyword}`);
      }
    });

    // Check for suspicious patterns
    this.suspiciousPatterns.forEach((pattern, index) => {
      if (pattern.test(content)) {
        spamScore += 15;
        reasons.push(`Suspicious pattern detected (#${index + 1})`);
      }
    });

    // Check for excessive links
    const linkCount = (content.match(/https?:\/\/\S+/gi) || []).length;
    if (linkCount > 3) {
      spamScore += linkCount * 10;
      reasons.push(`Too many links: ${linkCount}`);
    }

    // Check for repetitive content
    const words = normalizedContent.split(/\s+/);
    const uniqueWords = new Set(words);
    const repetitionRatio = words.length / uniqueWords.size;
    if (repetitionRatio > 3) {
      spamScore += 25;
      reasons.push('Highly repetitive content');
    }

    // Check for all caps
    const capsCount = (content.match(/[A-Z]/g) || []).length;
    const totalLetters = (content.match(/[A-Za-z]/g) || []).length;
    if (totalLetters > 0 && (capsCount / totalLetters) > 0.7) {
      spamScore += 20;
      reasons.push('Excessive use of capital letters');
    }

    return {
      isSpam: spamScore >= 50,
      score: spamScore,
      reasons
    };
  }

  public checkEmail(email: string): boolean {
    const suspiciousDomains = [
      'tempmail.org', '10minutemail.com', 'guerrillamail.com',
      'mailinator.com', 'throwaway.email'
    ];

    const domain = email.split('@')[1]?.toLowerCase();
    return domain ? !suspiciousDomains.includes(domain) : false;
  }

  public checkSubmissionTiming(formDisplayTime: number, submitTime: number): boolean {
    const fillTime = submitTime - formDisplayTime;
    // Forms filled in less than 2 seconds are suspicious
    return fillTime > 2000;
  }
}

// 🔒 Form Security Enhancement
export class FormSecurityManager {
  private formStartTime: Map<string, number> = new Map();
  private spamDetector = new SpamDetector();

  public initializeForm(formElement: HTMLFormElement): void {
    const formId = formElement.id || `form-${Date.now()}`;
    this.formStartTime.set(formId, Date.now());

    // Add honeypot field
    const honeypot = createHoneypot(formId);
    formElement.appendChild(honeypot);

    // Add CSRF token (if backend supports it)
    this.addCSRFToken(formElement);

    // Add form submission handler
    formElement.addEventListener('submit', (e) => {
      if (!this.validateFormSecurity(formElement, formId)) {
        e.preventDefault();
        console.warn('🚨 Form submission blocked due to security concerns');
      }
    });

    // Monitor for suspicious behavior
    this.monitorFormBehavior(formElement);
  }

  private addCSRFToken(formElement: HTMLFormElement): void {
    // Generate a simple client-side token (server should validate)
    const token = btoa(Date.now() + Math.random().toString()).substring(0, 32);

    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = '_token';
    csrfInput.value = token;

    formElement.appendChild(csrfInput);
  }

  private validateFormSecurity(formElement: HTMLFormElement, formId: string): boolean {
    const formData = new FormData(formElement);
    let securityScore = 100;
    const issues: string[] = [];

    // Check honeypot
    const honeypotValue = formData.get('_gotcha') as string;
    if (honeypotValue && honeypotValue.trim() !== '') {
      securityScore -= 100;
      issues.push('Honeypot field filled');
      return false;
    }

    // Check submission timing
    const startTime = this.formStartTime.get(formId);
    if (startTime && !this.spamDetector.checkSubmissionTiming(startTime, Date.now())) {
      securityScore -= 50;
      issues.push('Form filled too quickly');
    }

    // Check form content for spam
    const formContent = Array.from(formData.values()).join(' ');
    const spamCheck = this.spamDetector.checkContent(formContent);
    if (spamCheck.isSpam) {
      securityScore -= spamCheck.score;
      issues.push(...spamCheck.reasons);
    }

    // Check email validity (if email field exists)
    const emailField = formData.get('email') as string;
    if (emailField && !this.spamDetector.checkEmail(emailField)) {
      securityScore -= 30;
      issues.push('Suspicious email domain');
    }

    // Log security analysis
    console.group('🛡️ Form Security Analysis');
    console.log(`Security Score: ${securityScore}/100`);
    if (issues.length > 0) {
      console.log('Issues found:');
      issues.forEach(issue => console.log(`- ${issue}`);
    } else {
      console.log('✅ No security issues detected');
    }
    console.groupEnd();

    return securityScore >= 50; // Require minimum 50% security score
  }

  private monitorFormBehavior(formElement: HTMLFormElement): void {
    let rapidSubmissionCount = 0;
    let lastSubmissionTime = 0;

    formElement.addEventListener('submit', () => {
      const now = Date.now();
      if (now - lastSubmissionTime < 5000) { // Less than 5 seconds
        rapidSubmissionCount++;
        if (rapidSubmissionCount > 3) {
          console.warn('🚨 Rapid form submissions detected - possible bot');
          // Could block or add additional verification
        }
      } else {
        rapidSubmissionCount = 0;
      }
      lastSubmissionTime = now;
    });

    // Monitor for copy-paste behavior (could indicate automation)
    const inputs = formElement.querySelectorAll('input[type="text"], input[type="email"], textarea');
    inputs.forEach(input => {
      let pasteCount = 0;
      input.addEventListener('paste', () => {
        pasteCount++;
        if (pasteCount > 3) {
          console.warn('🚨 Excessive pasting detected');
        }
      });
    });
  }
}

// 🔐 Content Security Policy Helper
export function enforceCSP(): void {
  // Add basic CSP headers via meta tag (better to do server-side)
  const cspMeta = document.createElement('meta');
  cspMeta.httpEquiv = 'Content-Security-Policy';
  cspMeta.content = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://usebasin.com https://calendly.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://usebasin.com https://calendly.com"
  ].join('; ');

  document.head.appendChild(cspMeta);
}

// 🚫 Clickjacking Protection
export function preventClickjacking(): void {
  // Add X-Frame-Options equivalent
  const frameOptions = document.createElement('meta');
  frameOptions.httpEquiv = 'X-Frame-Options';
  frameOptions.content = 'DENY';
  document.head.appendChild(frameOptions);

  // JavaScript-based frame busting
  if (window.top !== window.self) {
    console.warn('🚨 Potential clickjacking attempt detected');
    window.top.location.href = window.self.location.href;
  }
}

// 🛡️ Initialize All Security Measures
export function initializeSecurity(): void {
  // Prevent clickjacking
  preventClickjacking();

  // Initialize form security for all forms
  const forms = document.querySelectorAll('form');
  const formManager = new FormSecurityManager();

  forms.forEach(form => {
    if (form instanceof HTMLFormElement) {
      formManager.initializeForm(form);
    }
  });

  // Add input sanitization to all text inputs
  const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
  textInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const sanitized = sanitizeInput(target.value);
      if (sanitized !== target.value) {
        target.value = sanitized;
        console.debug('Input sanitized');
      }
    });
  });

  console.log('🛡️ Security measures initialized');
}

// 📊 Security Audit Functions
export function auditPageSecurity(): void {
  console.group('🔍 Security Audit');

  // Check for mixed content
  const mixedContentElements = document.querySelectorAll('img[src^="http:"], script[src^="http:"], link[href^="http:"]');
  if (mixedContentElements.length > 0) {
    console.warn(`⚠️ Mixed content detected: ${mixedContentElements.length} insecure resources`);
  } else {
    console.log('✅ No mixed content detected');
  }

  // Check for inline event handlers
  const inlineHandlers = document.querySelectorAll('[onclick], [onload], [onerror], [onmouseover]');
  if (inlineHandlers.length > 0) {
    console.warn(`⚠️ Inline event handlers detected: ${inlineHandlers.length} elements`);
  } else {
    console.log('✅ No inline event handlers detected');
  }

  // Check for forms without CSRF protection
  const unprotectedForms = document.querySelectorAll('form:not([data-csrf-protected])');
  if (unprotectedForms.length > 0) {
    console.warn(`⚠️ Forms without CSRF protection: ${unprotectedForms.length}`);
  } else {
    console.log('✅ All forms have CSRF protection');
  }

  // Check for external scripts
  const externalScripts = document.querySelectorAll('script[src]:not([src^="/"], [src^="./"])');
  if (externalScripts.length > 0) {
    console.log(`ℹ️ External scripts loaded: ${externalScripts.length}`);
    externalScripts.forEach(script => {
      console.log(`- ${(script as HTMLScriptElement).src}`);
    });
  }

  console.groupEnd();
}