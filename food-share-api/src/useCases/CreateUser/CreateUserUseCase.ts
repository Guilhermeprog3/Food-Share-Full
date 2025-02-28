import { User } from '@prisma/client';
import { IRepository } from '../../repositories/IRepository';
import { hash } from 'bcryptjs';

interface ICreateUserDTO {
  email: string;
  password: string;
  name: string;
  type: 'DONOR' | 'RECEIVER' | 'ADMIN';
}

export class CreateUserUseCase {
  constructor(private usersRepository: IRepository<User>) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const hashedPassword = await hash(data.password, 8);

    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }
} 