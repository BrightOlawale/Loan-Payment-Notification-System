import * as winston from "winston";
import { Logger as WinstonLogger, transports, format } from "winston";

class Logger {
  private logger: WinstonLogger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      defaultMeta: { service: "Loan-Service" },
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ level, message, timestamp, stack }) => {
              return `${timestamp} [${level.toUpperCase()}]: ${message}${
                stack ? `\n${stack}` : ""
              }`;
            })
          ),
        }),
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log" }),
      ],
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string, error?: Error): void {
    this.logger.error(message, { error });
  }
}

export default Logger;
