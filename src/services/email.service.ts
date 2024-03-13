import * as nodemailer from "nodemailer";
import Logger from "@libs/logger";

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private logger: Logger;

  constructor(logger: Logger) {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    this.logger = logger;
  }
  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(options);
      this.logger.info("Email sent successfully");
    } catch (error) {
      this.logger.error("Email sending failed", error);
      throw new Error("Email sending failed");
    }
  }
}

export default EmailService;
