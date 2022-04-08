import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateClientUseCase } from '@application/useCases/customers/create-customer.usecase';

export class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password } = request.body;

    const createCustomer = container.resolve(CreateClientUseCase);

    const customer = await createCustomer.run({ name, password });

    return response.status(201).json({ customer });
  }
}
