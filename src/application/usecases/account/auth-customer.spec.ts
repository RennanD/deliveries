import { IJWTProvider } from '@application/providers/ijwt.provider';
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
});
