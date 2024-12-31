import IOrder from "./IOrder";

export interface ICustomerOrder extends IOrder {
    customerId: string;
    deliveryAddress: string;
    paymentMethod?: string;
  }