import { PrismaClient, Foods } from '@prisma/client';
import { IRepository } from '../IRepository';


export class PrismaFoodsRepository implements IRepository<Foods> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Partial<Foods>): Promise<Foods> {
    return this.prisma.foods.create({
      data: data as Foods,
      include: {
        reservations: true
      },
    });
  }

  async findById(id: string): Promise<Foods | null> {
    return this.prisma.foods.findUnique({
      where: { id },
      include: { 
        reservations: true
      },
    });
  }

  async findAll(id: string): Promise<Foods[]> {
    return this.prisma.foods.findMany({
      where:{
        donor_id: id,
      },
      include: {
        reservations: true
      },
    });
  }

  async update(id: string, data: Partial<Foods>): Promise<Foods> {
    return this.prisma.foods.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.foods.delete({
      where: { id },
    });
  }

  async findAvailable(): Promise<Foods[]> {
    return this.prisma.foods.findMany({
      where: {
        quantity: {
          gt: 0,
        },
        expiration_time: {
          gt: new Date(),
        },
      },
      include: {
        reservations: true
      },
    });
  }

} 