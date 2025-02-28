import { Router } from 'express';
import { VulnerableController } from '../controllers/VulnerableController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const vulneraveisRoutes = Router();
const vulnerableController = new VulnerableController();

// Rotas públicas
vulneraveisRoutes.post('/', vulnerableController.create);

// Rotas protegidas
vulneraveisRoutes.use(ensureAuthenticated);
vulneraveisRoutes.get('/perfil', vulnerableController.profile);
vulneraveisRoutes.put('/perfil', vulnerableController.update);
vulneraveisRoutes.delete('/perfil', vulnerableController.delete);

export { vulneraveisRoutes }; 