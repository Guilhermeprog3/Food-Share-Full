import { Request, Response } from 'express';
import { CreateDonorUseCase } from '../useCases/CreateDonor/CreateDonorUseCase';
import { PrismaDonorsRepository } from '../repositories/implementations/PrismaDonorRepository';
import { AppError } from '../errors/AppError';


export class DonorController {
  async create(request: Request, response: Response): Promise<any> {
    const { name, cnpj, email, responsible, password, latitude, longitude } = request.body;

    const donorRepository = new PrismaDonorsRepository();
    const createDonorUseCase = new CreateDonorUseCase(donorRepository);

    const donor = await createDonorUseCase.execute({
      name,
      cnpj,
      email,
      responsible,
      password,
      latitude: latitude ?? 0, 
      longitude: longitude ?? 0
    });

    return response.status(201).json(donor);
  }

  async list(request: Request, response: Response): Promise<any> {
    const donorRepository = new PrismaDonorsRepository();
    const donors = await donorRepository.findAll();

    return response.json(donors);
  }

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.user;
    const donorRepository = new PrismaDonorsRepository();
    
    const donor = await donorRepository.findById(id);
    
    if (!donor) {
      throw new AppError('Doador não encontrado', 404);
    }
    
    return response.json(donor);
  }

  async update(request: Request, response: Response): Promise<any> {
    const { id } = request.user;
    const { name, cnpj, email, responsible, latitude, longitude } = request.body;
    const donorRepository = new PrismaDonorsRepository();
    const donor = await donorRepository.findById(id);

    if(!donor){
      throw new AppError('Doador não encontrado', 404)
    }

    try {
      const donor = await donorRepository.update(id, {
        name,
        cnpj,
        email,
        responsible,
        latitude: latitude ?? 0,  
        longitude: longitude ?? 0,
      });
      
      return response.json(donor);
    } catch (error) {
      throw new AppError('Erro ao atualizar doador', 400)
    }
  }

  async listNearby(request: Request, response: Response): Promise<any> {
    const { latitude, longitude, raio = 10 } = request.query;
    const donorRepository = new PrismaDonorsRepository();
    
    try {
      const foods = await donorRepository.findNearby({
        latitude: Number(latitude),
        longitude: Number(longitude),
        radius: Number(raio)
      });
      
      return response.json(foods);
    } catch (error) {
      throw new AppError('Erro ao listar doadores próximos', 400)
    }
  }


  async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const donorRepository = new PrismaDonorsRepository();
    const donor = await donorRepository.findById(id);

    if(!donor){
      throw new AppError('Doador não encontrado', 404)
    }
    
    try {
      await donorRepository.delete(id);
      
      return response.status(204).send();
      
    } catch (error) {
      throw new AppError('Erro ao deletar doador', 400)
    }
  }

} 