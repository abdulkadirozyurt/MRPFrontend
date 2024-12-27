import { IProduct } from "@/models/product/IProduct";
import CommonState from "../commonState";

export default interface ProductState extends CommonState {
  products: IProduct[];
}
