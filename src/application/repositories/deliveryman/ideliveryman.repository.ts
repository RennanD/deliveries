import { AsyncMaybe } from '@core/logic/maybe';
import { IDeliverymanDto } from '@domain/deliveryman/dtos/deliveryman.dto';
import { Deliveryman } from '@domain/deliveryman/entities/deliveryman';

export interface IDeliverymanRepository {
  findByUsername(username: string): AsyncMaybe<IDeliverymanDto>;
  create(deliveryman: Deliveryman): Promise<void>;
}
