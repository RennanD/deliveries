import crypto from 'node:crypto';

interface IDeliveryProps {
  item: string;
  customerId: string;
  deliverymanId: string;
}

export class Delivery {
  private id: string;

  private props: IDeliveryProps;

  constructor(props: IDeliveryProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.props = props;
  }
}
