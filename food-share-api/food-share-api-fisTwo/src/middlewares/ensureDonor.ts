import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function ensureDonor(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { type } = request.user;

  if (type !== 'donor') {
    throw new AppError('Acesso permitido apenas para doadores', 403);
  }

  return next();
} 