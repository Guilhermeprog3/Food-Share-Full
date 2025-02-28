import { Router } from 'express';
import { FoodController } from '../controllers/FoodController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureDonor } from '../middlewares/ensureDonor';

const alimentosRoutes = Router();
const foodController = new FoodController();

// Rotas públicas
alimentosRoutes.get('/proximos', foodController.listNearby);
alimentosRoutes.get('/disponiveis', foodController.listAvailable);
alimentosRoutes.get('/', foodController.list);
alimentosRoutes.get('/:id', foodController.show);

// Rotas protegidas (apenas doadores)
alimentosRoutes.use(ensureAuthenticated);
alimentosRoutes.use(ensureDonor);
alimentosRoutes.post('/', foodController.create);
alimentosRoutes.put('/:id', foodController.update);
alimentosRoutes.delete('/:id', foodController.delete);

export { alimentosRoutes }; 