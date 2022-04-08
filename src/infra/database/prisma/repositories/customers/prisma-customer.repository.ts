import { PrismaClient } from '@prisma/client';

import { Customer } from '@domain/customers/entities/customer';
import { ICustomersRepository } from '@domain/customers/repositories/icustomers.repository';

import { prisma } from '../../client';

export class PrismaCustomerRepository implements ICustomersRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async findCustomerByUsername(username: string): Promise<Customer | null> {
    const customer = await this.repository.customer.findFirst({
      where: { username },
    });

    if (!customer) {
      return null;
    }

    const { id, name, createdAt, updatedAt } = customer;

    return new Customer({ name, createdAt, updatedAt }, id);
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    const { id, username, name, password } = customer;

    await this.repository.customer.create({
      data: {
        id,
        username,
        name,
        password: password!,
      },
    });

    return customer;
  }
}
