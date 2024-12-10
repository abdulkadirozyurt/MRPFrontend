import { IBillOfMaterial } from "../bom/IBillOfMaterial";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  billOfMaterials?: IBillOfMaterial[];
}
