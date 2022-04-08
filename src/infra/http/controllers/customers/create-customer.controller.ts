import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateClientUseCase } from '@application/useCases/customers/create-customer.usecase';

export class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, username } = request.body;

    const createCustomer = container.resolve(CreateClientUseCase);

    try {
      const customer = await createCustomer.run({ name, password, username });

      return response.status(201).json({ customer });
    } catch (error) {
      return response.status(400).json({
        error: {
          message: error.message,
          type_error: 'bad_request',
        },
      });
    }
  }
}
