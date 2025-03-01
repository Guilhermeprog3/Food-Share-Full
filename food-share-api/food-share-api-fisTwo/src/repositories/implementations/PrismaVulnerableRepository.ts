import { PrismaClient, Vulnerables} from '@prisma/client';
import { IRepository } from '../IRepository';

export class PrismaVulnerableRepository implements IRepository<Vulnerables> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Partial<Vulnerables>): Promise<Vulnerables> {
    return this.prisma.vulnerables.create({
      data: data as Vulnerables,
    });
  }

  async findById(id: string): Promise<Vulnerables | null> {
    return this.prisma.vulnerables.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Vulnerables | any> {
    return this.prisma.vulnerables.findUnique({
      where: { email },
    });
  }

  async findByCpf(cpf: string): Promise<Vulnerables | any> {
    return this.prisma.vulnerables.findUnique({
      where: { cpf },
    });
  }


  async findAll(): Promise<Vulnerables[]> {
    return this.prisma.vulnerables.findMany();
  }

  async update(id: string, data: Partial<Vulnerables>): Promise<Vulnerables> {
    return this.prisma.vulnerables.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vulnerables.delete({
      where: { id },
    });
  }
} 