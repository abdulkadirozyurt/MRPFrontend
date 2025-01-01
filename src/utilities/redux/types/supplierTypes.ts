import ISupplier from "@/models/supplier/ISupplier";
import CommonState from "../commonState";

export default interface SupplierState extends CommonState {
  suppliers: ISupplier[];
}
