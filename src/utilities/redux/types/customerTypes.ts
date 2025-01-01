import CommonState from "../commonState";
import ICustomer from "@/models/customer/ICustomer";

export default interface CustomerState extends CommonState {
  customers: ICustomer[];
}
