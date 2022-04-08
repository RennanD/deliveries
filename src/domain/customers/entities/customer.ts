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

  name!: string;

  password?: string;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(props: ICustomerProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.username = slugify(props.name, { lower: true });
    Object.assign(this, props);
  }
}
