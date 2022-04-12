import { Router } from 'express';
import { AuthCustomerController } from '../controllers/account/auth-customer.controller';

const accountsRouter = Router();

const authCustomerController = new AuthCustomerController();

accountsRouter.post('/customers', authCustomerController.handle);

export { accountsRouter };
