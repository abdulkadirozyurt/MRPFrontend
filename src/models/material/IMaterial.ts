export default interface IMaterial {
  _id: string;
  name: string;
  stockAmount: number;
  unitType: string;
  price: number;
  reorderLevel: number;
  priceHistory: Array<{ price: number; date: Date }>;
  suppliers: Array<string>;
}
