import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    // SMTP Transporter (e.g. Gmail, Outlook, etc)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, 
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email to YOU
    await transporter.sendMail({
      from: `"ATN Solutions" <${process.env.SMTP_USER}>`,
      to: "info@atn-solutions.co.za",  
      subject: "New Notify Me Subscriber",
      text: `New subscriber: ${email}`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ message: "Email failed" });
  }
}
