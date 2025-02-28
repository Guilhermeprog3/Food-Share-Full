import { Vulnerable } from '@prisma/client';
import { IRepository } from '../../repositories/IRepository';
import { AppError } from '../../errors/AppError';
import { hash } from 'bcryptjs';

interface ICreateVulnerableDTO {
  email: string;
  password: string;
  cpf: string;
}

export class CreateVulnerableUseCase {
  constructor(private vulnerableRepository: IRepository<Vulnerable>) {}

  async execute(data: ICreateVulnerableDTO): Promise<Vulnerable> {
    const vulnerableExists = await this.vulnerableRepository.findByEmail(data.email);

    if (vulnerableExists) {
      throw new AppError('Email já cadastrado');
    }

    const hashedPassword = await hash(data.password, 8);

    const vulnerable = await this.vulnerableRepository.create({
      ...data,
      password: hashedPassword,
    });

    return vulnerable;
  }
} 