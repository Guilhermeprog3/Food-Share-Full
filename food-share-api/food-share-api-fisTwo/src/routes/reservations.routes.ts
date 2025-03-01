import { Router } from 'express';
import { ReservationController } from '../controllers/ReservationsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const reservationsRoutes = Router();
const reservationsController = new ReservationController();

reservationsRoutes.use(ensureAuthenticated);
reservationsRoutes.get('/todas', reservationsController.listReservations);
reservationsRoutes.get('/entregues', reservationsController.listReservationsDeliveredOrCancel);
reservationsRoutes.get('/pendentes', reservationsController.listReservationsPending);
reservationsRoutes.post('/', reservationsController.create);
reservationsRoutes.get('/', reservationsController.list);
reservationsRoutes.get('/:id', reservationsController.show);
reservationsRoutes.patch('/:id/date', reservationsController.updateDate)
reservationsRoutes.patch('/:id', reservationsController.update);
reservationsRoutes.patch('/:id/confirm', reservationsController.updateStatusConfirmed);
reservationsRoutes.patch('/:id/cancel', reservationsController.updateStatusCanceled);
reservationsRoutes.get('/list/token', reservationsController.listTokenTrue);
reservationsRoutes.delete('/:id', reservationsController.delete);

export { reservationsRoutes }; 