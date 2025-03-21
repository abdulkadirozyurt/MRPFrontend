import IMaterial from "../material/IMaterial";

export default interface ISupplier {
  _id: string;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  materialsOfSupplied: IMaterial[];
}
