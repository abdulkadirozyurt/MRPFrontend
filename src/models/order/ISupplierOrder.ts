import IMaterial from "../material/IMaterial";
import ISupplier from "../supplier/ISupplier";
import IOrder from "./IOrder";

export interface ISupplierOrder extends IOrder {
  supplierId: ISupplier;
  warehouseId: string;
  purchaseOrderNumber?: string;
  materials: {
    materialId: IMaterial;
    quantity: number;
  }[];
}
