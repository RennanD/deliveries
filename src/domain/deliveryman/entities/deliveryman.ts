import { Entity } from '@core/domain/entity';
import { BcryptHashAdapter } from '@infra/adapters/bcrypt-hash.adapter';

interface IDeliverymanProps {
  name: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const hashProvider = new BcryptHashAdapter();

export class Deliveryman extends Entity<IDeliverymanProps> {
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

  private constructor(props: IDeliverymanProps, id?: string) {
    super(props, id);
  }

  public async checkPassword(password: string) {
    return hashProvider.compare(password, this.password);
  }

  static async create(props: IDeliverymanProps, id?: string) {
    const hashedPassword = await hashProvider.hash(props.password, 8);

    const deliveryman = new Deliveryman(
      {
        ...props,
        password: id ? props.password : hashedPassword,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return deliveryman;
  }
}
