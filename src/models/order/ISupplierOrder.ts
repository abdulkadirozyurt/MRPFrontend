import IOrder from "./IOrder";

export interface ISupplierOrder extends IOrder {
  supplierId: string;
  warehouseId: string;
  purchaseOrderNumber?: string;
}
