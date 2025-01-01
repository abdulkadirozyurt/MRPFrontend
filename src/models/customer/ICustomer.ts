export default interface ICustomer {
  _id: string;
  companyName: string;
  contactName: string;
  contactTitle?: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  address: string;
  postalCode?: string;
  region?: string;
  taxNumber?: string;
}
