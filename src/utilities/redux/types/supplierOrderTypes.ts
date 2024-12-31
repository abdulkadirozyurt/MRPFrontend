import { ISupplierOrder } from "@/models/order/ISupplierOrder";

import CommonState from "../commonState";

export default interface SupplierOrdersState extends CommonState {
  orders: ISupplierOrder[];
}

