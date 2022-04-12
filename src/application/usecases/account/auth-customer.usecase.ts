import { inject, injectable } from 'tsyringe';

import { UnauthozitedError } from '@errors/unauthorized.error';
import { IJWTProvider } from '@application/providers/ijwt.provider';
import { ICustomersRepository } from '@application/repositories/customers/icustomers.repository';
import { Either, left, right } from '@core/logic/either';
import { ICustomerDto } from '@domain/customers/dtos/customer.dto';
import { CustomerMapper } from '@domain/customers/mappers/customer.mapper';

interface IRequest {
  username: string;
  password: string;
}

type Session = {
  customer: ICustomerDto;
  token: string;
};

type IResponse = Either<UnauthozitedError, Session>;

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
      return left(new UnauthozitedError('Invalid Credentials'));
    }

    const passwordMatch = await customer.checkPassword(password);

    // console.log(passwordMatch, customer.password);

    if (!passwordMatch) {
      return left(new UnauthozitedError('Invalid Password'));
    }

    const token = await this.jwtProvider.sign({ username }, customer.id);

    return right({ customer: CustomerMapper.toDto(customer), token });
  }
}
