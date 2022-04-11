import { PrismaClient } from '@prisma/client';

import { AsyncMaybe } from '@core/logic/maybe';

import { Customer } from '@domain/customers/entities/customer';

import { ICustomersRepository } from '@application/repositories/customers/icustomers.repository';

import { prisma } from '../../client';

export class PrismaCustomerRepository implements ICustomersRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async findCustomerByUsername(username: string): AsyncMaybe<Customer> {
    const rawCustomer = await this.repository.customer.findFirst({
      where: { username },
    });

    if (!rawCustomer) {
      return null;
    }

    const { id, name, password, createdAt, updatedAt } = rawCustomer;

    const customer = await Customer.create(
      { name, password, username, createdAt, updatedAt },
      id,
    );

    return customer;
  }

  async createCustomer(customer: Customer): Promise<void> {
    const { id, username, name, password } = customer;

    await this.repository.customer.create({
      data: {
        id,
        username,
        name,
        password: password!,
      },
    });
  }
}
