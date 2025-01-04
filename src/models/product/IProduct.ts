export interface IProduct {
  _id: string;
  name: string;
  description: string;
  unitType: string;
  billOfMaterials?: {
    materialId: string;
    quantity: number;
  }[];
}
