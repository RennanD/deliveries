import { Router } from 'express';
import { CreateCustomerController } from '../controllers/customers/create-customer.controller';

const accountsRouter = Router();

const createCustomerController = new CreateCustomerController();

accountsRouter.post('/', createCustomerController.handle);

export { accountsRouter };
