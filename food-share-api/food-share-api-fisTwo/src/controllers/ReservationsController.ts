import { Request, Response } from "express";
import { CreateReservationsUseCase } from "../useCases/CreateReservation/CreateReservationUseCase";
import { PrismaReservationRepository } from "../repositories/implementations/PrismaReservationsRepository";
import { AppError } from "../errors/AppError";
import { PrismaFoodsRepository } from '../repositories/implementations/PrismaFoodRepository';
import { PrismaVulnerableRepository } from "../repositories/implementations/PrismaVulnerableRepository";
import { PrismaDonorsRepository } from "../repositories/implementations/PrismaDonorRepository";


export class ReservationController {
  async create(request: Request, response: Response): Promise<any> {
    const { food_id, pickup_date, food_quantity, title } = request.body;
    const vulnerable_id = request.user.id;

    const reservationRepository = new PrismaReservationRepository();
    const foodRepository = new PrismaFoodsRepository();
    
    const vulnerableRepository = new PrismaVulnerableRepository();
    const vulnerable = vulnerableRepository.findById(vulnerable_id)

    if(!vulnerable){
      throw new AppError('Vulnerável não encontrado', 404)
    }

    const createReservationUseCase = new CreateReservationsUseCase(
      reservationRepository,
      foodRepository
    );

    const foodQuantityNice = await foodRepository.findById(food_id)

    if (!foodQuantityNice) {
      throw new AppError('Alimento não encontrado', 404)
    }

    if (foodQuantityNice.quantity == 0) {
      throw new AppError('Quantidade de alimento insuficiente',400)
    }

    if(foodQuantityNice.quantity - food_quantity < 0){
      throw new AppError('Quantidade de alimento insuficiente',400)
    }

    const newQuantity = foodQuantityNice.quantity - food_quantity

    const reservation = await createReservationUseCase.execute({
      vulnerable_id,
      food_id,
      pickup_date,
      food_quantity,
      title,
    });
    
    await foodRepository.update(food_id, {
      quantity: newQuantity,
    });

    return response.status(201).json(reservation);
  }

  async list(request: Request, response: Response): Promise<any> {
    const reservationRepository = new PrismaReservationRepository();
    try {
      const reservation = await reservationRepository.findAll();
  
      return response.json(reservation);
    } catch (error) {
      throw new AppError('Erro ao listar reservas', 400)
    }
  }

  async listReservations(request: Request, response: Response): Promise<any> {
    const {id} = request.user;

    const donorRepository = new PrismaDonorsRepository();
    const donor = donorRepository.findById(id)

    if(!donor){
      throw new AppError('Doador não encontrado', 404)
    }
    
    const reservationRepository = new PrismaReservationRepository();
    
    try {
      const reservation = await reservationRepository.findReservations(id);
  
      return response.json(reservation);
    } catch (error) {
      throw new AppError('Erro ao listar reservas')
    }
  }

  async listReservationsDeliveredOrCancel(request: Request, response: Response): Promise<any> {
    const {id} = request.user;
    const donorRepository = new PrismaDonorsRepository();
    const donor = donorRepository.findById(id)

    if(!donor){
      throw new AppError('Doador não encontrado', 404)
    }

    const reservationRepository = new PrismaReservationRepository();
    const reservation = await reservationRepository.findReservationsDeliveredOrCancel(id);

    return response.json(reservation);
  }

  async listReservationsPending(request: Request, response: Response): Promise<any> {
    const {id} = request.user;
    const donorRepository = new PrismaDonorsRepository();
    const donor = donorRepository.findById(id)

    if(!donor){
      throw new AppError('Doador não encontrado', 404)
    }

    const reservationRepository = new PrismaReservationRepository();
    const reservation = await reservationRepository.findReservationsPending(id);

    return response.json(reservation);
  }

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const reservationRepository = new PrismaReservationRepository();

    const reservation = await reservationRepository.findById(id);

    if (!reservation) {
      throw new AppError("Doação não encontrada", 404);
    }

