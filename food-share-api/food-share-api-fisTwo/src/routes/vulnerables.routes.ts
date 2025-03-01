import { Router } from 'express';
import { VulnerableController } from '../controllers/VulnerableController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const vulnerablesRoutes = Router();
const vulnerableController = new VulnerableController();

// Rotas públicas
vulnerablesRoutes.post('/', vulnerableController.create);

// Rotas protegidas
vulnerablesRoutes.use(ensureAuthenticated);
vulnerablesRoutes.get('/perfil', vulnerableController.profile);
vulnerablesRoutes.put('/perfil', vulnerableController.update);
vulnerablesRoutes.delete('/perfil', vulnerableController.delete);

export { vulnerablesRoutes };