import { Router } from 'express';
import { DonationsController } from '../controllers/DonationsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const donationsRoutes = Router();
const donationsController = new DonationsController();

donationsRoutes.use(ensureAuthenticated);

donationsRoutes.post('/', donationsController.create);
donationsRoutes.get('/', donationsController.list);
donationsRoutes.get('/:id', donationsController.show);
donationsRoutes.put('/:id', donationsController.update);
donationsRoutes.delete('/:id', donationsController.delete);

export { donationsRoutes }; 