    return response.json(reservation)
  }

  async update(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const { pickup_date, food_quantity, title } = request.body;
    const reservationRepository = new PrismaReservationRepository();

    if (new Date(pickup_date) < new Date()) {
      throw new AppError('Data de retirada deve ser futura');
    }

    const foodRepository = new PrismaFoodsRepository();
    const reservationCheck = await reservationRepository.findById(id)

    if (!reservationCheck) {
      throw new AppError('Reserva não encontrada', 404); 
    }

    if(reservationCheck.status === "CANCELADA"){
      throw new AppError('Não é possivel atualizar uma reserva cancelada', 404); 
    }

    const foodQuantityNice = await foodRepository.findById(reservationCheck.food_id)

    if (!foodQuantityNice) {
      throw new AppError('Alimento não encontrado', 404)
    }
    
    if (foodQuantityNice.quantity == 0) {
      throw new AppError('Quantidade de alimento insuficiente',400)
    }

    const availableQuantity = foodQuantityNice.quantity + reservationCheck.food_quantity
    const newQuantity = availableQuantity - food_quantity

    if(availableQuantity - food_quantity < 0){
      throw new AppError('Quantidade de alimento insuficiente',400)
    }

    try {
      const reservation = await reservationRepository.update(id, {
        pickup_date,
        food_quantity,
        title
      });
  
      await foodRepository.update(reservationCheck.food_id, {
        quantity: newQuantity,
      });
  
      return response.json(reservation)
      
    } catch (error) {
      throw new AppError('Erro ao atualizar reserva', 400)
    }
  }

  async updateDate(request: Request, response: Response): Promise<any>{
    const { id } = request.params;
    const { pickup_date } = request.body;

    if (new Date(pickup_date) < new Date()) {
      throw new AppError('Data de retirada deve ser futura');
    }

    const reservationRepository = new PrismaReservationRepository();
    const reservationCheck = await reservationRepository.findById(id)

    if (!reservationCheck) {
      throw new AppError('Reserva não encontrada', 404); 
    }

    if(reservationCheck.status === "CANCELADA"){
      throw new AppError('Não é possivel atualizar uma reserva cancelada', 404); 
    }

    try {
      const reservation = await reservationRepository.update(id, {
        pickup_date,
      });
  
      return response.json(reservation);
      
    } catch (error) {
      throw new AppError('Erro ao atualizar data da reserva', 400)
    }
  }

  async updateStatusCanceled(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const reservationRepository = new PrismaReservationRepository();
    const foodRepository = new PrismaFoodsRepository();
  
    const reservationCheck = await reservationRepository.findById(id);
  
    if (!reservationCheck) {
      throw new AppError('Reserva não encontrada', 404);
    }

    if(reservationCheck.status === "ENTREGUE"){
      throw new AppError('Não é possivel cancelar uma reserva entregue', 404); 
    }
  
    const foodQuantityNice = await foodRepository.findById(reservationCheck.food_id);
  
    if (!foodQuantityNice) {
      throw new AppError('Alimento não encontrado', 404);
    }
  
    const updatedFoodQuantity = foodQuantityNice.quantity + reservationCheck.food_quantity
  
    const reservation = await reservationRepository.update(id, {
      status: 'CANCELADA',
      token_used: false,
      food_quantity: 0
    });
  
    try {
      await foodRepository.update(reservationCheck.food_id, {
        quantity: updatedFoodQuantity,
      });
    
      return response.json(reservation)
    } catch (error) {
      throw new AppError('Erro ao atualizar status da reserva', 400)
    }
  }
  

  async updateStatusConfirmed(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const reservationRepository = new PrismaReservationRepository();

    const reservationCheck = await reservationRepository.findById(id);
  
    if (!reservationCheck) {
      throw new AppError('Reserva não encontrada', 404);
    }

    if(reservationCheck.food_quantity === 0){
      throw new AppError('Reserva vazia não pode ser confirmada', 404);
    }

    if(reservationCheck.status === "CANCELADA"){
      throw new AppError('Não é possivel atualizar uma reserva cancelada', 404); 
    }

    try {
      const reservation = await reservationRepository.update(id, {
        status: 'ENTREGUE',
        token_used: true
      })
  
      return response.json(reservation)
    } catch (error) {
      throw new AppError('Erro ao atualizar status da reserva', 400)
    }
  }

  async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const reservationRepository = new PrismaReservationRepository();
    const reservationCheck = await reservationRepository.findById(id);

    if(!reservationCheck){
      throw new AppError('Reserva não encontrada', 404)
    }

    try {
      await reservationRepository.delete(id);
  
      return response.status(204).send();
    } catch (error) {
      throw new AppError('Erro ao deletar reserva', 400)
    }
  }

  async listTokenTrue(request: Request, response: Response): Promise<any> {
    const reservationRepository = new PrismaReservationRepository();
    const reservation = await reservationRepository.findAllToken();

    if (!reservation || reservation.length === 0) {
      return response.status(404).json({ message: 'Nenhuma reserva encontrada com token usado.' });
    }

    return response.json(reservation);
  }
}
