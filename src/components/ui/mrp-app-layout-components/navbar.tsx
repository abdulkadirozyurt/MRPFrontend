"use client";

import { logout } from "@/utilities/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import {
  DashboardOutlined,
  DropboxOutlined,
  FileTextOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserRoles } from "@/utilities/constants/UserRoles";
import { fetchCurrentUser, selectUser } from "@/utilities/redux/slices/userSlice";

type MenuItem = Required<MenuProps>["items"][number];

export default function Navbar() {
  const [current, setCurrent] = useState("");
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const user = useSelector(selectUser);

  const pathname = usePathname();
  useEffect(() => {
    const fetchUserData = async () => {
      await dispatch(fetchCurrentUser());
    };
    fetchUserData();

    const path = pathname?.split("/").pop();
    setCurrent(path || "dashboard");
  }, [dispatch, pathname]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const items: MenuItem[] = [
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
              {
                key: "suppliers",
                label: <Link href="/app/suppliers">Tedarikçiler</Link>,
              },
              {
                key: "customers",
                label: <Link href="/app/customers">Müşteriler</Link>,
              },
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
              {
                key: "products",
                label: <Link href="/app/products">Ürünler</Link>,
              },
              {
                key: "materials",
                label: <Link href="/app/materials">Malzemeler</Link>,
              },
              {
                key: "movements",
                label: <Link href="/app/inventory-movements">Stok Hareketleri</Link>,
              },
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
              {
                key: "customer-orders",
                label: <Link href="/app/orders/customer-orders">Müşteri Siparişleri</Link>,
              },
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
              {
                key: "production-reports",
                label: <Link href="/app/reports/production">Üretim Raporları</Link>,
              },
              {
                key: "stock-reports",
                label: <Link href="/app/reports/stock">Stok Raporları</Link>,
              },
              {
                key: "order-reports",
                label: <Link href="/app/reports/orders">Sipariş Raporları</Link>,
              },
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
              {
                key: "users",
                label: <Link href="/app/settings/users">Kullanıcılar</Link>,
              },
              {
                key: "system",
                label: <Link href="/app/settings/system">Sistem Ayarları</Link>,
              },
            ]
          : []),
        {
          key: "logout",
          label: <span onClick={handleLogout}>Çıkış Yap</span>,
        },
      ],
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      handleLogout();
    } else {
      setCurrent(e.key);
    }
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}
