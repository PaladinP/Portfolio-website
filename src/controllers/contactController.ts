import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dns from 'dns/promises';

interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const submitContactForm = async (
  req: Request<{}, {}, ContactRequest>,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email, and message are required fields." });
      return;
    }

    // Explicitly resolve smtp.gmail.com to an IPv4 address to bypass Render's IPv6 restriction
    const ipv4Addresses = await dns.resolve4('smtp.gmail.com');
    const ipv4Host = ipv4Addresses[0];

    const transporter = nodemailer.createTransport({
      host: ipv4Host,
      port: 465,
      secure: true,
      tls: {
        servername: 'smtp.gmail.com', // Ensures SSL certificate validation matches
      },
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    } as any);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email successfully routed from ${name} (${email})`);

    res.status(200).json({ success: true, message: "Message received successfully!" });
  } catch (error: any) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: error.message || 'Failed to send email.' });
  }
};