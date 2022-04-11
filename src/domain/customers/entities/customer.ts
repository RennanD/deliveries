import { Entity } from '@core/domain/entity';

import { BcryptHashAdapter } from '@infra/adapters/bcrypt-hash.adapter';

interface ICustomerProps {
  name: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const hashProvider = new BcryptHashAdapter();

export class Customer extends Entity<ICustomerProps> {
  get name() {
    return this.props.name;
  }

  get username() {
    return this.props.username;
  }

  get password() {
    return this.props.password;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private constructor(props: ICustomerProps, id?: string) {
    super(props, id);
  }

  public async checkPassword(password: string) {
    return hashProvider.compare(password, this.password);
  }

  static async create(props: ICustomerProps, id?: string) {
    const password = await hashProvider.hash(props.password, 8);

    const customer = new Customer(
      {
        ...props,
        password,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return customer;
  }
}
