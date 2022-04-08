import { Delivery } from '../entities/devlivery';

export interface IDeliveryRepository {
  createDelivery(deliveryman: Delivery): Promise<Delivery>;
}
