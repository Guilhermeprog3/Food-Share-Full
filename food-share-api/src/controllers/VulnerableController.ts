import { Request, Response } from 'express';
import { CreateVulnerableUseCase } from '../useCases/CreateVulnerable/CreateVulnerableUseCase';
import { PrismaVulnerableRepository } from '../repositories/implementations/PrismaVulnerableRepository';
import { AppError } from '../errors/AppError';

export class VulnerableController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password, cpf } = request.body;

    const vulnerableRepository = new PrismaVulnerableRepository();
    const createVulnerableUseCase = new CreateVulnerableUseCase(vulnerableRepository);

    const vulnerable = await createVulnerableUseCase.execute({
      email,
      password,
      cpf,
    });

    return response.status(201).json(vulnerable);
  }

  async profile(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const vulnerableRepository = new PrismaVulnerableRepository();
    
    const vulnerable = await vulnerableRepository.findById(id);
    
    if (!vulnerable) {
      throw new AppError('Vulnerável não encontrado', 404);
    }
    
    return response.json(vulnerable);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { email, cpf } = request.body;
    const vulnerableRepository = new PrismaVulnerableRepository();
    
    const vulnerable = await vulnerableRepository.update(id, {
      email,
      cpf,
    });
    
    return response.json(vulnerable);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const vulnerableRepository = new PrismaVulnerableRepository();
    
    await vulnerableRepository.delete(id);
    
    return response.status(204).send();
  }
} 