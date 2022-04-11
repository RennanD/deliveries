import { IDeliverymanDto } from '../dtos/deliveryman.dto';
import { Deliveryman } from '../entities/deliveryman';

export class DeliverymanMapper {
  static toDto(deliveryman: Deliveryman): IDeliverymanDto {
    const { id, name, updatedAt, username } = deliveryman;

    return {
      id,
      name,
      updatedAt,
      username,
    };
  }
}
