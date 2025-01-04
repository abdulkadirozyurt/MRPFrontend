import IMaterial from "../material/IMaterial";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  unitType: string;
  billOfMaterials?: {
    materialId: IMaterial;
    quantity: number;
  }[];
}
