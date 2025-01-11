import CommonState from "../commonState";

export default interface AuthState extends CommonState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isRegistered: boolean;
  isAuthenticated: boolean;
  userRole: string|null;
}
