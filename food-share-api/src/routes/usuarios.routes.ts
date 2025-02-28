import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

const usuariosRoutes = Router();
const usersController = new UsersController();

usuariosRoutes.post('/', usersController.create);

export { usuariosRoutes }; 