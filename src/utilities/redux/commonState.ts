export default interface CommonState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  alertMessage: string;
  alertResult: "info" | "success" | "error" | "warning" | "";
}
