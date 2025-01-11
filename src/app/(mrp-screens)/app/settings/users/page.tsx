"use client"

import ProtectedRoute from "@/components/ProtectedRoute";
import UserList from "@/components/ui/user-management-components/userList";
import { UserRoles } from "@/utilities/constants/UserRoles";

export default function Users() {
  return (
    <ProtectedRoute allowedRoles={[UserRoles.Admin]}>
        <UserList />
    </ProtectedRoute>
  );
}
