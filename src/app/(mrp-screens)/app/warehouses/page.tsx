import SupplierList from "@/components/ui/supplier-components/supplierList";
import ProtectedRoute from "@/components/ProtectedRoute";
import { UserRoles } from "@/utilities/constants/UserRoles";
import WarehouseList from "@/components/ui/warehouse-components/warehouse-list";

export default function Warehouses() {
  return (
    <ProtectedRoute allowedRoles={[UserRoles.Admin, UserRoles.Manager]}>
        <WarehouseList/>
    </ProtectedRoute>
  );
}
