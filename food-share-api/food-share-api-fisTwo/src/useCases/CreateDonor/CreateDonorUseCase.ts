import { Donors } from '@prisma/client';
import { IRepositoryWithEmail } from '../../repositories/IRepository';
import { AppError } from '../../errors/AppError';
import { hash } from 'bcryptjs';

interface ICreateDonorDTO {
  name: string;
  cnpj: string;
  email: string;
  responsible: string;
  password: string;
  latitude?: number;
  longitude?: number;
}

export class CreateDonorUseCase {
  constructor(private donorRepository: IRepositoryWithEmail<Donors>) {}

  async execute(data: ICreateDonorDTO): Promise<Donors> {
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