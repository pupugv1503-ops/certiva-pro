import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

const { combine, timestamp, printf, colorize, errors } = format;

// Ensure log directory exists
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  let log = `${timestamp} [${level}]: ${message}`;
  
  if (stack) {
    log += `\n${stack}`;
  }
  
  if (Object.keys(meta).length > 0) {
    log += `\n${JSON.stringify(meta, null, 2)}`;
  }
  
  return log;
});

// Define different colors for each log level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston that we want to link the colors
const addColors = {
  colors,
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
};

// Create the logger instance
const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    // Console transport
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        printf(
          (info) =>
            `${info.timestamp} [${info.level}]: ${info.message}${
              info.stack ? '\n' + info.stack : ''
            }`
        )
      ),
    }),
    // Daily rotate file transport for all logs
    new transports.DailyRotateFile({
      filename: path.join(logDir, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    }),
    // Error logs
    new transports.DailyRotateFile({
      filename: path.join(logDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      level: 'error',
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(logDir, 'exceptions.log'),
    }),
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

// If we're not in production, log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest })`
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(colorize(), logFormat),
    })
  );
}

// Create a stream object with a 'write' function that will be used by `morgan`
export const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

export { logger };
