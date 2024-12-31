export default interface IOrder {
  _id: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  orderDate: Date;
  deliveryDate: Date;
  status: string;
}
