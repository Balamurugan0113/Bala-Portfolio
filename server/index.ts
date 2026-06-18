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
        subject: `[Cyber Portfolio] Secure Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nMessage Payload:\n\n${message}\n\n--- End of Payload ---`
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
