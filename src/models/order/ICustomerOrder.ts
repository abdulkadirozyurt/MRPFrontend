import ICustomer from "../customer/ICustomer";
import { IProduct } from "../product/IProduct";
import IOrder from "./IOrder";

export interface ICustomerOrder extends IOrder {
  customerId: ICustomer;
  deliveryAddress: string;
  paymentMethod?: string;
  products: {
    productId: IProduct;
    quantity: number;
  }[];
}
