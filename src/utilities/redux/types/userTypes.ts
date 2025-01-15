import IUser from "@/models/user/IUser";
import CommonState from "../commonState";

export default interface UserState extends CommonState {
  users: IUser[];
  user: null | IUser;
}
