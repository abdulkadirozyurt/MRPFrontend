import { RootState } from "@/utilities/redux/store";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  children,
  allowedRoles = [], // İzin verilen roller parametre olarak alınıyor
}: {
  children: ReactNode;
  allowedRoles?: string[];
}) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole"); // Kullanıcı rolü localStorage'dan alınabilir

    if (!isAuthenticated || (allowedRoles.length > 0 && !allowedRoles.includes(userRole ?? ""))) {
      router.push("/unauthorized").then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router, allowedRoles]);

  if (loading) {
    return <LoadingOutlined />;
  }

  return <>{children}</>;
}

// "use client";

// import { RootState } from "@/utilities/redux/store";
// import { LoadingOutlined } from "@ant-design/icons";
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
//     if (isAuthenticated) {
//       setLoading(false);
//     } else {
//       router.push("/login");
//     }
//   }, [isAuthenticated, router]);

//   if (loading) {
//     return <LoadingOutlined/>;
//   }

//   return <>{children}</>;
// }
