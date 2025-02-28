import { Request, Response } from 'express';
import { CreateFoodUseCase } from '../useCases/CreateFood/CreateFoodUseCase';
import { PrismaFoodRepository } from '../repositories/implementations/PrismaFoodRepository';
import { AppError } from '../errors/AppError';

export class FoodController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, expiration_time, quantity } = request.body;
    const donor_id = request.user.id;

    const foodRepository = new PrismaFoodRepository();
    const createFoodUseCase = new CreateFoodUseCase(foodRepository);

    const food = await createFoodUseCase.execute({
      name,
      expiration_time: new Date(expiration_time),
      quantity,
      donor_id,
    });

    return response.status(201).json(food);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const foodRepository = new PrismaFoodRepository();
    const foods = await foodRepository.findAll();

    return response.json(foods);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const foodRepository = new PrismaFoodRepository();
    
    const food = await foodRepository.findById(id);
    
    if (!food) {
      throw new AppError('Alimento não encontrado', 404);
    }
    
    return response.json(food);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, expiration_time, quantity } = request.body;
    const foodRepository = new PrismaFoodRepository();
    
    const food = await foodRepository.update(id, {
      name,
      expiration_time: new Date(expiration_time),
      quantity,
    });
    
    return response.json(food);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const foodRepository = new PrismaFoodRepository();
    
    await foodRepository.delete(id);
    
    return response.status(204).send();
  }

  async listNearby(request: Request, response: Response): Promise<Response> {
    const { latitude, longitude, raio = 10 } = request.query;
    const foodRepository = new PrismaFoodRepository();
    
    const foods = await foodRepository.findNearby({
      latitude: Number(latitude),
      longitude: Number(longitude),
      radius: Number(raio)
    });
    
    return response.json(foods);
  }

  async listAvailable(request: Request, response: Response): Promise<Response> {
    const foodRepository = new PrismaFoodRepository();
    const foods = await foodRepository.findAvailable();
    
    return response.json(foods);
  }
} 