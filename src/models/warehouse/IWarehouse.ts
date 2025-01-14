import IUser from "../user/IUser";

export default interface IWarehouse {
  _id: string;
  name: string;
  location: string;
  capacity: number;
  description?: string;
  managerId: IUser;
}
