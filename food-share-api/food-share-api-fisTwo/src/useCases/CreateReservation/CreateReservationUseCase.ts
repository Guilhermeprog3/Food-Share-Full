import { Reservations, Foods } from "@prisma/client";
import { IRepository } from "../../repositories/IRepository";
import { AppError } from "../../errors/AppError";

interface ICreateReservationDTO {
  vulnerable_id: string;
  food_id: string;
  pickup_date: Date;
  food_quantity: number;
  title: string;
}

export class CreateReservationsUseCase {
  constructor(
    private reservationRepository: IRepository<Reservations>,
    private foodRepository: IRepository<Foods>
  ) {}

  async execute(data: ICreateReservationDTO): Promise<Reservations> {
    const food = await this.foodRepository.findById(data.food_id);
    if (!food) {
      throw new AppError("Alimento não encontrado");
    }

    const currentDate = new Date();
    const pickupDate = new Date(data.pickup_date);
    const expirationDate = new Date(food.expiration_time);

    if (pickupDate < currentDate) {
      throw new AppError("Data de retirada deve ser futura");
    }

    if (pickupDate > expirationDate) {
      throw new AppError(
        "Data de retirada deve ser antes ou no mesmo dia da data de expiração do alimento"
      );
    }

    if (data.food_quantity < 0) {
      throw new AppError(
        "A quantidade de comida reservada precisa ser maior que 0"
      );
    }

    const reservation = await this.reservationRepository.create({
      ...data,
    });

    if (!reservation) {
      throw new AppError("A reserva não foi criada com sucesso!");
    }

    return reservation;
  }
}
