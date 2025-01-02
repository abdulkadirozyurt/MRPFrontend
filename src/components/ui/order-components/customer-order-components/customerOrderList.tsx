"use client";

import { ICustomerOrder } from "@/models/order/ICustomerOrder";
import { toLocalTime } from "@/utilities/dates/datetime-util";
import { deleteCustomerOrder, fetchCustomerOrders, updateCustomerOrder } from "@/utilities/redux/slices/customerOrderSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { Button, Modal, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCustomerOrderForm from "./customerOrderAddForm";
import CustomerOrderUpdateForm from "./customerOrderUpdateForm";

export default function CustomerOrdersList() {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.customerOrders.orders);
  const status = useSelector((state: RootState) => state.customerOrders.status);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<ICustomerOrder | null>(null);

  useEffect(() => {
    dispatch(fetchCustomerOrders());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCustomerOrder(id)).unwrap();
      message.success("Sipariş başarıyla silindi.");
      dispatch(fetchCustomerOrders());
    } catch (error: any) {
      message.error(error || "Sipariş silinirken hata oluştu.");
    }
  };

  const handleUpdate = async (updatedOrder: ICustomerOrder) => {
    try {
      await dispatch(updateCustomerOrder({ id: updatedOrder._id, updatedOrder })).unwrap();
      message.success("Sipariş başarıyla güncellendi.");
      handleUpdateModalClose();
    } catch (error: any) {
      message.error(error || "Sipariş güncellenirken hata oluştu.");
    }
  };

  const handleAddModalOpen = () => setIsAddModalVisible(true);
  const handleAddModalClose = () => {
    setIsAddModalVisible(false);
    dispatch(fetchCustomerOrders());
  };

  const handleUpdateModalOpen = (order: ICustomerOrder) => {
    setEditingOrder(order);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalVisible(false);
    setEditingOrder(null);
    dispatch(fetchCustomerOrders());
  };

  const columns: ColumnsType<ICustomerOrder> = [
    {
      title: "Müşteri",
      dataIndex: "customerId",
      key: "customerId",
      render: (customerId) => customerId.companyName,
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
      title: "Teslim Tarihi",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      // render: (value) => (value ? new Date(value).toLocaleString("tr-TR") : "-"),
      render: (value) => (value ? toLocalTime(value) : "-"),
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleUpdateModalOpen(record)}>
            Güncelle
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Sil
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Müşteri Siparişleri</h2>
        <Button type="primary" onClick={handleAddModalOpen}>
          Yeni Sipariş Ekle
        </Button>
      </div>

      <Modal
        title="Yeni Müşteri Siparişi Ekle"
        open={isAddModalVisible}
        onCancel={handleAddModalClose}
        footer={null}
        destroyOnClose
      >
        <AddCustomerOrderForm onSuccess={handleAddModalClose} />
      </Modal>

      <Modal
        title="Müşteri Siparişi Güncelle"
        open={isUpdateModalVisible}
        onCancel={handleUpdateModalClose}
        footer={null}
        destroyOnClose
      >
        {editingOrder ? (
          <CustomerOrderUpdateForm initialValues={editingOrder} onSuccess={handleUpdateModalClose} onUpdate={handleUpdate} />
        ) : (
          <p>Veri yükleniyor...</p>
        )}
      </Modal>

      <Table dataSource={orders} columns={columns} rowKey="_id" loading={status === "loading"} pagination={{ pageSize: 10 }} />
    </div>
  );
}
