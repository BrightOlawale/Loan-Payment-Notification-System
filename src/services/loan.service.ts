import EmailService from "./email.service";
import {
  NotificationData,
  ConstructRepaidNotification,
  ConstructUnpaidNotification,
} from "src/notification-templates";
import Logger from "@libs/logger";

export class LoanService {
  private emailService: EmailService;
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
    this.emailService = new EmailService(this.logger);
  }

  async sendRepaidNotification(data: NotificationData): Promise<void> {
    try {
      const message = ConstructRepaidNotification(data);
      await this.emailService.sendEmail({
        from: process.env.EMAIL_FROM,
        to: data.email,
        subject: "Loan Repayment",
        html: message,
      });
      this.logger.info("Loan repaid notification sent");
    } catch (error) {
      this.logger.error("Error sending repaid notification:", error);
      throw new Error("Email sending failed");
    }
  }

  async sendUnpaidNotification(data: NotificationData): Promise<void> {
    try {
      const message = ConstructUnpaidNotification(data);
      await this.emailService.sendEmail({
        from: process.env.EMAIL_FROM,
        to: data.email,
        subject: "Loan Repayment",
        html: message,
      });
      this.logger.info("Loan unpaid notification sent");
    } catch (error) {
      this.logger.error("Error sending unpaid notification:", error);
      throw new Error("Email sending failed");
    }
  }
}
