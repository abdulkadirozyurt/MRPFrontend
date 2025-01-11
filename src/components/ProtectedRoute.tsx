"use client"

import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utilities/redux/store";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { UserRoles } from "@/utilities/constants/UserRoles";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      setLoading(false);
    } else if (!allowedRoles?.includes(userRole as UserRoles)) {
      router.push("/unauthorized");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router, userRole, allowedRoles]);

  if (loading) {
    return <LoadingOutlined />;
  }

  return <>{children}</>;
}
