import { Router } from 'express';
import { customersRouter } from './customers.routes';

const routes = Router();

routes.use('/customers', customersRouter);

export { routes };
