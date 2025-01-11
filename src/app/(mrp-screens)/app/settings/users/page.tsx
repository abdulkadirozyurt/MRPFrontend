import SupplierList from "@/components/ui/supplier-components/supplierList";
import ProtectedRoute from "@/components/ProtectedRoute";
import { UserRoles } from "@/utilities/constants/UserRoles";
import UserList from "@/components/ui/user-management-components/userList";

export default function Users() {
  return (
    <ProtectedRoute allowedRoles={[UserRoles.Admin]}>
        <UserList />
    </ProtectedRoute>
  );
}
