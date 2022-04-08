import { Router } from 'express';

import { customersRouter } from './customers.routes';
import { deliverymanRouter } from './deliveryman.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/deliveryman', deliverymanRouter);

export { routes };
