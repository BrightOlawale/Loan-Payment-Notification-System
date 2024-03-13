import { Handler } from "aws-lambda";
import Ajv, { ValidateFunction } from "ajv";
import schema from "../schema";
import { LoanService } from "src/services";
import { NotificationData } from "src/notification-templates";
import Logger from "@libs/logger";

const validator = new Ajv();
const logger = new Logger();
const loanService = new LoanService(logger);
const validateEvent: ValidateFunction = validator.compile(schema);

const handler: Handler = async (event) => {
  try {
    const isValid = validateEvent(event);
    if (!isValid) {
      logger.error("Invalid event data");
      throw new Error("Invalid event data");
    }

    const { name, email, loan_amount, account_number } =
      event as NotificationData;
    const unpaidData = { name, email, loan_amount, account_number };
    await loanService.sendRepaidNotification(unpaidData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Loan repaid event processed" }),
    };
  } catch (error) {
    logger.error("Loan repaid event processing failed");
    throw new Error("Loan repaid event processing failed");
  }
};

export const main = handler;
