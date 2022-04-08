import { Deliveryman } from '../entities/deliveryman';

export interface IDeliverymanRepository {
  findByUsername(username: string): Promise<Deliveryman | null>;
  create(deliveryman: Deliveryman): Promise<void>;
}
