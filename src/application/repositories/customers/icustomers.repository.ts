import { AsyncMaybe } from '@core/logic/maybe';
import { ICustomerDto } from '@domain/customers/dtos/customers.dto';
import { Customer } from '@domain/customers/entities/customer';

export interface ICustomersRepository {
  createCustomer(customer: Customer): Promise<void>;

  findCustomerByUsername(username: string): AsyncMaybe<ICustomerDto>;
}
