import { Router } from 'express';
import { ReservationsController } from '../controllers/ReservationsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const reservationsRoutes = Router();
const reservationsController = new ReservationsController();

reservationsRoutes.use(ensureAuthenticated);

reservationsRoutes.post('/', reservationsController.create);
reservationsRoutes.get('/', reservationsController.list);
reservationsRoutes.get('/user', reservationsController.listByUser);
reservationsRoutes.get('/:id', reservationsController.show);
reservationsRoutes.patch('/:id/confirm', reservationsController.confirm);
reservationsRoutes.patch('/:id/complete', reservationsController.complete);
reservationsRoutes.patch('/:id/cancel', reservationsController.cancel);

export { reservationsRoutes }; 