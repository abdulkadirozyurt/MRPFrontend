import { IMaterial } from "@/models/material/IMaterial";

export default interface MaterialState {
  materials: IMaterial[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
