import { PrismaClient, Donor } from '@prisma/client';
import { IRepository } from '../IRepository';

export class PrismaDonorRepository implements IRepository<Donor> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Partial<Donor>): Promise<Donor> {
    return this.prisma.donor.create({
      data: data as Donor,
      include: {
        foods: true,
      },
    });
  }

  async findById(id: string): Promise<Donor | null> {
    return this.prisma.donor.findUnique({
      where: { id },
      include: {
        foods: true,
      },
    });
  }

  async findByEmail(email: string): Promise<Donor | null> {
    return this.prisma.donor.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<Donor[]> {
    return this.prisma.donor.findMany({
      include: {
        foods: true,
      },
    });
  }

  async update(id: string, data: Partial<Donor>): Promise<Donor> {
    return this.prisma.donor.update({
      where: { id },
      data,
      include: {
        foods: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.donor.delete({
      where: { id },
    });
  }
} 