import { IJWTProvider } from '@application/providers/ijwt.provider';
import { Customer } from '@domain/customers/entities/customer';
import { UnauthozitedError } from '@errors/unauthorized.error';
import { InMemoryCustomersRepository } from '@infra/database/in-memory/repositories/customers/in-memory-customers.repository';
import { AuthCustomerUseCase } from './auth-customer.usecase';

class FakeJWTProvider implements IJWTProvider {
  async sign(): Promise<string> {
    return 'token';
  }
}

const makeSut = () => {
  const customersRepository = new InMemoryCustomersRepository();
  const jwtProvider = new FakeJWTProvider();
  const sut = new AuthCustomerUseCase(customersRepository, jwtProvider);

  return { sut, customersRepository };
};

describe('Auth Customer', () => {
  it('shoul not be able auth customer if not exists', () => {
    const { sut } = makeSut();

    const authCustomerData = {
      username: 'any-username',
      password: 'any-password',
    };

    expect(async () => {
      await sut.run(authCustomerData);
    }).rejects.toBeInstanceOf(UnauthozitedError);
  });

  it('should not be able auth customer with incorrect password', async () => {
    const { sut, customersRepository } = makeSut();
    const authCustomerData = {
      name: 'any-name',
      username: 'any-username',
      password: 'any-password',
    };

    const customer = await Customer.create(authCustomerData);

    await customersRepository.createCustomer(customer);

    expect(async () => {
      await sut.run({
        username: authCustomerData.username,
        password: 'incorrect-pass',
      });
    }).rejects.toBeInstanceOf(UnauthozitedError);
  });
});
