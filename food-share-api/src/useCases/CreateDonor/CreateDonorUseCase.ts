import { Donor } from '@prisma/client';
import { IRepository } from '../../repositories/IRepository';
import { AppError } from '../../errors/AppError';
import { hash } from 'bcryptjs';

interface ICreateDonorDTO {
  name: string;
  cnpj: string;
  email: string;
  responsible: string;
  password: string;
  latitude: number;
  longitude: number;
  local: string;
}

export class CreateDonorUseCase {
  constructor(private donorRepository: IRepository<Donor>) {}

  async execute(data: ICreateDonorDTO): Promise<Donor> {
    const donorExists = await this.donorRepository.findByEmail(data.email);

    if (donorExists) {
      throw new AppError('Doador já cadastrado com este email');
    }

    const hashedPassword = await hash(data.password, 8);

    const donor = await this.donorRepository.create({
      ...data,
      password: hashedPassword,
    });

    return donor;
  }
} 