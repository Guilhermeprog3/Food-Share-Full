import { Food } from '@prisma/client';
import { IRepository } from '../../repositories/IRepository';
import { AppError } from '../../errors/AppError';

interface ICreateFoodDTO {
  name: string;
  expiration_time: Date;
  quantity: number;
  donor_id: string;
}

export class CreateFoodUseCase {
  constructor(private foodRepository: IRepository<Food>) {}

  async execute(data: ICreateFoodDTO): Promise<Food> {
    if (data.quantity <= 0) {
      throw new AppError('Quantidade deve ser maior que zero');
    }

    if (new Date(data.expiration_time) < new Date()) {
      throw new AppError('Data de validade deve ser futura');
    }

    const food = await this.foodRepository.create(data);

    return food;
  }
} 