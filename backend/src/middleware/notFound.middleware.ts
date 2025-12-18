import { Request, Response, NextFunction } from 'express';
import { notFoundHandler as notFound } from './error.middleware';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  return notFound(req, res, next);
};
