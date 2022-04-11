import { ICustomerDto } from '../dtos/customers.dto';
import { Customer } from '../entities/customer';

export class CustomerMapper {
  static toDto(customer: Customer): ICustomerDto {
    const { id, name, username, updatedAt } = customer;

    return {
      id,
      name,
      username,
      updatedAt,
    };
  }
}
