import { Router } from 'express';
import { CreateCustomerController } from '../controllers/customers/create-customer.controller';

const customersRouter = Router();

const createCustomerController = new CreateCustomerController();

customersRouter.post('/', createCustomerController.handle);

export { customersRouter };
