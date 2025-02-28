import { Router } from 'express';
import { DonorController } from '../controllers/DonorController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const doadoresRoutes = Router();
const donorController = new DonorController();

// Rotas públicas
doadoresRoutes.post('/', donorController.create);
doadoresRoutes.get('/', donorController.list);
doadoresRoutes.get('/:id', donorController.show);

// Rotas protegidas
doadoresRoutes.use(ensureAuthenticated);
doadoresRoutes.put('/:id', donorController.update);
doadoresRoutes.delete('/:id', donorController.delete);
doadoresRoutes.get('/:id/alimentos', donorController.listFoods);

export { doadoresRoutes }; 