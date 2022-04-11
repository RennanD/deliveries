import { PrismaClient } from '@prisma/client';

import { Deliveryman } from '@domain/deliveryman/entities/deliveryman';

import { IDeliverymanRepository } from '@application/repositories/deliveryman/ideliveryman.repository';

import { prisma } from '../../client';

export class PrismaDeliverymanRespository implements IDeliverymanRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async findByUsername(username: string): Promise<Deliveryman | null> {
    const deliveryman = await this.repository.deliveryman.findFirst({
      where: { username },
    });

    if (!deliveryman) return null;

    const { createdAt, id, name, updatedAt } = deliveryman;

    return new Deliveryman({ createdAt, name, updatedAt, username }, id);
  }

  async create(deliveryman: Deliveryman): Promise<void> {
    const { id, name, username, password } = deliveryman;

    await this.repository.deliveryman.create({
      data: {
        id,
        name,
        username,
        password: password!,
      },
    });
  }
}
