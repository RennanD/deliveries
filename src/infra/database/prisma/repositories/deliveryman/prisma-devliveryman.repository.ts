import { PrismaClient } from '@prisma/client';
import { AsyncMaybe } from '@core/logic/maybe';

import { Deliveryman } from '@domain/deliveryman/entities/deliveryman';

import { IDeliverymanRepository } from '@application/repositories/deliveryman/ideliveryman.repository';

import { IDeliverymanDto } from '@domain/deliveryman/dtos/deliveryman.dto';
import { DeliverymanMapper } from '@domain/deliveryman/mappers/deliveryman.mapper';
import { prisma } from '../../client';

export class PrismaDeliverymanRespository implements IDeliverymanRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async findByUsername(username: string): AsyncMaybe<IDeliverymanDto> {
    const rawDeliveryman = await this.repository.deliveryman.findFirst({
      where: { username },
    });

    if (!rawDeliveryman) return null;

    const { password, id, name, updatedAt } = rawDeliveryman;

    const deliveryman = await Deliveryman.create(
      { name, password, username, updatedAt },
      id,
    );

    return DeliverymanMapper.toDto(deliveryman);
  }

  async create(deliveryman: Deliveryman): Promise<void> {
    const { id, name, username, password } = deliveryman;

    await this.repository.deliveryman.create({
      data: {
        id,
        name,
        username,
        password,
      },
    });
  }
}
