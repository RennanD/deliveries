import { IDeliverymanRepository } from '@application/repositories/deliveryman/ideliveryman.repository';
import { AsyncMaybe } from '@core/logic/maybe';
import { IDeliverymanDto } from '@domain/deliveryman/dtos/deliveryman.dto';
import { Deliveryman } from '@domain/deliveryman/entities/deliveryman';

export class InMemoryDeliverymanRepository implements IDeliverymanRepository {
  private deliverymen: Deliveryman[] = [];

  async findByUsername(username: string): AsyncMaybe<IDeliverymanDto> {
    return this.deliverymen.find(
      deliveryman => deliveryman.username === username,
    );
  }

  async create(deliveryman: Deliveryman): Promise<void> {
    this.deliverymen.push(deliveryman);
  }
}
