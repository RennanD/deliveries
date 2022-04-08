import crypto from 'crypto';

interface ICustomerProps {
  name: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Customer {
  id: string;

  username!: string;

  name!: string;

  password?: string;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(props: ICustomerProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    Object.assign(this, props);
  }
}
