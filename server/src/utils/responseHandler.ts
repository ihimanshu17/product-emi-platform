import { Response } from 'express';
import { IApiResponse } from '../types';

export function sendSuccess<T>(res: Response, data: T, message?: string, statusCode = 200): Response {
  const response: IApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(response);
}

export function sendError(res: Response, error: string, statusCode = 400, message?: string): Response {
  const response: IApiResponse<null> = {
    success: false,
    error,
    message,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(response);
}
