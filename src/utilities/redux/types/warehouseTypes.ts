import IWarehouse from "@/models/warehouse/IWarehouse";
import CommonState from "../commonState";

export default interface WarehouseState extends CommonState {
  warehouses: IWarehouse[];
}
