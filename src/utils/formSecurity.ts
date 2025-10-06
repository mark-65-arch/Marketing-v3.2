// 🛡️ Form Security Utilities
// Purpose: Input validation, sanitization, and spam prevention

/**
 * Sanitizes user input by removing potentially dangerous characters
 * @param input - Raw user input string
 * @returns Sanitized string safe for processing
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove null bytes
  let sanitized = input.replace(/\0/g, '');

  // HTML encode dangerous characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return sanitized.trim();
}

/**
 * Validates email address format
 * @param email - Email address to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // RFC 5322 simplified email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Additional checks
  const isValidFormat = emailRegex.test(email);
  const isReasonableLength = email.length >= 5 && email.length <= 254;
  const hasNoDoubleAt = (email.match(/@/g) || []).length === 1;

  return isValidFormat && isReasonableLength && hasNoDoubleAt;
}

/**
 * Validates phone number (US format support)
 * @param phone - Phone number to validate
 * @returns true if valid phone format
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  // Remove common formatting characters
  const cleaned = phone.replace(/[\s\-\(\)\+\.]/g, '');

  // Check for valid US phone number (10-11 digits)
  const phoneRegex = /^1?\d{10}$/;

  return phoneRegex.test(cleaned);
}

/**
 * Checks if input contains potential XSS attack patterns
 * @param input - User input to check
 * @returns true if suspicious patterns detected
 */
export function containsXSS(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }

  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // Event handlers like onclick=
    /<img[^>]*src[^>]*onerror/gi,
    /eval\(/gi,
    /expression\(/gi,
    /vbscript:/gi,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Checks if input contains potential SQL injection patterns
 * @param input - User input to check
 * @returns true if suspicious patterns detected
 */
export function containsSQLInjection(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }

  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|DECLARE)\b)/gi,
    /--/g, // SQL comments
    /;.*(\bSELECT|\bINSERT|\bUPDATE|\bDELETE)/gi,
    /'\s*(OR|AND)\s*'?\w+/gi, // Common injection pattern
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Rate limiting storage (in-memory, per session)
 * In production, use Redis or database for distributed rate limiting
 */
const rateLimitStore = new Map<string, { count: number; firstAttempt: number }>();

/**
 * Simple rate limiting check
 * @param identifier - Unique identifier (e.g., IP address)
 * @param maxAttempts - Maximum attempts allowed
 * @param windowMs - Time window in milliseconds
 * @returns true if rate limit exceeded
 */
export function isRateLimited(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 60000 // 1 minute default
): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record) {
    rateLimitStore.set(identifier, { count: 1, firstAttempt: now });
    return false;
  }

  // Reset if window has passed
  if (now - record.firstAttempt > windowMs) {
    rateLimitStore.set(identifier, { count: 1, firstAttempt: now });
    return false;
  }

  // Increment count
  record.count++;

  return record.count > maxAttempts;
}

/**
 * Validates honeypot field (should be empty)
 * @param honeypotValue - Value from honeypot field
 * @returns true if honeypot is filled (likely bot)
 */
export function isHoneypotFilled(honeypotValue: any): boolean {
  // Honeypot should always be empty for legitimate users
  return Boolean(honeypotValue && String(honeypotValue).trim().length > 0);
}

/**
 * Comprehensive form validation
 * @param formData - Form data to validate
 * @returns Object with validation result and errors
 */
export interface FormValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedData?: Record<string, string>;
}

export function validateContactForm(formData: FormData): FormValidationResult {
  const errors: string[] = [];
  const sanitizedData: Record<string, string> = {};

  // Check honeypot
  const honeypot = formData.get('website'); // Common honeypot field name
  if (isHoneypotFilled(honeypot)) {
    return {
      isValid: false,
      errors: ['Invalid submission'],
    };
  }

  // Validate and sanitize name
  const name = formData.get('name') as string;
  if (!name || name.trim().length < 2) {
    errors.push('Name is required (minimum 2 characters)');
  } else if (name.length > 100) {
    errors.push('Name is too long (maximum 100 characters)');
  } else if (containsXSS(name) || containsSQLInjection(name)) {
    errors.push('Name contains invalid characters');
  } else {
    sanitizedData.name = sanitizeInput(name);
  }

  // Validate and sanitize email
  const email = formData.get('email') as string;
  if (!email) {
    errors.push('Email is required');
  } else if (!isValidEmail(email)) {
    errors.push('Invalid email format');
  } else if (containsXSS(email)) {
    errors.push('Email contains invalid characters');
  } else {
    sanitizedData.email = sanitizeInput(email);
  }

  // Validate and sanitize phone (optional)
  const phone = formData.get('phone') as string;
  if (phone && phone.trim().length > 0) {
    if (!isValidPhone(phone)) {
      errors.push('Invalid phone number format');
    } else {
      sanitizedData.phone = sanitizeInput(phone);
    }
  }

  // Validate and sanitize message
  const message = formData.get('message') as string;
  if (!message || message.trim().length < 10) {
    errors.push('Message is required (minimum 10 characters)');
  } else if (message.length > 5000) {
    errors.push('Message is too long (maximum 5000 characters)');
  } else if (containsXSS(message) || containsSQLInjection(message)) {
    errors.push('Message contains invalid content');
  } else {
    sanitizedData.message = sanitizeInput(message);
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: errors.length === 0 ? sanitizedData : undefined,
  };
}
