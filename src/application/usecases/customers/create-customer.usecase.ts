import { inject, injectable } from 'tsyringe';

import { Customer } from '@domain/customers/entities/customer';

import { BadRequestError } from '@errors/bad-request.error';
import { ICustomersRepository } from '@application/repositories/customers/icustomers.repository';

interface IRequest {
  name: string;
  username: string;
  password: string;
}

interface IResponse {
  id: string;
  name: string;
  username: string;
}

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async run({ name, username, password }: IRequest): Promise<IResponse> {
    const existentCustomer =
      await this.customersRepository.findCustomerByUsername(username);

    if (existentCustomer) {
      throw new BadRequestError('Customer already exists');
    }

    const customer = await Customer.create({ name, password, username });

    await this.customersRepository.createCustomer(customer);

    return {
      id: customer.id,
      name: customer.name,
      username: customer.username,
    };
  }
}
