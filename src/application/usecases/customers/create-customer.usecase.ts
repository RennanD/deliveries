import { inject, injectable } from 'tsyringe';

import { Customer } from '@domain/customers/entities/customer';

import { BadRequestError } from '@errors/bad-request.error';
import { ICustomersRepository } from '@application/repositories/customers/icustomers.repository';
import { Either, left, right } from '@core/logic/either';
import { ICustomerDto } from '@domain/customers/dtos/customer.dto';
import { CustomerMapper } from '@domain/customers/mappers/customer.mapper';

interface IRequest {
  name: string;
  username: string;
  password: string;
}

type IResponse = Either<BadRequestError, ICustomerDto>;

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
      return left(new BadRequestError('Customer already exists'));
    }

    const customer = await Customer.create({ name, password, username });

    await this.customersRepository.createCustomer(customer);

    return right(CustomerMapper.toDto(customer));
  }
}
