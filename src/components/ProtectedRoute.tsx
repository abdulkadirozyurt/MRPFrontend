import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utilities/redux/store";
import { LoadingOutlined } from "@ant-design/icons";

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
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <LoadingOutlined />;
  }

  return <>{children}</>;
}
