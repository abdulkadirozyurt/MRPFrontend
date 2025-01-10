"use client";

import MaterialList from "@/components/ui/material-components/materialList";
import ProtectedRoute from "@/components/ProtectedRoute";
import { UserRoles } from "@/utilities/constants/UserRoles";

export default function Materials() {
  return (
    <ProtectedRoute allowedRoles={[UserRoles.Admin, UserRoles.ProductionPlanner]}>
      <MaterialList />
    </ProtectedRoute>
  );
}
