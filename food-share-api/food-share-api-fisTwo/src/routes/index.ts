import { Router } from 'express';
import { donorRoutes } from './donor.routes';
import { foodRoutes } from './food.routes';
import { vulnerablesRoutes } from './vulnerables.routes';
import { reservationsRoutes } from './reservations.routes';
import { AuthController } from '.././controllers/AuthController';


const routes = Router();
const authController = new AuthController();

// Rotas de autenticação
routes.post('/sessao', authController.authenticate);
routes.post('/token', authController.validateToken);

// Rotas da aplicação
routes.use('/doadores', donorRoutes);
routes.use('/alimentos', foodRoutes);
routes.use('/vulneraveis', vulnerablesRoutes);
routes.use('/reservas', reservationsRoutes);


export { routes }; 