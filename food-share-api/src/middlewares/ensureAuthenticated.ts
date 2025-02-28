import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

interface IPayload {
  sub: string;
  type: 'donor' | 'vulnerable';
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: id, type } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as IPayload;

    request.user = {
      id,
      type,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
} 