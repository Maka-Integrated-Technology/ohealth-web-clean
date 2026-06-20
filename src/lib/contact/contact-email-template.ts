import type { ContactMessageInput } from '@/lib/contact/contact-message';

/** Inline mark from `src/app/icon.svg` — heart + plus gradient */
const OHEALTH_LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OHealth+"><path d="M19.4626 3.99354C16.7809 2.34862 14.4404 3.0115 13.0344 4.0674C12.4578 4.50035 12.1696 4.71682 12 4.71682C11.8304 4.71682 11.5422 4.50035 10.9656 4.0674C9.55962 3.0115 7.21909 2.34862 4.53744 3.99354C1.01807 6.15232 0.221718 13.2742 8.33953 19.2827C9.88572 20.4272 10.6588 20.9994 12 20.9994C13.3412 20.9994 14.1143 20.4272 15.6605 19.2827C23.7783 13.2742 22.9819 6.15232 19.4626 3.99354Z" fill="url(#paint0_linear_contact_email)"/><path d="M12 9V15M9 12H15" stroke="#D1E0FF" stroke-width="1.5" stroke-linecap="round"/><defs><linearGradient id="paint0_linear_contact_email" x1="2" y1="11.9994" x2="22" y2="11.9994" gradientUnits="userSpaceOnUse"><stop stop-color="#063595"/><stop offset="1" stop-color="#254991"/></linearGradient></defs></svg>`;

const BRAND_BLUE = '#063595';
const BRAND_BLUE_DARK = '#254991';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_MUTED = '#5c5c5c';
const SURFACE_GRAY = '#f3f4f6';
const CARD_GRAY = '#eceef2';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fieldRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:0 0 12px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <p style="margin:0 0 4px 0;font-size:13px;line-height:1.4;font-weight:600;color:${TEXT_MUTED};">${escapeHtml(label)}</p>
        <p style="margin:0;font-size:16px;line-height:1.5;font-weight:500;color:${TEXT_PRIMARY};">${escapeHtml(value)}</p>
      </td>
    </tr>
  `;
}

export function buildContactEmailHtml(input: ContactMessageInput): string {
  const safeName = escapeHtml(input.fullName);
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message).replace(/\n/g, '<br />');
  const replyHref = `mailto:${encodeURIComponent(input.email)}?subject=${encodeURIComponent(`Re: Your OHealth+ inquiry`)}`;

  const professionRow = input.profession ? fieldRow('Profession', input.profession) : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>New contact message</title>
</head>
<body style="margin:0;padding:0;background-color:${SURFACE_GRAY};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${SURFACE_GRAY};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background-color:#ffffff;border-radius:20px;overflow:hidden;">
          <tr>
            <td align="center" style="padding:32px 24px 24px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" style="padding-right:8px;line-height:0;">${OHEALTH_LOGO_SVG}</td>
                  <td valign="middle" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;line-height:1.1;letter-spacing:-0.8px;color:${TEXT_PRIMARY};">
                    OHealth<span style="color:${BRAND_BLUE};">+</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="background:linear-gradient(90deg,${BRAND_BLUE} 0%,${BRAND_BLUE_DARK} 100%);border-radius:16px;padding:20px 24px;">
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:28px;line-height:1.2;font-weight:700;color:#ffffff;text-align:center;">
                      New Contact Message
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 32px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${CARD_GRAY};border-radius:16px;">
                <tr>
                  <td style="padding:28px 24px;">
                    <p style="margin:0 0 16px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:18px;line-height:1.4;font-weight:700;color:${TEXT_PRIMARY};">
                      Hello,
                    </p>
                    <p style="margin:0 0 24px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;font-weight:500;color:${TEXT_PRIMARY};">
                      Someone reached out through the OHealth+ contact form. Here are the details:
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:24px;">
                      ${fieldRow('Name', input.fullName)}
                      ${fieldRow('Email', input.email)}
                      ${professionRow}
                      <tr>
                        <td style="padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                          <p style="margin:0 0 4px 0;font-size:13px;line-height:1.4;font-weight:600;color:${TEXT_MUTED};">Message</p>
                          <p style="margin:0;font-size:16px;line-height:1.6;font-weight:500;color:${TEXT_PRIMARY};">${safeMessage}</p>
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td align="center" style="padding:8px 0 20px 0;">
                          <a href="${replyHref}" style="display:inline-block;background:linear-gradient(90deg,${BRAND_BLUE} 0%,${BRAND_BLUE_DARK} 100%);color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;line-height:1;text-decoration:none;padding:16px 32px;border-radius:999px;">
                            Reply to ${safeName}
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:0 0 20px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;font-weight:500;color:${TEXT_MUTED};text-align:center;">
                      Reply directly to ${safeEmail} to continue the conversation.
                    </p>
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;font-weight:600;color:${TEXT_PRIMARY};">
                      Stay healthy,<br />
                      OHealth+ Team
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
