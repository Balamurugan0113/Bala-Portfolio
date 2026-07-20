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
<body style="margin:0;padding:0;background:#0b1120;font-family:'Inter','Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:16px;overflow:hidden;border:1px solid rgba(79,140,255,0.12);">
          <tr>
            <td style="padding:36px 40px 0;">
              <div style="width:40px;height:4px;background:linear-gradient(90deg,#4F8CFF,#8B5CF6);border-radius:2px;margin-bottom:20px;"></div>
              <h1 style="margin:0 0 4px;color:#f1f5f9;font-size:22px;font-weight:700;letter-spacing:-0.4px;">New Contact</h1>
              <p style="margin:0 0 24px;color:#64748b;font-size:14px;">${new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="height:1px;background:rgba(79,140,255,0.08);"></td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;">
                    <div style="display:inline-block;padding:4px 12px;border-radius:6px;background:rgba(79,140,255,0.08);color:#4F8CFF;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">Name</div>
                    <div style="font-size:16px;color:#f1f5f9;font-weight:600;">${name}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:20px;">
                    <div style="display:inline-block;padding:4px 12px;border-radius:6px;background:rgba(79,140,255,0.08);color:#4F8CFF;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">Email</div>
                    <a href="mailto:${email}" style="display:block;font-size:16px;color:#60a5fa;text-decoration:none;font-weight:500;">${email}</a>
                  </td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding-bottom:20px;">
                    <div style="display:inline-block;padding:4px 12px;border-radius:6px;background:rgba(79,140,255,0.08);color:#4F8CFF;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">Company</div>
                    <div style="font-size:16px;color:#f1f5f9;font-weight:500;">${company}</div>
                  </td>
                </tr>` : ''}
                <tr>
                  <td>
                    <div style="display:inline-block;padding:4px 12px;border-radius:6px;background:rgba(79,140,255,0.08);color:#4F8CFF;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Message</div>
                    <div style="font-size:14px;color:#cbd5e1;line-height:1.8;background:rgba(15,23,42,0.6);padding:16px 20px;border-radius:10px;border-left:3px solid #4F8CFF;">${message.replace(/\n/g, '<br>')}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(79,140,255,0.08);">
              <p style="margin:0;font-size:12px;color:#475569;">Sent from <span style="color:#4F8CFF;">Balamurugan C</span> Portfolio</p>
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
