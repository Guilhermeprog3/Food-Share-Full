import { Request, Response } from "express";
import { CreateVulnerableUseCase } from "../useCases/CreateVulnerable/CreateVulnerableUseCase";
import { PrismaVulnerableRepository } from "../repositories/implementations/PrismaVulnerableRepository";
import { AppError } from "../errors/AppError";

export class VulnerableController {
  async create(request: Request, response: Response): Promise<any> {
    const { name, email, password, cpf } = request.body;

    const vulnerableRepository = new PrismaVulnerableRepository();
    const createVulnerableUseCase = new CreateVulnerableUseCase(
      vulnerableRepository
    );

    try {
      const vulnerable = await createVulnerableUseCase.execute({
        name,
        email,
        password,
        cpf,
      });

      return response.status(201).json(vulnerable);
    } catch (error) {
      console.error("Erro ao criar usuário vulnerável:", error);
      return response
        .status(500)
        .json({ error: "Erro ao criar usuário vulnerável" });
    }
  }

  async profile(request: Request, response: Response): Promise<any> {
    const { id } = request.user;
    const vulnerableRepository = new PrismaVulnerableRepository();

    const vulnerable = await vulnerableRepository.findById(id);

    if (!vulnerable) {
      throw new AppError("Vulnerável não encontrado", 404);
    }

    return response.json(vulnerable);
  }

  async update(request: Request, response: Response): Promise<any> {
    const { id } = request.user;
    const { email, cpf } = request.body;
    const vulnerableRepository = new PrismaVulnerableRepository();
    const vulnerableId = vulnerableRepository.findById(id)

    if(!vulnerableId){
      throw new AppError('Vulnerável não encontrado', 404)
    }

    try {
      const vulnerable = await vulnerableRepository.update(id, {
        email,
        cpf,
      });
  
      return response.json(vulnerable);
    } catch (error) {
      throw new AppError('Erro ao atualizar vulnerável', 400)
    }
  }

  async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.user;
    const vulnerableRepository = new PrismaVulnerableRepository();
    const vulnerable = vulnerableRepository.findById(id)

    if(!vulnerable){
      throw new AppError('Vulnerável não encontrado', 404)
    }

    try {
      await vulnerableRepository.delete(id);
  
      return response.status(204).send();
    } catch (error) {
      throw new AppError('Erro ao deletar vulnerável', 400)
    }
  }
}
