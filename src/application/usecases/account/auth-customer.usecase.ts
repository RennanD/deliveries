import { inject, injectable } from 'tsyringe';

import { Customer } from '@domain/customers/entities/customer';

import { UnauthozitedError } from '@errors/unauthorized.error';
import { IJWTProvider } from '@application/providers/ijwt.provider';
import { ICustomersRepository } from '@application/repositories/customers/icustomers.repository';

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

    const passwordMatch = await customer.checkPassword(password);

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
