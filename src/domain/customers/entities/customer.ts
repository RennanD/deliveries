import crypto from 'node:crypto';
import slugify from 'slugify';

interface ICustomerProps {
  name: string;
  password: string;
}

export class Customer {
  private id: string;

  private username: string;

  private props: ICustomerProps;

  constructor(props: ICustomerProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.username = slugify(props.name, { lower: true });
    this.props = props;
  }
}
