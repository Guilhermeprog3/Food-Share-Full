import { verify } from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';

interface IValidateTokenDTO {
  token: string;
}

interface ITokenPayload {
  sub: string;
  type: 'donor' | 'vulnerable';
}

export class ValidateTokenUseCase {
  async execute({ token }: IValidateTokenDTO): Promise<ITokenPayload> {
    try {
      const decoded = verify(token, process.env.JWT_SECRET as string) as ITokenPayload;
      return decoded;
    } catch {
      throw new AppError('Token inválido', 401);
    }
  }
} 