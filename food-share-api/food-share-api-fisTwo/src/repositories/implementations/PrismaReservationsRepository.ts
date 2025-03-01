import { PrismaClient, Reservations } from '@prisma/client'
import { IRepository } from '../IRepository'

export class PrismaReservationRepository implements IRepository<Reservations> {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: Partial<Reservations>): Promise<Reservations> {
        return this.prisma.reservations.create({
            data: data as Reservations,
            include: {
                food: true
                
            }
        })
    }

    async findReservations(id: string): Promise<Reservations[]> {
        return this.prisma.reservations.findMany({
          where: { food:{
            donor_id: id,
          } },
          include:{
            food: true
          }
        });
    }

    findReservationsDeliveredOrCancel(id: string): Promise<Reservations[]> {
        return this.prisma.reservations.findMany({
          where: {
              OR: [{ status: "ENTREGUE" }, { status: "CANCELADA" }],
            food:{
            donor_id: id,            
        } 
          },
          include:{
            food: true
          }
        });
      }

      async findReservationsPending(id: string): Promise<Reservations[]> {
        return this.prisma.reservations.findMany({
          where:{
              status: "PENDENTE",
              food:{
                donor_id: id,            
              }
          },
          include:{
            food: true
          }
        });
      }

    async findById(id: string): Promise<Reservations | null> {
      return this.prisma.reservations.findUnique({
        where: { id }, 
        include: {
            food: true
        }
      })
    }

    async findAll(): Promise<Reservations[]> {
        return this.prisma.reservations.findMany({
            include: {
                food: true
                
            }
        })
    }

    async findAllToken(): Promise<Reservations[]> {
        return this.prisma.reservations.findMany({
            where: { 
                status: 'ENTREGUE'
            },
            include: {
                food: true
                
            }
        })
    }

    async update(id: string, data: Partial<Reservations>): Promise<Reservations> {
      return this.prisma.reservations.update({
        where: { id }, 
        data,
      })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.reservations.delete({
            where: { id }
        })
    }
}