import { Customer } from '../entities/customer';

export interface ICustomersRepository {
  createCustomer(customer: Customer): Promise<Customer>;
}
