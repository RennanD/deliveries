import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCustomerUseCase } from '@application/usecases/customers/create-customer.usecase';
import { httpError } from '@core/http';

export class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, username } = request.body;

    const createCustomer = container.resolve(CreateCustomerUseCase);

    const customer = await createCustomer.run({ name, password, username });

    if (customer.isLeft()) {
      return response
        .status(customer.value.statusCode)
        .json({ error: customer.value });
    }

    return response.status(201).json({ customer });
  }
}
