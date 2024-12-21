import ISupplier from "@/models/supplier/ISupplier";

export default interface SupplierState {
  suppliers: ISupplier[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  alertMessage: string;
  alertResult: "info" | "success" | "error" | "warning" | "";
}
