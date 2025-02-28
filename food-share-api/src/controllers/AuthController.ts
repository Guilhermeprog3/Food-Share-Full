import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '../useCases/AuthenticateUser/AuthenticateUserUseCase';
import { PrismaDonorRepository } from '../repositories/implementations/PrismaDonorRepository';
import { PrismaVulnerableRepository } from '../repositories/implementations/PrismaVulnerableRepository';
import { AppError } from '../errors/AppError';
import { verify } from 'jsonwebtoken';

export class AuthController {
  async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const donorRepository = new PrismaDonorRepository();
    const vulnerableRepository = new PrismaVulnerableRepository();

    // Tenta autenticar como doador primeiro
    const donor = await donorRepository.findByEmail(email);
    if (donor) {
      const authenticateUserUseCase = new AuthenticateUserUseCase(donorRepository);
      const { user, token } = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.json({ user, token, type: 'donor' });
    }

    // Se não encontrar como doador, tenta como vulnerável
    const vulnerable = await vulnerableRepository.findByEmail(email);
    if (vulnerable) {
      const authenticateUserUseCase = new AuthenticateUserUseCase(vulnerableRepository);
      const { user, token } = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.json({ user, token, type: 'vulnerable' });
    }

    throw new AppError('Email ou senha incorretos', 401);
  }

  async validateToken(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    try {
      const decoded = verify(token, process.env.JWT_SECRET as string);
      return response.json({ valid: true, decoded });
    } catch {
      return response.json({ valid: false });
    }
  }
} 