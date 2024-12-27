import { IBillOfMaterial } from "../bom/IBillOfMaterial";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  billOfMaterials?: string[];
  unitType: string;
}
