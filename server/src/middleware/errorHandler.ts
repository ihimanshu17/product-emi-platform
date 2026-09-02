import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseHandler';

export interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected internal server error occurred';

  return sendError(res, message, statusCode);
}
