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
  it('shoul not be able auth customer if not exists', async () => {
    const { sut } = makeSut();

    const authCustomerData = {
      username: 'any-username',
      password: 'any-password',
    };

    const response = await sut.run(authCustomerData);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(
      new UnauthozitedError('Invalid Credentials'),
    );
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

    const response = await sut.run({
      username: authCustomerData.username,
      password: 'incorrect-pass',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(new UnauthozitedError('Invalid Password'));
  });

  it('should be able to auth customer with correct credentials', async () => {
    const { sut, customersRepository } = makeSut();

    const authCustomerData = {
      name: 'any-name',
      username: 'any-username',
      password: 'any-password',
    };

    const customer = await Customer.create(authCustomerData);

    await customersRepository.createCustomer(customer);

    const response = await sut.run({
      username: authCustomerData.username,
      password: authCustomerData.password,
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toHaveProperty('token');
    expect(response.value).toHaveProperty('customer');
  });
});
