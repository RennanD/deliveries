import crypto from 'crypto';
import slugify from 'slugify';

interface ICustomerProps {
  name: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Customer {
  id: string;

  username: string;

  props: ICustomerProps;

  constructor(props: ICustomerProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.username = slugify(props.name, { lower: true });
    this.props = props;
  }
}
