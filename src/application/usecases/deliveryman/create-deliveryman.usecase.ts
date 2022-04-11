import { inject, injectable } from 'tsyringe';

import { Deliveryman } from '@domain/deliveryman/entities/deliveryman';

import { IDeliverymanRepository } from '@application/repositories/deliveryman/ideliveryman.repository';

import { BadRequestError } from '@errors/bad-request.error';

interface IRequest {
  name: string;
  username: string;
  password: string;
}

interface IResponse {
  id: string;
  name: string;
  username: string;
}

@injectable()
export class CreateDeliveryamUseCase {
  constructor(
    @inject('DeliverymanRepository')
    private deliverymanRepository: IDeliverymanRepository,
  ) {}

  async run({ name, password, username }: IRequest): Promise<IResponse> {
    const existentDeliveryman = await this.deliverymanRepository.findByUsername(
      username,
    );

    if (existentDeliveryman) {
      throw new BadRequestError('Deliveryman already exists');
    }

    const deliveryman = await Deliveryman.create({ name, password, username });

    await this.deliverymanRepository.create(deliveryman);

    return {
      id: deliveryman.id,
      name: deliveryman.name,
      username: deliveryman.username,
    };
  }
}
