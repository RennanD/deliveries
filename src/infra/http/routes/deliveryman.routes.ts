import { Router } from 'express';

import { CreateDeliverymanController } from '../controllers/deliveryman/create-deliveryman.controller';

const deliverymanRouter = Router();

const createDeliverymanController = new CreateDeliverymanController();

deliverymanRouter.post('/', createDeliverymanController.handle);

export { deliverymanRouter };
