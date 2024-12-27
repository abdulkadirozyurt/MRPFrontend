import IMaterial from "@/models/material/IMaterial";
import CommonState from "../commonState";

export default interface MaterialState extends CommonState {
  materials: IMaterial[];
  
}
