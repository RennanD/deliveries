import { Router } from 'express';

import { accountsRouter } from './acconts.routes';
import { customersRouter } from './customers.routes';
import { deliverymanRouter } from './deliveryman.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/deliveryman', deliverymanRouter);
routes.use('/accounts', accountsRouter);

export { routes };
