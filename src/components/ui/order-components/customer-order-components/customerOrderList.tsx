// import { Button, Input, Table } from "antd";
// import { Tag } from "antd";
// import { Space } from "antd";

// import { useSelector } from "react-redux";

// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { ICustomerOrder } from "@/models/order/ICustomerOrder";
// import { SearchOutlined } from "@ant-design/icons";
// import { fetchCustomerOrders } from "@/utilities/redux/slices/customerOrderSlice";

// export default function CustomerOrderList() {
//   const dispatch: AppDispatch = useDispatch ();
//   const [searchText, setSearchText] = useState<string>("");

//   const customerOrders = useSelector((state: RootState) => state.customerOrders.orders);
//   const status = useSelector((state: RootState) => state.customerOrders.status);
//   const loading = status === "loading";

//   const filteredOrders = customerOrders.filter((order) => order._id.toLowerCase().includes(searchText.toLowerCase()));

//   const columns = [
//     {
//       title: "Sipariş No",
//       dataIndex: "_id",
//       key: "_id",
//       render: (text: string) => <Tag>{text}</Tag>,
//     },
//     {
//       title: "Durum",
//       dataIndex: "status",
//       key: "status",
//       render: (status: string) => <Tag color="blue">{status}</Tag>,
//     },
//     {
//       title: "Teslim Tarihi",
//       dataIndex: "deliveryDate",
//       key: "deliveryDate",
//       render: (date: string) => new Date(date).toLocaleDateString(),
//     },
//     {
//       title: "Ürünler",
//       dataIndex: "products",
//       key: "products",
//       render: (products: Array<{ productId: string; quantity: number }>) => (
//         <Space direction="vertical">
//           {products.map((item) => (
//             <div key={item.productId}>
//               <Tag color="green">{item.productId}</Tag> - {item.quantity} adet
//             </div>
//           ))}
//         </Space>
//       ),
//     },
//     {
//       title: "İşlemler",
//       key: "actions",
//       render: (_: any, record: ICustomerOrder) => (
//         <Space size="middle">
//           <Button type="link" onClick={() => handleEdit(record._id)}>
//             Düzenle
//           </Button>
//           <Button type="link" danger onClick={() => handleDelete(record._id)}>
//             Sil
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   const handleEdit = (id: string) => {
//     console.log("Düzenlenecek sipariş ID:", id);
//   };

//   const handleDelete = (id: string) => {
//     // dispatch(deleteCustomerOrder(id));
//   };

//   useEffect(() => {
//     dispatch(fetchCustomerOrders());
//   }, [dispatch]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchText(e.target.value);
//   };

//   return (
//     <div>
//       <div className="flex justify-between mb-4">
//         <Input
//           placeholder="Sipariş Ara"
//           prefix={<SearchOutlined />}
//           value={searchText}
//           onChange={handleSearch}
//           style={{ width: 300 }}
//         />
//         <Button type="primary">Yeni Sipariş Ekle</Button>
//       </div>
//       <Table dataSource={filteredOrders} columns={columns} rowKey="_id" loading={loading} pagination={{ pageSize: 10 }} />
//     </div>
//   );
// }

"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { deleteCustomerOrder, fetchCustomerOrders } from "@/utilities/redux/slices/customerOrderSlice";
import { Table, Button, Space, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ICustomerOrder } from "@/models/order/ICustomerOrder";

export default function CustomerOrdersList() {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.customerOrders.orders);
  const status = useSelector((state: RootState) => state.customerOrders.status);

  useEffect(() => {
    dispatch(fetchCustomerOrders());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCustomerOrder(id)).unwrap();
      message.success("Sipariş başarıyla silindi.");
      dispatch(fetchCustomerOrders()); // Listeyi güncellemek için
    } catch (error: any) {
      message.error(error || "Sipariş silinirken hata oluştu.");
    }
  };

  const columns: ColumnsType<ICustomerOrder> = [
    // {
    //   title: "Sipariş ID",
    //   dataIndex: "_id",
    //   key: "_id",
    // },
    {
      title: "Müşteri",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value) => `${value} ₺`,
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Sil
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Müşteri Siparişleri</h2>
      <Table dataSource={orders} columns={columns} rowKey="_id" loading={status === "loading"} pagination={{ pageSize: 10 }} />
    </div>
  );
}
