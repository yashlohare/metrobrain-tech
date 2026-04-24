import { NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ valid: false, message: 'Invalid email format.' });
    }

    const domain = email.split('@')[1];

    // List of known disposable/temporary email domains to block instantly
    const disposableDomains = [
      'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 
      'yopmail.com', 'temp-mail.org', 'throwawaymail.com', 'fakemail.net'
    ];

    if (disposableDomains.includes(domain.toLowerCase())) {
      return NextResponse.json({ valid: false, message: 'Disposable email addresses are not allowed.' });
    }

    try {
      // Check if the domain has valid Mail Exchange (MX) records
      const records = await resolveMx(domain);
      if (records && records.length > 0) {
        return NextResponse.json({ valid: true });
      } else {
        return NextResponse.json({ valid: false, message: 'This email domain does not exist or cannot receive emails.' });
      }
    } catch (error) {
      // If DNS resolution fails (ENOTFOUND, ENODATA), the domain is invalid
      return NextResponse.json({ valid: false, message: 'Invalid email domain.' });
    }

  } catch (error) {
    // If our server has an issue, fail gracefully so we don't accidentally block a legitimate lead
    return NextResponse.json({ valid: true });
  }
}
