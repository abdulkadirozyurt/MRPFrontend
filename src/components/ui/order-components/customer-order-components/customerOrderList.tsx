"use client";

import { ICustomerOrder } from "@/models/order/ICustomerOrder";
import { toLocalTime } from "@/utilities/dates/datetime-util";
import { deleteCustomerOrder, fetchCustomerOrders, updateCustomerOrder } from "@/utilities/redux/slices/customerOrderSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { Button, Input, Modal, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCustomerOrderForm from "./customerOrderAddForm";
import CustomerOrderUpdateForm from "./customerOrderUpdateForm";
import Message from "@/components/common/Message";
import { SearchOutlined } from "@ant-design/icons";

export default function CustomerOrdersList() {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.customerOrders.orders);
  const status = useSelector((state: RootState) => state.customerOrders.status);

  const [searchText, setSearchText] = useState<string>("");
  const [mode, setMode] = useState<"add" | "update">("add");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingOrder, setEditingOrder] = useState<ICustomerOrder | null>(null);
  const alertMessage = useSelector((state: RootState) => state.customerOrders.alertMessage);
  const alertResult = useSelector((state: RootState) => state.customerOrders.alertResult);
  const loading = status === "loading";

  const filteredOrders = orders?.filter((order) =>
    order?.customerId?.companyName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const showModal = (mode: "add" | "update", customerOrder?: ICustomerOrder) => {
    setMode(mode);
    setEditingOrder(customerOrder || null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingOrder(null);
    dispatch(fetchCustomerOrders());
  };

  const handleEdit = async (updatedOrder: ICustomerOrder) => {
    try {
      await dispatch(updateCustomerOrder({ id: editingOrder?._id ?? "", updatedOrder })).unwrap();
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCustomerOrder(id)).unwrap();
      message.success("Sipariş başarıyla silindi.");
      dispatch(fetchCustomerOrders());
    } catch (error: any) {
      message.error(error || "Sipariş silinirken hata oluştu.");
    }
  };

  const columns: ColumnsType<ICustomerOrder> = [
    {
      title: "Müşteri",
      dataIndex: "customerId",
      key: "customerId",
      render: (customerId) => (typeof customerId === "object" ? customerId.companyName : customerId),
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
      render: (value) => (value ? toLocalTime(value) : "-"),
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal("update", record)}>
            Güncelle
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Sil
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchCustomerOrders());
  }, [dispatch]);

  return (
    <>
      {alertMessage && alertResult && <Message result={alertResult} alertMessage={alertMessage} />}

      <div className="flex items-center justify-between h-14">
        <Input className="!w-72" value={searchText} onChange={handleSearch} prefix={<SearchOutlined />} placeholder="Ara" />

        <Button type="primary" onClick={() => showModal("add")}>
          Yeni Sipariş Ekle
        </Button>

        <Modal open={isModalVisible} okType="primary" onCancel={() => setIsModalVisible(false)} footer={null} className="!w-4/6">
          {mode === "add" ? (
            <AddCustomerOrderForm onSuccess={() => setIsModalVisible(false)} />
          ) : (
            <CustomerOrderUpdateForm
              initialValues={editingOrder}
              onSuccess={() => setIsModalVisible(false)}
              onUpdate={handleEdit}
            />
          )}
        </Modal>
      </div>

      <Table dataSource={orders} columns={columns} rowKey="_id" loading={status === "loading"} pagination={{ pageSize: 10 }} />
    </>
  );
}
