"use client";

import CustomerOrdersList from "@/components/ui/order-components/customer-order-components/customerOrderList";
import ProtectedRoute from "@/components/ProtectedRoute";
import { UserRoles } from "@/utilities/constants/UserRoles";

export default function CustomerOrders() {
  return (
    <div className="min-h-screen ">
      <ProtectedRoute allowedRoles={[UserRoles.Admin, UserRoles.SalesStaff]}>
        <CustomerOrdersList />
      </ProtectedRoute>
    </div>
  );
}
