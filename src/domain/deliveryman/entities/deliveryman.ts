import crypto from 'crypto';

interface DeliverymanProps {
  name: string;
  username: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Deliveryman {
  id: string;

  username!: string;

  name!: string;

  password?: string;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(props: DeliverymanProps, id?: string) {
    this.id = id ?? crypto.randomUUID();

    Object.assign(this, props);
  }
}
