import { Request, Response } from 'express';
import { CreateFoodUseCase } from '../useCases/CreateFood/CreateFoodUseCase';
import { PrismaFoodsRepository } from '../repositories/implementations/PrismaFoodRepository';
import { AppError } from '../errors/AppError';
import { PrismaDonorsRepository } from '../repositories/implementations/PrismaDonorRepository';

export class FoodController {
  async create(request: Request, response: Response): Promise<any> {
    const { id } = request.user;
    const { name, description, expiration_time, quantity } = request.body;

    const donorRepository = new PrismaDonorsRepository()
    const donor = await donorRepository.findById(id);
    
    if(!donor){
      throw new AppError('Doador não encontrado', 404)
    }

    const foodRepository = new PrismaFoodsRepository();
    const createFoodUseCase = new CreateFoodUseCase(foodRepository);

    const food = await createFoodUseCase.execute({
      name,
      description,
      expiration_time: new Date(expiration_time),
      quantity,
      donor_id: id,
    });

    return response.status(201).json({
      food,
    });
  }

  async list(request: Request, response: Response): Promise<any> {
    const { id } = request.user;

    const donorRepository = new PrismaDonorsRepository()
    const donor = await donorRepository.findById(id);
    
    if(!donor){
      throw new AppError('Id do doador não encontrado na requisição', 404)
    }

    try {
      const foodRepository = new PrismaFoodsRepository();
      const foods = await foodRepository.findAll(id);
  
      return response.json(foods);
    } catch (error) {
      throw new AppError('Erro ao listar alimentos do doador', 400)
    }
  }

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const foodRepository = new PrismaFoodsRepository();

    const food = await foodRepository.findById(id);
    
    if (!food) {
      throw new AppError('Alimento não encontrado', 404);
    }
    
    return response.json(food);
  }

  async update(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const { name, expiration_time, quantity } = request.body;
    const foodRepository = new PrismaFoodsRepository();
    const food = foodRepository.findById(id)

    if(!food){
      throw new AppError('Alimento não encontrado', 404)
    }
    
    try {
      const food = await foodRepository.update(id, {
        name,
        expiration_time: new Date(expiration_time),
        quantity,
      });
      
      return response.json(food);
    } catch (error) {
      throw new AppError('Erro ao atualizar alimento', 400)
    }
  }

  async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const foodRepository = new PrismaFoodsRepository();
    const food = foodRepository.findById(id)

    if(!food){
      throw new AppError('Alimento não encontrado', 404)
    }

    try {
      await foodRepository.delete(id);  

      return response.status(204).send();
    } catch (error) {
      throw new AppError('Erro ao deletar alimento', 400)
    }
  }

  async listAvailable(request: Request, response: Response): Promise<any> {
    const foodRepository = new PrismaFoodsRepository();
    try {
      const foods = await foodRepository.findAvailable();
      
      return response.json(foods);
      
    } catch (error) {
      throw new AppError('Erro ao listar alimentos disponíveis', 400)
    }
  }
} 