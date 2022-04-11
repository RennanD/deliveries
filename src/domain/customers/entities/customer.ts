import { Entity } from '@core/domain/entity';

interface ICustomerProps {
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Customer extends Entity<ICustomerProps> {
  private constructor(props: ICustomerProps, id?: string) {
    super(props, id);
  }

  static create(props: ICustomerProps, id?: string) {
    const customer = new Customer(props, id);

    return customer;
  }
}
