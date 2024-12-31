"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { deleteCustomerOrder, fetchCustomerOrders } from "@/utilities/redux/slices/customerOrderSlice";
import { Table, Button, Space, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ICustomerOrder } from "@/models/order/ICustomerOrder";
import CustomerOrderAddForm from "@/components/ui/order-components/customer-order-components/customerOrderAddForm";

export default function CustomerOrdersList() {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.customerOrders.orders);
  const status = useSelector((state: RootState) => state.customerOrders.status);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleModalOpen = () => setIsModalVisible(true);
  const handleModalClose = () => {
    setIsModalVisible(false);
    dispatch(fetchCustomerOrders()); // Listeyi güncellemek için
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Müşteri Siparişleri</h2>
        <Button type="primary" onClick={handleModalOpen}>
          Yeni Sipariş Ekle
        </Button>
      </div>

      <Modal title="Yeni Müşteri Siparişi Ekle" open={isModalVisible} onCancel={handleModalClose} footer={null} destroyOnClose>
        <CustomerOrderAddForm onSuccess={handleModalClose} />
      </Modal>

      <Table dataSource={orders} columns={columns} rowKey="_id" loading={status === "loading"} pagination={{ pageSize: 10 }} />
    </div>
  );
}
