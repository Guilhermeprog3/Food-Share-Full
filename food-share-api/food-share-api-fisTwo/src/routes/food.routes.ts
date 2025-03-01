import { Router } from 'express';
import { FoodController } from '../controllers/FoodController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureDonor } from '../middlewares/ensureDonor';

const foodRoutes = Router();
const foodController = new FoodController();

// Rotas públicas
foodRoutes.get('/disponiveis', foodController.listAvailable);
foodRoutes.get('/:id', foodController.show);

// Rotas protegidas (apenas doadores)
foodRoutes.use(ensureAuthenticated);
foodRoutes.use(ensureDonor);
foodRoutes.get('/', foodController.list);
foodRoutes.post('/', foodController.create);
foodRoutes.put('/:id', foodController.update);
foodRoutes.delete('/:id', foodController.delete);

export { foodRoutes }; 