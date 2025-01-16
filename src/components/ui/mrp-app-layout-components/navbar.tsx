// import { UserRoles } from "@/utilities/constants/UserRoles";
// import { logout } from "@/utilities/redux/slices/authSlice";
// import { fetchCurrentUser, updateUserRole } from "@/utilities/redux/slices/userSlice";
// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import {
//   CalculatorOutlined,
//   DashboardOutlined,
//   DropboxOutlined,
//   FileTextOutlined,
//   SettingOutlined,
//   ShoppingCartOutlined,
//   UsergroupAddOutlined,
// } from "@ant-design/icons";
// import { Menu, MenuProps } from "antd";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useMemo, useState } from "react";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";

// // const socket = io(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`);

// const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
//   transports: ["websocket", "polling"],
// });

// export default function Navbar() {
//   const dispatch: AppDispatch = useDispatch();
//   const userRole = useSelector((state: RootState) => state.user.userRole, shallowEqual);
//   const [current, setCurrent] = useState("");
//   const router = useRouter();
//   const user = useSelector((state: RootState) => state.user.user);
//   console.log("Redux user state after fetch:", user);

//   useEffect(() => {
//     if (!user) {
//       console.log("Fetching current user...");
//       dispatch(fetchCurrentUser())
//         .unwrap()
//         .then((data) => {
//           console.log("User fetched successfully:", data);
//         })
//         .catch((error) => {
//           console.error("Error fetching user:", error);
//         });
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     console.log("Current user in Navbar:", user);

//     socket.on("roleUpdated", ({ userId, newRole }) => {
//       console.log("Frontend roleUpdated event received:", userId, newRole);

//       if (userId == user?._id) {
//         console.log("Dispatching updateUserRole action with:", newRole);
//         dispatch(updateUserRole(newRole));
//         console.log("Current userRole in Redux (after dispatch):", newRole);
//       }
//     });

//     return () => {
//       socket.off("roleUpdated");
//     };
//   }, [dispatch, user]);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("WebSocket connected:", socket.id);
//     });

//     socket.on("disconnect", () => {
//       console.log("WebSocket disconnected.");
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleRoleChange = (userId: string, newRole: string) => {
//     console.log("Sending role change request:", userId, newRole);
//     socket.emit("updateRole", { userId, newRole });
//   };

//   const handleLogout = () => {
//     // Çıkış işlemi
//     localStorage.removeItem("token");
//     dispatch(logout());
//     router.push("/login");
//   };

//   const items = useMemo(() => {
//     return [
//       {
//         key: "dashboard",
//         icon: <DashboardOutlined />,
//         label: <Link href="/app/dashboard">Dashboard</Link>,
//       },
//       ...(userRole === UserRoles.Admin || userRole === UserRoles.Manager
//         ? [
//             {
//               label: "Firmalar",
//               key: "companies",
//               icon: <UsergroupAddOutlined />,
//               children: [
//                 { key: "suppliers", label: <Link href="/app/suppliers">Tedarikçiler</Link> },
//                 { key: "customers", label: <Link href="/app/customers">Müşteriler</Link> },
//               ],
//             },
//             {
//               key: "warehouses",
//               icon: <DropboxOutlined />,
//               label: <Link href="/app/warehouses">Depolar</Link>,
//             },
//           ]
//         : []),
//       ...(userRole === UserRoles.Admin || userRole === UserRoles.ProductionPlanner
//         ? [
//             {
//               label: "Envanter Yönetimi",
//               key: "inventory",
//               icon: <DropboxOutlined />,
//               children: [
//                 { key: "products", label: <Link href="/app/products">Ürünler</Link> },
//                 { key: "materials", label: <Link href="/app/materials">Malzemeler</Link> },
//                 { key: "movements", label: <Link href="/app/inventory-movements">Stok Hareketleri</Link> },
//               ],
//             },
//           ]
//         : []),
//       ...(userRole === UserRoles.Admin || userRole === UserRoles.ProductionPlanner
//         ? [
//             {
//               key: "mrp",
//               icon: <CalculatorOutlined />,
//               label: <Link href="/app/mrp">MRP Hesaplama</Link>,
//             },
//           ]
//         : []),
//       ...(userRole === UserRoles.Admin || userRole === UserRoles.SalesStaff
//         ? [
//             {
//               label: "Sipariş Yönetimi",
//               key: "orders",
//               icon: <ShoppingCartOutlined />,
//               children: [
//                 { key: "customer-orders", label: <Link href="/app/orders/customer-orders">Müşteri Siparişleri</Link> },
//                 {
//                   key: "supplier-orders",
//                   label: <Link href="/app/orders/supplier-orders">Tedarikçi Siparişleri</Link>,
//                 },
//               ],
//             },
//           ]
//         : []),
//       ...(userRole === UserRoles.Admin || userRole === UserRoles.Manager
//         ? [
//             {
//               label: "Raporlama",
//               key: "reporting",
//               icon: <FileTextOutlined />,
//               children: [
//                 { key: "production-reports", label: <Link href="/app/reports/production">Üretim Raporları</Link> },
//                 { key: "stock-reports", label: <Link href="/app/reports/stock">Stok Raporları</Link> },
//                 { key: "order-reports", label: <Link href="/app/reports/orders">Sipariş Raporları</Link> },
//               ],
//             },
//           ]
//         : []),
//       {
//         label: "Ayarlar",
//         key: "settings",
//         icon: <SettingOutlined />,
//         children: [
//           ...(userRole === UserRoles.Admin
//             ? [
//                 { key: "users", label: <Link href="/app/settings/users">Kullanıcılar</Link> },
//                 { key: "system", label: <Link href="/app/settings/system">Sistem Ayarları</Link> },
//               ]
//             : []),
//           {
//             key: "logout",
//             // label: <span onClick={() => router.push("/login")}>Çıkış Yap</span>,
//             label: <span onClick={handleLogout}>Çıkış Yap</span>,
//           },
//         ],
//       },
//     ];
//   }, [userRole]);

//   const onClick: MenuProps["onClick"] = (e) => {
//     if (e.key === "logout") {
//       handleLogout();
//     } else {
//       setCurrent(e.key);
//     }
//   };

//   return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
// }





import { UserRoles } from "@/utilities/constants/UserRoles";
import { logout } from "@/utilities/redux/slices/authSlice";
import { fetchCurrentUser, updateUserRole } from "@/utilities/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import {
  CalculatorOutlined,
  DashboardOutlined,
  DropboxOutlined,
  FileTextOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
  transports: ["websocket", "polling"],
});

