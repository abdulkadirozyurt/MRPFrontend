import IMaterial from "../material/IMaterial";
import IOrder from "./IOrder";

export interface ISupplierOrder extends IOrder {
  warehouseId: string;
  purchaseOrderNumber?: string;
  materials: {
    materialId: IMaterial;
    quantity: number;
  }[];
}
