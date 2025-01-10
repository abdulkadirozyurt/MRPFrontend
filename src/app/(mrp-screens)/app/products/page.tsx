"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import ProductList from "@/components/ui/product-components/productList";
import { UserRoles } from "@/utilities/constants/UserRoles";

export default function Products() {
  return (
    <div className="min-h-screen ">
      <ProtectedRoute allowedRoles={[UserRoles.Admin, UserRoles.ProductionPlanner]}>
        <ProductList />
      </ProtectedRoute>
    </div>
  );
}
