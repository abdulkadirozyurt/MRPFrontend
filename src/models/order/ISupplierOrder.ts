import IOrder from "./IOrder";

export interface ISupplierOrder extends IOrder {
  warehouseId: string;
  purchaseOrderNumber?: string;
  materials: {
    materialId: string;
    quantity: number;
  }[];
}
