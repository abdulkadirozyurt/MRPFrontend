"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import CustomerList from "@/components/ui/customer-components/customerList";
import { UserRoles } from "@/utilities/constants/UserRoles";

export default function Customers() {
  return (
    <ProtectedRoute allowedRoles={[UserRoles.Admin, UserRoles.Manager]}>
      <CustomerList />
    </ProtectedRoute>
  );
}
