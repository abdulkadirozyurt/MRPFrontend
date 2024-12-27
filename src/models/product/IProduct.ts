import { IBillOfMaterial } from "../bom/IBillOfMaterial";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  billOfMaterials?: IBillOfMaterial[];
  unitType: string;
}
