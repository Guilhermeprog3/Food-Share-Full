import { PrismaClient, Food } from '@prisma/client';
import { IRepository } from '../IRepository';

interface IFindNearbyDTO {
  latitude: number;
  longitude: number;
  radius: number;
}

export class PrismaFoodRepository implements IRepository<Food> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Partial<Food>): Promise<Food> {
    return this.prisma.food.create({
      data: data as Food,
      include: {
        donor: true,
      },
    });
  }

  async findById(id: string): Promise<Food | null> {
    return this.prisma.food.findUnique({
      where: { id },
      include: {
        donor: true,
      },
    });
  }

  async findAll(): Promise<Food[]> {
    return this.prisma.food.findMany({
      include: {
        donor: true,
      },
    });
  }

  async update(id: string, data: Partial<Food>): Promise<Food> {
    return this.prisma.food.update({
      where: { id },
      data,
      include: {
        donor: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.food.delete({
      where: { id },
    });
  }

  async findNearby({ latitude, longitude, radius }: IFindNearbyDTO): Promise<Food[]> {
    // Aqui você implementaria a lógica para encontrar alimentos próximos
    // Usando a fórmula de Haversine ou PostGIS
    return this.prisma.food.findMany({
      include: {
        donor: true,
      },
      where: {
        donor: {
          AND: [
            {
              latitude: {
                gte: latitude - radius,
                lte: latitude + radius,
              },
            },
            {
              longitude: {
                gte: longitude - radius,
                lte: longitude + radius,
              },
            },
          ],
        },
      },
    });
  }

  async findAvailable(): Promise<Food[]> {
    return this.prisma.food.findMany({
      where: {
        quantity: {
          gt: 0,
        },
        expiration_time: {
          gt: new Date(),
        },
      },
      include: {
        donor: true,
      },
    });
  }
} 