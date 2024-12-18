"use client";


import { RootState } from "@/utilities/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login page----", isAuthenticated);
    
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
