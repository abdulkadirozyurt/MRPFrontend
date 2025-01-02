// "use client";

// import { RootState } from "@/utilities/redux/store";
// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/login");
//     }
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated) {
//     return null;
//   }

//   return <>{children}</>;
// }
"use client";

import { RootState } from "@/utilities/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return null; // veya bir yükleme simgesi
  }

  return <>{children}</>;
}