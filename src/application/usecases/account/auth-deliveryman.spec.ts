import { IJWTProvider } from '@application/providers/ijwt.provider';
import { Deliveryman } from '@domain/deliveryman/entities/deliveryman';
import { UnauthozitedError } from '@errors/unauthorized.error';
import { InMemoryDeliverymanRepository } from '@infra/database/in-memory/repositories/deliveryman/in-memory-deliveryman.repository';
import { AuthDeliverymanUseCase } from './auth-deliveryman.usecase';

class FakeJWTProvider implements IJWTProvider {
  async sign(): Promise<string> {
    return '';
  }
}

describe('Auth Deliveryman', () => {
  const makeSut = () => {
    const deliverymanRepository = new InMemoryDeliverymanRepository();
    const jwtProvider = new FakeJWTProvider();
    const sut = new AuthDeliverymanUseCase(deliverymanRepository, jwtProvider);

    return { sut, deliverymanRepository, jwtProvider };
  };

  it('shoul not be able auth deliveryman with invalid user name', async () => {
    const { sut } = makeSut();

    const deliverymanAuth = {
      name: 'any-name',
      username: 'any-username',
      password: 'any-password',
    };

    const response = await sut.run(deliverymanAuth);
    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(
      new UnauthozitedError('Invalid Credentials'),
    );
  });

  it('should not be able auth deliveryman with incrorrect password', async () => {
    const { sut, deliverymanRepository } = makeSut();

    const deliverymanAuth = {
      name: 'any-name',
      username: 'any-username',
      password: 'any-password',
    };

    const deliveryman = await Deliveryman.create(deliverymanAuth);

    await deliverymanRepository.create(deliveryman);

    const response = await sut.run({
      username: deliverymanAuth.username,
      password: 'incorrect-pass',
    });
    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(new UnauthozitedError('Invalid Password'));
  });

  it('should be able auth deliveryman with correct credentials', async () => {
    const { sut, deliverymanRepository } = makeSut();

    const deliverymanAuth = {
      name: 'any-name',
      username: 'any-username',
      password: 'any-password',
    };

    const deliveryman = await Deliveryman.create(deliverymanAuth);
    await deliverymanRepository.create(deliveryman);

    const result = await sut.run({
      username: deliverymanAuth.username,
      password: deliverymanAuth.password,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toHaveProperty('token');
  });

  it('should token returns a valid token', async () => {
    const { jwtProvider, sut, deliverymanRepository } = makeSut();
    const jwtProviderSpy = jest.spyOn(jwtProvider, 'sign');

    const deliverymanAuth = {
      name: 'any-name',
      username: 'any-username',
      password: 'any-password',
    };

    const deliveryman = await Deliveryman.create(deliverymanAuth);
    await deliverymanRepository.create(deliveryman);

    const result = await sut.run(deliverymanAuth);

    expect(jwtProviderSpy).toHaveBeenCalledTimes(1);

    const token = await jwtProvider.sign();
    expect(result.value).toEqual(expect.objectContaining({ token }));
  });
});
