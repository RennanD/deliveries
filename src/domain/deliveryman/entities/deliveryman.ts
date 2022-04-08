import crypto from 'node:crypto';
import slugify from 'slugify';

interface DeliverymanProps {
  name: string;
  password: string;
}

export class Deliveryman {
  private id: string;

  private username: string;

  private props: DeliverymanProps;

  constructor(props: DeliverymanProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.props = props;
    this.username = slugify(props.name, { lower: true });
  }
}
