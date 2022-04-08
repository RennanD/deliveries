import { inject, injectable } from 'tsyringe';

import { Customer } from '@domain/customers/entities/customer';
import { ICustomersRepository } from '@domain/customers/repositories/icustomers.repository';

import { IHashProvider } from '@application/providers/ihash.provider';

import { UnauthozitedError } from '@errors/unauthorized.error';
import { IJWTProvider } from '@application/providers/ijwt.provider';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  customer: Customer;
  token: string;
}

@injectable()
export class AuthCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('JWTProvider')
    private jwtProvider: IJWTProvider,
  ) {}

  async run({ username, password }: IRequest): Promise<IResponse> {
    const customer = await this.customersRepository.findCustomerByUsername(
      username,
    );

    if (!customer) {
      throw new UnauthozitedError('Invalid Credentials');
    }

    const passwordMatch = this.hashProvider.compare(
      customer.password!,
      password,
    );

    if (!passwordMatch) {
      throw new UnauthozitedError('Invalid Credentials');
    }

    const token = await this.jwtProvider.sign({ username }, customer.id);

    return {
      customer,
      token,
    };
  }
}
