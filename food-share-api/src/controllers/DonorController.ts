import { Request, Response } from 'express';
import { CreateDonorUseCase } from '../useCases/CreateDonor/CreateDonorUseCase';
import { PrismaDonorRepository } from '../repositories/implementations/PrismaDonorRepository';
import { PrismaFoodRepository } from '../repositories/implementations/PrismaFoodRepository';
import { AppError } from '../errors/AppError';

export class DonorController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, cnpj, email, responsible, password, latitude, longitude, local } = request.body;

    const donorRepository = new PrismaDonorRepository();
    const createDonorUseCase = new CreateDonorUseCase(donorRepository);

    const donor = await createDonorUseCase.execute({
      name,
      cnpj,
      email,
      responsible,
      password,
      latitude,
      longitude,
      local,
    });

    return response.status(201).json(donor);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const donorRepository = new PrismaDonorRepository();
    const donors = await donorRepository.findAll();

    return response.json(donors);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const donorRepository = new PrismaDonorRepository();
    
    const donor = await donorRepository.findById(id);
    
    if (!donor) {
      throw new AppError('Doador não encontrado', 404);
    }
    
    return response.json(donor);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, cnpj, email, responsible, latitude, longitude, local } = request.body;
    const donorRepository = new PrismaDonorRepository();
    
    const donor = await donorRepository.update(id, {
      name,
      cnpj,
      email,
      responsible,
      latitude,
      longitude,
      local,
    });
    
    return response.json(donor);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const donorRepository = new PrismaDonorRepository();
    
    await donorRepository.delete(id);
    
    return response.status(204).send();
  }

  async listFoods(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const donorRepository = new PrismaDonorRepository();
    
    const donor = await donorRepository.findById(id);
    
    if (!donor) {
      throw new AppError('Doador não encontrado', 404);
    }
    
    return response.json(donor.foods);
  }
} 