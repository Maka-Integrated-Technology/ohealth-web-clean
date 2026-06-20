import { describe, expect, it } from 'vitest';

import { buildContactEmailHtml } from '@/lib/contact/contact-email-template';

describe('buildContactEmailHtml', () => {
  it('escapes HTML in user-supplied fields', () => {
    const html = buildContactEmailHtml({
      fullName: '<script>alert("xss")</script>',
      email: 'evil@example.com"><img src=x onerror=alert(1)>',
      profession: '"><svg/onload=alert(1)>',
      message: 'Hello & goodbye\n<script>bad()</script>',
    });

    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    expect(html).toContain('Hello &amp; goodbye');
    expect(html).toContain('&lt;script&gt;bad()&lt;/script&gt;');
    expect(html).toContain('&lt;svg/onload=alert(1)&gt;');
  });

  it('encodes mailto reply link safely', () => {
    const html = buildContactEmailHtml({
      fullName: 'Jane Doe',
      email: 'jane+tag@example.com',
      profession: '',
      message: 'Hi',
    });

    expect(html).toContain('mailto:jane%2Btag%40example.com');
    expect(html).not.toContain('href="mailto:jane+tag@example.com"');
  });
});
