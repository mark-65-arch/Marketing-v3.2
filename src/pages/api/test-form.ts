import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const phone = formData.get('phone') as string;
    const business = formData.get('business') as string;
    const gotcha = formData.get('_gotcha') as string;
    const redirectUrl = formData.get('_redirect') as string;

    // Log submission details
    console.log('\n🔍 FORM SUBMISSION TEST');
    console.log('=======================');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone || '(not provided)');
    console.log('Business:', business || '(not provided)');
    console.log('Message:', message);
    console.log('Honeypot (_gotcha):', gotcha || '(empty - good!)');
    console.log('Redirect URL:', redirectUrl);

    // Security checks
    console.log('\n🛡️ SECURITY CHECKS');
    console.log('==================');

    // Check honeypot
    if (gotcha && gotcha.trim() !== '') {
      console.log('❌ SPAM DETECTED: Honeypot field filled');
      console.log('   Bot likely filled hidden field');
      console.log('   Action: Would block submission');

      // Still redirect to success page (to not alert spammers)
      return redirect(redirectUrl || '/success');
    } else {
      console.log('✅ Honeypot check passed');
    }

    // Check for spam keywords
    const spamKeywords = ['casino', 'viagra', 'cialis', 'lottery', 'winner', 'investment', 'money', 'earn', 'click here', 'free money'];
    const allText = (name + ' ' + email + ' ' + message).toLowerCase();
    const foundSpamKeywords = spamKeywords.filter(keyword => allText.includes(keyword));

    if (foundSpamKeywords.length > 0) {
      console.log('❌ SPAM DETECTED: Spam keywords found');
      console.log('   Keywords found:', foundSpamKeywords);
      console.log('   Action: Would block submission');

      return redirect(redirectUrl || '/success');
    } else {
      console.log('✅ Spam keyword check passed');
    }

    // Check for suspicious URLs/links
    const suspiciousPatterns = /https?:\/\/|www\.|\.com|\.net|\.org/gi;
    const foundLinks = message.match(suspiciousPatterns);

    if (foundLinks && foundLinks.length > 0) {
      console.log('⚠️ SUSPICIOUS: Links detected in message');
      console.log('   Links found:', foundLinks);
      console.log('   Action: Would flag for review');
    } else {
      console.log('✅ Link check passed');
    }

    // Validate required fields
    if (!name || !email || !phone || !message) {
      const missing = [];
      if (!name) missing.push('name');
      if (!email) missing.push('email');
      if (!phone) missing.push('phone');
      if (!message) missing.push('message');

      console.log('❌ INVALID: Required fields missing');
      console.log('   Missing fields:', missing);
      console.log('   Action: Would reject submission');

      return new Response('Required fields missing: ' + missing.join(', '), { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ INVALID: Email format invalid');
      console.log('   Email provided:', email);
      console.log('   Action: Would reject submission');

      return new Response('Invalid email format', { status: 400 });
    } else {
      console.log('✅ Email format check passed');
    }

    // Validate phone number
    const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
    const digitsOnly = phone.replace(/\D/g, '');

    if (digitsOnly.length < 10) {
      console.log('❌ INVALID: Phone number too short');
      console.log('   Phone provided:', phone);
      console.log('   Digits found:', digitsOnly.length);
      console.log('   Action: Would reject submission');

      return new Response('Phone number must have at least 10 digits', { status: 400 });
    } else if (!phoneRegex.test(phone)) {
      console.log('❌ INVALID: Phone number format invalid');
      console.log('   Phone provided:', phone);
      console.log('   Action: Would reject submission');

      return new Response('Invalid phone number format', { status: 400 });
    } else {
      console.log('✅ Phone format check passed');
      console.log('   Digits found:', digitsOnly.length);
    }

    // Check field lengths
    console.log('\n📏 FIELD LENGTH CHECKS');
    console.log('=====================');
    console.log('Name length:', name.length, '/ 100');
    console.log('Email length:', email.length, '/ 100');
    console.log('Phone length:', phone.length, '/ 20');
    console.log('Message length:', message.length, '/ 1000');
    if (business) console.log('Business length:', business.length, '/ 100');

    // Final result
    console.log('\n✅ SUBMISSION APPROVED');
    console.log('=====================');
    console.log('This submission would be sent to Basin');
    console.log('All security checks passed');
    console.log('User will be redirected to success page');

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redirect to success page
    return redirect(redirectUrl || '/success');

  } catch (error) {
    console.error('Error processing form:', error);
    return new Response('Error processing form', { status: 500 });
  }
};