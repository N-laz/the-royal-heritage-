import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT ?? 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: (process.env.SMTP_SECURE ?? (port === 465 ? "true" : "false")) === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

export type EmailMessage = {
  to: string;
  bcc?: string;
  subject: string;
  html: string;
  text: string;
};

/** Sends an email. Never throws — email failures must not break bookings. */
export async function sendEmail(message: EmailMessage): Promise<{ ok: boolean; error?: string }> {
  const provider = (process.env.EMAIL_PROVIDER ?? "console").toLowerCase();

  if (provider !== "smtp") {
    console.log(`\n[email:console] To: ${message.to}\nBcc: ${message.bcc ?? "—"}\nSubject: ${message.subject}\n${message.text}\n`);
    return { ok: true };
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("[email] SMTP_USER / SMTP_PASS are not set. Email not sent.");
    return { ok: false, error: "SMTP not configured" };
  }

  try {
    await getTransporter().sendMail({
      from: process.env.EMAIL_FROM ?? `The Royal Heritage <${process.env.SMTP_USER}>`,
      to: message.to,
      bcc: message.bcc,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
    return { ok: true };
  } catch (error) {
    console.error("[email] Failed to send:", error);
    return { ok: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
