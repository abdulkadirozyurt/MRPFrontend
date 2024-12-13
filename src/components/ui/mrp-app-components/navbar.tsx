"use client";

import {
  AppstoreOutlined,
  DashboardOutlined,
  DropboxOutlined,
  MailOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "dashboard",
    icon:<DashboardOutlined />,
    label: <Link href="/app/dashboard">Dashboard</Link>,
  },
  {
    label: "Envanter",
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

      // {
      //   type: "group",
      //   label: "Item 1",
      //   children: [
      //     { label: "Option 1", key: "setting:1" },
      //     { label: "Option 2", key: "setting:2" },
      //   ],
      // },
      // {
      //   type: "group",
      //   label: "Item 2",
      //   children: [
      //     { label: "Option 3", key: "setting:3" },
      //     { label: "Option 4", key: "setting:4" },
      //   ],
      // },
    ],
  },

  {
    label: "Navigation One",
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: "Navigation Two",
    key: "app",
    icon: <AppstoreOutlined />,
    disabled: false,
  },

  {
    key: "alipay",
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
  },
];

export default function Navbar() {
  const [current, setCurrent] = useState("dashboard");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}
