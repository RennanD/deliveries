import { IDeliverymanRepository } from '@application/repositories/deliveryman/ideliveryman.repository';
import { AsyncMaybe } from '@core/logic/maybe';
import { Deliveryman } from '@domain/deliveryman/entities/deliveryman';

export class InMemoryDeliverymanRepository implements IDeliverymanRepository {
  private deliverymen: Deliveryman[] = [];

  async findByUsername(username: string): AsyncMaybe<Deliveryman> {
    return this.deliverymen.find(
      deliveryman => deliveryman.username === username,
    );
  }

  async create(deliveryman: Deliveryman): Promise<void> {
    this.deliverymen.push(deliveryman);
  }
}
