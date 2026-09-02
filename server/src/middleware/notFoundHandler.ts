import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseHandler';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  return sendError(res, `API route not found: ${req.method} ${req.originalUrl}`, 404);
}