export default function Navbar() {
  const dispatch: AppDispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.user.userRole, shallowEqual);
  const [current, setCurrent] = useState("");
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .then((data) => {
          console.log("User fetched successfully:", data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [dispatch, user]);

  useEffect(() => {
    socket.on("roleUpdated", ({ userId, newRole }) => {
      if (userId === user?._id) {
        dispatch(updateUserRole(newRole));
        console.log("Role updated in Redux:", newRole);
      }
    });

    return () => {
      socket.off("roleUpdated");
    };
  }, [dispatch, user]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("WebSocket connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/login");
  };

  const items = useMemo(() => {
    return [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: <Link href="/app/dashboard">Dashboard</Link>,
      },
      ...(userRole === UserRoles.Admin || userRole === UserRoles.Manager
        ? [
            {
              label: "Firmalar",
              key: "companies",
              icon: <UsergroupAddOutlined />,
              children: [
                { key: "suppliers", label: <Link href="/app/suppliers">Tedarikçiler</Link> },
                { key: "customers", label: <Link href="/app/customers">Müşteriler</Link> },
              ],
            },
            {
              key: "warehouses",
              icon: <DropboxOutlined />,
              label: <Link href="/app/warehouses">Depolar</Link>,
            },
          ]
        : []),
      ...(userRole === UserRoles.Admin || userRole === UserRoles.ProductionPlanner
        ? [
            {
              label: "Envanter Yönetimi",
              key: "inventory",
              icon: <DropboxOutlined />,
              children: [
                { key: "products", label: <Link href="/app/products">Ürünler</Link> },
                { key: "materials", label: <Link href="/app/materials">Malzemeler</Link> },
                { key: "movements", label: <Link href="/app/inventory-movements">Stok Hareketleri</Link> },
              ],
            },
          ]
        : []),
      ...(userRole === UserRoles.Admin || userRole === UserRoles.ProductionPlanner
        ? [
            {
              key: "mrp",
              icon: <CalculatorOutlined />,
              label: <Link href="/app/mrp">MRP Hesaplama</Link>,
            },
          ]
        : []),
      ...(userRole === UserRoles.Admin || userRole === UserRoles.SalesStaff
        ? [
            {
              label: "Sipariş Yönetimi",
              key: "orders",
              icon: <ShoppingCartOutlined />,
              children: [
                { key: "customer-orders", label: <Link href="/app/orders/customer-orders">Müşteri Siparişleri</Link> },
                {
                  key: "supplier-orders",
                  label: <Link href="/app/orders/supplier-orders">Tedarikçi Siparişleri</Link>,
                },
              ],
            },
          ]
        : []),
      ...(userRole === UserRoles.Admin || userRole === UserRoles.Manager
        ? [
            {
              label: "Raporlama",
              key: "reporting",
              icon: <FileTextOutlined />,
              children: [
                { key: "production-reports", label: <Link href="/app/reports/production">Üretim Raporları</Link> },
                { key: "stock-reports", label: <Link href="/app/reports/stock">Stok Raporları</Link> },
                { key: "order-reports", label: <Link href="/app/reports/orders">Sipariş Raporları</Link> },
              ],
            },
          ]
        : []),
      {
        label: "Ayarlar",
        key: "settings",
        icon: <SettingOutlined />,
        children: [
          ...(userRole === UserRoles.Admin
            ? [
                { key: "users", label: <Link href="/app/settings/users">Kullanıcılar</Link> },
                { key: "system", label: <Link href="/app/settings/system">Sistem Ayarları</Link> },
              ]
            : []),
          {
            key: "logout",
            label: <span onClick={handleLogout}>Çıkış Yap</span>,
          },
        ],
      },
    ];
  }, [userRole]);

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      handleLogout();
    } else {
      setCurrent(e.key);
    }
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}



