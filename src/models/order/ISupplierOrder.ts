import IMaterial from "../material/IMaterial";
import ISupplier from "../supplier/ISupplier";
import IWarehouse from "../warehouse/IWarehouse";
import IOrder from "./IOrder";

export interface ISupplierOrder extends IOrder {  
  supplierId: ISupplier;
  warehouseId: IWarehouse;
  materialId: IMaterial;
  quantity: number;
  purchaseOrderNumber?: string;
  // materials: {
  //   materialId: IMaterial;
  //   quantity: number;
  // }[];
}
