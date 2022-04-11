import { Deliveryman } from '@domain/deliveryman/entities/deliveryman';
import { BadRequestError } from '@errors/bad-request.error';
import { InMemoryDeliverymanRepository } from '@infra/database/in-memory/repositories/deliveryman/in-memory-deliveryman.repository';
import { CreateDeliveryamUseCase } from './create-deliveryman.usecase';

const makeSut = () => {
  const deliverymanRepository = new InMemoryDeliverymanRepository();
  const sut = new CreateDeliveryamUseCase(deliverymanRepository);

  return { sut, deliverymanRepository };
};

describe('Create Deliveryman', () => {
  it('should not be able to create deliverymen with same username', async () => {
    const { sut, deliverymanRepository } = makeSut();

    const deliverymanData = {
      name: 'any-deliveryman',
      username: 'any-deliveryman',
      password: 'any-password',
    };

    expect(async () => {
      const deliveryman = await Deliveryman.create(deliverymanData);

      await deliverymanRepository.create(deliveryman);

      await sut.run(deliverymanData);
    }).rejects.toBeInstanceOf(BadRequestError);
  });
});
