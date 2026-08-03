import { Request, Response } from 'express';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Resend sends via secure HTTPS web traffic, avoiding all SMTP/IPv6 blocking
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.EMAIL_USER || '', // Your personal email address where you want to receive messages
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    console.log('Email sent successfully via Resend:', data);
    res.status(200).json({ success: true, message: "Message received successfully!" });
  } catch (error: any) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: error.message || 'Failed to send email.' });
  }
};