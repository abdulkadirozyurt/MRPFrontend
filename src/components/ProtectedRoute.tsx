"use client";

import { RootState } from "@/utilities/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
