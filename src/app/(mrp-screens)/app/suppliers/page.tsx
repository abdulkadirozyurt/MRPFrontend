import SupplierList from "@/components/ui/supplier-components/supplierList";
import ProtectedRoute from "@/components/ProtectedRoute";
import { UserRoles } from "@/utilities/constants/UserRoles";

export default function Suppliers() {
  return (
    <ProtectedRoute allowedRoles={[UserRoles.Admin, UserRoles.ProcurementManager, UserRoles.Manager]}>
      <SupplierList />
    </ProtectedRoute>
  );
}
