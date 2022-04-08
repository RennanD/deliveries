import { Deliveryman } from '../entities/deliveryman';

export interface IDeliverymanRepository {
  createDeliveryman(deliveryman: Deliveryman): Promise<Deliveryman>;
}
