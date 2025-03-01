import { Vulnerables } from '@prisma/client';
import { IRepositoryWithCpf } from '../../repositories/IRepository';
import { AppError } from '../../errors/AppError';
import { hash } from 'bcryptjs';

interface ICreateVulnerableDTO {
  name: string
  email: string;
  password: string;
  cpf: string;
}

export class CreateVulnerableUseCase {
  constructor(private vulnerableRepository: IRepositoryWithCpf<Vulnerables>) {}

  async execute(data: ICreateVulnerableDTO): Promise<Vulnerables> {
    const vulnerableExists = await this.vulnerableRepository.findByEmail(data.email);

    if (vulnerableExists) {
      throw new AppError('Email já cadastrado');
    }

    const cpfExists = await this.vulnerableRepository.findByCpf(data.cpf);

    if (cpfExists) {
      throw new AppError('CPF já cadastrado');
    }

    const hashedPassword = await hash(data.password, 8);

    const vulnerable = await this.vulnerableRepository.create({
      ...data,
      password: hashedPassword,
    });

    return vulnerable;
  }
}