import { PrismaClient, Vulnerable } from '@prisma/client';
import { IRepository } from '../IRepository';

export class PrismaVulnerableRepository implements IRepository<Vulnerable> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Partial<Vulnerable>): Promise<Vulnerable> {
    return this.prisma.vulnerable.create({
      data: data as Vulnerable,
    });
  }

  async findById(id: string): Promise<Vulnerable | null> {
    return this.prisma.vulnerable.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Vulnerable | null> {
    return this.prisma.vulnerable.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<Vulnerable[]> {
    return this.prisma.vulnerable.findMany();
  }

  async update(id: string, data: Partial<Vulnerable>): Promise<Vulnerable> {
    return this.prisma.vulnerable.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vulnerable.delete({
      where: { id },
    });
  }
} 