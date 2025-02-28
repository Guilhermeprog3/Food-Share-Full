import { Router } from 'express';
import { doadoresRoutes } from './doadores.routes';
import { alimentosRoutes } from './alimentos.routes';
import { vulneraveisRoutes } from './vulneraveis.routes';
import { AuthController } from '../controllers/AuthController';

const routes = Router();
const authController = new AuthController();

// Rotas de autenticação
routes.post('/sessao', authController.authenticate);
routes.post('/token', authController.validateToken);

// Rotas da aplicação
routes.use('/doadores', doadoresRoutes);
routes.use('/alimentos', alimentosRoutes);
routes.use('/vulneraveis', vulneraveisRoutes);

export { routes }; 