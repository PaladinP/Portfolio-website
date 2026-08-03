import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

// Define the expected payload structure
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

    // Basic validation
    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email, and message are required fields." });
      return;
    }

    // Configure the email transporter using your Gmail credentials from .env
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      family: 4, // Forces IPv4 to bypass Render's network restriction
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    } as any);

    // Structure the email routing
    const mailOptions = {
      from: process.env.EMAIL_USER, // Authenticated sender
      to: process.env.EMAIL_USER,   // Sending to yourself
      replyTo: email,               // Allows you to reply directly to the person
      subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email successfully routed from ${name} (${email})`);

    res.status(200).json({ success: true, message: "Message received successfully!" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};