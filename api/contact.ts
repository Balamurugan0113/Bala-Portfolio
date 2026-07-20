import { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Method not allowed' }));
    return;
  }

  let body = '';
  await new Promise<void>((resolve) => {
    req.on('data', (chunk: string) => { body += chunk; });
    req.on('end', () => resolve());
  });
  const { name, email, company, message } = JSON.parse(body);

  if (!name || !email || !message) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Payload incomplete. Required: name, email, message.' }));
    return;
  }

  if (!email.includes('@')) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Invalid email address.' }));
    return;
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: 'tharanishbalaa@gmail.com',
        subject: `New Portfolio Inquiry from ${name}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:linear-gradient(135deg,#4F8CFF,#8B5CF6);padding:32px 40px;">
              <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;letter-spacing:-0.3px;">New Portfolio Inquiry</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">Someone reached out from your portfolio</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:16px;">
                    <div style="font-size:11px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Name</div>
                    <div style="font-size:15px;color:#1a1a2e;font-weight:600;">${name}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:16px;">
                    <div style="font-size:11px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Email</div>
                    <a href="mailto:${email}" style="font-size:15px;color:#4F8CFF;text-decoration:none;font-weight:500;">${email}</a>
                  </td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding-bottom:16px;">
                    <div style="font-size:11px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Company</div>
                    <div style="font-size:15px;color:#1a1a2e;font-weight:500;">${company}</div>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding-bottom:8px;">
                    <div style="font-size:11px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Message</div>
                    <div style="font-size:14px;color:#444;line-height:1.7;background:#f8fafc;padding:16px 20px;border-radius:8px;border-left:3px solid #4F8CFF;">${message.replace(/\n/g, '<br>')}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #edf2f7;">
              <p style="margin:0;font-size:12px;color:#94A3B8;">Sent from your portfolio contact form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
      });
    } catch (err: any) {
      console.error('Error sending email:', err.message || err);
    }
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: true, message: 'Message sent successfully!' }));
}
