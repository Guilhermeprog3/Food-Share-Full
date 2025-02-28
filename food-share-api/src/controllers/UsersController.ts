import { Request, Response } from 'express';
import { CreateUserUseCase } from '../useCases/CreateUser/CreateUserUseCase';
import { PrismaUsersRepository } from '../repositories/implementations/PrismaUsersRepository';

export class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password, name, type } = request.body;

    const usersRepository = new PrismaUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const user = await createUserUseCase.execute({
      email,
      password,
      name,
      type,
    });

    return response.status(201).json(user);
  }
} 