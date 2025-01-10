"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import SupplierOrderList from "@/components/ui/order-components/supplier-order-components/supplierOrderList";
import { UserRoles } from "@/utilities/constants/UserRoles";

export default function SupplierOrders() {
  return (
    <div className="min-h-screen ">
      <ProtectedRoute allowedRoles={[UserRoles.Admin, UserRoles.ProcurementManager]}>
        <SupplierOrderList />
      </ProtectedRoute>
    </div>
  );
}
