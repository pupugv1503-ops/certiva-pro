import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface ErrorWithStatus extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  code?: number;
  keyValue?: any;
  errors?: any;
  path?: string;
  value?: string;
}

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log the error in development
  if (process.env.NODE_ENV === 'development') {
    logger.error('Error 💥', {
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
        ...(err.keyValue && { keyValue: err.keyValue }),
      },
      request: {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
      },
    });
  }

  // Handle specific error types
  if (err.name === 'CastError') {
    const message = `Invalid ${err.path}: ${err.value}`;
    return res.status(400).json({
      status: 'fail',
      message,
    });
  }

  if (err.code === 11000) {
    const value = err.keyValue ? Object.values(err.keyValue)[0] : 'unknown';
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return res.status(400).json({
      status: 'fail',
      message,
    });
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors || {}).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return res.status(400).json({
      status: 'fail',
      message,
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token. Please log in again!',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Your token has expired! Please log in again.',
    });
  }

  // For other operational errors
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
    });
  }

  // For programming or other unknown errors
  console.error('ERROR 💥', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
};
