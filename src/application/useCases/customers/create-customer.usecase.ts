import slugify from 'slugify';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@domain/customers/repositories/icustomers.repository';
import { Customer } from '@domain/customers/entities/customer';
import { IHashProvider } from '@application/providers/ihash.provider';

interface IRequest {
  name: string;
  password: string;
}

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async run({ name, password }: IRequest): Promise<Customer> {
    const username = slugify(name);

    const existentCustomer =
      await this.customersRepository.findCustomerByUsername(username);

    if (existentCustomer) {
      throw new Error('Customer already exists');
    }

    const hashedPassword = await this.hashProvider.hash(password, 16);

    const customer = new Customer({ name, password: hashedPassword });

    await this.customersRepository.createCustomer(customer);

    return customer;
  }
}
