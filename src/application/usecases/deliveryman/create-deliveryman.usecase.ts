import { IHashProvider } from '@application/providers/ihash.provider';
import { Deliveryman } from '@domain/deliveryman/entities/deliveryman';
import { IDeliverymanRepository } from '@domain/deliveryman/repositories/ideliveryman.repository';
import { BadRequestError } from '@errors/bad-request.error';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  username: string;
  password: string;
}

@injectable()
export class CreateDeliveryamUseCase {
  constructor(
    @inject('DeliverymanRepository')
    private deliverymanRepository: IDeliverymanRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async run({ name, password, username }: IRequest): Promise<Deliveryman> {
    const existentDeliveryman = await this.deliverymanRepository.findByUsername(
      username,
    );

    if (existentDeliveryman) {
      throw new BadRequestError('Deliveryman already exists');
    }

    const hashedPassword = await this.hashProvider.hash(password, 8);

    const deliveryman = new Deliveryman({
      name,
      username,
      password: hashedPassword,
    });

    await this.deliverymanRepository.create(deliveryman);

    return deliveryman;
  }
}
