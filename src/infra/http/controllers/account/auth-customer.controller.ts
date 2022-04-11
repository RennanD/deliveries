import { AuthCustomerUseCase } from '@application/usecases/account/auth-customer.usecase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authCustomer = container.resolve(AuthCustomerUseCase);

    const session = await authCustomer.run({ username, password });

    return response.json({ session });
  }
}
