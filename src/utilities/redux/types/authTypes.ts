export default interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isRegistered: boolean;
  isAuthenticated: boolean;
  userRole: string | null;
}
