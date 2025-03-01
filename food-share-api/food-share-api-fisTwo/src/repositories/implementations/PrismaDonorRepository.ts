import { PrismaClient, Donors } from '@prisma/client';
import { IRepository } from '../IRepository';

interface IFindNearbyDTO {
  latitude: number;
  longitude: number;
  radius: number;
}

export class PrismaDonorsRepository implements IRepository<Donors> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Partial<Donors>): Promise<Donors> {
    return this.prisma.donors.create({
      data: data as Donors,
    });
  }

  async findById(id: string): Promise<Donors | null> {
    return this.prisma.donors.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Donors | any> {
    return this.prisma.donors.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<Donors[]> {
    return this.prisma.donors.findMany({});
  }

  async update(id: string, data: Partial<Donors>): Promise<Donors> {
    return this.prisma.donors.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.donors.delete({
      where: { id },
    });
  }

  async findNearby({ latitude, longitude, radius }: IFindNearbyDTO): Promise<Donors[]> {
    // Aqui você implementaria a lógica para encontrar alimentos próximos
    // Usando a fórmula de Haversine ou PostGIS
    return this.prisma.donors.findMany({
      where: {
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
    });
  }
} 