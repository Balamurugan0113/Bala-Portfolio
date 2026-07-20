import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Log incoming tactical commands
app.use((req, _res, next) => {
  console.log(`[CORE] ${new Date().toISOString()} // ${req.method} ${req.url}`);
  next();
});

// Configure nodemailer transporter dynamically
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "587");
const smtpSecure = process.env.SMTP_SECURE === "true";

let transporter: nodemailer.Transporter | null = null;
if (smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
  console.log(`[CORE] SMTP Transporter configured via ${smtpHost}:${smtpPort}`);
} else {
  console.log("[CORE] ⚠️ SMTP credentials missing. Inbound form submissions will be logged locally to the console instead of sending live email. Set 'SMTP_USER' and 'SMTP_PASS' variables to activate email alerts.");
}

// Endpoint for processing contact inquiries
app.post("/api/contact", async (req: Request, res: Response) => {
  const { name, email, company, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Payload incomplete. Required: name, email, message."
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Invalid transmission vector. Email must be valid."
    });
  }

  // Audit Logs Output
  console.log("\n==================================================");
  console.log("🔒 NEW SECURE LINK CONNECTION INBOUND");
  console.log("==================================================");
  console.log(`AGENT NAME : ${name}`);
  console.log(`EMAIL ADDR : ${email}`);
  console.log(`CORP ENTITY: ${company || "N/A"}`);
  console.log(`MESSAGE PAYLOAD:\n"${message}"`);
  console.log("==================================================\n");

  // Send email if SMTP is configured
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: "tharanishbalaa@gmail.com",
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
      console.log(`[CORE] Email alert sent to tharanishbalaa@gmail.com`);
    } catch (err: any) {
      console.error(`[CORE] ❌ Error forwarding email:`, err.message || err);
    }
  }

  return res.status(200).json({
    success: true,
    message: "Data transmission successful. Connection closed."
  });
});

// Serving the React application assets in production
const distPath = path.resolve(__dirname, "../dist/client");

// Check if we are running built assets
app.use(express.static(distPath));

// Catch-all route to serve the Single Page App for client routing
app.get("*", (req, res, next) => {
  // If requesting api or static files that do not exist, do not return index.html
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      res.status(404).send("HQ terminal assets not built yet. Run 'npm run build' first.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`[CORE] NetSector Tactical Core Server running on port ${PORT}`);
});
