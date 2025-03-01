import { Router } from 'express';
import { DonorController } from '../controllers/DonorController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const donorRoutes = Router();
const donorController = new DonorController();

// Rotas públicas
donorRoutes.post('/', donorController.create);
donorRoutes.get('/', donorController.list);

// Rotas protegidas
donorRoutes.use(ensureAuthenticated);
donorRoutes.get('/location', donorController.show);
donorRoutes.patch('/', donorController.update);
donorRoutes.get('/proximos', donorController.listNearby);
donorRoutes.put('/:id', donorController.update);
donorRoutes.delete('/:id', donorController.delete);
//donorRoutes.get('/:id/alimentos', donorController.listFoods);

export { donorRoutes }; 