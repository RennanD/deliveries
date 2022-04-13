import { inject, injectable } from 'tsyringe';

import { Either, left, right } from '@core/logic/either';

import { IDeliverymanRepository } from '@application/repositories/deliveryman/ideliveryman.repository';
import { IJWTProvider } from '@application/providers/ijwt.provider';

import { IDeliverymanDto } from '@domain/deliveryman/dtos/deliveryman.dto';

import { UnauthozitedError } from '@errors/unauthorized.error';

interface IRequest {
  username: string;
  password: string;
}

interface Session {
  deliveryman: IDeliverymanDto;
  token: string;
}

type IResponse = Promise<Either<UnauthozitedError, Session>>;

@injectable()
export class AuthDeliverymanUseCase {
  constructor(
    @inject('DeliverymanRepository')
    private deliverymanRepository: IDeliverymanRepository,
    @inject('JWTProvider')
    private jwtProvider: IJWTProvider,
  ) {}

  async run({ username, password }: IRequest): IResponse {
    const deliveryman = await this.deliverymanRepository.findByUsername(
      username,
    );

    if (!deliveryman) {
      return left(new UnauthozitedError('Invalid Credentials'));
    }

    const passwordMacth = await deliveryman.checkPassword(password);

    if (!passwordMacth) {
      return left(new UnauthozitedError('Invalid Password'));
    }

    const token = await this.jwtProvider.sign({ username }, deliveryman.id);

    return right({
      deliveryman,
      token,
    });
  }
}
