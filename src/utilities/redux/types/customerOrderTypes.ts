import { ICustomerOrder } from "@/models/order/ICustomerOrder";
import CommonState from "../commonState";

export default interface CustomerOrdersState extends CommonState {
  orders: ICustomerOrder[];
}
