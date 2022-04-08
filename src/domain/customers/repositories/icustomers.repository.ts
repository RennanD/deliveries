import { Customer } from '../entities/customer';

export interface ICustomersRepository {
  createCustomer(customer: Customer): Promise<Customer>;

  findCustomerByUsername(username: string): Promise<Customer | null>;
}
