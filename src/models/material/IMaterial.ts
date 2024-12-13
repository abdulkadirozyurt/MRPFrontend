import ISupplier from "../supplier/ISupplier";

export default interface IMaterial {
  id: string;
  name: string;
  stockAmount: number;
  unitType: string;
  price: number;
  reorderLevel: number;
  priceHistory: Array<{ price: number; date: Date }>;
  suppliers: Array<ISupplier>;
}
