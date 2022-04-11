import { AsyncMaybe } from '@core/logic/maybe';

import { ICustomersRepository } from '@application/repositories/customers/icustomers.repository';

import { ICustomerDto } from '@domain/customers/dtos/customers.dto';
import { Customer } from '@domain/customers/entities/customer';

export class InMemoryCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  async createCustomer(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }

  async findCustomerByUsername(username: string): AsyncMaybe<ICustomerDto> {
    return this.customers.find(customer => customer.username === username);
  }
}
