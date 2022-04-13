import { AsyncMaybe } from '@core/logic/maybe';
import { Deliveryman } from '@domain/deliveryman/entities/deliveryman';

export interface IDeliverymanRepository {
  findByUsername(username: string): AsyncMaybe<Deliveryman>;
  create(deliveryman: Deliveryman): Promise<void>;
}
